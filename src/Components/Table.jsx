import React from 'react'

function Table({data,bodyStructure,headerStructure}) {
 const header3=<div className="flex w-full justify-between items-center ">
                        <div className="flex gap-1.5">
                            <input className="" type="checkbox" name="remember me" id="rememberme" />
                            <p className={`font-semibold text-gray-500  text-xs  dark:text-slate-200`}>Employee Name</p>
                        </div>    
                            <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
 const header1=<div className="flex w-full justify-between items-center ">
                            <p className={`font-semibold text-gray-500  text-xs  dark:text-slate-300`}>Job Title</p>
                    </div>
 const header2=<div className="flex w-full justify-between items-center ">
                            <p className={`font-semibold text-gray-500  text-xs  dark:text-slate-300`}>Job Title</p>
                            <img className="h-5 opacity-25" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                    </div>
 const four=<div className="flex  w-full justify-start items-center gap-2 ">
                        <input className="" type="checkbox" name="remember me" id="rememberme" />
                        <img className="h-6 w-6 rounded-full" src="\pic\download (48).png" alt="" />
                        <div className="flex flex-col items-start gap-0 justify-center ">
                            <p className="font-semibold dark:text-slate-200 text-gray-700  text-sm">Pristia Candira</p>
                            <p className="font-normal dark:text-slate-400 text-gray-500  text-xs">et8302tn@gmail.com</p>
                        </div>
                    </div>
 const two=<div className="flex w-full justify-between items-center ">
              <p className="font-semibold">Mexico</p>
              <img className="h-4 opacity-25" src="\svg\location.svg" alt="" />
            </div>
 const three= <div className="flex  w-full justify-start items-center gap-2 ">
                            <img className="h-6 w-6 rounded-full" src="\pic\download (48).png" alt="" />
                            <div className="flex flex-col items-start gap-0 justify-center ">
                                <p className={` dark:text-slate-300  font-semibold text-gray-700  text-sm `}>Pristia Candira</p>
                                <p className={` dark:text-slate-500  font-normal text-gray-300  text-xs `}>et8302tn@gmail.com</p>
                            </div>
                        </div>
 const one=<div className="flex w-full justify-between items-center ">
                            <p className="font-semibold">2h</p>
                    </div>
 const status={one: <div className="text-green-700 bg-green-50 py-0.5 text-center rounded-md"><p>Approve</p></div>,
               two:<div className="flex items-center gap-1.5 justify-center p-2 rounded hover:bg-slate-50">
                            <p className="font-bold px-6 py-0.5 bg-green-50  text-xs text-green-800 rounded-md">Active</p> 
                            <img className="h-5 opacity-50" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
                        </div>}
 const action={one:<div className="flex w-full justify-center gap-1.5 items-center ">
                            <div className="p-1.5 bg-blue-800 rounded-md">
                                <img className="h-4 opacity-25" src="\svg\date-2-svgrepo-com.svg" alt="" />
                            </div>
                    </div>,
               two: <div className="flex w-full justify-center gap-1.5 items-center ">
                                <div className="p-1.5 bg-blue-800 rounded-md">
                                    <img className="h-4 opacity-25" src="\svg\date-2-svgrepo-com.svg" alt="" />
                                </div>
                                <div className="p-1.5 bg-red-800 rounded-md">
                                    <img className="h-4 opacity-25" src="\svg\date-2-svgrepo-com.svg" alt="" />
                                </div>
                        </div>}
const tableStructure=(data)=>{
    if(data === 1)return one;
    else if(data===2)return two;
    else if(data===3)return three;
    else if(data===4)return four;
    else if(data===51)return status.one;
    else if(data===52)return status.two;
    else if(data===61)return action.one;
    else if(data===62)return action.two;
    else if(data===11)return header1;
    else if(data===22)return header2;
    else if(data===33)return header3;
 }
 const table_content=<tbody>
            {
                data.map((data,i)=>
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm text-gray-700">
                    {bodyStructure.map((id,j)=>
                    <td key={j} className="border-b border-gray-100 dark:border-gray-600 dark:text-slate-400 px-4 py-2">
                        {tableStructure(id)}
                    </td>)}
                
            </tr>)
            }
            
        </tbody>

const table_header=<thead className={`bg-slate-100 dark:bg-slate-700  rounded-xl`}>
    
                    <tr className="justify-evenly">
                    {headerStructure.map((dat,i)=>
                        <th key={i} className=" px-4 py-3">{tableStructure(dat)}</th>)}
                    </tr>
                  </thead>
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-hidden overflow-hidden">
                <table className={`  bg-white  dark:bg-slate-800 border-b border-gray-300 `}>
                    {table_header}{table_content}</table>
                
                
            </div>
  )
}

export default Table