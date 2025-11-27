import React, { useState } from "react";

/*
  Simple create announcement trigger + small form modal
  - Minimal UI: title, body, priority, audience
  - Emits onCreate(newAnnouncement) and closes
  - Replace local state submission with API POST when ready
*/

export default function CreateAnnouncement({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [audience, setAudience] = useState("All employees");

  function submit() {
    if (!title.trim()) return alert("Add a title");
    const payload = { title, body, priority, audience };
    // TODO: replace with API call:
    // fetch('/api/announcements', { method: 'POST', body: JSON.stringify(payload) })
    onCreate(payload);
    setTitle(""); setBody(""); setPriority("Normal"); setAudience("All employees"); setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        + New Announcement
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="bg-white w-full max-w-2xl rounded shadow-lg p-6 z-50">
        <h2 className="text-lg font-semibold mb-3">Create Announcement</h2>

        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <textarea className="w-full border rounded px-3 py-2 h-32" placeholder="Message" value={body} onChange={(e)=>setBody(e.target.value)} />
          <div className="flex gap-3">
            <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="border rounded px-3 py-2">
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
            <input className="flex-1 border rounded px-3 py-2" value={audience} onChange={(e)=>setAudience(e.target.value)} />
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={()=>setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={submit} className="px-4 py-2 bg-indigo-600 text-white rounded">Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}
