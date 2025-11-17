import React from 'react'

function SuggestionBox({ suggestions = [], onSelect }) {
  if (!suggestions.length) return null

  return (
    <ul className="absolute top-full left-0 w-full min-w-fit bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-md mt-1 shadow-lg z-20 max-h-60 overflow-y-auto scrollbar-hidden">
      {suggestions.map((item, index) => (
        <div onClick={() => onSelect(item)} key={item.id} className="flex p-2 w-full justify-start items-center hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer">
            <img
              className="h-4 w-4 rounded-full"
              src={item[0] || "/pic/download (48).png"}
              alt=""
            />
            <div className="flex flex-col items-start">
              <p className="font-normal text-gray-700 dark:text-slate-200 text-xs">
                {item.full_name} • <span className='text-gray-500 dark:text-slate-400'>{item.email}</span>
              </p>
              <p className="font-normal text-gray-500 dark:text-slate-400 text-xs">
                {item.employee_id} • {item.status}
              </p>
            </div>
          </div>

      ))}
    </ul>
  )
}

export default SuggestionBox