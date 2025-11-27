import React from "react";

/*
  AnnouncementDetails - shows full message, attachments, simple read stats
  - onDelete is provided for HR to remove/archive the announcement
  - Replace read tracking with API when ready
*/

export default function AnnouncementDetails({ announcement, onDelete }) {
  const { title, body, priority, audience, createdAt, reads, totalRecipients } = announcement;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="text-xs text-gray-500">Priority: {priority} • To: {audience}</div>
          <div className="text-xs text-gray-400 mt-1">Published: {new Date(createdAt).toLocaleString()}</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-600">{reads} / {totalRecipients} read</div>
          <button onClick={onDelete} className="mt-3 text-sm text-red-600 underline">Archive / Delete</button>
        </div>
      </div>

      <div className="prose max-w-none text-sm">
        <p>{body}</p>
      </div>

      {/* attachments area (static for now). Replace with real list when you have upload API */}
      <div>
        <h4 className="font-medium">Attachments</h4>
        <div className="text-sm text-gray-500">No attachments</div>
      </div>
    </div>
  );
}
