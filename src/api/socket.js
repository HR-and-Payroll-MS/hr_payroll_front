import { io } from "socket.io-client";
import { getAccessToken } from "../utils/auth";

let socket = null;
let currentPath = "/ws/notifications/socket.io";

export function connectSocket(path = currentPath) {
  currentPath = path;

  if (socket && socket.connected) {
    return socket;
  }

  const token = getAccessToken();
  if (!token) return null;

  const host = window.location.hostname;
  const socketUrl = `http://${host}:3000`;

  socket = io(socketUrl, {
    path,
    transports: ["polling", "websocket"],
    query: { token },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1500,
    reconnectionDelayMax: 8000,
    randomizationFactor: 0.5,
    timeout: 20000,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
    console.log("🚀 Transport:", socket.io.engine.transport.name);
  });

  socket.on("disconnect", (reason) => {
    console.log("⚠️ Socket disconnected:", reason);
  });

  socket.on("connect_error", async (err) => {
    console.warn("❌ Socket error:", err.message);
    // Error handling is now delegated to the SocketProvider via "connect_error" listener
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
