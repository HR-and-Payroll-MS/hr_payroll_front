import React, { useEffect, useState } from "react";
import SummaryCard from "../../../Components/SummaryCard";
import { AttendanceNivoPie, BarChart, Heatmap } from "../../../Components/Graphs";
import useAuth from "../../../Context/AuthContext";
import { getLocalData } from "../../../Hooks/useLocalStorage";
import { Atom } from "react-loading-indicators";

export default function MyAttendance() {
  const { axiosPrivate } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

//   const mockedResponse = {
//   "count": 15,
//   "next": null,
//   "previous": null,
//   "results": [
//     {
//       "id": 201,
//       "employee": 1,
//       "date": "2025-12-15",
//       "clock_in": "2025-12-15T08:30:00+03:00",
//       "clock_in_location": "Office",
//       "clock_out": "2025-12-15T17:30:00+03:00",
//       "clock_out_location": "Office",
//       "deficit": "+00:00:00",
//       "logged_time": "09:00:00",
//       "notes": "",
//       "overtime": "+01:00:00",
//       "overtime_seconds": 3600,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 202,
//       "employee": 1,
//       "date": "2025-12-14",
//       "clock_in": "2025-12-14T09:10:00+03:00",
//       "clock_in_location": "Remote",
//       "clock_out": "2025-12-14T18:00:00+03:00",
//       "clock_out_location": "Remote",
//       "deficit": "+00:10:00",
//       "logged_time": "08:50:00",
//       "notes": "Late arrival",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "LATE",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 203,
//       "employee": 1,
//       "date": "2025-12-13",
//       "clock_in": null,
//       "clock_in_location": null,
//       "clock_out": null,
//       "clock_out_location": null,
//       "deficit": "+08:00:00",
//       "logged_time": "00:00:00",
//       "notes": "Uninformed absence",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "00:00:00",
//       "status": "ABSENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 204,
//       "employee": 1,
//       "date": "2025-12-12",
//       "clock_in": "2025-12-12T08:45:00+03:00",
//       "clock_in_location": "HQ",
//       "clock_out": "2025-12-12T17:15:00+03:00",
//       "clock_out_location": "HQ",
//       "deficit": "+00:30:00",
//       "logged_time": "08:30:00",
//       "notes": "",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 205,
//       "employee": 1,
//       "date": "2025-12-11",
//       "clock_in": "2025-12-11T08:20:00+03:00",
//       "clock_in_location": "Office",
//       "clock_out": "2025-12-11T18:10:00+03:00",
//       "clock_out_location": "Office",
//       "deficit": "+00:00:00",
//       "logged_time": "09:50:00",
//       "notes": "Extra workload",
//       "overtime": "+01:50:00",
//       "overtime_seconds": 6600,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },

//     {
//       "id": 206,
//       "employee": 1,
//       "date": "2025-12-10",
//       "clock_in": null,
//       "clock_in_location": null,
//       "clock_out": null,
//       "clock_out_location": null,
//       "deficit": "+08:00:00",
//       "logged_time": "00:00:00",
//       "notes": "Sick Permission",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "Permission",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 207,
//       "employee": 1,
//       "date": "2025-12-09",
//       "clock_in": "2025-12-09T08:35:00+03:00",
//       "clock_in_location": "Remote",
//       "clock_out": "2025-12-09T17:30:00+03:00",
//       "clock_out_location": "Remote",
//       "deficit": "+00:05:00",
//       "logged_time": "08:55:00",
//       "notes": "",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 208,
//       "employee": 1,
//       "date": "2025-12-08",
//       "clock_in": "2025-12-08T09:05:00+03:00",
//       "clock_in_location": "Office",
//       "clock_out": "2025-12-08T17:45:00+03:00",
//       "clock_out_location": "Office",
//       "deficit": "+00:05:00",
//       "logged_time": "08:40:00",
//       "notes": "Traffic delay",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "LATE",
//       "work_schedule_hours": 8
//     },

//     {
//       "id": 209,
//       "employee": 1,
//       "date": "2025-12-07",
//       "clock_in": null,
//       "clock_in_location": null,
//       "clock_out": null,
//       "clock_out_location": null,
//       "deficit": "+08:00:00",
//       "logged_time": "00:00:00",
//       "notes": "Weekend",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "00:00:00",
//       "status": "ABSENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 210,
//       "employee": 1,
//       "date": "2025-12-06",
//       "clock_in": null,
//       "clock_in_location": null,
//       "clock_out": null,
//       "clock_out_location": null,
//       "deficit": "+08:00:00",
//       "logged_time": "00:00:00",
//       "notes": "Weekend",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "00:00:00",
//       "status": "ABSENT",
//       "work_schedule_hours": 8
//     },

//     {
//       "id": 211,
//       "employee": 1,
//       "date": "2025-12-05",
//       "clock_in": "2025-12-05T08:25:00+03:00",
//       "clock_in_location": "Office",
//       "clock_out": "2025-12-05T17:20:00+03:00",
//       "clock_out_location": "Office",
//       "deficit": "+00:00:00",
//       "logged_time": "08:55:00",
//       "notes": "",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 212,
//       "employee": 1,
//       "date": "2025-12-04",
//       "clock_in": "2025-12-04T08:30:00+03:00",
//       "clock_in_location": "HQ",
//       "clock_out": "2025-12-04T18:00:00+03:00",
//       "clock_out_location": "HQ",
//       "deficit": "+00:00:00",
//       "logged_time": "09:30:00",
//       "notes": "Project deadline",
//       "overtime": "+01:30:00",
//       "overtime_seconds": 5400,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 213,
//       "employee": 1,
//       "date": "2025-12-03",
//       "clock_in": "2025-12-03T08:40:00+03:00",
//       "clock_in_location": "Remote",
//       "clock_out": "2025-12-03T17:10:00+03:00",
//       "clock_out_location": "Remote",
//       "deficit": "+00:20:00",
//       "logged_time": "08:30:00",
//       "notes": "",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 214,
//       "employee": 1,
//       "date": "2025-12-02",
//       "clock_in": "2025-12-02T09:15:00+03:00",
//       "clock_in_location": "Office",
//       "clock_out": "2025-12-02T17:30:00+03:00",
//       "clock_out_location": "Office",
//       "deficit": "+00:15:00",
//       "logged_time": "08:15:00",
//       "notes": "Late due to meeting",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "LATE",
//       "work_schedule_hours": 8
//     },
//     {
//       "id": 215,
//       "employee": 1,
//       "date": "2025-12-01",
//       "clock_in": "2025-12-01T08:30:00+03:00",
//       "clock_in_location": "Office",
//       "clock_out": "2025-12-01T17:30:00+03:00",
//       "clock_out_location": "Office",
//       "deficit": "+00:00:00",
//       "logged_time": "09:00:00",
//       "notes": "",
//       "overtime": "00:00:00",
//       "overtime_seconds": 0,
//       "paid_time": "08:00:00",
//       "status": "PRESENT",
//       "work_schedule_hours": 8
//     }
//   ]
// }


  const transformAttendanceData = (apiResponse) => {
    const results = apiResponse?.results || [];

    let present = 0;
    let absent = 0;
    let late = 0;
    let Permission = 0;

    const activity = [];
    const trendMap = {};

    results.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", {
        month: "short",
      });

      if (!trendMap[month]) {
        trendMap[month] = { month, present: 0, absent: 0, Permission: 0 };
      }

      switch (item.status) {
        case "PRESENT":
          present++;
          trendMap[month].present++;
          activity.push({ day: item.date, value: 1 });
          break;

        case "ABSENT":
          absent++;
          trendMap[month].absent++;
          activity.push({ day: item.date, value: 0 });
          break;

        case "LATE":
          late++;
          activity.push({ day: item.date, value: 2 });
          break;

        case "PERMITTED":
          Permission++;
          trendMap[month].Permission++;
          activity.push({ day: item.date, value: 3 });
          break;

        default:
          activity.push({ day: item.date, value: 0 });
      }
    });

    return {
      summary: [
        {
          Title: "Total Days",
          and: "days",
          color: "bg-indigo-500",
          logo: "Calendar",
          data: results.length,
        },
        {
          Title: "Present",
          and: "days",
          color: "bg-green-500",
          logo: "Calendar",
          data: present,
        },
        {
          Title: "Absent",
          and: "days",
          color: "bg-red-500",
          logo: "Calendar",
          data: absent,
        },
        {
          Title: "Late",
          and: "days",
          color: "bg-amber-500",
          logo: "Calendar",
          data: late,
        },
        {
          Title: "Permission",
          and: "days",
          color: "bg-blue-500",
          logo: "Calendar",
          data: Permission,
        },
      ],
      activity,
      trend: Object.values(trendMap),
    };
  };

  /* =========================================================
     EFFECT (AXIOS COMMENTED – READY FOR PROD)
  ========================================================= */
  useEffect(() => {
    setLoading(true);

    // 🔹 Mocked (identical to backend)
    // const transformed = transformAttendanceData(mockedResponse);
    // setData(transformed);
    // setLoading(false);

    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `/employees/${getLocalData("user_id")}/attendances/`
        );
        console.log("Attendance API response:", response.data);
        const transformed = transformAttendanceData(response.data);
        setData(transformed);
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  if (loading || !data) {
    return <div className="flex flex-col justify-center items-center h-full"><Atom color="#32cd32" size="medium" text="" textColor="" />Loading your attendance...</div>;
  }

  return (
    <div className="p-6 space-y-6 h-full hover-bar overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold">My Attendance</h1>
        <p className="text-sm text-slate-500">
          Your attendance overview and statistics
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <SummaryCard data={data.summary} />

      <div className="flex gap-3">
        {/* BAR CHART */}
        <div className=" dark:bg-slate-800 flex-1 rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Monthly Attendance Trend</h2>
          {/* <BarChart
            indexBy="month"
            keys={["present", "absent", "Permission"]}
            data={data.trend}
          /> */}
          <AttendanceNivoPie data={data.summary} />

        </div>

        {/* HEATMAP */}
        <div className=" flex-1 rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Attendance Calendar</h2>

          <Heatmap
            data={data.activity}
            lightColors={["#ef4444", "#22c55e", "#f59e0b", "#3b82f6"]}
          />

          {/* <div className="flex gap-3 mt-3 text-xs">
            <Legend color="bg-red-500" label="0 Absent" />
            <Legend color="bg-green-500" label="1 Present" />
            <Legend color="bg-orange-400" label="2 Late" />
            <Legend color="bg-blue-500" label="3 Leave" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LEGEND COMPONENT
========================================================= */
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 ${color}`} />
      <span>{label}</span>
    </div>
  );
}
