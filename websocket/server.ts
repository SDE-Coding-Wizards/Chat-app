import { Message } from "../types";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const chat = io.of("/chat");

chat.on("connection", async (socket: Socket) => {
  socket.on("join-chatroom", (chatroom_uuid: string) => {
    socket.join(chatroom_uuid);
  });

  socket.on("send-message", (message: Message) => {
    chat.to(message.chatroom_uuid).emit("receive-message", message);
  });
});

httpServer.listen(5000, () => {
  console.log("Server listening on port 5000");
});
