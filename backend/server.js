import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/Config/database.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
  transports: ["websocket", "polling"],
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});