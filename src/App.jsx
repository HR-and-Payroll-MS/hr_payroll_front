import { useState, createContext, useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Login from './Pages/LoginPage';
import Employee from './Pages/HR_Manager/Employee/Employee';
import Attendance from './Pages/HR_Manager/Attendance';
import Directory from './Pages/HR_Manager/Employee/Employee_Sub/Directory';
import ManageEmployee from './Pages/HR_Manager/Employee/Employee_Sub/ManageEmployee';
import DetailEmployee from './Pages/HR_Manager/Employee/Employee_Sub/DetailEmployee';
import { Job } from './Pages/HR_Manager/Employee/Employee_Sub/Job';
import { General } from './Pages/HR_Manager/Employee/Employee_Sub/General';
import { DirectoryList } from './Pages/HR_Manager/Employee/Employee_Sub/DirectoryList';
import MyCalendar from './Components/MyCalendar';
import { useTheme } from './Context/ThemeContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import UnAuthorized from './Pages/UnAuthorized';
import NotFound from './Pages/NotFound';
import Settingz from './Pages/settings/Settingz'
import CompanyInfo from './Pages/settings/sub/CompanyInfo';
import ChangePassword from './Pages/settings/sub/ChangePassword';
import WorkSchedule from './Pages/settings/sub/WorkSchedule';
import useAuth from './Context/AuthContext';

export const UserContext = createContext();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />

      {/* ------------------------- hr ---------------------- */}

        <Route element={<ProtectedRoutes allowedRoles={["hr"]} />}>
          <Route path="hr" element={<MainLayout />}>
            <Route path="Employee" element={<Employee />}>
              <Route path="ManageEmployee" element={<ManageEmployee />} />
              <Route path="Directory" element={<Directory />}>
                <Route index element={<DirectoryList />} />
                <Route path="Detail" element={<DetailEmployee />}>
                  <Route path="General" element={<General />} />
                  <Route path="Job" element={<Job />} />
                </Route>
              </Route>
            </Route>

            <Route path="attendance" element={<Attendance />} />

             <Route path="setting" element={<Settingz/>}>
              <Route path="CompanyInfo" element={<CompanyInfo />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="WorkSchedule" element={<WorkSchedule />} />
            </Route> 

            <Route path="org-chart" element={<MyCalendar />} />
          </Route>
        </Route>

        {/* ------------------------- manager ---------------------- */}

        <Route element={<ProtectedRoutes allowedRoles={["manager"]} />}>
          <Route path="manager" element={<MainLayout />}>
            <Route path="Employee" element={<Employee />}>
              <Route path="ManageEmployee" element={<ManageEmployee />} />
              <Route path="Directory" element={<Directory />}>
                <Route index element={<DirectoryList />} />
                <Route path="Detail" element={<DetailEmployee />}>
                  <Route path="General" element={<General />} />
                  <Route path="Job" element={<Job />} />
                </Route>
              </Route>
            </Route>

            <Route path="attendance" element={<Attendance />} />

             <Route path="setting" element={<Settingz/>}>
              <Route path="CompanyInfo" element={<CompanyInfo />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="WorkSchedule" element={<WorkSchedule />} />
            </Route> 

            <Route path="org-chart" element={<MyCalendar />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

// **********************Working App code 2 ******************************* */
// // src/App.jsx
// import { useState, createContext } from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
// } from "react-router-dom";

// import MainLayout from "./Components/Layouts/MainLayout";
// import Login from "./Components/Login/LoginPage";
// import Employee from "./Components/HRManager/Employee/Employee";
// import Attendance from "./Components/HRManager/Attendance";
// import Setting from "./Components/Setting/Setting";

// export const UserContext = createContext();

// function App() {
//   const [darklight, setdarklight] = useState({
//     light: "bg-white shadow dark:bg-slate-700 drop-shadow-2xl",
//     dark: "bg-gray-50 dark:bg-slate-900",
//     Magic_Word: "",
//   });

//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         {/* Login route (standalone page) */}
//         <Route path="/login" element={<Login />} />

//         {/* All other routes use the MainLayout */}
//         <Route
//           path="/"
//           element={<MainLayout darklight={darklight} setdarklight={setdarklight} />}
//         >
//           <Route index element={<Employee />} />
//           <Route path="attendance" element={<Attendance />} />
//           <Route path="settings" element={<Setting />} />
//         </Route>
//       </>
//     )
//   );

//   return (
//     <UserContext.Provider value={{ darklight, setdarklight }}>
//       <RouterProvider router={router} />
//     </UserContext.Provider>
//   );
// }

// export default App;

//**********************Working App code 1 ******************************* */

// // import { Sidebar } from 'lucide-react'
// import { createContext ,useContext, useState } from 'react'
// import Sidebar from "./Components/Layouts/Sidebar"
// import  Login  from "./Components/Login/LoginPage"
// import Header from './Components/Layouts/Header'
// import Table from './Components/HRManager/Table'
// import Attendance from './Components/HRManager/Attendance'
// import TeamAttendance from './Components/HRManager/TeamAttendance'
// import Setting from './Components/Setting/Setting'
// import Employee from './Components/HRManager/Employee/Employee'
// import Example from './Components/example'
// import Dropdown from './Components/Dropdown'
// import { createBrowserRouter,
//         createRoutesFromElements,
//         RouterProvider,
//         Route,
//         BrowserRouter } from 'react-router-dom'

//         const UserContext=createContext();
//         function App() {

//   const [darklight,setdarklight]=useState({light:"bg-white shadow dark:bg-slate-700 drop-shadow-2xl",dark:"bg-gray-50 dark:bg-slate-900 ",Magic_Word:""});
//        const router=createBrowserRouter(
//     createRoutesFromElements(
//       <Route path='/' element={<Sidebar darklight={darklight} setdarklight={setdarklight}/>}>
//       <Route index element ={<Employee/>}/>
//       {/* <Route index element ={<Attendance/>}/> */}
//       {/* <Route index element ={<Setting/>}/> */}
//     </Route>
//   )
// )
// return <RouterProvider router={router}/>

//       //   <UserContext.Provider value={{darklight,setdarklight}}>
//       //   <div className={`bg-gray-50 flex h-screen gap-0.5 ${darklight.Magic_Word} dark:bg-slate-900`}>
//       //     <Sidebar darklight={darklight} setdarklight={setdarklight}/>
//       //     {/* <Login/> */}
//       //       <div className=' flex-1 h-full flex flex-col'>
//       //       <Header/>
//       //       <div className='h-full p-4 flex-1 overflow-y-scroll scrollbar-hidden'>
//       //         <div className={`h-full w-full bg-white rounded-md dark:bg-slate-800 `}>
//       //           {/* <Dropdown/> */}
//       //           {/* <Table/> */}
//       //           {/* <Attendance/> */}
//       //           {/* <TeamAttendance/> */}
//       //           {/* <Setting/> */}
//       //           {/* <Employee/> */}
//       //           {/* <Example/> */}
//       //         </div>
//       //       </div>
//       //     </div>
//       //   </div>
//       // </UserContext.Provider>

// }

// export default App
