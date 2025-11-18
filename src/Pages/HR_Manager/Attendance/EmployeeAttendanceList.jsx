import React, { useEffect } from 'react'
import Attendance from '../Attendance'
import TeamAttendance from '../TeamAttendance'
import Table from '../../../Components/Table'
import Header from '../../../Components/Header'

// import Table from '../Table'
import {SearchStatus} from '../../../Components/Level2Hearder'
import { table } from '../../../Hooks/useTableStructure'
import {Pagination} from '../../../Components/Pagination'
import useDropdown from '../../../Hooks/useDropdown'
import { useFormattedTableData } from '../../../utils/useFormattedTableData'
import { flattenObject } from '../../../utils/flattenObject'
import { useNavigate } from "react-router-dom";

function EmployeeAttendanceList() {

const navigate = useNavigate();
const onRowClick=(id)=>{
    navigate(`/hr_dashboard/Employee_Attendance/${id}`, {state: id})
        console.log(id)
}
const structure=[3,1,1,1,1,1,1,1,1,1];

const ke2=[
  ["profile_photo", "full_name", "email"], 
  ["date"], 
  ["clock_in"], 
  ["Clock_in_Location"], 
  ["Clock_out"], 
  ["status"],
  ["clock_out_location"], 
  ["work_schedule_hours"], 
  ["paid_time"], 
  ["notes"], 
]
const title=['EMPLOYEE','DATE','CLOCK IN','CLOCK IN LOCATION','CLOCK OUT','CLOCK OUT LOCATION','WORK SCHEDULES','PAID TIME','NOTES']
    return (
    <div className='p-4 flex flex-col h-full'>
        <Header Title={"Employee Attendance"} subTitle={"view all employee's Attendance and click to view detail "}/>
        <SearchStatus/>
        <Table URL={"/employees/"} Data={[]}  title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} totPage={10}/>
    </div>
  )
}

export default EmployeeAttendanceList






