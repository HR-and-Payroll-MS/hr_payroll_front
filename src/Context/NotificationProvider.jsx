import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./AuthContext";
import { useSocket } from "./SocketProvider";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { axiosPrivate } = useAuth();
  const socket = useSocket();

  const [items, setItems] = useState([]);
  const unreadCount = items.filter((n) => n.unread).length;

  /* 🔹 Initial fetch */
  useEffect(() => {
    let mounted = true;

    axiosPrivate
      .get("/api/notifications/")
      .then((res) => {
        if (mounted) setItems(res.data || []);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, [axiosPrivate]);

  /* 🔹 Socket listener */
  useEffect(() => {
    if (!socket) return;

    const onNotification = (data) => {
      setItems((prev) => {
        if (prev.some((n) => n.id === data.id)) return prev;
        return [data, ...prev];
      });
    };

    socket.on("notification", onNotification);
    return () => socket.off("notification", onNotification);
  }, [socket]);

  /* 🔹 Actions */
  const markRead = async (id) => {
    await axiosPrivate.post(`/api/notifications/${id}/mark-read/`);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllRead = async () => {
    await axiosPrivate.post("/api/notifications/mark-all-read/");
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const remove = async (id) => {
    await axiosPrivate.delete(`/api/notifications/${id}/`);
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        items,
        unreadCount,
        markRead,
        markAllRead,
        remove,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
