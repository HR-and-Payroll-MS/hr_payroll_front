import React from 'react'

function SuggestionBox({ suggestions = [], onSelect }) {
  if (!suggestions.length) return null

  return (
    <ul className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-md mt-1 shadow-lg z-20 max-h-60 overflow-y-auto">
      {suggestions.map((item, index) => (
        <li
          key={index}
          onClick={() => onSelect(item)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer text-sm text-gray-800 dark:text-slate-200"
        >
          {item.name || item.title || item.toString()}
        </li>
      ))}
    </ul>
  )
}

export default SuggestionBox






// import React from 'react'

// function SuggestionBox({suggestions=[], onSelect}) {
//     if(!suggestions.length) return null;
//   return (
//     <ul>
//         {suggestions.map((item, index)=>(
//             <li key = {index} onClick={()=> onSelect(item)} className='p-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800'>
//                 {item.name || item.title || item.toString()}
//             </li>
//         ))}
//     </ul>
//   )
// }

// export default SuggestionBox