import Icon from "../../Components/Icon";
import { notificationIcon, formatTime } from "./utils";

export default function NotificationCard({ n, onView, onDelete, onMarkRead, canAction }) {
  return (
    <div className={`p-3 rounded hover:bg-slate-50 cursor-pointer shadow bg-white`}>
      <div className="flex gap-3">
        <div className="text-xl">{notificationIcon(n.category)}</div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{n.title}</div>
              <div className="text-xs text-slate-500">{formatTime(n.createdAt)}</div>
            </div>
            <div className="flex gap-2">
              <button className=""
                //  onClick={()=>onMarkRead(n)}
                 >{n.unread?<Icon name="Dot" className=" text-red-600 "/>:""}</button>
              {canAction && <button className=" text-white text-xs rounded" onClick={()=>onView(n)}><Icon name="Eye" className="h-4 text-indigo-600 w-4"/></button>}
              <button className="" onClick={()=>onDelete(n)}><Icon name="Trash2" className="h-4 hover:fill-red-700  text-red-700 w-4"/></button>
            </div>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">  {n.message} </p>
        </div>
      </div>
    </div>
  );
}
// UI component for displaying a single notification (title, message, time, read/unread).
