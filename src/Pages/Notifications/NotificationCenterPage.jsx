import { useEffect, useState, useMemo } from "react";
import NotificationCard from "./NotificationCard";
import { ROLE_RECEIVE_TYPES } from "./utils";
import InputField from "../../Components/InputField";
import Dropdown from "../../Components/Dropdown";
import DetailNotification from "./DetailNotification";
import { useNotifications } from "../../Context/NotificationProvider";

export default function NotificationCenterPage({ role = "EMPLOYEE" }) {
  const { items, markRead, remove } = useNotifications();

  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const pageSize = 10;

  /* 🔹 visibility */
  const visible = (n) => {
    if (!n.receivers) return true;
    return (
      n.receivers.includes("ALL") ||
      n.receivers.includes(role) ||
      ROLE_RECEIVE_TYPES[role]?.includes(n.category)
    );
  };

  /* 🔹 filtered list (SAFE) */
  const filtered = useMemo(() => {
    return (items || [])
      .filter(visible)
      .filter((n) => (filter === "all" ? true : n.category === filter))
      .filter((n) =>
        q ? (n.title + n.message).toLowerCase().includes(q.toLowerCase()) : true
      );
  }, [items, filter, q, role]);

  useEffect(() => {
    setPage(1);
  }, [filter, q]);

  const pages = Math.ceil(filtered.length / pageSize) || 1;
  const view = filtered.slice((page - 1) * pageSize, page * pageSize);

  const types = [
    { content: "all" },
    { content: "system" },
    { content: "attendance" },
    { content: "payroll" },
  ];

  if (selected) {
    return (
      <DetailNotification
        n={selected}
        setSelected={setSelected}
        store={{ markRead, remove }}
      />
    );
  }

  return (
    <div className="p-6 w-full flex flex-col h-full mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold flex-1 text-xl">Notifications</h2>
          <div  className="flex flex-1 items-center gap-2">
          <InputField
          maxWidth=""
            searchMode="input"
            placeholder="Search..."
            onChangeValue={setQ}
          />
          <Dropdown
            onChange={setFilter}
            placeholder="Filter"
            padding="p-1.5 max-w-[200px]"
            options={types}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3 py-3 overflow-y-auto scrollbar-hidden">
        {view.length > 0 ? (
          view.map((n) => (
            <NotificationCard
              key={n.id}
              n={n}
              canAction={ROLE_RECEIVE_TYPES[role]?.includes(n.category)}
              onView={() => {
                markRead(n.id);
                setSelected({ ...n, unread: false });
              }}
              onDelete={() => remove(n.id)}
              onMarkRead={() => markRead(n.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10 text-sm">
            No Notifications
          </p>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex justify-between mt-5 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            Page {page} / {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


































// import { useEffect, useState } from "react";
// import NotificationCard from "./NotificationCard";
// import { ROLE_RECEIVE_TYPES } from "./utils";
// import InputField from "../../Components/InputField";
// import Dropdown from "../../Components/Dropdown";
// import DetailNotification from "./DetailNotification";
// import useAuth from "../../Context/AuthContext"; // for axiosPrivate
// import { useSocket } from "../../Context/SocketProvider";

// export default function NotificationCenterPage({ role = "EMPLOYEE" }) {
//   const { axiosPrivate } = useAuth();
//   const socket = useSocket();

//   const [notifications, setNotifications] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(null);
//   const pageSize = 10;

//   useEffect(() => {
//     let isMounted = true;

//     const fetchNotifications = async () => {
//       try {
//         const res = await axiosPrivate.get("/api/notifications/"); // adjust endpoint
//         if (isMounted) setNotifications(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch notifications:", err);
//       }
//     };

//     fetchNotifications();

//     return () => {
//       isMounted = false;
//     };
//   }, [axiosPrivate]);

//   useEffect(() => {
//     if (!socket) return;

//     // const handleNewNotification = (data) => {
//     //   setNotifications((prev) => [data, ...prev]);
//     // };

//     const handleNewNotification = (data) => {
//   setNotifications((prev) => {
//     if (prev.some((n) => n.id === data.id)) return prev;
//     return [data, ...prev];
//   });
// };


//     socket.on("notification", handleNewNotification);

//     return () => {
//       socket.off("notification", handleNewNotification);
//     };
//   }, [socket]);

//   // const visible = (n) =>
//   //   n.receivers.includes("ALL") ||
//   //   n.receivers.includes(role) ||
//   //   ROLE_RECEIVE_TYPES[role]?.includes(n.category);
//   const visible = (n) => {
//   if (!n.receivers) return true;

//   return (
//     n.receivers.includes("ALL") ||
//     n.receivers.includes(role) ||
//     ROLE_RECEIVE_TYPES[role]?.includes(n.category)
//   );
// };


// useEffect(() => {
//   setPage(1);
// }, [filter, q]);


//   const filtered = notifications
//     .filter(visible)
//     .filter((n) => (filter === "all" ? true : n.category === filter))
//     .filter((n) =>
//       q ? (n.title + n.message).toLowerCase().includes(q.toLowerCase()) : true
//     );

//   const pages = Math.ceil(filtered.length / pageSize) || 1;
//   const view = filtered.slice((page - 1) * pageSize, page * pageSize);

//   const types = [
//     { content: "all" },
//     { content: "system" },
//     { content: "attendance" },
//     { content: "payroll" },
//   ];

//   const markRead = async (id) => {
//     try {
//       await axiosPrivate.post(`/api/notifications/${id}/mark-read/`);
//       setNotifications((prev) =>
//         prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
//       );
//     } catch (err) {
//       console.error("Failed to mark read:", err);
//     }
//   };

//   const remove = async (id) => {
//     try {
//       await axiosPrivate.delete(`/api/notifications/${id}/`);
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     } catch (err) {
//       console.error("Failed to delete notification:", err);
//     }
//   };

//   if (selected)
//     return (
//       <DetailNotification
//         n={selected}
//         setSelected={setSelected}
//         store={{ markRead, remove }}
//       />
//     );

//   return (
//     <div className="p-6 w-full flex flex-col h-full mx-auto">
//       Header & Filters
//        <div className="flex justify-between mb-4">
//         <h2 className="font-semibold text-xl">Notifications</h2>
//         <div className="flex gap-2">
//           <InputField searchMode="input" placeholder="Search..." onChangeValue={setQ} />
//           <Dropdown
//             onChange={setFilter}
//             placeholder="Filter"
//             padding="p-1.5"
//             options={types}
//           />
//         </div>
//       </div> {/**/}

//       Notification Cards  {/**/}
//       <div className="space-y-3 py-3 overflow-y-auto scrollbar-hidden">
//         {view.length > 0 ? (
//           view.map((n) => (
//             <NotificationCard
//               key={n.id}
//               n={n}
//               canAction={ROLE_RECEIVE_TYPES[role]?.includes(n.category)}
//               onView={() => {
//                 markRead(n.id);
//                 setSelected({ ...n, unread: false });
//               }}
//               onDelete={() => remove(n.id)}
//               onMarkRead={() => markRead(n.id)}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 mt-10 text-sm">No Notifications</p>
//         )}
//       </div>  {/**/}

//       {/* Pagination */}
//      {filtered.length > 0 && (
//         <div className="flex justify-between mt-5 text-sm">
//           <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-40" >
//             Prev
//           </button>
//           <span>
//             Page {page} / {pages}
//           </span>
//           <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1 border rounded disabled:opacity-40" >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// } 







































































































































// import { useEffect, useState } from "react";
// import { useSocket } from "../../Context/SocketProvider";

// export default function NotificationCenterPage() {
//   const socketContext = useSocket();
//   const [notifications, setNotifications] = useState([]);

//   /* 1️⃣ LISTEN FOR BACKEND NOTIFICATIONS */
//   useEffect(() => {
//     if (!socketContext?.socket) return;

//     const handler = (data) => {
//       console.log("🔔 Notification received:", data);
//       setNotifications((prev) => [...prev, { ...data, type: "received" }]);
//     };

//     socketContext.on("notification", handler);

//     return () => {
//       socketContext.off("notification", handler);
//     };
//   }, [socketContext]);

//   /* 2️⃣ SEND EVENT AND DISPLAY IT IMMEDIATELY */
//   const sendPing = () => {
//     if (!socketContext?.socket) {
//       console.warn("Socket not ready");
//       return;
//     }

//     const messageData = {
//       id: Date.now(), // temporary id for UI
//       title: "Ping Sent",
//       message: "Hello from NotificationCenterPage",
//       sentAt: new Date().toISOString(),
//     };

//     // Show sent message immediately
//     setNotifications((prev) => [...prev, { ...messageData, type: "sent" }]);

//     // Send to backend
//     socketContext.emit("ping_notification", messageData);

//     console.log("📤 Ping sent", messageData);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">
//         Notification Center (Send & Receive)
//       </h2>

//       <button
//         onClick={sendPing}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Send Socket Ping
//       </button>

//       <div className="mt-6 space-y-2">
//         {notifications.map((n) => (
//           <div
//             key={n.id}
//             className={`border p-3 rounded ${
//               n.type === "sent" ? "bg-blue-50 border-blue-400" : "bg-green-50 border-green-400"
//             }`}
//           >
//             <strong>{n.title}</strong>
//             <p>{n.message}</p>
//             {n.sentAt && (
//               <small className="text-gray-500 text-xs">
//                 {new Date(n.sentAt).toLocaleTimeString()}
//               </small>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




























































































































































































// import { useState } from "react";
// import NotificationCard from "./NotificationCard";
// import { ROLE_RECEIVE_TYPES, formatTime } from "./utils";
// import useNotificationStore from "./useNotificationStore";
// import { MOCK_NOTIFICATIONS } from "./mockData";
// import Dropdown from "../../Components/Dropdown";
// import InputField from "../../Components/InputField";
// import DetailNotification from "./DetailNotification";

// export default function NotificationCenterPage({ role = "EMPLOYEE" }) {
//   const store = useNotificationStore(MOCK_NOTIFICATIONS);

//   const [filter, setFilter] = useState("all");
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(null); // For detail view
//   const pageSize = 10;

//   const visible = (n) =>
//     n.receivers.includes("ALL") ||
//     n.receivers.includes(role) ||
//     ROLE_RECEIVE_TYPES[role]?.includes(n.category);

//   const filtered = store.items
//     .filter(visible)
//     .filter((n) => (filter === "all" ? true : n.category === filter))
//     .filter((n) =>
//       q ? (n.title + n.message).toLowerCase().includes(q.toLowerCase()) : true
//     );

//   const pages = Math.ceil(filtered.length / pageSize) || 1;
//   const view = filtered.slice((page - 1) * pageSize, page * pageSize);

//   const types = [
//     { content: "all" },
//     { content: "system" },
//     { content: "attendance" },
//     { content: "payroll" },
//   ];

  
//   return selected? (
//   <DetailNotification
//     n={selected}
//     setSelected={setSelected}
//     store={store}
//   />
// ): (
//     <div className="p-6 w-full flex flex-col h-full mx-auto">
//       {/* Header & Filters */}
//       <div className="flex justify-between mb-4">
//         <h2 className="font-semibold text-xl">Notifications</h2>
//         <div className="flex gap-2">
//           <InputField searchMode="input" placeholder="Search..." onSelect={setQ} />
//           <Dropdown onChange={setFilter} placeholder="Filter" padding="p-1.5" options={types} />
//         </div>
//       </div>

//       {/* Notification Cards */}
//       <div className="space-y-3 py-3 overflow-y-auto scrollbar-hidden ">
//         {view.length > 0 ? (
//           view.map((n) => (
//             <NotificationCard
//               key={n.id}
//               n={n}
//               canAction={ROLE_RECEIVE_TYPES[role]?.includes(n.category)}
//               onView={() => {
//                 store.markRead(n.id);
//                 setSelected({ ...n, unread: false });
//               }}

//               onDelete={() => store.remove(n.id)}
//               onMarkRead={() => store.markRead(n.id)}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 mt-10 text-sm">No Notifications</p>
//         )}
//       </div>

//       {/* Pagination */}
//       {filtered.length > 0 && (
//         <div className="flex justify-between mt-5 text-sm">
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-40"
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//           >
//             Prev
//           </button>
//           <span>
//             Page {page} / {pages}
//           </span>
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-40"
//             onClick={() => setPage((p) => Math.min(pages, p + 1))}
//             disabled={page === pages}
//           >
//             Next
//           </button>
//         </div>
//       )}
      

//     </div>
//   );
// }
