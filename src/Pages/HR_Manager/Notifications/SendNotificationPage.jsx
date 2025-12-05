import { useState } from "react";
import useNotificationStore from "./useNotificationStore";
import { ROLE_SEND_PERMISSIONS } from "./utils";
import { MOCK_NOTIFICATIONS, MOCK_USERS } from "./mockData";

export default function SendNotificationPage({ role="HR_MANAGER" }) {
  const store=useNotificationStore(MOCK_NOTIFICATIONS);
  const [title,setTitle]=useState("");
  const [message,setMessage]=useState("");
  const [category,setCategory]=useState("hr");
  const [receiver,setReceiver]=useState("ALL");
  const [target,setTarget]=useState("");
  const [priority,setPriority]=useState("normal");
  const allow=ROLE_SEND_PERMISSIONS[role] || [];

  function receivers(){
    if(receiver==="ALL") return ["ALL"];
    if(receiver==="ROLE") return [target];
    if(receiver==="USER") return [Number(target)];
  }

  function submit(e){
    e.preventDefault();
    store.addNotification({title,message,category,receivers:receivers(),senderRole:role});
    setTitle("");setMessage("");setTarget("");
    alert("Notification Sent");
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Send Notification</h2>

      <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 rounded w-full">
        {allow.map(c=><option key={c}>{c}</option>)}
        <option value="announcement">Announcement</option>
      </select>

      <input required value={title} onChange={e=>setTitle(e.target.value)}
        placeholder="Title..." className="border p-2 rounded w-full"/>

      <textarea required value={message} onChange={e=>setMessage(e.target.value)}
        className="border p-2 rounded w-full" placeholder="Message..."></textarea>

      <div className="flex gap-2">
        <select value={receiver} onChange={e=>setReceiver(e.target.value)} className="border p-2 rounded">
          <option value="ALL">All</option>
          <option value="ROLE">Role</option>
          <option value="USER">User</option>
        </select>

        {receiver==="ROLE" && (
          <select value={target} onChange={e=>setTarget(e.target.value)} className="border p-2 rounded">
            <option value="HR_MANAGER">HR MANAGER</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>
        )}

        {receiver==="USER" && (
          <select value={target} onChange={e=>setTarget(e.target.value)} className="border p-2 rounded">
            <option value="">Choose User</option>
            {MOCK_USERS.map(u=><option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        )}
      </div>

      <select value={priority} onChange={e=>setPriority(e.target.value)} className="border p-2 rounded">
        <option value="normal">Normal</option>
        <option value="important">Important</option>
      </select>

      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
    </form>
  );
}
// UI/form that allows user or admin to send/create notifications.
