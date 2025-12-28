import React, { useEffect, useState } from "react";
import SummaryCard from "../../../Components/SummaryCard";
import { AttendanceNivoPie, BarChart, Heatmap } from "../../../Components/Graphs";
import useAuth from "../../../Context/AuthContext";
import { getLocalData } from "../../../Hooks/useLocalStorage";
import { Atom } from "react-loading-indicators";
import MyAttendanceSkeleton from "../../../animations/Skeleton/MyAttendanceSkeleton";

export default function MyAttendance() {
  const { axiosPrivate } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);



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
    // return <div className="flex flex-col justify-center items-center h-full"><Atom color="#32cd32" size="medium" text="" textColor="" />Loading your attendance...</div>;
   return <MyAttendanceSkeleton /> 
  }

  return (
    <div className="p-6 space-y-6 h-full hover-bar overflow-y-auto">
      <div>
        <h1 className="text-2xl dark:text-slate-200 text-shadow-xs font-bold">My Attendance</h1>
        <p className="text-sm text-slate-500">
          Your attendance overview and statistics
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <SummaryCard data={data.summary} />

      <div className="flex gap-3">
        {/* BAR CHART */}
        <div className=" dark:bg-slate-800 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 flex-1 rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2 dark:text-slate-300">Monthly Attendance Trend</h2>
          {/* <BarChart
            indexBy="month"
            keys={["present", "absent", "Permission"]}
            data={data.trend}
          /> */}
          <AttendanceNivoPie data={data.summary} />

        </div>

        {/* HEATMAP */}
        <div className=" flex-1 rounded-lg dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 shadow p-4">
          <h2 className="font-semibold dark:text-slate-300 mb-2">Attendance Calendar</h2>

          <Heatmap
            data={data.activity}
            lightColors={["#ef4444", "#22c55e", "#f59e0b", "#3b82f6"]}
          />
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-2 h-2 ${color}`} />
      <span>{label}</span>
    </div>
  );
}
