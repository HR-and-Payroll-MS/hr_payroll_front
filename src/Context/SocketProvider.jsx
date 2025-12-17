import React, { createContext, useContext, useEffect, useMemo } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../api/socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  useEffect(() => {
    connectSocket(); // connect once globally

    return () => {
      disconnectSocket(); // cleanup on app unload
    };
  }, []);

  const value = useMemo(() => {
    const socket = getSocket();
    if (!socket) return null;

    return {
      socket,

      emit: (event, payload) => {
        socket.emit(event, payload);
      },

      on: (event, callback) => {
        socket.on(event, callback);
      },

      off: (event, callback) => {
        socket.off(event, callback);
      },
    };
  }, []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
