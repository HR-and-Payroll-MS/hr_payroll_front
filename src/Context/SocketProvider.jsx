// src/context/SocketProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, getSocket, disconnectSocket } from "../api/socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = connectSocket();
    setSocket(s);

    return () => disconnectSocket();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
