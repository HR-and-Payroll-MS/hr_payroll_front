import React from "react";

export default function AttendanceSummaryCards({ data }) {
  const cards = [
    { label: "Total Days", value: data.totalDays },
    { label: "Present", value: data.present },
    { label: "Absent", value: data.absent },
    { label: "Late", value: data.late },
    { label: "Leave", value: data.leave },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white border rounded p-4 text-center shadow-sm"
        >
          <div className="text-sm text-slate-500">{c.label}</div>
          <div className="text-xl font-semibold mt-1">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
