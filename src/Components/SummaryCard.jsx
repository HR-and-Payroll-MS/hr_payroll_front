
import React from 'react'
import Icon from './Icon'

function SummaryCard({data,classname="bg-white text-slate-800"}) {
     data=[
        {
            Title:"Total Employee",
            data:234234,
            and:"employees",
            logo:"Calendar",
            color:"bg-blue-500"
        },
        {
            Title:"Pending Leave Request",
            data:23,
            and:"requests",
            logo:"Calendar",
            color:"bg-green-500"
        },
        {
            Title:"Payroll This Month",
            data:4234,
            and:"$",
            logo:"Calendar",
            color:"bg-amber-500"
        },
        {
            Title:"Department Count",
            data:234234,
            and:"Departments",
            logo:"Calendar",
            color:"bg-indigo-500"
        },
    ]

  const List =<div id="left" className="flex py-2.5 flex-2 gap-3  justify-between items-center  ">
    { data.map((info ,index)=>

      <div key={index}  className={` group flex ${classname}  overflow-hidden hover:cursor-pointer  dark:bg-slate-800  shadow flex-1 flex-col dark:text-slate-300 text-gray-700 border dark:border-slate-700 border-gray-100 items-start  justify-start gap-5 px-5 py-4 rounded-md relative`}>
        <div className="flex  w-full justify-between ">
          <p className="text-md font-bold">{info.Title}</p>
          <Icon name={info.logo}/>
        </div>
        <p className="text-xs font-normal">{info.data} {info.and}</p>
        <span className={` absolute left-1/2 bottom-0 w-0 h-[3px] ${info.color} transition-all duration-500 group-hover:w-full group-hover:left-0`}></span>
      </div>
    )
    }
    </div>

  return (
    <>{List}</>
  )
}

export default SummaryCard