import { notificationIcon, formatTime } from "./utils";

export default function NotificationCard({ n, onView, onDelete, onMarkRead, canAction }) {
  return (
    <div className={`p-3 rounded border ${n.unread?"bg-slate-50":"bg-white"}`}>
      <div className="flex gap-3">
        <div className="text-xl">{notificationIcon(n.category)}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{n.title}</div>
              <div className="text-xs text-slate-500">{formatTime(n.createdAt)}</div>
            </div>
            <div className="flex gap-2">
              {canAction && <button className="px-2 py-1 bg-indigo-600 text-white text-xs rounded" onClick={()=>onView(n)}>Open</button>}
              <button className="px-2 py-1 text-xs bg-gray-200 rounded" onClick={()=>onMarkRead(n)}>{n.unread?"Mark":"Read"}</button>
              <button className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded" onClick={()=>onDelete(n)}>Delete</button>
            </div>
          </div>
          <p className="text-sm text-slate-600">{n.message}</p>
        </div>
      </div>
    </div>
  );
}
// UI component for displaying a single notification (title, message, time, read/unread).
