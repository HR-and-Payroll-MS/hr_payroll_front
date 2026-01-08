import React, { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../api/socket";
import useAuth from "./AuthContext";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { auth, refreshAccessToken } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only connect if we have an access token
    if (!auth.accessToken) return;

    disconnectSocket();
    const s = connectSocket();

    if (s) {
      setSocket(s);

      s.on("connect_error", async (err) => {
        if (err.message === "jwt_expired" || err.message === "unauthorized") {
          console.log("Socket auth error, refreshing token...");
          await refreshAccessToken();
        }
      });
    }

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [auth.accessToken, refreshAccessToken]);

  // Context value structure
  const value = {
    socket,
    isConnected: !!socket?.connected,

    emit: (event, payload) => {
      if (socket) socket.emit(event, payload);
    },

    on: (event, callback) => {
      if (socket) socket.on(event, callback);
    },

    off: (event, callback) => {
      if (socket) socket.off(event, callback);
    },
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}

/**
 * Custom hook to subscribe to a specific socket event.
 * Automatically handles mounting/unmounting of the listener.
 * 
 * @param {string} event - The event name to listen for
 * @param {function} callback - The handler function
 */
export function useSocketEvent(event, callback) {
  const { socket } = useSocket() || {};

  useEffect(() => {
    if (!socket || !callback) return;

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [socket, event, callback]);
}
