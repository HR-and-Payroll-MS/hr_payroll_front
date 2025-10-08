// import { Sidebar } from 'lucide-react'
import { createContext ,useContext, useState } from 'react'
import Sidebar from "./Components/Layouts/Sidebar"
import  Login  from "./Components/Login/LoginPage"
import Header from './Components/Layouts/Header'
import Table from './Components/HRManager/Table'
import Attendance from './Components/HRManager/Attendance'
import TeamAttendance from './Components/HRManager/TeamAttendance'
import Setting from './Components/Setting/Setting'
import Employee from './Components/HRManager/Employee/Employee'
import Example from './Components/example'
import Dropdown from './Components/Dropdown'

const UserContext=createContext();
function App() {
  
  const [darklight,setdarklight]=useState({light:"bg-white shadow dark:bg-slate-700 drop-shadow-2xl",dark:"bg-gray-50 dark:bg-slate-900 ",Magic_Word:""});
      return (
        <UserContext.Provider value={{darklight,setdarklight}}>
        <div className={`bg-gray-50 flex h-screen gap-0.5 ${darklight.Magic_Word} dark:bg-slate-900`}>
          {/* <Sidebar/> */}
          <Login/>
          {/* <div className=' flex-1 h-full flex flex-col'>
            <Header/>
            <div className='h-full p-4 flex-1 overflow-y-scroll scrollbar-hidden'>
              <div className={`h-full w-full bg-white rounded-md dark:bg-slate-800 `}> */}
              {/* <Dropdown/> */}
              {/* <Table/> */}
              {/* <Attendance/> */}
              {/* <TeamAttendance/> */}
              {/* <Setting/> */}
              {/* <Employee/> */}
              {/* <Example/> */}
              {/* </div>
              
            </div>
          </div>*/}
        </div> 
      </UserContext.Provider>
      )
}

export default App
