import { useState, createContext, useContext, useEffect } from 'react';
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
import MyCalendar from './Components/graphs/MyCalendar';
import Routes from './routes/Routes';
import UnAuthorized from './Pages/UnAuthorized';
import NotFound from './Pages/NotFound';
import Settingz from './Pages/settings/Settingz';
import CompanyInfo from './Pages/settings/sub/CompanyInfo';
import ChangePassword from './Pages/settings/sub/ChangePassword';
import WorkSchedule from './Pages/settings/sub/WorkSchedule';
import Checklist from './Pages/HR_Manager/Checklist/Checklist';
import DashboardLayout from './layouts/DashboardLayout';
import AddEmployee from './Pages/HR_Manager/Employee Management/AddEmployee';
import LogOut from './Pages/profile/LogOut';
import EmployeeDirectory from './Pages/HR_Manager/Employee Management/EmployeeDirectory';
import { useTheme } from './Context/ThemeContext';
import ViewEmployee from './Pages/HR_Manager/Employee Management/ViewEmployee';
import DocumentsPage from './Pages/HR_Manager/Employee Management/UploadDocuments';
import EmployeeAttendanceDetail from './Example/AttendanceExample/EmployeeAttendaceDetail';
// import MyAttendance from './Example/AttendanceExample/MyAttendance';
import CVReader from './Example/CVReader';
import { setLocalData } from './Hooks/useLocalStorage';
import EmployeeAttendanceList from './Pages/HR_Manager/Attendance/EmployeeAttendanceList';
import { Checkup3 } from './Example/checkup';
import ViewEmployeeDetail from './Pages/HR_Manager/Employee Management/singleEmployee/ViewEmployeeDetail';
import ClockIn from './Pages/clockIn_out/ClockIn';
import UploadDocuments from './Pages/HR_Manager/Employee Management/UploadDocuments';
import MyAttendance from './Pages/HR_Manager/Attendance/MyAttendance';
import Policy from './Pages/HR_Manager/Policy/Policy';
import AttendanceCorrectionPage from './Pages/HR_Manager/Attendance/AttendanceCorrectionPage';
import AccessDenied from './Pages/clockIn_out/AccessDenied';
import MyProfile from './Pages/profile/MyProfile';
import LeaveApprovalPage from './Pages/HR_Manager/LeaveApproval/LeaveApprovalPage';
import AnnouncementsPage from './Pages/HR_Manager/Announcement/AnnouncementPage';
import PayrollReportsPage from './Pages/HR_Manager/payroll_management/PayrollReportsPage';
import MyPayrollPage from './Pages/HR_Manager/payroll_management/MyPayrollPage';
import NotificationCenterPage from './Pages/Notifications/NotificationCenterPage';
import SendNotificationPage from './Pages/Notifications/SendNotificationPage';
import ProfileHeader from './Pages/profile/ProfileHeader';
import ViewEmployeeSalaryInfo from './Pages/Payroll_Officer/employee_payroll_data/ViewEmployeeSalaryInfo'
import EditEmployeeSalaryInfo from './Pages/Payroll_Officer/employee_payroll_data/EditEmployeeSalaryInfo'
import AllowanceBonuses from './Pages/Payroll_Officer/payroll_management/AllowanceBonuses'
import GeneratePayroll from './Pages/Payroll_Officer/payroll_management/GeneratePayroll'
import ManageDeduction from './Pages/Payroll_Officer/payroll_management/ManageDeduction'
import SalaryStructure from './Pages/Payroll_Officer/payroll_management/SalaryStructure'
import ReGeneratePayslips from './Pages/Payroll_Officer/payslips/ReGeneratePayslips'
import ViewGeneratedPayslips from './Pages/Payroll_Officer/payslips/ViewGeneratedPayslips'
import DepartmentWisePayroll from './Pages/Payroll_Officer/reports/DepartmentWisePayroll'
import PayrollReports from './Pages/Payroll_Officer/reports/PayrollReports'
import TaxReports from './Pages/Payroll_Officer/reports/TaxReports'
// import { NotificationBell, NotificationCenterPage, SendNotificationPage } from './Pages/HR_Manager/Notifications/MockData';

export const UserContext = createContext();

