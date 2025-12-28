import React from "react";

function priorityColor(p) {
  switch (p) {
    case "Urgent": return "bg-red-600 text-white";
    case "High": return "bg-orange-500 text-white";
    case "Normal": return "bg-blue-600 text-white";
    default: return "bg-gray-200 text-gray-800";
  }
}

export default function AnnouncementCard({ announcement, onOpen }) {
  const { title, body, priority, audience, createdAt, reads, totalRecipients } = announcement;
  return (
    <div className="p-4 bg-white dark:bg-slate-900 shadow rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border border-transparent hover:border-blue-200 transition" onClick={onOpen}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded ${priorityColor(priority)}`}>{priority}</span>
            <h3 className="text-base dark:text-slate-200 font-semibold">{title}</h3>
          </div>
          <div className="text-sm dark:text-slate-400 text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: body }}/>
          <div className="mt-2 text-xs text-gray-400">
            {audience} • {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div className="font-medium text-gray-700 dark:text-gray-300">{reads} / {totalRecipients}</div>
          <div>read</div>
        </div>
      </div>
    </div>
  );
}
































// import React from "react";

// function priorityColor(p) {
//   switch (p) {
//     case "Urgent": return "bg-red-600 text-white";
//     case "High": return "bg-orange-500 text-white";
//     case "Normal": return "bg-blue-600 text-white";
//     case "Low": return "bg-gray-300 text-gray-800";
//     default: return "bg-gray-200 text-gray-800";
//   }
// }

// export default function AnnouncementCard({ announcement, onOpen }) {
//   const { title, body, priority, audience, createdAt, reads, totalRecipients } = announcement;
//   return (
//     <div className="p-4 bg-white dark:inset-shadow-xs dark:inset-shadow-amber-50/15 dark:bg-slate-900 shadow rounded dark:hover:bg-slate-700 hover:bg-slate-50  cursor-pointer" onClick={onOpen}>
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex-1">
//           <div className="flex items-center gap-2">
//             <span className={`px-2 py-0.5 text-xs rounded ${priorityColor(priority)}`}>{priority}</span>
//             <h3 className="text-lg dark:text-slate-200 font-medium">{title}</h3>
//           </div>
//           {/* <p >{body}</p> */}
          
//          <div className="text-sm dark:text-slate-600 text-gray-600 mt-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: body }}/>
//           <div className="mt-3 text-xs dark:text-slate-500 text-gray-500">To: {audience} • {new Date(createdAt).toLocaleDateString()}</div>
//         </div>
//         <div className="text-right text-xs dark:text-slate-500 text-gray-500">
//           <div>{reads} / {totalRecipients} read</div>
//         </div>
//       </div>
//     </div>
//   );
// }
