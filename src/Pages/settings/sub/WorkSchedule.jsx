export default function WorkSchedule(){
    const header=<div className="flex gap-2">
                    <p className="text-xl flex-1 font-semibold">Work Schedule</p>
                    <div className="flex items-center w-1/3  px-1.5 border border-gray-200 rounded-md">
                        <div className="flex text-xs  w-full items-center justify-between px-2.5 py-2.5 h-full">
                            <input className=" h-full  rounded w-full" type="email" name="email" id="email" placeholder="Search job title" />
                            <img className="h-3.5 opacity-45" src="\svg\search-svgrepo-com.svg" alt="" />
                        </div>
                    
                    </div>
                    <div className="flex bg-slate-800 text-white items-center w-fit  justify-start gap-1.5 px-5 py-3 rounded-md">
                       <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                       <p className="text-xs font-semibold">Save</p>
                    </div>
                </div>
    const top=   <div id="left" className="flex p-4 flex-1 gap-5 border-b border-gray-200 justify-between items-center  ">
                
                
                        <div className="flex-1 flex gap-2 items-center">
                                <p className="text-sm  font-semibold text-gray-800">Mon-Fri, Duration 40 hours/week</p>
                                <p className=" px-3 rounded-md text-xs py-1 text-gray-500 font-semibold bg-gray-100">Default</p>
                        </div>
                        <div className="flex jus items-center">                                
                                <div className="flex py-0.5 px-1  bg-green-600 text-gray-700 w-10 border border-gray-100 items-center-safe  justify-end gap-1.5  rounded-xl">
                                        <div className="bg-white rounded-full"><img className="h-4.5 rotate-12" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" /></div>
                                </div>
                                <img className="h-6" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                        </div>  
                        
                </div>
    const middle=<div id="left" className="flex flex-1 gap-4 p-4 justify-between items-start  ">
                        <div className="w-1/3 flex flex-col gap-2">
                                <p className="text-sm text-gray-400 ">Standard working hours/day</p>
                                <p className="text-sm text-gray-400 ">Effective from</p>
                                <p className="text-sm text-gray-400 ">Schedule type</p>
                                <p className="text-sm text-gray-400 ">Standard working hours/week</p>
                                <p className="text-sm text-gray-400 ">Daily working hours</p>
                                
                        </div>
                        <div className="w-2/3 flex flex-col gap-2">
                                <p className="w-24 text-sm font-semibold">8h 00m</p>
                                <p className="w-24 text-sm font-semibold">01 Jan 2023</p>
                                <p className="w-24 text-sm font-semibold">Duration based</p>
                                <p className="w-24 text-sm font-semibold">40h 00m</p>
                                <div className="flex gap-2">
                                    <p className="w-24 text-sm font-semibold">Monday</p>
                                    <p className="text-sm text-gray-400">8h 00m</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="w-24 text-sm font-semibold">Tuseday</p> 
                                    <p className="text-sm text-gray-400">8h 00m</p> 
                                </div>
                                <div className="flex gap-2"> 
                                    <p className="w-24 text-sm font-semibold">Wednesday</p>
                                    <p className="text-sm text-gray-400">8h 00m</p>
                                </div>
                                <div className="flex gap-2"> 
                                    <p className="w-24 text-sm font-semibold">Thursday</p>
                                    <p className="text-sm text-gray-400">8h 00m</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="w-24 text-sm font-semibold">Friday</p> 
                                    <p className="text-sm text-gray-400">8h 00m</p> 
                                </div>
                        </div>  
                        
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
        <div className="flex flex-col w-full p-8 gap-2.5 ">
                {header}
                <hr className="opacity-5"/>
                <div className="flex border border-gray-200 rounded-md flex-col gap-2">{top}
                        {middle}
                </div>
                {bottom}





            
                


        </div>
    )
}