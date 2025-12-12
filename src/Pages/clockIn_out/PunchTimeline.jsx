import React from "react";

export default function PunchTimeline({ loading, punches }) {
  if (loading)
    return <div className="text-gray-500 italic">Loading today's punches...</div>;
  if (!punches.length)
    return <div className="text-gray-500 italic">No punches recorded today.</div>;

  return (
    <ol className="border-l-2 border-gray-200 pl-6 space-y-4">
      {punches.map((p, idx) => (
        <li key={idx} className="relative">
          <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-indigo-500 border-2 border-white" />
          <div className="ml-2">
            <div className="text-sm font-semibold text-gray-700">
              {p.type.replace("_", " ").toUpperCase()}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(p.time).toLocaleTimeString()} • {p.location || "Unknown"}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
