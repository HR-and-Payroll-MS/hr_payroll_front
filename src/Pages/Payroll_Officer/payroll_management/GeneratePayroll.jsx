import React, { useState } from 'react'
import SearchDate from '../../../Components/SearchDate'
import { Generatepayroll } from '../../../Components/Level2Hearder'
import Header from '../../../Components/Header'
import Table from '../../../Components/Table'
import { useNavigate } from 'react-router-dom'
import FileDrawer from '../../../Components/FileDrawer'
import OnPayrollGenerate from './OnPayrollGenerate'
import ExportTable from '../../../Components/ExportTable'

function GeneratePayroll() {
  const handledate=(e)=>console.log(e)

  const [isModalOpen,setModalOpen]=useState(false);
  const navigate = useNavigate();
const onRowClick=(id)=>{
    navigate(`/hr_dashboard/Employee_Attendance/${id}`, {state: id})
        console.log(id)
}
const structure=[3,1,1,1,1,1,1,];
const ke2=[
  [ "employee_pic", "employee_name","employee_email",], 
  ["attendance_date"], 
  ["attendance_clockIn"], 
  ["attendance_clockInLocation"], 
  ["attendance_clockOut"], 
  ["attendance_status"],
  ["attendance_clockOutLocation"], 
  ["attendance_workSchedules"], 
  ["attendance_paidTime"], 
  ["attendance_notes"], 
  ["view"], 
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
const [filters, setFilters] = useState({});   
    function updateFilter(obj){
        const key = Object.keys(obj)[0];
        const value = obj[key]
        setFilters(prev =>{
            if(value == null || value === "" ){
                const {[key]:removed, ...rest}=prev;
                return rest;
            }
            return {...prev,[key]:value};
        });
    }  
const queryString = new URLSearchParams(
        Object.entries(filters).filter(([k,v]) => v && v !== "")
      ).toString();
      const dynamicURL = queryString ? `/employees/?${queryString}` : "/employees/";
      // console.log("Dynamic URL:", dynamicURL);
const title=['EMPLOYEE','DEPARTMENT','BASE SALARY','ALLOWANCES','DEDUCTION','NET PAY','STATUS']
   

  return (
    <div className='p-4 gap-3 flex flex-col  overflow-hidden h-full'>
      <Header Title={"Generate Payroll"}/>
      <div className='p-4 gap-3 flex flex-col  overflow-hidden h-full'>
      <Generatepayroll action={()=>setModalOpen(true)}/>
        
      <ExportTable
        data={attendanceData}        // your backend data
        title={title}                // ['EMPLOYEE','DEPARTMENT',...]
        bodyStructure={structure}    // [3,1,1,1,1,1,1]
        keys={ke2}                   // flattened keys for extraction
        fileName="Attendance Report"
      />
      
      <Table clickable={false} Data={attendanceData} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} totPage={10} />
      </div>
      {isModalOpen && <FileDrawer width='w-11/12' isModalOpen={isModalOpen} closeModal={()=>setModalOpen(false)} >
          <OnPayrollGenerate/>
      </FileDrawer>}
    </div>
  )
}

export default GeneratePayroll