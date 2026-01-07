import React, { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../api/socket";
import useAuth from "./AuthContext";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { auth, refreshAccessToken } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    disconnectSocket();
    const s = connectSocket();

    if (s) {
      setSocket(s);

      s.on("connect_error", async (err) => {
        if (err.message === "jwt_expired" || err.message === "unauthorized") {
          console.log("Socket auth error, refreshing token...");
          await refreshAccessToken(); // Trigger context refresh
        }
      });
    }

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [auth.accessToken, refreshAccessToken]);

  if (!socket) {
    return (
      <SocketContext.Provider value={null}>
        {children}
      </SocketContext.Provider>
    );
  }

  return (
    <SocketContext.Provider
      value={{
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}





















// import React, { createContext, useContext, useEffect, useMemo } from "react";
// import { connectSocket, disconnectSocket, getSocket } from "../api/socket";

// const SocketContext = createContext(null);

// export function SocketProvider({ children }) {
//   useEffect(() => {
//     connectSocket(); // connect once globally

//     return () => {
//       disconnectSocket(); // cleanup on app unload
//     };
//   }, []);

//   const value = useMemo(() => {
//     const socket = getSocket();
//     if (!socket) return null;

//     return {
//       socket,

//       emit: (event, payload) => {
//         socket.emit(event, payload);
//       },

//       on: (event, callback) => {
//         socket.on(event, callback);
//       },

//       off: (event, callback) => {
//         socket.off(event, callback);
//       },
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

// export function useSocket() {
//   return useContext(SocketContext);
// }
