import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface WebsocketEvents {
  [key: string]: (data: any) => void;
}

interface WebsocketOptions {
  events?: WebsocketEvents;
  room: string;
}

const WS_SERVER = process.env.NEXT_PUBLIC_WS_SERVER;
const WS_PORT = process.env.NEXT_PUBLIC_WS_PORT || 5000;

let baseUrl = WS_SERVER;

if (!WS_SERVER) baseUrl = `http://localhost:${WS_PORT}`;

export function useWebsocket(url: string, options?: WebsocketOptions) {
  const socket = io(`${baseUrl}${url}`);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      if (options?.room) socket.emit("join-room", options.room);
      setConnected(true);
    });

    const eventsList = Object.entries(options?.events || {});

    for (const event of eventsList) {
      socket.on(...event);
    }

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return [socket, connected] as const;
}
