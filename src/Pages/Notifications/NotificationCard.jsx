import Icon from "../../Components/Icon";
import { formatTime, notificationIcon } from "./utils";

export default function NotificationCard({ n, onView, onDelete, onMarkRead, canAction }) {
  return (
    <div
      onClick={onView}
      className={`group relative p-4 mx-3 rounded-xl transition-all duration-300 cursor-pointer mb-2
        ${n.unread 
          ? "bg-white dark:bg-slate-800 shadow-md border-b-2 border-emerald-500/50 scale-[1.01] z-10" 
          : "bg-transparent border border-transparent opacity-80"
        } 
        hover:shadow-lg hover:border-emerald-500/30 dark:hover:bg-slate-800/80`}
    >
      {/* 3D Vertical Accent for Unread */}
      {n.unread && (
        <div className="absolute left-0 top-3 bottom-3 w-1 bg-emerald-500 rounded-r-full shadow-[2px_0_8px_rgba(16,185,129,0.4)]" />
      )}

      <div className="flex gap-4 items-center">
        {/* Icon with a subtle shadow */}
        <div className={`p-2 rounded-lg ${n.unread ? 'bg-emerald-50 dark:bg-emerald-500/10' : ''}`}>
          {notificationIcon(n.category)}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className={`text-[11px] uppercase tracking-wider ${n.unread ? "font-black text-slate-800 dark:text-white" : "font-bold text-slate-500 dark:text-slate-400"}`}>
              {n.title}
            </h4>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
              {formatTime(n.createdAt)}
            </span>
          </div>
          
          <p className={`text-xs mt-0.5 line-clamp-1 ${n.unread ? "text-slate-600 dark:text-slate-300 font-medium" : "text-slate-500 dark:text-slate-500"}`}>
            {n.message}
          </p>
        </div>

        {/* Action Buttons - 3D Pill Style */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          {n.unread && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkRead();
              }}
              className="p-1.5 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-500/30 hover:scale-110 active:scale-90 transition-all"
              title="MARK AS READ"
            >
              <Icon name="Check" className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg shadow-sm border border-rose-100 dark:border-rose-500/20 hover:scale-110 active:scale-90 transition-all"
            title="DELETE"
          >
            <Icon name="Trash2" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}