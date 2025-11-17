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


function EmployeeDirectory() {
const navigate = useNavigate();
const data2 = [
  {
    "id": "emp_001",
    "profile": {
      "photo": "/pic/download (48).png",
      "full_name": "Sophia Johnson",
      "gender": "Female"
    },
    "contact": {
      "email": "sophia.johnson@example.com",
      "phone": "+1 (555) 321-8472"
    },
    "employment": {
      "status": "Active",
      "department": {
        "name": "Human Resources",
        "location": "Building A"
      },
      "job": {
        "title": "HR Manager",
        "level": "Senior"
      }
    }
  },
  {
    "id": "emp_002",
    "profile": {
      "photo": "/pic/image.png",
      "full_name": "Liam Martinez",
      "gender": "Male"
    },
    "contact": {
      "email": "liam.martinez@example.com",
      "phone": "+1 (555) 289-6654"
    },
    "employment": {
      "status": "Inactive",
      "department": {
        "name": "Finance",
        "location": "Building B"
      },
      "job": {
        "title": "Financial Analyst",
        "level": "Mid"
      }
    }
  },
  {
    "id": "emp_003",
    "profile": {
      "photo": "/pic/download (48).png",
      "full_name": "Ava Williams",
      "gender": "Female"
    },
    "contact": {
      "email": "ava.williams@example.com",
      "phone": "+1 (555) 741-2938"
    },
    "employment": {
      "status": "Active",
      "department": {
        "name": "Marketing",
        "location": "Building C"
      },
      "job": {
        "title": "Marketing Specialist",
        "level": "Junior"
      }
    }
  },
  {
    "id": "emp_004",
    "profile": {
      "photo": "/pic/image.png",
      "full_name": "Noah Brown",
      "gender": "Male"
    },
    "contact": {
      "email": "noah.brown@example.com",
      "phone": "+1 (555) 482-1190"
    },
    "employment": {
      "status": "On Leave",
      "department": {
        "name": "Engineering",
        "location": "Building D"
      },
      "job": {
        "title": "Software Engineer",
        "level": "Mid"
      }
    }
  },
  {
    "id": "emp_005",
    "profile": {
      "photo": "/pic/download (48).png",
      "full_name": "Isabella Davis",
      "gender": "Female"
    },
    "contact": {
      "email": "isabella.davis@example.com",
      "phone": "+1 (555) 923-4758"
    },
    "employment": {
      "status": "Active",
      "department": {
        "name": "Design",
        "location": "Building E"
      },
      "job": {
        "title": "UI/UX Designer",
        "level": "Mid"
      }
    }
  },
  {
    "id": "emp_006",
    "profile": {
      "photo": "/pic/image.png",
      "full_name": "Ethan Wilson",
      "gender": "Male"
    },
    "contact": {
      "email": "ethan.wilson@example.com",
      "phone": "+1 (555) 657-2022"
    },
    "employment": {
      "status": "Active",
      "department": {
        "name": "Engineering",
        "location": "Building D"
      },
      "job": {
        "title": "Frontend Developer",
        "level": "Mid"
      }
    }
  },
  {
    "id": "emp_007",
    "profile": {
      "photo": "/pic/Robot Thumb Up with Artificial Intelligence.png",
      "full_name": "Mia Anderson",
      "gender": "Female"
    },
    "contact": {
      "email": "mia.anderson@example.com",
      "phone": "+1 (555) 374-9921"
    },
    "employment": {
      "status": "Pending",
      "department": {
        "name": "Support",
        "location": "Building F"
      },
      "job": {
        "title": "Customer Support Specialist",
        "level": "Junior"
      }
    }
  },
  {
    "id": "emp_008",
    "profile": {
      "photo": "/pic/download.png",
      "full_name": "James Thomas",
      "gender": "Male"
    },
    "contact": {
      "email": "james.thomas@example.com",
      "phone": "+1 (555) 813-5679"
    },
    "employment": {
      "status": "Active",
      "department": {
        "name": "Operations",
        "location": "Building G"
      },
      "job": {
        "title": "Operations Coordinator",
        "level": "Mid"
      }
    }
  },
  {
    "id": "emp_009",
    "profile": {
      "photo": "/pic/download (48).png",
      "full_name": "Charlotte Taylor",
      "gender": "Female"
    },
    "contact": {
      "email": "charlotte.taylor@example.com",
      "phone": "+1 (555) 214-3345"
    },
    "employment": {
      "status": "Inactive",
      "department": {
        "name": "Legal",
        "location": "Building H"
      },
      "job": {
        "title": "Legal Advisor",
        "level": "Senior"
      }
    }
  }
]
const onRowClick=(id)=>{
    navigate(`/hr_dashboard/users/${id}`, {state: id})
        console.log(id)
}
const rawData=data2.map(item=>flattenObject(item));
const structure=[3,1,1,1,1,1];

// contracts
// credentials
// documents
// email
// employee_id
// employment_type
// full_name
// gender
// health_care
// id
// job_history
// job_title
// join_date
// last_working_date
// line_manager
// marital_status
// nationality
// office
// offset
// one_off
// personal_tax_id
// phone
// photo
// position
// recurring
// salary
// service_years
// social_insurance
// status
// timezone
// total_compensation

const ke2=[
  ["profile_photo", "full_name", "email"], 
  ["phone"], 
  ["join_date"], 
  ["gender"], 
  ["status"],
  ["marital_status"], 
]
const title=['USER','PHONE','JOIN DATE','GENDER','STATUS','MARITAL STATUS']

// In your component:


  return (
    <div className='p-4 flex flex-col h-full'>
        <Header Title={"Employee Directory"} Breadcrumb={"view all employees and click to view detail "}/>
        <SearchStatus/>
        <Table URL={"/employees/"} Data={rawData} title={title} Structure={structure} ke={ke2} onRowClick={onRowClick} totPage={10}/>
    </div>
  )
}

export default EmployeeDirectory





