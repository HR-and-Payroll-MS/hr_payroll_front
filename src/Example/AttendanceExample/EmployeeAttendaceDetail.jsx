import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeAttendance, fetchAttendanceSummary } from "../api";
import AttendanceSummaryCards from "./AttendanceSummaryCards";
import AttendanceTable from "./AttendanceTable";
import AttendanceFilterBar from "./AttendanceFilterBar";
import { AttendanceFilterBar as Filters } from "../../Components/Level2Hearder";
import Table from "../../Components/Table";
import useAuth from "../../Context/AuthContext";


export default function EmployeeAttendanceDetail() {

  const data=[
  {
    "employee": 17,
    "date": "2025-01-01",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 8,
    "paid_time": 0,
    "notes": "Holiday"
  },
  {
    "employee": 17,
    "date": "2025-01-02",
    "clock_in": "09:02",
    "clock_in_location": "Office A",
    "clock_out": "17:11",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.15,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-03",
    "clock_in": "08:55",
    "clock_in_location": "Office A",
    "clock_out": "17:03",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.13,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-04",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  }, {
    "employee": 17,
    "date": "2025-01-05",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },
  {
    "employee": 17,
    "date": "2025-01-06",
    "clock_in": "09:04",
    "clock_in_location": "Office A",
    "clock_out": "17:00",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 7.93,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-07",
    "clock_in": "08:51",
    "clock_in_location": "Office A",
    "clock_out": "17:10",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.32,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-08",
    "clock_in": "09:00",
    "clock_in_location": "Office A",
    "clock_out": "17:05",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.08,
    "notes": ""
  },  {
    "employee": 17,
    "date": "2025-01-09",
    "clock_in": "09:11",
    "clock_in_location": "Office A",
    "clock_out": "17:00",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 7.82,
    "notes": "Late arrival"
  },
  {
    "employee": 17,
    "date": "2025-01-10",
    "clock_in": "08:57",
    "clock_in_location": "Office A",
    "clock_out": "17:02",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.08,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-11",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },
  {
    "employee": 17,
    "date": "2025-01-12",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },  {
    "employee": 17,
    "date": "2025-01-13",
    "clock_in": "09:03",
    "clock_in_location": "Office A",
    "clock_out": "17:04",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.02,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-14",
    "clock_in": "08:59",
    "clock_in_location": "Office A",
    "clock_out": "17:06",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.12,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-15",
    "clock_in": "09:05",
    "clock_in_location": "Office A",
    "clock_out": "16:58",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 7.88,
    "notes": "Short exit for personal errand"
  },
  {
    "employee": 17,
    "date": "2025-01-16",
    "clock_in": "08:50",
    "clock_in_location": "Office A",
    "clock_out": "17:12",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.37,
    "notes": ""
  },  {
    "employee": 17,
    "date": "2025-01-17",
    "clock_in": "09:00",
    "clock_in_location": "Office A",
    "clock_out": "17:03",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.05,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-18",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },
  {
    "employee": 17,
    "date": "2025-01-19",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },
  {
    "employee": 17,
    "date": "2025-01-20",
    "clock_in": "09:10",
    "clock_in_location": "Office A",
    "clock_out": "17:01",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 7.85,
    "notes": "Late arrival"
  },  {
    "employee": 17,
    "date": "2025-01-21",
    "clock_in": "08:53",
    "clock_in_location": "Office A",
    "clock_out": "17:07",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.23,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-22",
    "clock_in": "09:01",
    "clock_in_location": "Office A",
    "clock_out": "17:04",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.05,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-23",
    "clock_in": "09:08",
    "clock_in_location": "Office A",
    "clock_out": "17:02",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 7.9,
    "notes": "Late"
  },
  {
    "employee": 17,
    "date": "2025-01-24",
    "clock_in": "08:56",
    "clock_in_location": "Office A",
    "clock_out": "17:11",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.25,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-25",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },  {
    "employee": 17,
    "date": "2025-01-26",
    "clock_in": null,
    "clock_in_location": "",
    "clock_out": null,
    "clock_out_location": "",
    "work_schedule_hours": 0,
    "paid_time": 0,
    "notes": "Weekend"
  },
  {
    "employee": 17,
    "date": "2025-01-27",
    "clock_in": "08:52",
    "clock_in_location": "Office A",
    "clock_out": "17:06",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.23,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-28",
    "clock_in": "09:00",
    "clock_in_location": "Office A",
    "clock_out": "17:03",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.05,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-29",
    "clock_in": "08:58",
    "clock_in_location": "Office A",
    "clock_out": "17:09",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 8.18,
    "notes": ""
  },
  {
    "employee": 17,
    "date": "2025-01-30",
    "clock_in": "09:06",
    "clock_in_location": "Office A",
    "clock_out": "17:00",
    "clock_out_location": "Office A",
    "work_schedule_hours": 8,
    "paid_time": 7.9,
    "notes": "Late"
  }
]
  
  const { id } = useParams(); // /attendance/:id
  const navigate = useNavigate();
  const structure=[1,1,1,1,1,1,1,1];

  

const ke2=[["date"], ["clock_in"], ["clock_in_Location"], ["clock_out"], ["status"],["clock_out_location"], ["work_schedule_hours"], ["paid_time"], ["notes"]]
const title=['DATE','CLOCK IN','CLOCK IN LOCATION','CLOCK OUT','STATUS','CLOCK OUT LOCATION','WORK SCHEDULES','PAID TIME','NOTES']
  const {axiosPrivate} = useAuth();
  const [employee, setEmployee] = useState(null);
  const [summary, setSummary] = useState("null");
  const [attendance, setAttendance] = useState([]);
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    status: "All",
  });
  const [loading, setLoading] = useState(false);


  // Fetch summary + attendance data
useEffect(() => {
  if (!id) return;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get(`attendances/${id}`);
      const resuser = await axiosPrivate.get(`employees/${id}`);

      console.log("API RESPONSE:", res.data);

      // BACKEND RESPONSE MUST HAVE:
      // res.data.employee
      // res.data.summary
      // res.data.attendance

      setEmployee(resuser.data);
      // setSummary(res.data.summary);
      setAttendance([res.data]);

    } catch (err) {
      console.error("Failed to load attendance", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();

}, [id, filters]);
  if (!employee) return <div className="p-6">Loading employee...</div>;
  return (
    <div className="p-6 flex flex-col  space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline" >
          ← Back
        </button>
        <img src={employee.photo || "/pic/avatar.jpg"} alt={employee.photo} className="h-16 w-16 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-bold">{employee.full_name}</h1>
          <p className="text-sm text-slate-500">
            {employee.job_title} • {employee.department}
          </p>
        </div>
      </div>
      {summary && <AttendanceSummaryCards data={summary} />}
      <Filters filters={filters} setFilters={setFilters}/>
      
      {/* Table */}
      {/* <AttendanceTable data={attendance} loading={loading} /> */}
      <Table  Data={attendance}  title={title} Structure={structure} ke={ke2} onRowClick={(e)=>console.log(e)} totPage={10}/>
   
    </div>
  );
}