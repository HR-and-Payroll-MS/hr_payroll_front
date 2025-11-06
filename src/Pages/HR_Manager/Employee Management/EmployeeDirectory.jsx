import React from 'react'
import Attendance from '../Attendance'
import TeamAttendance from '../TeamAttendance'
import Table from '../../../Components/Table'
import Header from '../../../Components/Header'

// import Table from '../Table'
import {SearchStatus} from '../../../Components/Level2Hearder'
import { table } from '../../../Hooks/useTableStructure'
import {Pagination} from '../../../Components/Pagination'
import useDropdown from '../../../Hooks/useDropdown'


function EmployeeDirectory() {
const DirectoryStructure = {
  bodyStructure: [3, 1, 1, 1, 1, 1, 1],
  headerStructure: [11, 11, 11, 11, 11, 11, 11]
};

const DirectoryTitles = [
  "Name",
  "Phone",
  "Department",
  "Gender",
  "Status",
  "Employment Type / Job Title",
  "Recurring"
];
const DirectoryData = [
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
  [
    { name: "Alice Johnson" ,email:"AliceJ123@hrpayroll.com"},                 // [3].
    { time: "+1 (555) 123-4567" },             // [1].
    { time: "Finance" },                       // [1].
    { time: "Female" },                        // [1].
    { time: "Active" },                        // [1].
    { time: "Full-time / Senior Accountant" }, // [1].
    { time: "Yes" }                            // [1].
  ],
];


  return (
    <div className='p-4 flex flex-col h-full'>
        <Header Title={"Employee Directory"} Breadcrumb={"view all employees and click to view detail "}/>
        <SearchStatus/>

        <Table
          data={DirectoryData}
          Structure={DirectoryStructure}
          Titles={DirectoryTitles}
        />

        <Pagination  page={6} totalPages={9} onPageChange=""/></div>
  )
}

export default EmployeeDirectory