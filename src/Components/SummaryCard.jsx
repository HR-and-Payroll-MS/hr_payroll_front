
import React from 'react'

function SummaryCard({dat}) {
    const data=[
        {
            Title:"Total Employee",
            data:234234,
            and:"employees",
            logo:"\\svg\\date-2-svgrepo-com.svg"
        },
        {
            Title:"Pending Leave Request",
            data:23,
            and:"requests",
            logo:"\\svg\\date-2-svgrepo-com.svg"
        },
        {
            Title:"Payroll This Month",
            data:4234,
            and:"$",
            logo:"\\svg\\date-2-svgrepo-com.svg"
        },
        {
            Title:"Department Count",
            data:234234,
            and:"Departments",
            logo:"\\svg\\date-2-svgrepo-com.svg"
        },
    ]

  const List =<div id="left" className="flex py-2.5 flex-2 gap-3  justify-between items-center  ">
    { data.map((info ,index)=>

      <div key={index}  className={`flex  dark:bg-slate-800 bg-white shadow flex-1 flex-col dark:text-slate-300 text-gray-700 border dark:border-slate-700 border-gray-100 items-start  justify-start gap-5 px-5 py-4 rounded-md `}>
        <div className="flex  w-full justify-between ">
          <p className="text-md font-bold">{info.Title}</p>
          <img
            className="h-4 opacity-15 "
            src={info.logo}
            alt=""
          />
        </div>
        <p className="text-xs font-normal">{info.data} {info.and}</p>
      </div>
    )
    }
    </div>

  return (
    <>{List}</>
  )
}

export default SummaryCard