import React from 'react'
import Icon from './Icon'

export const Pagination=({ page, totalPages, onPageChange})=> {
  return (
    <div id="middle" className="flex  justify-between py-2 items-center ">
                
                <div className="flex items-center  gap-1.5">
                    <button onClick={()=>onPageChange(page - 1)} disabled={page === 1} className={` dark:border-slate-700 py-1.5 dark:hover:bg-slate-600 hover:bg-slate-200 px-1 border-gray-100 shadow-2xl border h-full`}>
                        <Icon name={"ChevronLeft"} className="w-4 h-4 text-slate-700 dark:text-slate-300"/>
                    </button>
                    {
                        [...Array(totalPages)].map((_, i)=>(

                            <button
                                key={i}
                                className={`${i + 1 === page ? 'bg-slate-700 dark:bg-slate-600 dark:text-slate-200 text-white':'hover:bg-slate-300 dark:hover:bg-slate-600'}  dark:border-slate-700 dark:text-slate-300 font-semibold py-1 px-2 border-gray-100 shadow-2xl border text-gray-500  text-xs items-center`}
                                onClick={()=>onPageChange(i + 1)}
                                >
                                    {i + 1}
                            </button>

                        ))
                    }

                    
                    <button onClick={()=>onPageChange(page + 1)} disabled={page === totalPages}  className={` dark:hover:bg-slate-600 hover:bg-slate-200 dark:border-slate-700 dark:text-slate-300 py-1.5 px-1 border-gray-100 shadow-2xl border h-full`}> 
                        <Icon name={"ChevronRight"} className="w-4 h-4 text-slate-700 dark:text-slate-300"/>
                    </button>
                </div>

                {/* <div className="flex items-center gap-1.5">
                    <p className={` dark:text-slate-300 font-semibold text-gray-500  text-xs`}>Showing 1 to 8 of 8 entries</p>
                    <button className={` dark:border-slate-700 flex items-center py-1.5 px-2 border border-gray-100 rounded`}>
                        <p className={` dark:text-slate-300 font-semibold text-gray-700  text-xs`}>Show 8</p>
                        <Icon name={"ChevronUp"} className="w-4 h-4 text-slate-700 dark:text-slate-300"/>
                    </button>
                </div> */}
        </div>
  )
}




/* 
    ........................... using inside component ..................................

    import {usePagination} from 'the path'
    const { data:users, page,setPage, totalPages, loading } = usePagination("/api/users",10)

    return (

        <div>
            {
                loading ? 
                    (loading animation):
                    (
                        <table>
                            <thead>
                                .....
                            <thead>
                            <tbody>
                                {users.map((u)=>(
                                        <tr key = u.id>.....{u.name}</tr>
                                    ))}
                            </tbody>
                        </table>
                    )
            }
            <Pagination page = {page} totalPages = {totalPages} onPageChange={setPage}/>
        </div>
    
    )

*/