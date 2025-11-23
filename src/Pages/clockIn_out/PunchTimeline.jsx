import React from "react";

export default function PunchTimeline({ loading, punches }) {
  if (loading) return <div className="text-gray-500">Loading...</div>;

  if (punches.length === 0)
    return <div className="text-gray-500">No punches recorded today.</div>;

  return (
    <ol className="border-l border-gray-200 pl-4 space-y-3">
      {punches.map((p, idx) => (
        <li key={idx}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <div>
              <div className="text-sm font-medium">
                {p.type.replace("_", " ").toUpperCase()}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(p.time).toLocaleTimeString()} • {p.location || "Unknown"}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
