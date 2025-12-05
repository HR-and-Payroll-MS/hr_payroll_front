import React, { useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import { AnnouncementSearch } from "../../../Components/Level2Hearder";

/*
  AnnouncementList
  - Simple search + filters (client-side)
  - Expects announcements array, each item is the static shape used above
*/

export default function AnnouncementList({ announcements = [], onOpen }) {
  const [q, setQ] = useState("");
  const [status] = useState("All Priority"); // placeholder for future status filter (draft/published) if needed
  const [priority, setPriority] = useState("All Priority");

  const filtered = announcements.filter(a => {
    console.log(q)
    if (q && !(a.title + " " + a.body).toLowerCase().includes(q.toLowerCase())) return false;
    if (priority !== "All Priority" && a.priority !== priority) return false;
    // if status logic is added, filter here
    return true;
  });

  return (
    <div className="space-y-4 flex flex-col flex-1 h-full">
      <div className="flex gap-3 items-center mb-2">
        <AnnouncementSearch setPriority={setPriority} setQ={setQ}/>
      </div>

      <div className="grid flex-1 py-1.5 overflow-y-auto scrollbar-hidden gap-3">
        {filtered.length === 0 && (
          <div className="p-6 flex flex-col  justify-center items-center  text-gray-600"> <img
                className=""
                src="\public\pic\F1.png"
                alt=""
              /><p>No announcements found.</p></div>
        )}
        <div className="flex flex-col gap-3">
        {filtered.map(a => (
          <AnnouncementCard key={a.id} announcement={a} onOpen={() => onOpen(a)} />
        ))}</div>
      </div>
    </div>
  );
}
