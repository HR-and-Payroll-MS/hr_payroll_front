import { useState, useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { ROLE_RECEIVE_TYPES } from "./utils";
import useNotificationStore from "./useNotificationStore";
import { MOCK_NOTIFICATIONS } from "./mockData";

export default function NotificationCenterPage({ role="EMPLOYEE" }) {
  const store=useNotificationStore(MOCK_NOTIFICATIONS);
  const [filter,setFilter]=useState("all");
  const [q,setQ]=useState("");
  const [page,setPage]=useState(1);
  const pageSize=10;

  const visible=n=>
    n.receivers.includes("ALL")||
    n.receivers.includes(role)||
    ROLE_RECEIVE_TYPES[role]?.includes(n.category);

  const filtered = store.items
    .filter(visible)
    .filter(n=>filter==="all" || n.category===filter)
    .filter(n=>q? (n.title+n.message).toLowerCase().includes(q.toLowerCase()):true);

  const pages=Math.ceil(filtered.length/pageSize)||1;
  const view=filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-xl">Notifications</h2>
        <div className="flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} className="border px-2 py-1 rounded" placeholder="Search.."/>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="border px-2 py-1 rounded">
            <option value="all">All</option>
            <option value="system">System</option><option value="hr">HR</option>
            <option value="attendance">Attendance</option><option value="leave">Leave</option>
            <option value="payroll">Payroll</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {view.map(n=>(
          <NotificationCard key={n.id} n={n}
            canAction={ROLE_RECEIVE_TYPES[role]?.includes(n.category)}
            onView={i=>store.markRead(i.id)}
            onDelete={i=>store.remove(i.id)}
            onMarkRead={i=>store.markRead(i.id)}
          />
        ))}
      </div>

      <div className="flex justify-between mt-5">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <span>{page} / {pages}</span>
        <button onClick={()=>setPage(p=>Math.min(pages,p+1))}>Next</button>
      </div>
    </div>
  );
}
// Main page that shows the full notification list, UI for viewing notifications.