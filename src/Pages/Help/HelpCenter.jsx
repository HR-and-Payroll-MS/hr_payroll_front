import { NavLink, Outlet } from "react-router-dom";
import Header from "../../Components/Header";

export default function HelpCenter(){

    
           
    const middle=<div id="middle" className="flex bg-white dark:bg-slate-800 w-full  flex-col  h-full  p-2 gap-4">    
                <div id="child1" >
                    <NavLink to="shortcut"  className={({ isActive }) => `flex dark:hover:bg-slate-700 rounded-md w-full hover:bg-slate-50 justify-between items-center  ${isActive ? "hover:bg-slate-50 bg-slate-700 " : "" }`}>
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded ">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700 dark:text-slate-200  text-xs">key Board Shortcut</p>
                        </div>
                    </NavLink>
                </div>  
                <div id="child" >
                    <NavLink to="FAQ" className={({ isActive }) => `flex dark:hover:bg-slate-700 hover:bg-slate-50 rounded-md w-full justify-between items-center  ${isActive ? " bg-slate-50 dark:bg-slate-700 " : "" }`}>
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded ">
                            <img className="h-5 opacity-25" src="\svg\music-library-svgrepo-com.svg" alt="" />
                            <p className="font-bold text-gray-700 dark:text-slate-200  text-xs">Frequently Asked Questions</p>
                        </div>
                    </NavLink>
                </div>  
             </div>  ;
    return  (
    <div className="flex flex-col gap-4 w-full h-full justify-start dark:bg-slate-900 bg-gray-50  ">
                <div className=" flex justify-evenly  "> 
                            <Header Title={"Settings"} Breadcrub={"Manage your Dashboard here"} ><div className="flex dark:text-slate-200 text-xs  w-full items-center justify-between px-2.5 py-2.5 h-full">
                    <input className=" h-full  rounded w-full" type="email" name="email" id="email" placeholder="search what you need" />
                    <img className="h-3.5 opacity-45" src="\svg\search-svgrepo-com.svg" alt="" />
                </div></Header>
                </div>
                <div className="flex h-full flex-1 gap-5 rounded-md">
                        <div className="h-full shadow rounded-md overflow-clip w-1/5 "> 
                            {middle}
                        </div>
                        <div className=" flex rounded-md shadow flex-1 overflow-y-auto h-full dark:bg-slate-800 bg-white "> 
                            {/* <CompanyInfo/> */}
                            {/* <ChangePassword/> */}
                            {/* <WorkSchedule/> */}
                            <Outlet/>
                        </div>
                </div>
    </div>)
}