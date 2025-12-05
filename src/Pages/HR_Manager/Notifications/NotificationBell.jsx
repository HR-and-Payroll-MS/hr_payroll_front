import { useState, useRef } from "react";
import { ROLE_RECEIVE_TYPES } from "./utils";
import useOutside from "./useOutside";
import useNotificationStore from "./useNotificationStore";
import { formatTime, notificationIcon } from "./utils";
import { MOCK_NOTIFICATIONS } from './mockData'
import Icon from "../../../Components/Icon";

export default function NotificationBell({ role="EMPLOYEE", onOpenCenter }) {
  const store = useNotificationStore(MOCK_NOTIFICATIONS);
  const [open,setOpen] = useState(false);
  const ref = useRef();
  useOutside(ref, ()=>setOpen(false));

  const unreadCount = store.items.filter(
    n=>n.unread && (n.receivers.includes("ALL") || n.receivers.includes(role) || ROLE_RECEIVE_TYPES[role]?.includes(n.category))
  ).length;

  const visible = n =>
    n.receivers.includes("ALL") ||
    n.receivers.includes(role) ||
    ROLE_RECEIVE_TYPES[role]?.includes(n.category);

  return (
    <div ref={ref} className="relative">
      <button onClick={()=>setOpen(v=>!v)} className="relative p-2 rounded hover:bg-slate-100">
        <Icon name="BellRing" className="w-6 h-6" />
        {unreadCount?(
          <span className="absolute top-0 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        ):null}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="p-3 flex justify-between">
            <div className="font-semibold">Notifications</div>
            <button onClick={store.markAllRead} className="text-xs text-slate-600">Mark all</button>
          </div>

          <div className="max-h-72 overflow-auto">
            {store.items.filter(visible).map(n=>(
              <div key={n.id} onClick={()=>{store.markRead(n.id);onOpenCenter?.();}}
                className="flex gap-3 p-3 hover:bg-slate-50 cursor-pointer">
                <span>{notificationIcon(n.category)}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{n.title}</span><span className="text-xs">{formatTime(n.createdAt)}</span>
                  </div>
                  <div className="text-xs text-slate-600">{n.message}</div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={()=>{setOpen(false);onOpenCenter?.();}}
            className="w-full p-2 text-sm bg-black text-white rounded-b">View All</button>
        </div>
      )}
    </div>
  );
}
// Displays the bell icon with notification count. Opens notification center when clicked.
