import Icon from "../../Components/Icon";
import { formatTime, notificationIcon } from "./utils";

export default function NotificationCard({ n, onView, onDelete, onMarkRead, canAction }) {
  return (
    <div
      onClick={onView} // This triggers the setSelected in the parent page
      className={`group relative p-4 mx-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
        n.unread ? "bg-white border-indigo-200" : "bg-slate-50 border-transparent"
      }`}
    >
      {/* Unread Indicator */}
      {n.unread && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-lg" />
      )}

      <div className="flex gap-4">
        <div className="mt-1">{notificationIcon(n.category)}</div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`text-sm ${n.unread ? "font-bold" : "font-medium"} text-slate-800`}>
              {n.title}
            </h4>
            <span className="text-[10px] text-slate-400">{formatTime(n.createdAt)}</span>
          </div>
          
          <p className="text-xs text-slate-600 line-clamp-1 mt-1">{n.message}</p>
        </div>

        {/* Action Buttons - Stop Propagation to prevent opening detail when clicking delete */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {n.unread && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead();
              }}
              className="p-1 hover:bg-indigo-100 text-indigo-600 rounded"
              title="Mark as read"
            >
              <Icon name="Check" className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-rose-100 text-rose-600 rounded"
            title="Delete"
          >
            <Icon name="Trash2" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}