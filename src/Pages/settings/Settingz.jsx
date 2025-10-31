import { NavLink, Outlet } from "react-router-dom";
import ChangePassword from "./sub/ChangePassword";
import CompanyInfo from "./sub/CompanyInfo";
import WorkSchedule from "./sub/WorkSchedule";
import Header from "../../Components/Header";

export default function Setting(){

    
           
    const middle=<div id="middle" className="flex bg-white w-full  flex-col  h-full  p-2 gap-4">    
                <div id="child1" >
                    <NavLink to="CompanyInfo"  className={({ isActive }) => `flex rounded-md w-full justify-between items-center  ${isActive ? "bg-slate-50 dark:bg-slate-700 " : "" }`}>
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Company info</p>
                        </div>
                    </NavLink>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Offices</p>
                        </div>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Department</p>
                        </div>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Job Titles</p>
                        </div>
                </div>  
                <div id="child1" >
                    <NavLink to="WorkSchedule" className={({ isActive }) => `flex rounded-md w-full justify-between items-center  ${isActive ? "bg-slate-50 dark:bg-slate-700 " : "" }`}>
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Work Schedule</p>
                        </div>
                    </NavLink>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Permission</p>
                        </div>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Integration</p>
                        </div>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Subscription</p>
                        </div>
                </div>  
                <div id="child1" >
                    <NavLink to="ChangePassword" className={({ isActive }) => `flex rounded-md w-full justify-between items-center  ${isActive ? "bg-slate-50 dark:bg-slate-700 " : "" }`}>
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Password</p>
                        </div>
                    </NavLink>
                </div>  
                <div id="child1" >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700  text-xs">Notification</p>
                        </div>
                </div>  
             </div>  ;
    return  (
    <div className="flex flex-col gap-4 w-full h-full justify-start bg-gray-50 dark:bg-gray-300 ">
                <div className=" flex justify-evenly  "> 
                            <Header Title={"Settings"} Breadcrub={"Manage your Dashboard here"} ><div className="flex text-xs  w-full items-center justify-between px-2.5 py-2.5 h-full">
                    <input className=" h-full  rounded w-full" type="email" name="email" id="email" placeholder="search what you need" />
                    <img className="h-3.5 opacity-45" src="\svg\search-svgrepo-com.svg" alt="" />
                </div></Header>
                </div>
                <div className="flex flex-1 gap-5 rounded-md">
                        <div className="h-full shadow rounded-md overflow-clip w-1/5 "> 
                            {middle}
                        </div>
                        <div className=" flex rounded-md shadow flex-1 h-fit bg-white "> 
                            {/* <CompanyInfo/> */}
                            {/* <ChangePassword/> */}
                            {/* <WorkSchedule/> */}
                            <Outlet/>
                        </div>
                </div>
    </div>)
}