function App() {
  useEffect(()=>{
    setLocalData("role","Payroll")
  },[])
  const { theme } = useTheme();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {' '}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        {/* ------------------------- Payroll officer ---------------------- */}
        <Route element={<Routes allowedRoles={['Payroll']} />}>
          <Route path="Payroll" element={<MainLayout />}>
            <Route index element={<DashboardLayout />} />
            <Route path="generate_payroll" element={<GeneratePayroll />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="send_notification" element={<SendNotificationPage />} />
            <Route path="view_notification" element={<NotificationCenterPage />}/>
            <Route path="view_employee_salary_info" element={<ViewEmployeeSalaryInfo />} />
            <Route path="edit_employee_salary_info" element={<EditEmployeeSalaryInfo />} />
            {/* <Route path="allowances" element={<AllowanceBonuses />} /> */}
            <Route path="generate_payroll" element={<GeneratePayroll />} />
            {/* <Route path="manage_deduction" element={<ManageDeduction />} /> */}
            <Route path="salary_structure" element={<SalaryStructure />} />
            <Route path="re_generate_payslips" element={<ReGeneratePayslips />} />
            <Route path="view_generated_payslips" element={<ViewGeneratedPayslips />} />
            <Route path="department_wise_paryoll" element={<DepartmentWisePayroll />} />
            <Route path="payroll_reports" element={<PayrollReports />} />
            <Route path="tax_reports" element={<TaxReports />} />
            <Route path="myattendance" element={<MyAttendance />} />
          </Route>
        </Route>





        {/* ------------------------- hr ---------------------- */}
        <Route element={<Routes allowedRoles={['Manager']} />}>
          <Route path="hr_dashboard" element={<MainLayout />}>
            <Route index element={<DashboardLayout />} />
            <Route path="Employee_Directory" element={<EmployeeDirectory />} />
            {/* <Route path="users/:id" element={<ViewEmployee />} /> */}
            <Route path="users/:id" element={<ViewEmployeeDetail />} />
            <Route path="View_Employee" element={<ViewEmployee />} />
            <Route path="Addemployee" element={<AddEmployee />} />
            <Route path="Approve_Reject" element={<LeaveApprovalPage />} />
            <Route path="Announcement" element={<AnnouncementsPage />} />
            <Route path="Payroll_report" element={<PayrollReportsPage />} />
            <Route path="MyPayroll" element={<MyPayrollPage />} />
            <Route path="policies" element={<Policy />} />
            {/* <Route path="logout" element={<LogOut />} /> */}
            <Route path="logout" element={<ProfileHeader />} />
            <Route path="profile" element={<MyProfile />} />
            {/* <Route path="send_notification_page" element={<SendNotificationPage/>} /> */}
            <Route
              path="send_notification_page"
              element={<SendNotificationPage />}
            />
            {/* <Route path="notification_bell" element={<NotificationBell/>} /> */}
            <Route
              path="notification_center_page"
              element={<NotificationCenterPage />}
            />
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
            <Route path="clock_in" element={<ClockIn />} />
            <Route
              path="Employee_Attendance"
              element={<EmployeeAttendanceList />}
            />
            <Route
              path="Employee_Attendance/:id"
              element={<EmployeeAttendanceDetail />}
            />
            <Route path="myattendance" element={<MyAttendance />} />

            <Route path="setting" element={<Settingz />}>
              <Route path="CompanyInfo" element={<CompanyInfo />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="WorkSchedule" element={<WorkSchedule />} />
            </Route>

            <Route path="org-chart" element={<DocumentsPage />} />
            {/* <Route path="Modal_Test" element={<Checklist />} /> */}
            <Route path="Modal_Test" element={<CVReader />} />
          </Route>
        </Route>








































        {/* ------------------------- manager ---------------------- */}
        <Route element={<Routes allowedRoles={['']} />}>
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

            <Route path="setting" element={<Settingz />}>
              <Route path="CompanyInfo" element={<CompanyInfo />} />
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="WorkSchedule" element={<WorkSchedule />} />
            </Route>

            <Route path="org-chart" element={<MyCalendar />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/" element={<ViewEmployeeDetail/>}/> */}
        {/* <Route path="/" element={<EmployeeDirectory/>}/> */}
      </>
    )
  );

  return (
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
