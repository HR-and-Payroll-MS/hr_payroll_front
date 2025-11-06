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
    setLocalData("hi","true")
     setClose(false)
  }
 useEffect(()=>{
  if(getLocalData('hi') === "true")setClose(false)
 },[])
  return (
    <div className="h-full scrollbar-hidden w-full p-2.5 flex overflow-y-scroll flex-col gap-4">
      <Modal isOpen={isOpen} location={'center'}>
        {/* transform -translate-x-full transition-transform duration-300 ease-in-out */}
        <div className="  text-center gap-3.5 justify-center  items-center rounded h-fit  lg:w-3/12  sm:w-3/5 md:w-5/12 px-6 pb-6 dark:bg-slate-800 dark:text-slate-300 bg-amber-50 flex flex-col">
          <div className="flex-1 flex gap-1 flex-col p-2  ">
            <img
              className="flex-1 m-1.5 max-h-28 object-cover"
              src="\pic\F5.png"
              alt="F5"
            />
            <p className="font-bold text-3xl ">Welcome to HR Dashboard</p>
            <p className="font-semibold text-wrap dark:text-slate-400 ">
              Enjoy the Comenience of managing your company's employees
            </p>
          </div>
          <button
            className="bg-slate-800 dark:bg-green-800 cursor-pointer w-full text-slate-100 py-1 rounded"
            onClick={() =>setFirstTime()}
          >
            Let's Go
          </button>
        </div>
      </Modal>
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
