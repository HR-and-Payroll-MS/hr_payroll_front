import React, { useEffect, useState, useRef } from "react";
import Table from "../../../Components/Table";
import Header from "../../../Components/Header";
import { AttendanceStatus } from "../../../Components/Level2Hearder";
import AttendanceCorrectionPage from "./AttendanceCorrectionPage";
import useAuth from "../../../Context/AuthContext";
import { Atom } from "react-loading-indicators";

const TABLE_MODES = {
  DEPARTMENT: "DEPARTMENT",
  EMPLOYEE: "EMPLOYEE",
};



/* -------- MOCK EMPLOYEE DATA (for drill-down only) -------- */
const employeeAttendanceMock = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      email: "john.doe@example.com",
      pic: "",
    },
    attendance: {
      date: "2025-11-23",
      clockIn: "08:59 AM",
      clockInLocation: "HQ Office - Main Gate",
      clockOut: "05:02 PM",
      clockOutLocation: "HQ Office - Side Exit",
      workSchedules: "9:00 AM - 5:00 PM",
      paidTime: "8h 03m",
      notes: "On time",
    },
  },
];

function EmployeeAttendanceList() {
  const { axiosPrivate } = useAuth();

  const [tableMode, setTableMode] = useState(TABLE_MODES.DEPARTMENT);
  const [tableConfig, setTableConfig] = useState(null);
  const [history, setHistory] = useState([]);
  const [dep, setDep] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔒 prevents double-fetch (React StrictMode safe)
  const fetchedRef = useRef(false);

  /* ================= FETCH DEPARTMENTS ================= */

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function loadDepartments() {
      try {
        setLoading(true);

        const res = await axiosPrivate.get("/attendances/departments/");
        const departmentData = Array.isArray(res.data) ? res.data : [];
        console.log(departmentData)
        setTableConfig({
          clickable: true,
          Data: departmentData,
          title: ["DEPARTMENT", "PRESENT", "ABSENT", "LATE", "OVERTIME"],
          structure: [1, 1, 1, 1, 1],
          ke: [
            ["department_name"],
            ["present"],
            ["absent"],
            ["late"],
            ["overtime"],
            ["department_id"]
          ],
        });
      } catch (err) {
        console.error("Department fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDepartments();
  }, [axiosPrivate]);

  /* ================= ROW CLICK ================= */

const onRowClick = async (rowIndex,index,data) => {
  // console.log(rowIndex , "rowIndex")
  // console.log(index , "index")
  // console.log(data , "data")
  setDep(data[index].department_name)
  const id=data[index].department_id
  setLoading(true)
  setHistory((prev) => [...prev, tableConfig]);
  setTableMode(TABLE_MODES.EMPLOYEE);

  try {
    // 🔥 FETCH EMPLOYEES BY DEPARTMENT
    const res = await axiosPrivate.get(
      `/attendances/departments/${id}/`
    );

    const employeeData = res.data || [];
    console.log(employeeData)

    setTableConfig({
      clickable: false,
      Data: employeeData,
      title: [
        "EMPLOYEE",
        "DATE",
        "CLOCK IN",
        "CLOCK IN LOCATION",
        "CLOCK OUT",
        "STATUS",
        "CLOCK OUT LOCATION",
        "WORK SCHEDULES",
        "PAID TIME",
        "NOTES",
        "ACTION",
      ],
      structure: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 61],
      ke: [
        ["employee_name"],
        ["date"],
        ["clock_in"],
        ["clock_in_location"],
        ["clock_out"],
        ["status"],
        ["clock_out_location"],
        ["work_schedule_hours"],
        ["paid_time"],
        ["notes"],
        ["view"],
        ["id"],
      ],
    });
  } catch (err) {
    console.error("Failed to load employees:", err);

    // fallback: empty table instead of crash
    setTableConfig((prev) => ({
      ...prev,
      Data: [],
    }));
  }
  finally{
    setLoading(false);
  }
};

  /* ================= BACK ================= */

  const handleBack = () => {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setTableConfig(prev);
    setTableMode(TABLE_MODES.DEPARTMENT);
  };

  /* ================= RENDER ================= */

  if (!tableConfig) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <Atom color="#32cd32" size="medium" text="" textColor="" />
        Loading departments...
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col overflow-hidden h-full">
      {tableMode !== TABLE_MODES.DEPARTMENT && (
        <div className="flex gap-4 items-center mb-2">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-slate-800 text-white rounded"
          >
            ← Back
          </button>
          <p className="font-semibold text-lg">{dep} Department</p>
        </div>
      )}

      {tableMode === TABLE_MODES.DEPARTMENT && (
        <Header
          Title="Department Attendance"
          subTitle="View department attendance and drill down into employees"
        />
      )}

      <AttendanceStatus onFiltersChange={() => {}} />

      <Table
        components={AttendanceCorrectionPage}
        clickable={tableConfig.clickable}
        Data={tableConfig.Data}
        title={tableConfig.title}
        Structure={tableConfig.structure}
        ke={tableConfig.ke}
        onRowClick={onRowClick}
        totPage={10}
        loading={loading}
      />
    </div>
  );
}

export default EmployeeAttendanceList;











































// ------------------------------------------------ completely working code for backup ----------------------------------------------------------
// import React, { useEffect ,useState} from 'react'
// import Table from '../../../Components/Table'
// import Header from '../../../Components/Header'
// import {AttendanceStatus} from '../../../Components/Level2Hearder'
// import { useNavigate } from "react-router-dom";
// function EmployeeAttendanceList() {
// useEffect(()=>{
// });
// const navigate = useNavigate();
// const onRowClick=(id)=>{
//     navigate(`/hr_dashboard/Employee_Attendance/${id}`, {state: id})
//         console.log(id)
// }
// const structure=[3,1,1,1,1,1,1,1,1,1,61];
// const ke2=[
//   [ "employee_pic", "employee_name","employee_email",], 
//   ["attendance_date"], 
//   ["attendance_clockIn"], 
//   ["attendance_clockInLocation"], 
//   ["attendance_clockOut"], 
//   ["attendance_status"],
//   ["attendance_clockOutLocation"], 
//   ["attendance_workSchedules"], 
//   ["attendance_paidTime"], 
//   ["attendance_notes"], 
//   ["view"], 
// ]

// const attendanceData = [
//   {
//     employee: {
//       name: "John Doe",
//       email: "john.doe@example.com",
//       pic: ""
//     },
//     attendance:{
//     date: "2025-11-23",
//     clockIn: "08:59 AM",
//     clockInLocation: "HQ Office - Main Gate",
//     clockOut: "05:02 PM",
//     clockOutLocation: "HQ Office - Side Exit",
//     workSchedules: "9:00 AM - 5:00 PM",
//     paidTime: "8h 03m",
//     notes: "On time",}
//   },
//   {
//     employee: {
//       name: "Sarah Johnson",
//       email: "sarah.johnson@example.com",
//       pic: ""
//     },
    
//     attendance:{date: "2025-11-23",
//     clockIn: "09:17 AM",
//     clockInLocation: "Remote - Addis Ababa",
//     clockOut: "06:00 PM",
//     clockOutLocation: "Remote - Addis Ababa",
//     workSchedules: "9:00 AM - 5:00 PM",
//     paidTime: "7h 43m",
//     notes: "Late arrival explained"}
//   },
//   {
//     employee: {
//       name: "Daniel Mekonnen",
//       email: "daniel.mekonnen@example.com",
//       pic: ""
//     },
//     attendance:{date: "2025-11-23",
//     clockIn: "07:55 AM",
//     clockInLocation: "Warehouse Entry Point 2",
//     clockOut: "04:10 PM",
//     clockOutLocation: "Warehouse Exit Point 1",
//     workSchedules: "8:00 AM - 4:00 PM",
//     paidTime: "8h 15m",
//     notes: "Overtime 15 minutes"}
//   }
// ];
// const [filters, setFilters] = useState({});   
//     function updateFilter(obj){
//         const key = Object.keys(obj)[0];
//         const value = obj[key]
//         setFilters(prev =>{
//             if(value == null || value === "" ){
//                 const {[key]:removed, ...rest}=prev;
//                 return rest;
//             }
//             return {...prev,[key]:value};
//         });
//     }  
// const queryString = new URLSearchParams(
//         Object.entries(filters).filter(([k,v]) => v && v !== "")
//       ).toString();
//       const dynamicURL = queryString ? `/employees/?${queryString}` : "/employees/";
//       // console.log("Dynamic URL:", dynamicURL);
// const title=['EMPLOYEE','DATE','CLOCK IN','CLOCK IN LOCATION','CLOCK OUT','STATUS','CLOCK OUT LOCATION','WORK SCHEDULES','PAID TIME','NOTES',"ACTION"]
//     return (
//     <div className='p-4 flex flex-col  overflow-hidden h-full'>
//         <Header Title={"Employee Attendance"} subTitle={"view all employee's Attendance and click to view detail "}/>
//         <AttendanceStatus onFiltersChange={updateFilter} />
//         <Table clickable={false} Data={attendanceData} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} totPage={10} />
        
//         {
//         <Table clickable={false} Data={attendanceData} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} totPage={10} />
//         }
//     </div>
//   )
// }

// export default EmployeeAttendanceList






