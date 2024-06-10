import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const chat = io.of("/chat");

chat.on("connection", async (socket) => {
  socket.on("join-room", (chatroom_uuid) => {
    socket.join(chatroom_uuid);
  });

  socket.on("send-message", (message) => {
    chat.to(message.chatroom_uuid).emit("receive-message", message);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
