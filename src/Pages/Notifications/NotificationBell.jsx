import { useState, useRef } from "react";
import { ROLE_RECEIVE_TYPES } from "./utils";
import useOutside from "./useOutside";
import useNotificationStore from "./useNotificationStore";
import { formatTime, notificationIcon } from "./utils";
import { MOCK_NOTIFICATIONS } from "./mockData";
import Icon from "../../Components/Icon";

export default function NotificationBell({ role = "EMPLOYEE", onOpenCenter }) {
  const store = useNotificationStore(MOCK_NOTIFICATIONS);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setOpen(false));

  const unreadCount = store.items.filter(
    (n) =>
      n.unread &&
      (n.receivers.includes("ALL") ||
        n.receivers.includes(role) ||
        ROLE_RECEIVE_TYPES[role]?.includes(n.category))
  ).length;

  const visible = (n) =>
    n.receivers.includes("ALL") ||
    n.receivers.includes(role) ||
    ROLE_RECEIVE_TYPES[role]?.includes(n.category);

  return (
    <div className="relative" ref={ref}>
      <button id="number_of_unread" onClick={() => setOpen((v) => !v)} className="relative p-2 rounded-md hover:bg-slate-100">
        <Icon name="BellRing" className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-1 w-4 h-4 bg-rose-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50">
          
          {/* Header */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-lg font-semibold text-slate-800">Notifications</div>
              <div className="text-xs text-slate-400">{store.items.length} total</div>
            </div>
            <button onClick={store.markAllRead} className="text-xs text-slate-500 hover:text-slate-900">
              Mark all read
            </button>
          </div>

          {/* Body */}
          <div className="max-h-72 overflow-auto scrollbar-hidden">
            {store.items.filter(visible).length === 0 ? (
              <div className="p-4 text-sm text-slate-500">No notifications</div>
            ) : (
              store.items.filter(visible).slice(0, 10).map((n) => (
                  <div key={n.id} onClick={() => { store.markRead(n.id); onOpenCenter?.();}} className="relative p-3 px-6 cursor-pointer hover:bg-slate-50 flex gap-3 items-start">
                    {n.unread && (<div className="bg-red-600 h-1.5 w-1.5 rounded-full absolute right-2 top-5"></div>)}
                    <div>{notificationIcon(n.category)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{n.title}</div>
                        <div className="text-xs text-slate-400">{formatTime(n.createdAt)}</div>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{n.message}</div>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3">
            <button onClick={() => {setOpen(false);onOpenCenter?.();}} className="w-full text-xs px-3 py-2 bg-slate-900 text-white rounded">
              Show All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
