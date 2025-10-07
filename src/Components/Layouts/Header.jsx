export default function Header(){
        return <div className={`bg-white flex justify-evenly shadow h-14 gap-3 z-50 dark dark:bg-slate-800 dark:text-white `}> 
        <div id="left" className="flex py-2.5 w-2/5  justify-between items-center p-4 ">
            <div className={`flex items-center gap-1.5 justify-between bg-gray-100 w-full h-full px-1.5 rounded-md dark dark:bg-slate-700 `}>
                <div className="flex items-center gap-1.5 px-2.5 py-2 h-full">
                    <img className="h-4 opacity-45" src="\svg\search-svgrepo-com.svg" alt="" />
                    <input className=" h-full rounded w-full" type="email" name="email" id="email" placeholder="search anything..." />
                </div>
                <div className={`flex bg-white items-center justify-center gap-1.5 px-1.5 rounded-md dark dark:bg-slate-700 `}>
                    <p className="text-lg font-bold">x</p>
                    <p className="text-sm font-bold">F</p>
                </div>
            </div>

        </div>
        <div id="middle" className="flex w-3/5 justify-start gap-7 items-center ">
                <p className={`font-semibold text-gray-700  text-sm dark dark:font-slate-300 dark:text-slate-300 `}>Documents</p>
                <p className={`font-semibold text-gray-700  text-sm dark dark:font-slate-300 dark:text-slate-300 `}>News</p>
                <p className={`font-semibold text-gray-700  text-sm dark dark:font-slate-300 dark:text-slate-300 `}>Payslip</p>
                <p className={`font-semibold text-gray-700  text-sm dark dark:font-slate-300 dark:text-slate-300 `}>Report</p>
        </div>
        <div id="right" className="flex w-1/5 justify-evenly items-center ">
                <img className="h-6" src="\svg\notification-bell-on-svgrepo-com.svg" alt="" />
                <img className="h-6" src="\svg\message-square-lines-svgrepo-com.svg" alt="" />
                <div className="flex items-center">
                    <img className="h-6 w-6 rounded-full" src="\pic\download (48).png" alt="" />
                    <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                </div>
        </div>
    
    </div>
}