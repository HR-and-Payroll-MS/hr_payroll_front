import React from "react";
import { useFormattedTableData } from "../utils/useFormattedTableData";
import { usePagination } from "../Hooks/usePagination";
import { Pagination } from "./Pagination";
import ThreeDots from "../animations/ThreeDots";
import TableStructures from "./TableStructures";
function Table({ Data,URL,onRowClickInside, Structure, ke,clickable=true,components ,title=[], onRowClick,totPage=1,nickname="view",D1}) {
  const { data, page,setPage, totalPages, loading } = usePagination(URL,10,Data?Data:[],totPage)
  const handleRowClick = (rowData,index,data) => {
    if (onRowClick) {
      onRowClick(rowData,index,data)
      // onRowClick(rowData,index)
    } else if(rowData.id){
    }
  }
  const bodyStructure = Structure;
  const table_header = (
      <thead className="bg-slate-100 sticky top-0 dark:bg-slate-700 rounded-xl">
         <tr>
           {title.map((id, i) => (
            <th key={i} className="px-4 py-3 text-left">
               {/* {tableStructure(11,[id])} */}
               <TableStructures id={11} item={[id]}/>
             </th>
          ))}
        </tr>
      </thead>
    );
  const structuredData = useFormattedTableData(data, Structure, ke);
 const table_content = loading ? (
  <tbody>
    <tr>
      <td colSpan={9} className="text-center py-4">
        
              <div className="flex justify-center items-center h-64">
                <ThreeDots />
              </div>
      </td>
    </tr>
  </tbody>
) : structuredData.length > 0 ? (
  <tbody>
  {structuredData.map((i, index) => (
    // <tr key={index} {...(clickable && { onClick: () => handleRowClick(i,index),})} className={`${clickable ? "cursor-pointer" : ""} hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm text-gray-700 `}>
    //   {i.map((j, jndex) =>
    //     jndex !== i.length - 1 && (
    //       <td key={jndex}  className="border-b border-gray-100 dark:border-gray-600 px-4 py-2">
    //         <TableStructures nickname={nickname} rawData={Data} Comps={components} data={data[index]} D1={D1} id={bodyStructure[jndex]} item={j} />
    //       </td>
    //     )
    //   )}
    // </tr>
    <tr key={index} {...(clickable && { onClick: () => handleRowClick(i.at(-1), index,data),})} className={`${clickable ? "cursor-pointer" : ""} hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm text-gray-700 `}>
      {/* {console.log("Row data for click:",i)} */}
      {i.map((j, jndex) =>
        jndex !== i.length - 1 && (
          <td key={jndex} className="border-b border-gray-100 dark:border-gray-600 px-4 py-2">
            <TableStructures nickname={nickname} rawData={Data} Comps={components} data={data[index]} D1={D1} id={bodyStructure[jndex]} item={j} />
          </td>
        )
      )}
    </tr>
  ))}
</tbody>
) : (
  <tbody>
    <tr>
      <td colSpan={9} className="text-center text-gray-500 py-4 ">
        No users found
      </td>
    </tr>
  </tbody>
);
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-hidden overflow-hidden">
      <table className="bg-white  dark:bg-slate-800  border-gray-300 w-full">
        {table_header}
        {table_content}
      </table> 
      <Pagination page = {page} totalPages = {totalPages} onPageChange={setPage}/> 
    </div>
  );
}
export default Table;

































  
