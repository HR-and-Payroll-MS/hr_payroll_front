import React, { useEffect, useState } from 'react';
import SummaryCard from '../Components/SummaryCard';
import { table } from '../Hooks/useTableStructure';
import Table from '../Components/Table';
import Modal from '../Components/Modal';
import BarChartExample from '../Components/graphs/BarChartExample';
import LineChartExample from '../Components/graphs/LineChartExample';
import PieChartExample from '../Components/graphs/PieChartExample';
import { useTheme } from '../Context/ThemeContext';
import { useFormattedTableData } from '../utils/useFormattedTableData';
import { getLocalData, setLocalData } from '../Hooks/useLocalStorage';
import WelcomeOverlay from '../Components/WelcomeOverlay';
function DashboardLayout() {

const backendData = [
    {
      name: "Alice Brown",
      email: "alice@company.com",
      phone: "+1 (555) 123-4567",
      department: "Finance",
      gender: "Female",
      status: "Active",
      job: "Senior Accountant",
    },
    {
      name: "James Lee",
      email: "james@company.com",
      phone: "+1 (555) 987-6543",
      department: "Engineering",
      gender: "Male",
      status: "Inactive",
      job: "Software Engineer",
    },
    {
      name: "James Lee",
      email: "james@company.com",
      phone: "+1 (555) 987-6543",
      department: "Engineering",
      gender: "Male",
      status: "Inactive",
      job: "Software Engineer",
    },
    {
      name: "James Lee",
      email: "james@company.com",
      phone: "+1 (555) 987-6543",
      department: "Engineering",
      gender: "Male",
      status: "Inactive",
      job: "Software Engineer",
    },
    {
      name: "James Lee",
      email: "james@company.com",
      phone: "+1 (555) 987-6543",
      department: "Engineering",
      gender: "Male",
      status: "Inactive",
      job: "Software Engineer",
    },
  ];

  const Directory = table.Dashboard

  const Titles = [
    "Username",
    "Phone",
    "Department",
    "Gender",
    "Status",
    "Employment Type / Job Title",
    "Recurring",
  ];

  const formattedData = useFormattedTableData(backendData, Directory.bodyStructure);
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
        <div className="bg-gray-50 h-full dark:bg-slate-700 rounded flex-1 ">
          {/* <BarChartExample themeMode={darkMode ? 'dark' : 'light'} /> */}
          <BarChartExample theme={theme} />
        </div>
        <div className="bg-gray-50 h-full dark:bg-slate-700 rounded flex-1 ">
          <LineChartExample theme={theme} />
        </div>
        <div className="bg-gray-50 h-full dark:bg-slate-700 rounded flex-1 ">
          <PieChartExample theme={theme} />
        </div>
      </div>
      <div className="flex gap-4 rounded flex-1 h-fit w-full bg-gray-50">
        <Table
      data={formattedData}
      Structure={Directory}
      Titles={Titles}
    />
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
