
import { useState, useRef } from "react";
import { ROLE_RECEIVE_TYPES, formatTime, notificationIcon } from "./utils";
import useOutside from "./useOutside";
import Icon from "../../Components/Icon";
import { useNotifications } from "../../Context/NotificationProvider";

export default function NotificationBell({ role = "EMPLOYEE", onOpenCenter }) {
  const notifications = useNotifications();
  // Safe check in case hook is used outside provider
  if (!notifications) return null;

  const { items, unreadCount, markRead, markAllRead, setSelected } = notifications;

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setOpen(false));

  const visible = (n) => {
    if (!n.receivers) return true;
    return (
      n.receivers.includes("ALL") ||
      n.receivers.includes(role) ||
      ROLE_RECEIVE_TYPES[role]?.includes(n.category)
    );
  };

  // 🔹 Sort: Unread items first, then by date
  const visibleItems = (items || [])
    .filter(visible)
    .sort((a, b) => {
        if (a.unread === b.unread) return 0;
        return a.unread ? -1 : 1; 
    });

  return (
    <div className="relative" ref={ref}>
      <button
        id="number_of_unread"
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-md hover:bg-slate-100"
      >
        <Icon name="BellRing" className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50 border border-slate-100">
          {/* Header */}
          <div className="p-3 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800">Notifications</span>
              <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">
                {visibleItems.length}
              </span>
            </div>
            <button 
              onClick={markAllRead} 
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Mark all read
            </button>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-auto scrollbar-hidden">
            {visibleItems.length === 0 ? (
              <div className="p-6 text-sm text-center text-slate-400 flex flex-col items-center">
                <Icon name="BellOff" className="w-8 h-8 mb-2 opacity-20" />
                No notifications
              </div>
            ) : (
              visibleItems.slice(0, 10).map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    markRead(n.id);   // 1. Remove red dot instantly
                    setSelected(n);   // 2. Prepare detail view
                    onOpenCenter?.(); // 3. Navigate to page
                    setOpen(false);   // 4. Close dropdown
                  }}
                  className={`relative p-3 px-4 cursor-pointer hover:bg-slate-50 flex gap-3 items-start border-b border-slate-50 transition-colors ${
                    n.unread ? "bg-indigo-50/40" : ""
                  }`}
                >
                  {/* The RED LABEL (Dot) inside the list item */}
                  {n.unread && (
                    <div className="bg-rose-500 h-2 w-2 rounded-full absolute right-3 top-4 shadow-sm" />
                  )}

                  <div className="mt-0.5 opacity-80">{notificationIcon(n.category)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className={`text-sm truncate ${n.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                        {n.title}
                      </div>
                      <div className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                        {formatTime(n.createdAt || n.created_at)}
                      </div>
                    </div>
                    <div 
                      className="text-xs line-clamp-2 text-slate-500"
                      dangerouslySetInnerHTML={{ __html: n.message }} 
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer - Show All */}
          <div className="p-2 bg-slate-50 rounded-b-lg">
            <button
              onClick={() => {
                setSelected(null); // 1. Reset selection to show the main list
                setOpen(false);    // 2. Close dropdown
                onOpenCenter?.();  // 3. Navigate to page
              }}
              className="w-full text-xs py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded hover:bg-slate-100 transition-colors shadow-sm"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}









// import { useState, useRef } from "react";
// import { ROLE_RECEIVE_TYPES, formatTime, notificationIcon } from "./utils";
// import useOutside from "./useOutside";
// import Icon from "../../Components/Icon";
// import { useNotifications } from "../../Context/NotificationProvider";

// export default function NotificationBell({ role = "EMPLOYEE", onOpenCenter }) {
//   const notifications = useNotifications();
//   if (!notifications) return null;

//   // Added setSelected from context
//   const { items, unreadCount, markRead, markAllRead, setSelected } = notifications;

//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);
//   useOutside(ref, () => setOpen(false));

//   const visible = (n) => {
//     if (!n.receivers) return true;
//     return (
//       n.receivers.includes("ALL") ||
//       n.receivers.includes(role) ||
//       ROLE_RECEIVE_TYPES[role]?.includes(n.category)
//     );
//   };

//   // ORDER UNSEEN MESSAGES TO TOP
//   const visibleItems = items
//     ?.filter(visible)
//     .sort((a, b) => (a.unread === b.unread ? 0 : a.unread ? -1 : 1));

//   return (
//     <div className="relative" ref={ref}>
//       <button
//         id="number_of_unread"
//         onClick={() => setOpen((v) => !v)}
//         className="relative p-2 rounded-md hover:bg-slate-100"
//       >
//         <Icon name="BellRing" className="h-4 w-4" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-1 w-4 h-4 bg-rose-500 text-white text-xs flex items-center justify-center rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50">
//           <div className="p-3 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="text-lg font-semibold text-slate-800">Notifications</div>
//               <div className="text-xs text-slate-400">{visibleItems.length} total</div>
//             </div>
//             <button onClick={markAllRead} className="text-xs text-slate-500 hover:text-slate-900">
//               Mark all read
//             </button>
//           </div>

//           <div className="max-h-72 overflow-auto scrollbar-hidden">
//             {visibleItems.length === 0 ? (
//               <div className="p-4 text-sm text-center text-slate-500">No notifications</div>
//             ) : (
//               visibleItems.slice(0, 10).map((n) => (
//                 <div
//                   key={n.id}
//                   onClick={() => {
//                     if (n.unread) markRead(n.id); // Red dot disappears because state updates
//                     setSelected(n);               // Set the global "active" notification
//                     onOpenCenter?.();             // Go to the Notification Page
//                     setOpen(false);               // Close dropdown
//                   }}
//                   className="relative p-3 px-6 cursor-pointer hover:bg-slate-50 flex gap-3 items-start"
//                 >
//                   {/* RED DOT LOGIC */}
//                   {n.unread && (
//                     <div className="bg-red-600 h-1.5 w-1.5 rounded-full absolute right-2 top-5" />
//                   )}
//                   <div>{notificationIcon(n.category)}</div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <div className="text-sm font-semibold">{n.title}</div>
//                       <div className="text-xs text-slate-400">{formatTime(n.createdAt)}</div>
//                     </div>
//                     <div 
//                       className="text-xs line-clamp-2 text-slate-600 mt-1"
//                       dangerouslySetInnerHTML={{ __html: n.message }} 
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="p-3">
//             <button
//               onClick={() => {
//                 setSelected(null); // Clear selection to show the list
//                 setOpen(false);
//                 onOpenCenter?.();
//               }}
//               className="w-full text-xs px-3 py-2 bg-slate-900 text-white rounded"
//             >
//               Show All Notifications
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }