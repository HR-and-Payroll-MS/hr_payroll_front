export default function ManageEmployee(){
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
    return (
          <div className="flex flex-col gap-4 w-full h-full justify-start bg-gray-50 dark:bg-gray-300 ">
                <div className=" flex justify-evenly  "> 
                            {Header}
                </div>
                <div className="flex flex-1 gap-5 rounded-md">
                        <div className="h-full shadow rounded-xl overflow-clip w-1/4 "> 
                            {left}
                        </div>
                        <div className=" flex rounded-md shadow flex-1 h-fit bg-white "> 
                         
                        </div>
                </div>
    </div>
    )
}