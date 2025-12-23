import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "./AuthContext";
import { useSocket } from "./SocketProvider";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { axiosPrivate } = useAuth();
  const socket = useSocket();

  const [items, setItems] = useState([]);

  const unreadCount = items.filter((n) => !n.is_read).length;

  /* 🔹 Initial fetch */
  useEffect(() => {
    let mounted = true;

    axiosPrivate
      .get("notifications/")
      .then((res) => {
        if (!mounted) return;
        setItems(res.data?.results || []); // ✅ FIX
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
      });

    return () => {
      mounted = false;
    };
  }, [axiosPrivate]);

  /* 🔹 Realtime socket */
  useEffect(() => {
    if (!socket) return;

    const onNotification = (data) => {
      setItems((prev) => {
        if (prev.some((n) => n.id === data.id)) return prev;

        return [
          {
            ...data,
            is_read: false,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ];
      });
    };

    socket.on("notification", onNotification);
    return () => socket.off("notification", onNotification);
  }, [socket]);

  /* 🔹 Actions */
  const markRead = async (id) => {
    await axiosPrivate.post(`notifications/${id}/mark-read/`);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllRead = async () => {
    await axiosPrivate.post("notifications/mark-all-read/");
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const remove = async (id) => {
    await axiosPrivate.delete(`notifications/${id}/`);
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
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return ctx;
}

