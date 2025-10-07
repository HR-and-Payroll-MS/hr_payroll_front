export default function DetailEmployee(){


    const fruit=[1,2]
    const table_header=<thead className="bg-slate-50 rounded-xl w-full">
            <tr className="rounded-2xl *:text-center text-gray-500 text-xs font-normal ">
                
                <th className=" px-4 py-3 rounded-l-2xl">Effective Date</th>
                <th className=" px-4 py-3">Job Title</th>
                <th className=" px-4 py-3">Position Type</th>
                <th className=" px-4 py-3">Employment Type</th>
                <th className=" px-4 py-3 rounded-r-2xl">Line Manager</th>
               
               
            </tr>
        </thead>
    const table_content=<tbody className="w-full">
            {
                fruit.map(fruit=><tr className="hover:bg-slate-50 font-semibold *:text-center text-xs text-gray-700">
                <td className="border-b border-gray-100 px-4 py-2">20 Aug 2023</td>
                <td className="border-b border-gray-100 px-4 py-2 ">Web Dev</td>
                <td className="border-b border-gray-100 px-4 py-2">-</td>
                <td className="border-b border-gray-100 px-4 py-2">full time</td>
                <td className="border-b border-gray-100 px-4 py-2">@skylar</td>
               
            </tr>)
            }
            
        </tbody>
    const Header=   <div id="left" className="flex py-2.5 flex-2 gap-3  justify-between items-center  "> 
                        <div className="flex flex-1  text-gray-700 items-center  justify-start text-center">
                            <img className="h-8 rotate-90 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                            <p className="text-xl font-bold text-center">Detail Employee</p>
                        </div>
                    </div>
    const left=<div id="left" className="flex bg-white w-full  flex-col  h-full  p-2 px-4 gap-4">    
                <div id="top" className="items-center justify-center flex flex-col flex-2 " >
                        <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="w-20 h-20 object-fill rounded-full " src="\pic\download (48).png" alt="" />
                        </div>
                        <div className="flex flex-col items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
                            <p className="font-bold text-gray-700  text-lg">Pristia Candra</p>
                            <p className="font-semibold text-gray-500  text-xs">3D Designer</p>
                        </div>
                        <div className="flex items-center gap-1.5 justify-center p-2 rounded hover:bg-slate-50">
                            <p className="font-bold px-6 py-0.5 bg-green-50  text-xs text-green-800 rounded-md">Active</p> 
                            <img className="h-5 opacity-50" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                        </div>
                </div> 
                <hr className="text-gray-200"/>  
                <div id="middle" className="items-start flex flex-col flex-1 " >
                        
                        <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-4 opacity-50" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                            <p className="font-semibold  text-xs text-gray-700 rounded-md">Some12email@gmail.com</p> 
                        </div>
                        <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-4 opacity-50" src="\svg\development-marketing-outline-svgrepo-com.svg" alt="" />
                            <p className="font-semibold  text-xs text-gray-700 rounded-md">0972334145</p> 
                        </div>
                        <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
                            <img className="h-4 opacity-50" src="\svg\home-1-svgrepo-com (1).svg" alt="" />
                            <p className="font-semibold  text-xs text-gray-700 rounded-md">GMT+07:00</p> 
                        </div>
                </div> 
                <hr className="text-gray-200"/> 
                <div id="bottom" className=" flex-2">
                    <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
                        <div>
                            <p className="font-semibold text-gray-400  text-xs">Department</p>
                            <p className="font-bold text-gray-700  text-xs">Designer</p>
                        </div>
                            <img className="h-5 rotate-270 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div> 
                    <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
                        <div>
                            <p className="font-semibold text-gray-400  text-xs">Office</p>
                            <p className="font-bold text-gray-700  text-xs">Unpixel Studio</p>
                        </div>
                            <img className="h-5 rotate-270 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div> 
                    <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
                        <div>
                            <p className="font-semibold text-gray-400  text-xs">Line Manager</p>
                            <div className="flex items-center gap-1.5 my-1.5">
                                <img className="w-8 h-8 object-fill rounded-full " src="\pic\download (48).png" alt="" />
                                <p className="font-bold text-gray-700  text-xs">Skylar Catzoni</p>
                            </div>
                        </div>
                            <img className="h-5 rotate-270 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div> 
                    <div className="flex bg-slate-800 text-white items-center  justify-center gap-1.5 px-5 py-3 rounded-md">
                        <p className="text-xs font-semibold">Action</p>
                        <img className="h-4" src="\svg\clock.svg" alt="" />
                    </div>
                </div>
             </div>  ;
    const top=   <div id="left" className="flex px-4 py-0 m-0 *:h-12 min-h-fit max-h-fit flex-1 gap-5 border-b border-gray-200 justify-start items-start  ">
                
                
                        <div className=" flex gap-2 border-green-700 px-2.5 border-b-3 items-center">
                                <p className="text-sm  font-semibold text-green-800">General</p>
                        </div>
                        <div className=" flex gap-2 border-white px-2.5 border-b-3 items-center">
                                <p className="text-sm  font-semibold text-gray-800">Job</p>
                        </div>
                        <div className=" flex gap-2 border-white px-2.5 border-b-3 items-center">
                                <p className="text-sm  font-semibold text-gray-800">Payroll</p>
                        </div>
                        <div className=" flex gap-2 border-white px-2.5 border-b-3 items-center">
                                <p className="text-sm  font-semibold text-gray-800">Documents</p>
                        </div>
                        <div className=" flex gap-2 border-white px-2.5 border-b-3 items-center">
                                <p className="text-sm  font-semibold text-gray-800">Setting</p>
                        </div>
                          
                        
                </div>
    const Personal_info=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">personal Info</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex gap-5 p-4 justify-start items-start flex-wrap  ">
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Full Name</p>
                                <p className="text-gray-700 font-semibold ">Pristia Candra Nelson</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Gender</p>
                                <p className="text-gray-700 font-semibold ">Female</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Date of Birth</p>
                                <p className="text-gray-700 font-semibold ">23 May 1997</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Marital Status</p>
                                <p className="text-gray-700 font-semibold ">-</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Nationality</p>
                                <p className="text-gray-700 font-semibold ">Ethiopian</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Personal TaxID</p>
                                <p className="text-gray-700 font-semibold ">-</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Email Adress</p>
                                <p className="text-gray-700 font-semibold ">someEmail@gmail.com</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Social Insurance</p>
                                <p className="text-gray-700 font-semibold ">-</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Health Insurance</p>
                                <p className="text-gray-700 font-semibold ">ABC Insurance</p>   
                            </div>
                            <div className="w-96 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Phone Number</p>
                                <p className="text-gray-700 font-semibold ">0972334145</p>   
                            </div>
                            
                        
                         
                        
                </div></div>
    const employment_info=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Address</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start   ">
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Employee Id</p>
                                <p className="text-gray-700 font-semibold ">UN1203</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Service Year</p>
                                <p className="text-gray-700 font-semibold ">3 years 7 months</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Join Date</p>
                                <p className="text-gray-700 font-semibold ">20 Aug 2019</p>   
                            </div>
                </div></div> 
    const Job_Timeline=<div className="border p-2 rounded-lg border-gray-200">
                            <div className="flex mx-4 py-4 ">
                                <p className="flex-1 text-xl font-semibold text-gray-700">Job Timeline</p>
                                <img className="h-6 opacity-25" src="\svg\plus_sign_to_represent_add_items.svg" alt="" />
                            </div>
                            <div className="flex px-4">
                                <table className=" flex-1 bg-white border-b border-gray-300 ">
                                    {table_header}
                                    {table_content}
                                </table>
                            </div>
                        </div> 
    const Address=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Address</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start   ">
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Primary address</p>
                                <p className="text-gray-700 font-semibold ">Addis Ababa, Ethiopia, Adisu Gebeya</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Country</p>
                                <p className="text-gray-700 font-semibold ">Ethiopia</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">State/Province</p>
                                <p className="text-gray-700 font-semibold ">Central Ethiopia</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">City</p>
                                <p className="text-gray-700 font-semibold ">Addis Ababa</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Post Code</p>
                                <p className="text-gray-700 font-semibold ">1000</p>   
                            </div>
                           
                        
                         
                        
                </div></div> 
    const Emergency_Contact=<div className="border p-2 rounded-lg border-gray-200">
                    <div className="flex mx-4 py-4 border-b border-gray-200">
                        <p className="flex-1 text-xl font-semibold text-gray-700">Emergency Contact</p>
                        <img className="h-5 opacity-25" src="\svg\fullscreen-exit-alt-svgrepo-com.svg" alt="" />
                    </div>
                   <div id="left" className="flex flex-col gap-5 p-4 justify-start items-start   ">
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Full Name</p>
                                <p className="text-gray-700 font-semibold ">Eyoooob Taaaye Abeeeebe</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Phone Number</p>
                                <p className="text-gray-700 font-semibold ">023564665</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">State/Province</p>
                                <p className="text-gray-700 font-semibold ">Central Ethiopia</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">City</p>
                                <p className="text-gray-700 font-semibold ">Addis Ababa</p>   
                            </div>
                            <div className="flex-1 flex gap-2  text-nowrap">
                                <p className="min-w-40 text-gray-400 ">Post Code</p>
                                <p className="text-gray-700 font-semibold ">1000</p>   
                            </div>
                           
                        
                         
                        
                </div></div> 
    const General=<div className="flex flex-col gap-8 scrollbar-hidden overflow-y-scroll">
        {Personal_info}
        {Address}
        {Emergency_Contact}
    </div>
    const Job=<div className="flex flex-col gap-8 scrollbar-hidden overflow-y-scroll">
        {employment_info}
        {Job_Timeline}
        {Job_Timeline}
    </div>

    const bottom= <div id="left" className="flex border border-gray-200 rounded-md flex-1 gap-5 p-4 justify-between items-center  ">
                
                
                        <div className="flex-1 flex gap-2 items-center">
                                <p className="text-sm  font-semibold text-gray-800">Mon-Fri, Duration 35 hours/week</p>
                        </div>
                        <div className="flex jus items-center">                                
                                <div className="flex py-0.5 px-1  bg-gray-300 text-gray-700 w-10 border border-gray-100 items-center-safe  justify-start gap-1.5  rounded-xl">
                                        <div className="bg-white rounded-full"><img className="h-4.5 rotate-12" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" /></div>
                                </div>
                                <img className="h-6 rotate-180 opacity-35" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                        </div>  
                        
                </div> 
    return (
          <div className="flex flex-col gap-4 w-full h-full justify-start  bg-gray-50 dark:bg-gray-300 ">
                <div className=" flex justify-evenly  "> 
                            {Header}
                </div>
                <div className="flex flex-1 gap-5 rounded-md h-full">
                        <div className="h-fit shadow rounded-xl overflow-clip w-1/4 "> 
                            {left}
                        </div>
                        <div className=" flex flex-col rounded-md shadow h-full flex-1 gap-8  p-4 bg-white "> 
                            {top}
                            {/* {General} */}
                            {Job}
                        </div>
                </div>
    </div>
    )
}