import React, { useEffect, useState } from 'react';
import SummaryCard from '../Components/SummaryCard';
import Table from '../Components/Table';
import BarChartExample from '../Components/graphs/BarChartExample';
import LineChartExample from '../Components/graphs/LineChartExample';
import PieChartExample from '../Components/graphs/PieChartExample';
import { useTheme } from '../Context/ThemeContext';
import { getLocalData, setLocalData } from '../Hooks/useLocalStorage';
import WelcomeOverlay from '../Components/WelcomeOverlay';
function DashboardLayout({
  data= [
  {
    "photo": "/public/pic/image.png",
    "full_name": "Sophia Johnson",
    "status": "Active",
    "email": "sophia.johnson@example.com",
    "phone": "+1 (555) 321-8472",
    "department": "Human Resources",
    "gender": "Female",
    "job_title": "HR Manager"
  },
  {
    "photo": "/public/pic/image.png",
    "full_name": "Liam Martinez",
    "status": "Inactive",
    "email": "liam.martinez@example.com",
    "phone": "+1 (555) 289-6654",
    "department": "Finance",
    "gender": "Male",
    "job_title": "Financial Analyst"
  },
  {
    "photo": "/public/pic/image.png",
    "full_name": "Ava Williams",
    "status": "Active",
    "email": "ava.williams@example.com",
    "phone": "+1 (555) 741-2938",
    "department": "Marketing",
    "gender": "Female",
    "job_title": "Marketing Specialist"
  },
  {
    "photo": "/public/pic/image.png",
    "full_name": "Noah Brown",
    "status": "On Leave",
    "email": "noah.brown@example.com",
    "phone": "+1 (555) 482-1190",
    "department": "Engineering",
    "gender": "Male",
    "job_title": "Software Engineer"
  },
  {
    "photo": "/public/pic/image.png",
    "full_name": "Isabella Davis",
    "status": "Active",
    "email": "isabella.davis@example.com",
    "phone": "+1 (555) 923-4758",
    "department": "Design",
    "gender": "Female",
    "job_title": "UI/UX Designer"
  }
] ,
structure=[3,1,1,1,1,1],
title=['USER','PHONE','DEPARTMENT','GENDER','STATUS','TYPE'],
ke=[
  ["photo", "full_name", "email"], 
  ["phone"], 
  ["department"], 
  ["gender"], 
  ["status"],
  ["job_title"], 
  ["id"], 
]}) {



  // const formattedData = useFormattedTableData(backendData, Directory.bodyStructure);
  const { theme } = useTheme();
  const [isOpen, setClose] = useState(true);
  const setFirstTime=()=>{
    // setLocalData("hi","true")
     setClose(false)
  }
 useEffect(()=>{
  if(getLocalData('hi') === "true")setClose(false)
 },[])
  return (
    <div className="h-full scrollbar-hidden w-full p-2.5 flex overflow-y-scroll flex-col gap-4">
      <WelcomeOverlay Title='Welcome to HR Dashboard' subTitle={`Enjoy the Comenience of managing your company's employees`} isOpen={isOpen} setClose={setClose}/>
      <div className="flex gap-4 flex-1 h-fit w-full">
        <SummaryCard />
      </div>
      <div className="flex gap-4  w-full flex-2">
        <div className="bg-gray-50 h-full shadow dark:bg-slate-700 rounded flex-1 ">
          {/* <BarChartExample themeMode={darkMode ? 'dark' : 'light'} /> */}
          <BarChartExample theme={theme} />
        </div>
        <div className="bg-gray-50 h-full shadow dark:bg-slate-700 rounded flex-1 ">
          <LineChartExample theme={theme} />
        </div>
        <div className="bg-gray-50 h-full shadow dark:bg-slate-700 rounded flex-1 ">
          <PieChartExample theme={theme} />
        </div>
      </div>
      <div className="flex gap-4 rounded flex-1 h-fit w-full bg-gray-50">
         <Table Data={data} URL={"/employees/"} title={title} Structure={structure} ke={ke}/>
      </div>
      <div className="h-fit flex w-full gap-4">
        <div className="bg-gray-50 h-full p-2 rounded flex-1 ">1</div>
        <div className="bg-gray-50 h-full p-2 rounded flex-1 ">1</div>
        <div className="bg-gray-50 h-full p-2 rounded flex-1 ">1</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
