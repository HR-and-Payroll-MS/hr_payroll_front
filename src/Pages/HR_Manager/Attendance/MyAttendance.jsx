import React, { useEffect, useState } from "react";
import SummaryCard from "../../../Components/SummaryCard";
import { BarChart, Heatmap } from "../../../Components/Graphs";
export default function  MyAttendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dataz={ summary: [    
    { Title: "Total Days", and:"days",color:"bg-indigo-500",logo:"Calendar", data: 1232 },
    { Title: "Present", and:"days",color:"bg-amber-500",logo:"Calendar", data: 4 },
    { Title: "Absent", and:"days",color:"bg-yellow-500",logo:"Calendar", data: 2 },
    { Title: "Late", and:"days",color:"bg-green-500",logo:"Calendar", data: 1 },
    { Title: "Leave", and:"days",color:"bg-blue-500",logo:"Calendar", data: 3 }],
    activity: [
      { day: "2025-11-01", value: 1 },
      { day: "2025-11-02", value: 0 },
      { day: "2025-11-03", value: 1 },
      { day: "2025-11-04", value: 2 },
      { day: "2025-11-05", value: 3 },
      { day: "2025-11-06", value: 1 },
      { day: "2025-11-07", value: 1 },
      { day: "2025-11-08", value: 1 },
      { day: "2025-11-09", value: 0 },
    ],
    trend: [
      { month: "Jan", present: 22, absent: 2, leave: 1 },
      { month: "Feb", present: 20, absent: 4, leave: 2 },
      { month: "Mar", present: 24, absent: 1, leave: 0 },
    ],
  };

useEffect(() => {
  (async () => {
    setLoading(true);
    try {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(dataz), 300);
      });

      setData(result);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
    } finally {
      setLoading(false);
    }
  })();
}, []);


  if (loading || !data) return <div className="p-6">Loading your attendance...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Attendance</h1>
          <p className="text-sm text-slate-500">Your attendance overview and statistics</p>
        </div>
      </div>
            <SummaryCard data={data.summary}/>
    <div className="flex gap-2.5">
    {/* Trend Chart */}
        <div className="bg-slate-100  flex-1 rounded-lg shadow p-4">
            <h2 className="font-semibold mb-2">Monthly Attendance Trend</h2>
            <p className="text-xs text-slate-500 mb-3">
            Track your attendance stats across months.
            </p>
            <div className="">
            {/* <AttendanceTrendChart data={data.trend} /> */}
            <BarChart indexBy={"month"} keys={["present","absent","leave"]} data={data.trend} />

            </div>
        </div>
        
      <div className="rounded-lg flex-1 flex flex-col justify-center  bg-yellow-100 shadow p-4">
        <h2 className="font-semibold mb-2">Attendance Calendar</h2>
        <p className="text-xs text-slate-500 mb-3">
          Each day’s color indicates your presence level — darker = more consistent presence.
        </p>
        <div className="h-2/5">
          <Heatmap lightColors={["#ef4444","#22c55e","#f59e0b","#3b82f6",]} data={data.activity}/>
        </div>
            <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500"></div>
                    <span className="text-xs">0.Absent</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400"></div>
                    <span className="text-xs">2.Late</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500"></div>
                    <span className="text-xs">3.Permission</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500"></div>
                    <span className="text-xs">1.Present</span>
                </div>
            </div>

      </div>

     </div>
    </div>
  );
}
