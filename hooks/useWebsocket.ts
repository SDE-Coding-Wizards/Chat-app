import { useEffect } from "react";
import { io } from "socket.io-client";

interface WebsocketEvents {
  [key: string]: (data: any) => void;
}

interface WebsocketOptions {
  events: WebsocketEvents;
  room: string;
}

const baseUrl = "http://localhost:5001";

export function useWebsocket(url: string, options?: WebsocketOptions) {
  const socket = io(`${baseUrl}${url}`);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      if (options?.room) socket.emit("join-room", options.room);
    });

    const eventsList = Object.entries(options?.events || {});

    for (const event of eventsList) {
      socket.on(...event);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}
