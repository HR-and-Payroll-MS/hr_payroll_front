import React from "react";
import { useFormattedTableData } from "../utils/useFormattedTableData";
import { useNavigate } from "react-router-dom";


function Table({ data, Structure, ke ,title=[], onRowClick}) {
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    console.log(rowData)
    navigate(`/hr_dashboard/users/${rowData}`, {state: rowData})
    if (onRowClick) {
      onRowClick(rowData)
    } else if(rowData.id){
      // navigate(`/users/${rowData.id}`, {state: rowData})
      navigate(`/users/${rowData}`, {state: rowData})
    }
  }
  const bodyStructure = Structure;

  const tableStructure = (id, item) => {
    // (console.log("id ------>",id,"item------------->",item))
    switch (id) {
      case 1:
        return (
          <div className="flex w-full justify-between dark:text-slate-300 items-center">
            <p className="font-normal">{item[0]}</p>
          </div>
        );

      case 3:
        return (
          <div className="flex w-full justify-start items-center gap-2">
            <img
              className="h-6 w-6 rounded-full"
              src={item[0] || "/pic/download (48).png"}
              alt=""
            />
            <div className="flex flex-col items-start">
              <p className="font-semibold text-gray-700 dark:text-slate-200 text-sm">
                {item[1]}
              </p>
              <p className="font-normal text-gray-500 dark:text-slate-400 text-xs">
                {item[2]}
              </p>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="flex w-full justify-start items-center">
            <p className="font-semibold text-gray-500 text-xs dark:text-slate-100">
              {item[0] || "Header"}
            </p>
          </div>
        );


      default:
        return null;
    }
  };
  const table_header = (
      <thead className="bg-slate-100 sticky top-0 dark:bg-slate-700 rounded-xl">
         <tr>
           {title.map((id, i) => (
            <th key={i} className="px-4 py-3 text-left">
               {tableStructure(11,[id])}
             </th>
          ))}
        </tr>
      </thead>
    );
  const structuredData = useFormattedTableData(data, Structure, ke);

  const table_content = structuredData.length>0? (
    <tbody>
      {structuredData.map((i, index) => (
        <tr onClick={()=>handleRowClick(index)} key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm text-gray-700">
          {i.map((j, jndex) => (
            <td key={jndex} className="border-b border-gray-100 dark:border-gray-600 px-4 py-2">
              
              {tableStructure(bodyStructure[jndex], j)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  ):(
     <tr>
        <td colSpan={9} className="text-center text-gray-500 py-4 border border-slate-300">
            No users found
        </td>
     </tr>
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-hidden overflow-hidden">
      <table className="bg-white dark:bg-slate-800 border-b border-gray-300 w-full">
        {table_header}
        {table_content}
      </table>
    </div>
  );
}

export default Table;








// case 2:
//   return (
//     <div className="flex w-full justify-between items-center">
//       <p className="font-semibold">{item.country}</p>
//       <img
//         className="h-4 opacity-25"
//         src="/svg/location.svg"
//         alt="location"
//       />
//     </div>
//   );
//       case 4:
//         return (
//           <div className="flex w-full justify-start items-center gap-2">
//             <input type="checkbox" />
//             <img
//               className="h-6 w-6 rounded-full"
//               src={item.avatar || "/pic/download (48).png"}
//               alt=""
//             />
//             <div className="flex flex-col items-start">
//               <p className="font-semibold text-gray-700 dark:text-slate-200 text-sm">
//                 {item.name}
//               </p>
//               <p className="font-normal text-gray-500 dark:text-slate-400 text-xs">
//                 {item.email}
//               </p>
//             </div>
//           </div>
//         );
      
//       case 51:
//         return (
//           <div className="text-green-700 bg-green-50 py-0.5 text-center rounded-md">
//             <p>{item.status}</p>
//           </div>
//         );

//       case 52:
//         return (
//           <div className="flex items-center gap-1.5 justify-center p-2 rounded hover:bg-slate-50">
//             <p
//               className={`font-bold px-6 py-0.5 text-xs rounded-md ${
//                 item.status === "Active"
//                   ? "bg-green-50 text-green-800"
//                   : "bg-red-50 text-red-800"
//               }`}
//             >
//               {item.status}
//             </p>
//             <img
//               className="h-5 opacity-50"
//               src="/svg/down-arrow-5-svgrepo-com.svg"
//               alt=""
//             />
//           </div>
//         );

//       case 61:
//         return (
//           <div className="flex justify-center gap-1.5 items-center">
//             <div className="p-1.5 bg-blue-800 rounded-md">
//               <img className="h-4 opacity-25" src={item.icon} alt="" />
//             </div>
//           </div>
//         );

//       case 62:
//         return (
//           <div className="flex justify-center gap-1.5 items-center">
//             {item.icons.map((ic, idx) => (
//               <div key={idx} className="p-1.5 bg-blue-800 rounded-md">
//                 <img className="h-4 opacity-25" src={ic.icon} alt="" />
//               </div>
//             ))}
//           </div>
//         );

      
      // case 22:
      //   return (
      //     <div className="flex justify-between items-center w-full">
      //       <p className="font-semibold text-gray-500 text-xs dark:text-slate-100">
      //         {item?.label || "Header"}
      //       </p>
      //       <img
      //         className="h-5 opacity-25"
      //         src="/svg/down-arrow-5-svgrepo-com.svg"
      //         alt=""
      //       />
      //     </div>
      //   );

      // case 33:
      //   return (
      //     <div className="flex justify-between items-center w-full">
      //       <div className="flex gap-1.5">
      //         <input type="checkbox" />
      //         <p className="font-semibold text-gray-500 text-xs dark:text-slate-100">
      //           {item?.label || "Header"}
      //         </p>
      //       </div>
      //       <img
      //         className="h-5 opacity-25"
      //         src="/svg/down-arrow-5-svgrepo-com.svg"
      //         alt=""
      //       />
      //     </div>
      //   );





























































  
