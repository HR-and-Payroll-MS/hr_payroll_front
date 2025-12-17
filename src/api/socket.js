import { io } from "socket.io-client";
import { getAccessToken, refreshToken } from "../utils/auth";

let socket = null;
let currentPath = "/ws/notifications/";

export function connectSocket(path = currentPath) {
  currentPath = path;

  // Reuse existing connected socket
  if (socket && socket.connected) {
    return socket;
  }

  const token = getAccessToken();
  if (!token) return null;

  socket = io("ws://localhost:3000", {
    path,
    transports: ["websocket"],
    query: { token },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected");
  });

  socket.on("disconnect", (reason) => {
    console.log("⚠️ Socket disconnected:", reason);
  });

  socket.on("connect_error", async (err) => {
    console.warn("❌ Socket error:", err.message);

    if (err.message === "jwt_expired") {
      const newToken = await refreshToken();
      if (newToken) {
        disconnectSocket();
        connectSocket(currentPath);
      }
    }
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
