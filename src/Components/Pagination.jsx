import React from 'react'
import Icon from './Icon'

function Pagination() {
  return (
    <div id="middle" className="flex  justify-between  items-center ">
                
                <div className="flex items-center  gap-1.5">
                    <div className={` dark:border-slate-700 py-1.5 hover:bg-slate-200 px-1 border-gray-100 shadow-2xl border h-full`}>
                        <Icon name={"ChevronLeft"} className="w-4 h-4 text-slate-700 dark:text-slate-300"/>
                    </div>
                    <p className={`  dark:border-slate-700 dark:text-slate-300 font-semibold py-1 px-2 border-gray-100 shadow-2xl hover:bg-slate-200 border text-gray-500  text-xs`}>1</p>
                    <p className={`  dark:border-slate-700 dark:text-slate-300 font-semibold py-1 px-2 border-gray-100 shadow-2xl border text-gray-500  text-xs items-center`}>...</p>
                    <p className={`  dark:border-slate-700 dark:text-slate-300 font-semibold py-1 px-2 border-gray-100 shadow-2xl border hover:bg-slate-200 text-gray-700  text-xs`}>2</p>
                    <div className={`  dark:border-slate-700 dark:text-slate-300 py-1.5 px-1 border-gray-100 shadow-2xl border h-full`}> 
                        <Icon name={"ChevronRight"} className="w-4 h-4 text-slate-700 dark:text-slate-300"/>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <p className={` dark:text-slate-300 font-semibold text-gray-500  text-xs`}>Showing 1 to 8 of 8 entries</p>
                    <div className={` dark:border-slate-700 flex items-center py-1.5 px-2 border border-gray-100 rounded`}>
                        <p className={` dark:text-slate-300 font-semibold text-gray-700  text-xs`}>Show 8</p>
                        <Icon name={"ChevronUp"} className="w-4 h-4 text-slate-700 dark:text-slate-300"/>
                    </div>
                </div>
        </div>
  )
}

export default Pagination