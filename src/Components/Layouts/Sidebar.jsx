import { useState } from "react";
import { LuSun } from 'react-icons/lu'
import { FaBeer } from 'react-icons/fa';
                 
export default function Sidebar(){
    const [darklight,setdarklight]=useState({light:"bg-white shadow dark:bg-slate-700 drop-shadow-2xl",dark:"bg-gray-50 dark:bg-slate-900 ",Magic_Word:""});
    const [sub,setSub]=useState({Employee:false,Checklist:false,Time_Off:false,Attendance:false,Payroll:false,Performance:false,Recruitment:false})
    function changeSub(key,value){
            setSub(current=>{ return {...current,[key]:value}})
            console.log(typeof(key),key,typeof(value),value)
            
    }
    function changetheme(type){
        if(type===true){
            setdarklight({light:"bg-white shadow dark:bg-slate-700 drop-shadow-2xl",dark:"bg-gray-50 dark:bg-slate-900"})
        }
        else{
            setdarklight({dark:"bg-white shadow dark:bg-slate-700 drop-shadow-2xl",light:"bg-gray-50 dark:bg-slate-900",Magic_Word:"dark"})
        }
    }
    const check=0;
    const top1=<div id="top" className="flex w-full justify-between items-center m-0.5 px-2.5">
                <div className="flex items-center  justify-center py-2.5">
                    <img className="h-9" src="\pic\Robot Thumb Up with Artificial Intelligence.png" alt="" />
                    <p className={`${darklight.Magic_Word} dark:bg-slate-800 dark:text-white font-bold text-gray-700  text-xl`}>HRDashboard</p>
                </div>
                <img className="h-5" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
            </div>;
    const top2=<div id="top2" className="bg-green-600 rounded-md p-2.5 px-5 flex w-full justify-between items-center ">
                <div className="flex items-center  justify-center ">
                    <p className="font-semibold text-white  text-xs">Dashboard</p>
                </div>
                <img className="h-5 opacity-45" src="\svg\dashboard-svgrepo-com.svg" alt="" />
            </div>;
    const middle=<div id="middle" className="flex flex-col w-full flex-1 my-4 overflow-y-scroll scrollbar-hidden gap-2">  
                {/* this will contain a group of single side bar characters */}    
                <div id="child1" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Employee",!sub.Employee)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Employee</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Employee?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>
                <div id="child2" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Checklist",!sub.Checklist)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Checklist</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Checklist?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>
                <div id="child3" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Time_Off",!sub.Time_Off)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Time Off</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Time_Off?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>
                <div id="child4" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Attendance",!sub.Attendance)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Attendance</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Attendance?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>
                <div id="child5" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Payroll",!sub.Payroll)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Payroll</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Payroll?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>
                <div id="child6" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Performance",!sub.Performance)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Performance</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Performance?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>
                <div id="child7" className={`*:cursor-pointer `}>
                    {/* this will contain single side bar character like "employee" with it's own dropdown */}
                    <div onClick={()=>{changeSub("Recruitment",!sub.Recruitment)}} className={` hover:bg-slate-50 ${darklight.Magic_Word} dark:hover:bg-slate-700 flex w-full justify-between items-center p-2.5`}>
                        <div className="flex items-center gap-1.5 justify-center ">
                            <img className="h-5 opacity-25" src="\svg\profile-circle-svgrepo-com.svg" alt="" />
                            <p className={`${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm`}>Recruitment</p>
                        </div>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                    <div className={`${darklight.Magic_Word} ${sub.Recruitment?"flex":"hidden"} *:hover:bg-slate-50 dark:*:hover:bg-slate-700 dark:border-slate-500 ml-4 my-1.5 px-4.5 border-l rounded border-gray-300 flex-col gap-1.5`}>
                        {/* dropdowns are inside this div */}
                        <div id="d1"  className="flex rounded-md w-full justify-between items-center dark:bg-slate-800 bg-gray-100 px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Manage Employees</p>
                        </div>
                        <div id="d2"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>Directory</p>
                        </div>
                        <div id="d3"  className="flex rounded-md w-full justify-between items-center px-2.5 py-1.5">
                                <p className={ `${darklight.Magic_Word} dark:text-slate-300 font-semibold text-gray-700  text-sm `}>ORG Chart</p>
                        </div>
                        
                    </div>
                </div>

             </div>  ;
    const bottom=<div id="bottom" className="w-full flex flex-col items-center py-3.5 ">  
                <div className="flex w-full justify-between items-center m-0.5">
                    <div className="flex items-center gap-1.5 justify-center py-2.5">
                        <img className="h-5 opacity-25" src="\svg\settings-svgrepo-com.svg" alt="" />
                        <p className={`font-semibold text-gray-700  text-sm ${darklight.Magic_Word} dark:text-slate-300`}>Help Center </p>
                    </div>
                    {/* <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" /> */}
                    <div className="text-xs rounded-full font-semibold items-center bg-red-500 text-white px-1 "><p className="m-0.5">8</p></div>

                </div>   
                <div className="flex w-full justify-between items-center m-0.5">
                    <div className="flex items-center gap-1.5 justify-center py-2.5">
                        <img className="h-5 opacity-25" src="\svg\settings-svgrepo-com.svg" alt="" />
                        <p className={`font-semibold text-gray-700  text-sm ${darklight.Magic_Word} dark:text-slate-300`}>Setting</p>
                    </div>
                    <img className="h-5 opacity-0" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                </div>  
                <div className={`${darklight.Magic_Word} dark:bg-slate-900 flex gap-0.5 rounded-4xl cursor-pointer bg-gray-50  h-fit w-full justify-around items-center m-0.5`}>
                    <div onClick={()=>{changetheme(true)}} id="Light" className={`flex flex-1 rounded-4xl m-1 h-9 items-center gap-1.5 justify-center py-2.5   ${darklight.light}`} >
                    <img className={`h-4`} src="\svg\sun-2-svgrepo-com.svg" alt="" />
                    <p className={`${darklight.Magic_Word} dark:text-slate-100 font-semibold text-gray-700  text-sm`}>Light</p>
                    </div>
                    <div onClick={()=>{changetheme(false)}} id="dark" className={`flex flex-1 rounded-4xl m-1 h-9 items-center gap-1.5 justify-center py-2.5   ${darklight.dark}`}>
                    <img className={`h-4`} src="\svg\night-svgrepo-com.svg" alt="" />
                    <p className={`${darklight.Magic_Word} dark:text-slate-100 font-semibold text-gray-700  text-sm`}>Dark</p>
                    </div>
                </div>   
             </div>;
    return(
        <div className={`bg-white ${darklight.Magic_Word} dark:bg-slate-800 dark:text-white flex h-full w-64 flex-col items-center shadow px-2.5 py-0.5`}>
          {top1}    
          {top2}    
          {middle}    
          {bottom}    
        </div>
    )
}