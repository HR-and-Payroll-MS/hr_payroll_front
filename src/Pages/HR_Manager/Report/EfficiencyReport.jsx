import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table";
import Header from "../../../Components/Header";
import { AttendanceStatus } from "../../../Components/Level2Hearder";
import AttendanceCorrectionPage from "../Attendance/AttendanceCorrectionPage";

const TABLE_MODES = {
  DEPARTMENT: "DEPARTMENT",
  EMPLOYEE: "EMPLOYEE"
};

/* ---------------- MOCK DATA ---------------- */

const departmentAttendanceMock = [
  {
    department_id: 1,
    department_name: "Finance",
    present: 18,
    total: 2,
  },
  {
    department_id: 2,
    department_name: "HR",
    present: 10,
    total: 10,
  },
  {
    department_id: 3,
    department_name: "IT",
    present: 22,
    total: 22,
  }
];


const employeeAttendanceMock = 
   [
  {
    employee: {
      name: "John Doe",
      email: "john.doe@example.com",
      pic: ""
    },
    attendance:{
    date: "Active",
    clockIn: "99%",}
  },
  {
    employee: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      pic: ""
    },
    
    attendance:{date: "Active",
    clockIn: "99%",}
  },
  {
    employee: {
      name: "Daniel Mekonnen",
      email: "daniel.mekonnen@example.com",
      pic: ""
    },
    attendance:{date: "Active",
    clockIn: "99%",}
  }
];
/* ---------------- COMPONENT ---------------- */

function EfficiencyReport() {
  const [tableMode, setTableMode] = useState(TABLE_MODES.DEPARTMENT);
  const [tableConfig, setTableConfig] = useState({});
  const [history, setHistory] = useState([]);
  const [dep,setdep] = useState();

  /* ---------- INITIAL: DEPARTMENT TABLE ---------- */

  useEffect(() => {
    setTableConfig({
        clickable: true,
        Data: departmentAttendanceMock,
        title: ["DEPARTMENT", "Evaluated", "Total Value(%)"],
        structure: [1, 1, 1, ],
        ke: [
          ["department_name"],
          ["present"],
          ["total"],
        ]
    });
  }, []);

  /* ---------- ROW CLICK HANDLER ---------- */

  const onRowClick = (row) => {
    setdep(row[0]);
    if (tableMode === TABLE_MODES.DEPARTMENT) {
      // Save current table config for BACK
      setHistory((prev) => [...prev, tableConfig]);

      // Switch to employee table
      setTableMode(TABLE_MODES.EMPLOYEE);

      setTableConfig({
        clickable: false,
        Data: employeeAttendanceMock||[],
        title: ['EMPLOYEE','STATUS','EFFICIENCY',"ACTION"],
        structure:[3,1,1,61],
        ke: [
              [ "employee_pic", "employee_name","employee_email",], 
              ["attendance_date"], 
              ["attendance_clockIn"], 
              ["view"], 
            ]
      });
    }
  };

  /* ---------- BACK ---------- */

  const handleBack = () => {
    const prevConfig = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setTableConfig(prevConfig);
    setTableMode(TABLE_MODES.DEPARTMENT);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="p-4 flex flex-col overflow-hidden h-full"> 
    {tableMode !== TABLE_MODES.DEPARTMENT && (
        <div className="flex gap-4 items-center"><button onClick={handleBack} className="mb-3 px-4 text-slate-100 py-2 cursor-pointer bg-slate-800 rounded w-fit" > ← Back </button><p className="text-center font-semibold text-lg p-2">{dep} Department</p></div>
      )}
      {tableMode === TABLE_MODES.DEPARTMENT && (<Header Title="Department Attendance" subTitle="View department attendance and drill down into employees" />
      )}
      <AttendanceStatus onFiltersChange={() => {}} />

      <Table components={AttendanceCorrectionPage} clickable={tableConfig.clickable} Data={tableConfig.Data} title={tableConfig.title} Structure={tableConfig.structure} ke={tableConfig.ke} onRowClick={onRowClick} totPage={10} />
    </div>
  );
}

export default EfficiencyReport;



