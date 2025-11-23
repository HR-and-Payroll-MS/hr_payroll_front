import React from "react";
import computeTotalHours from "./computeTotalHours";

export default function PunchStats({ punches, lastPunch }) {
  return (
    <div className="mt-4 flex gap-4 text-sm text-gray-700">
      <div className="p-3 bg-slate-50 rounded shadow-sm">
        <div className="text-xs text-gray-400">Total today</div>
        <div className="font-medium">{computeTotalHours(punches)}</div>
      </div>

      <div className="p-3 bg-slate-50 rounded shadow-sm">
        <div className="text-xs text-gray-400">Last location</div>
        <div className="font-medium">
          {lastPunch ? lastPunch.location || "Unknown" : "—"}
        </div>
      </div>
    </div>
  );
}
