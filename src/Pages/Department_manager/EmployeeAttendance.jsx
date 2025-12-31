import React, { useEffect ,useState} from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../../Components/Header';
import { AttendanceStatus } from '../../Components/Level2Hearder';
import Table from '../../Components/Table';
import { useTable } from '../../Context/useTable';
import EmployeeDirectorySkeleton from '../../animations/Skeleton/EmployeeDirectorySkeleton';
function EmployeeAttendance() {
useEffect(()=>{
});
const navigate = useNavigate();
const structure=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 61]
const ke2=[
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
      ]

const attendanceData = [
  {
    employee: {
      name: "John Doe",
      email: "john.doe@example.com",
      pic: ""
    },
    attendance:{
    date: "2025-11-23",
    clockIn: "08:59 AM",
    clockInLocation: "HQ Office - Main Gate",
    clockOut: "05:02 PM",
    clockOutLocation: "HQ Office - Side Exit",
    workSchedules: "9:00 AM - 5:00 PM",
    paidTime: "8h 03m",
    notes: "On time",}
  },
  {
    employee: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      pic: ""
    },
    
    attendance:{date: "2025-11-23",
    clockIn: "09:17 AM",
    clockInLocation: "Remote - Addis Ababa",
    clockOut: "06:00 PM",
    clockOutLocation: "Remote - Addis Ababa",
    workSchedules: "9:00 AM - 5:00 PM",
    paidTime: "7h 43m",
    notes: "Late arrival explained"}
  },
  {
    employee: {
      name: "Daniel Mekonnen",
      email: "daniel.mekonnen@example.com",
      pic: ""
    },
    attendance:{date: "2025-11-23",
    clockIn: "07:55 AM",
    clockInLocation: "Warehouse Entry Point 2",
    clockOut: "04:10 PM",
    clockOutLocation: "Warehouse Exit Point 1",
    workSchedules: "8:00 AM - 4:00 PM",
    paidTime: "8h 15m",
    notes: "Overtime 15 minutes"}
  }
];
const {data,isLoading, refresh} = useTable("DepartmentAttendance",`${2}`)
const [filters, setFilters] = useState({});   
const title=[
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
      ]

if(isLoading && (!data||data.length === 0)) return <EmployeeDirectorySkeleton/>
    return (
    <div className='p-4 flex flex-col  overflow-hidden h-full'>
        <Header Title={"Employee Attendance"} subTitle={"view all employee's Attendance and click to view detail "}/>
        <AttendanceStatus  />
        <Table clickable={false} Data={data} title={title} Structure={structure} ke={ke2} totPage={10} />
    </div>
  )
}

export default EmployeeAttendance