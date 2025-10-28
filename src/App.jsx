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
import Checklist from './Pages/HR_Manager/Checklist/Checklist';
import DashboardLayout from './layouts/DashboardLayout';
import TeamAttendance from './Pages/HR_Manager/TeamAttendance';
import Table from './Components/Table';
import {table} from './Hooks/useTableStructure'
import SummaryCard from './Components/SummaryCard';
import AddEmployee from './Pages/HR_Manager/Employee Management/AddEmployee';
import LogOut from './Pages/HR_Manager/Profile/LogOut';
// import Table from './Pages/HR_Manager/Table';
// rfce

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
         {/* for check up i changed the element in the hr_dashboard Route from "MainLayout" to other change it later thanks */}
          <Route path="hr_dashboard" element={<MainLayout/>}>
          {/* <Route path="hr_dashboard" element={<Table data={data} bodyStructure={bodyStructure} headerStructure={headerStructure}/>}> */}
            <Route index element={<DashboardLayout/>}/>
            <Route path='Addemployee' element={<AddEmployee/>}/>
            <Route path='logout' element={<LogOut/>}/>
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
            <Route path="checklist" element={<Checklist />} />

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
          <Route path="manager_dashboard" element={<MainLayout />}>
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
