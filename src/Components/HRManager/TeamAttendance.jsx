export default function TeamAttendance(){
          const fruit=[1,2,3,4,5]
    const table_header=<thead className="bg-slate-100 rounded-xl">
            <tr className="justify-evenly  ">
                
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                        <div className="flex gap-1.5">
                            <input className="" type="checkbox" name="remember me" id="rememberme" />
                            <p className="font-semibold text-gray-500  text-xs">Employee Name</p>
                        </div>    
                            <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                </th>
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                        <p className="font-semibold text-gray-500  text-xs">Employee Type</p>
                        <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                </th>
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold text-gray-500  text-xs">Paid Time/ Work Schedule</p>
                    </div>
                </th>
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold text-gray-500  text-xs">Overtime</p>
                            <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
                </th>
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold text-gray-500  text-xs">Status</p>
                    </div>
                </th>
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold text-gray-500  text-xs">11 Apr</p>
                    </div>
                </th>
                <th className=" px-4 py-3">
                    <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold text-gray-500  text-xs">Action</p>
                    </div>
                </th>
               
            </tr>
        </thead>
    const table_content=<tbody>
            {
                fruit.map(fruit=><tr className="hover:bg-slate-50 font-semibold text-sm text-gray-700">
                <td className="border-b border-gray-100 px-4 py-2">
                    <div className="flex  w-full justify-start items-center gap-2 ">
                        <input className="" type="checkbox" name="remember me" id="rememberme" />
                        <img className="h-6 w-6 rounded-full" src="\pic\download (48).png" alt="" />
                        <div className="flex flex-col items-start gap-0 justify-center ">
                            <p className="font-semibold text-gray-700  text-sm">Pristia Candira</p>
                            <p className="font-normal text-gray-300  text-xs">et8302tn@gmail.com</p>
                        </div>
                    </div>
                </td>
                <td className="border-b border-gray-100 px-4 py-2 ">Fulltime</td>
                <td className="border-b border-gray-100 px-4 py-2 ">6hr/8hr</td>
                <td className="border-b border-gray-100 px-4 py-2">
                   <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold">2h</p>
                    </div>
                </td>
                <td className="border-b border-gray-100 px-4 py-2">
                    <div className="text-green-700 bg-green-50 py-0.5 text-center rounded-md">
                        <p>Approve</p>
                    </div>
                </td>
                <td className="border-b border-gray-100 px-4 py-2">
                    <div className="flex w-full justify-between items-center ">
                            <p className="font-semibold">6hr</p>
                    </div>
                </td>
                <td className="border-b border-gray-100 px-4 py-2">
                    <div className="flex w-full justify-center gap-1.5 items-center ">
                            <div className="p-1.5 bg-blue-800 rounded-md">
                                <img className="h-4 opacity-25" src="\svg\date-2-svgrepo-com.svg" alt="" />
                            </div>
                            
                    </div>
                </td>
            </tr>)
            }
            
        </tbody>
    const pagination=<div id="middle" className="flex flex-1 justify-between py-4 items-start ">
                
                <div className="flex items-center  gap-1.5">
                    <div className="py-1.5 px-1 border-gray-100 shadow-2xl border h-full">
                        <img className="h-3" src="\svg\left-chevron-svgrepo-com.svg" alt="" />
                    </div>
                    <p className="font-semibold py-1 px-2 border-gray-100 shadow-2xl border text-gray-500  text-xs">1</p>
                    <p className="font-semibold py-1 px-2 border-gray-100 shadow-2xl border text-gray-500  text-xs items-center">...</p>
                    <p className="font-semibold py-1 px-2 border-gray-100 shadow-2xl border text-gray-700  text-xs">2</p>
                    <div className="py-1.5 px-1 border-gray-100 shadow-2xl border h-full"> 
                        <img className="h-3 rotate-180" src="\svg\left-chevron-svgrepo-com.svg" alt="" />
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-gray-500  text-xs">5 Result</p>
                </div>
        </div>
    const left= <div id="left" className="flex py-2.5 flex-2 gap-3  justify-between items-center  ">
            
            <div className="flex flex-1  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md">
                    <p className="text-xs font-semibold">01 Jan 2023 - 10 Mar 2023</p>
                    <img className="h-4" src="\svg\date-2-svgrepo-com.svg" alt="" />
            </div>
            <div className="flex  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md">
                    <p className="text-xs font-semibold">All Record</p>
                    <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
            </div>
            <div className="flex  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md">
                    <p className="text-xs font-semibold">All Location</p>
                    <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
            </div>
            <div className="flex  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md">
                    <p className="text-xs font-semibold">All Status</p>
                    <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
            </div>
           

        </div>
    const Header= <div id="left" className="flex py-2.5 flex-2 gap-3  justify-between items-center  ">
            
            
            <div className="flex flex-1 flex-col text-gray-700 items-start  justify-start  rounded-md">
                    <p className="text-xl font-bold">Team Attendance</p>
                    <p className="text-xs text-gray-500 font-semibold">Manage Your Team Attendance</p>
            </div>
            
           
            
            
           

        </div>
    const warning=<div id="left" className="flex flex-2 gap-3  justify-between items-center  ">
            <div className="flex flex-1 bg-sky-50 text-sky-800 items-center  justify-start gap-1.5 px-5  rounded-md">
                    <img className="h-8 " src="\svg\warning-alt-svgrepo-com.svg" alt="" />
                    <p className="text-xs font-normal">You can only update the attendance record within the last 31 days</p>
            </div>

        </div>
    return  (
    <div className="flex flex-col w-full h-full bg-gray-50 ">
                <div className=" flex justify-evenly  gap-3 "> 
                            {Header}
                        </div>
                <div className="flex shadow bg-white flex-col  h-full p-4 rounded-md">
       
                    <div className=" flex justify-evenly h-14 gap-3 "> 
                            {warning}
                        </div>
                    <div className=" flex justify-evenly h-14 gap-3 "> 
                            {left}
                        </div>
                    <table className="table-auto w-full flex-1  border-b border-gray-300 ">
                            {table_header}
                            {table_content}
                        </table>
                        <div className=" flex justify-evenly h-14 gap-3 "> 
                            {pagination}
                        </div>
                </div>
    </div>)
}