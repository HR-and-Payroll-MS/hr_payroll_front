// connectSocket("/ws/notifications/");
// socket.on("notification", data => console.log(data));

// connectSocket("/ws/chat/");
// socket.on("message", msg => console.log(msg));

// connectSocket("/ws/presence/");
// socket.on("status_update", res => console.log(res));


// src/socket/socket.js
import { io } from "socket.io-client";
import { getAccessToken, refreshToken } from "../utils/auth";

let socket = null;

export function connectSocket(path = "/ws/notifications/") { // now reusable
  const token = getAccessToken();
  if (!token) return null;

  socket = io("ws://localhost:8000", {
    path,
    transports: ["websocket"],
    query: { token },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 2000,
  });

  socket.on("connect_error", async (err) => {
    if (err.message === "jwt_expired") {
      const newToken = await refreshToken();
      if (newToken) connectSocket(path);
    }
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) socket.disconnect();
}













































// // src/socket/socket.js
// import { io } from "socket.io-client";
// import { getAccessToken, refreshToken } from "../utils/auth";

// let socket = null;

// export function connectSocket() {
//   const token = getAccessToken();
//   if (!token) return null;

//   socket = io("ws://localhost:8000", {
//     path: "/ws/notifications/",
//     transports: ["websocket"],
//     query: { token },
//     reconnection: true,
//     reconnectionAttempts: Infinity,
//     reconnectionDelay: 2000,
//   });

//   socket.on("connect_error", async (err) => {
//     if (err.message === "jwt_expired") {
//       const newToken = await refreshToken();
//       if (newToken) connectSocket(); // reconnect with new token
//     }
//   });

//   return socket;
// }

// export function getSocket() {
//   return socket;
// }

// export function disconnectSocket() {
//   if (socket) socket.disconnect();
// }
