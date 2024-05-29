import { Message } from "../types";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const chat = io.of("/chat");

chat.on("connection", async (socket: Socket) => {
  socket.on("join-room", (chatroom_uuid: string) => {
    socket.join(chatroom_uuid);
  });

  socket.on("send-message", (message: Message) => {
    chat.to(message.chatroom_uuid).emit("receive-message", message);
  });
});

const PORT = process.env.WS_PORT || 5000;

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
