import { NavLink } from "react-router-dom";
import DropDownContent from "../Components/DropDownContent";
import Icon from "../Components/Icon";
import InputField from "../Components/InputField";
import NotificationBell  from "../Pages/HR_Manager/Notifications/NotificationBell";

export default function Header(){
        return <div className={`bg-white flex justify-evenly shadow h-14 gap-3 z-50  dark:bg-slate-800 dark:text-white `}> 
        <div id="left" className="flex py-2.5 w-2/5  justify-between items-center p-4 ">
            <div className={`flex items-center gap-1.5 justify-between bg-gray-100 w-full h-full px-1.5 rounded-md  dark:bg-slate-700 `}>
                <div className="flex items-center gap-1.5 px-2.5 py-2 h-full">
                    <img className="h-4 opacity-45" src="\svg\search-svgrepo-com.svg" alt="" />
                    {/* <input className=" h-full rounded w-full" type="email" name="email" id="email" placeholder="search anything..." /> */}
                    <InputField border="" placeholder="search anything..." icon={false}/>
                </div>
                <div className={`flex bg-white items-center justify-center gap-1.5 px-1.5 rounded-md  dark:bg-slate-700 `}>
                    <p className="text-lg font-bold">x</p>
                    <p className="text-sm font-bold">F</p>
                </div>
            </div>

        </div>
        <div id="middle" className="flex w-3/5 justify-start gap-7 items-center ">
                <p className={`font-semibold text-gray-700  text-sm  dark:font-slate-300 dark:text-slate-300 hover:cursor-pointer hover:text-slate-900 `}>Documents</p>
                <p className={`font-semibold text-gray-700  text-sm  dark:font-slate-300 dark:text-slate-300 hover:cursor-pointer hover:text-slate-900 `}>News</p>
                <p className={`font-semibold text-gray-700  text-sm  dark:font-slate-300 dark:text-slate-300 hover:cursor-pointer hover:text-slate-900 `}>Payslip</p>
                <p className={`font-semibold text-gray-700  text-sm  dark:font-slate-300 dark:text-slate-300 hover:cursor-pointer hover:text-slate-900 `}>Report</p>
        </div>
        <div id="right" className="flex w-1/5 justify-end items-center px-6">
                <NotificationBell/>
                {/* <img className="h-6" src="\svg\message-square-lines-svgrepo-com.svg" alt="" /> */}
                <DropDownContent svgs={<div className="flex items-center">
                    <img className="h-6 w-6 rounded-full" src="\pic\download (48).png" alt="" />
                </div>}>
                        <ul className="flex flex-col py-2">
                            <li className="px-4 py-1 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"><Icon name="CircleUser" className="h-4 w-4"/><NavLink to="profile">view profile</NavLink></li>
                            <li className="px-4 py-1 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"><Icon name="LogOut" className="h-4 w-4"/><NavLink to="logout">Logout</NavLink></li>
                        </ul>
                </DropDownContent>
                
        </div>
    
    </div>
}