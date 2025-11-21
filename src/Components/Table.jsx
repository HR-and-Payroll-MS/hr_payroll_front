import React from "react";
import { useFormattedTableData } from "../utils/useFormattedTableData";
// import { useNavigate } from "react-router-dom";
import { usePagination } from "../Hooks/usePagination";
import { Pagination } from "./Pagination";
import ThreeDots from "../animations/ThreeDots";


function Table({ Data,URL, Structure, ke ,title=[], onRowClick,totPage=1}) {
  // const navigate = useNavigate();
  console.log(URL)
  const { data, page,setPage, totalPages, loading } = usePagination(URL,10,Data?Data:[],totPage)

  const handleRowClick = (rowData,index) => {
    // console.log("id: ",rowData,"  ,  index:",index)

    // navigate(`/hr_dashboard/users/${rowData}`, {state: rowData})
    if (onRowClick) {
      onRowClick(rowData)
    } else if(rowData.id){
      // navigate(`/users/${rowData.id}`, {state: rowData})
      // navigate(`/users/${rowData}`, {state: rowData})
    }
  }
  const bodyStructure = Structure;

  const tableStructure = (id, item) => {
    // (console.log("id ------>",id,"item------------->",item))
    switch (id) {
      case 1:
        return (
          <div className="flex w-full justify-between dark:text-slate-300 items-center">
            <p className="font-normal">{item[0]||"-"}</p>
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
        return <p>hy</p>;
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
console.log("Structured Data:", structuredData);
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
      <tr
        onClick={() => handleRowClick(i.at(-1),index)}
        key={ index}
        className="hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-sm text-gray-700"
      >
      {i.map((j, jndex) =>
  jndex !== i.length - 1 && (
    <td
      key={jndex}
      className="border-b border-gray-100 dark:border-gray-600 px-4 py-2"
    >
      {tableStructure(bodyStructure[jndex], j)}
    </td>
  )
)}

      </tr>
    ))}
  </tbody>
) : (
  <tbody>
    <tr>
      <td colSpan={9} className="text-center text-gray-500 py-4 border border-slate-300">
        No users found
      </td>
    </tr>
  </tbody>
);


  return (
    <div className="flex-1 flex flex-col overflow-y-scroll scrollbar-hidden overflow-hidden">
      <table className="bg-white  dark:bg-slate-800 border-b border-gray-300 w-full">
        {table_header}
        {table_content}
      </table> 
      <Pagination page = {page} totalPages = {totalPages} onPageChange={setPage}/> 
    </div>
  );
}

export default Table;

































  
