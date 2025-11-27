import React, { useState } from "react";
import AnnouncementCard from "./AnnouncementCard";

/*
  AnnouncementList
  - Simple search + filters (client-side)
  - Expects announcements array, each item is the static shape used above
*/

export default function AnnouncementList({ announcements = [], onOpen }) {
  const [q, setQ] = useState("");
  const [status] = useState("all"); // placeholder for future status filter (draft/published) if needed
  const [priority, setPriority] = useState("all");

  const filtered = announcements.filter(a => {
    if (q && !(a.title + " " + a.body).toLowerCase().includes(q.toLowerCase())) return false;
    if (priority !== "all" && a.priority !== priority) return false;
    // if status logic is added, filter here
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center mb-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title or content..."
          className="flex-1 border rounded px-3 py-2 bg-white"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded px-3 py-2 bg-white">
          <option value="all">All priorities</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="p-6 bg-white rounded border text-gray-600">No announcements found.</div>
        )}

        {filtered.map(a => (
          <AnnouncementCard key={a.id} announcement={a} onOpen={() => onOpen(a)} />
        ))}
      </div>
    </div>
  );
}
