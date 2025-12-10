import { useState } from "react";
import useNotificationStore from "./useNotificationStore";
import { ROLE_SEND_PERMISSIONS } from "./utils";
import { MOCK_NOTIFICATIONS, MOCK_USERS } from "./mockData";
import Dropdown from "../../Components/Dropdown";
import InputField from "../../Components/InputField";
import TextEditor from "../../Components/TextEditor";

export default function SendNotificationPage({ role="HR_MANAGER" }) {
  const store=useNotificationStore(MOCK_NOTIFICATIONS);
  const [title,setTitle]=useState("");
  const [message,setMessage]=useState("");
  const [category,setCategory]=useState("hr");
  const [receiver,setReceiver]=useState("ALL");
  const [target,setTarget]=useState("");
  const [priority,setPriority]=useState("normal");
  const allow=ROLE_SEND_PERMISSIONS[role] || [];

   const type = [
    {content:'ALL'},
    {content:'ROLE'},
    {content:'USER'},
  ];
   const priorities = [
    {content:'Normal'},
    {content:'Important'},
    {content:'Urgent'},
  ];
   const roles = [
    {content:'HR MANAGER'},
    {content:'EMPLOYEE'},
  ];

  function receivers(){
    if(receiver==="ALL") return ["ALL"];
    if(receiver==="ROLE") return [target];
    if(receiver==="USER") return [Number(target)];
  }

  function submit(e){
    e.preventDefault();
    console.log("title:-",title,"message:-",message,"category:-",category,"receivers:-",receivers(),"senderRole:-",role)
    store.addNotification({title,message,category,receivers:receivers(),senderRole:role});
    setTitle("");setMessage("");setTarget("");
    alert("Notification Sent");
  }

  return (
    <form onSubmit={submit} className=" mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Send Notification</h2>
      <div className="flex gap-2">
        <Dropdown padding="p-1.5" onChange={setReceiver} placeholder="All" options={type}/>
        {receiver==="ROLE" && (
          <Dropdown  padding="p-1.5" onChange={setTarget} placeholder="All" options={roles}/>)}
        {receiver==="USER" && (
        <InputField placeholder="Insert EmployeeId/Name" icon={false} onSelect={setTitle}/>)}
      </div>
      <div className="flex gap-2">
          <Dropdown padding="p-1.5"  onChange={setCategory} placeholder="hr" options={allow}/>
          <Dropdown padding="p-1.5" onChange={setPriority} placeholder="Normal" options={priorities}/>
      </div>
      <InputField placeholder="Title..." icon={false} onSelect={setTitle}/>
      <TextEditor onChange={setMessage}/>
      
      <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">Send</button>
    </form>
  );
}
// UI/form that allows user or admin to send/create notifications.
