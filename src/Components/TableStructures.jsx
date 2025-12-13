import React, { useState } from 'react'
import Icon from './Icon';
import FileDrawer from './FileDrawer';
import Drawer from './Drawer';
import AttendanceCorrectionPage from '../Pages/HR_Manager/Attendance/AttendanceCorrectionPage';
import PayrollReportDrawer from '../Pages/HR_Manager/payroll_management/PayrollReportDrawer';
import DocumentList from './DocumentList';
// import { BASE_URL } from '../api/axiosInstance';
function EmptyComponent() {
  return <div>No component provided</div>;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;
function TableStructures({data="",id,D1, item,Comps = EmptyComponent,nickname,rawData}) {

  const [isModalOpen,setModalOpen] =useState(false);
  const openModal =()=>setModalOpen(true);
  const deleteItem = () => console.log("deleted",data)
    // (console.log("id ------>",id,"item------------->",item))
    switch (id) {
      case 1:
        return (
          <div className="flex w-full justify-between dark:text-slate-300 items-center">
            <p className="font-semibold">{item[0]||"-"}</p>
          </div>
        );
      case 3:
        return (
          <div className="flex w-full justify-start items-center gap-2">

            {item[0]?(
              <img className="h-6 w-6 rounded-full" 
              src={`${BASE_URL}${item[0]}`}
  
              alt=""
            />):(
            
            <div className='rounded-full bg-slate-800 dark:bg-slate-600 text-slate-100 h-7 w-7 text-center items-center flex justify-center' >
                  {(item[1] ?? "")
                    .split(" ")
                    .map(n => n[0])
                    .slice(0, 2)
                    .join("") || "NA"}
                            
              </div>)}
            <div className="flex flex-col items-start ">
              <p className="font-semibold text-gray-700 dark:text-slate-200 text-sm">
                {item[1]}
              </p>
              <p className="font-normal text-gray-500 dark:text-slate-400 text-xs">
                {item[2]}
              </p>
            </div>
          </div>



//   <div className="flex w-full justify-start items-center gap-2">

//            {item[0] ? (
//   <img
//     className="h-6 w-6 rounded-full"
//     src={`${BASE_URL}${item[0]}`}
//     alt=""
//   />
// ) : (
//   <div className="rounded-full bg-slate-800 dark:bg-slate-600 text-slate-100 h-7 w-7 text-center items-center flex justify-center">
//     {(item[1] ?? "")
//       .split(" ")
//       .map(n => n[0])
//       .slice(0, 2)
//       .join("") || "NA"}
//   </div>
// )}


        );
      case 11:
        return (
          <div className="flex w-full justify-start items-center">
            <p className="font-semibold text-gray-500  text-xs  dark:text-slate-200">
              {item[0] || "Header"}
            </p>
          </div>
        );
      case 61:
        return(
            <div className="flex w-full justify-center gap-1.5 items-center ">
                            <div onClick={openModal} className="p-1.5 bg-blue-800 rounded-md hover:bg-slate-900 hover:cursor-pointer *:scrollbar-hidden">
                                <Icon name={"Eye"} className="text-slate-50 h-4 w-4"/>
                                { isModalOpen&& (<FileDrawer transparency={"bg-slate-900/30 dark:bg-slate-900/20"} width='w-1/2' isModalOpen={isModalOpen} closeModal={setModalOpen}>
                                         <AttendanceCorrectionPage staticUserData={data}/>
                                </FileDrawer>)}
                            </div>
                            
                    </div>
        );
      case 62:
        return(
          <div className="flex w-full  gap-1.5 items-center ">
                          <div onClick={deleteItem} className="p-1.5 bg-red-600 rounded-md hover:bg-red-900 hover:cursor-pointer *:scrollbar-hidden">
                              <Icon name={"Trash"} className="text-slate-50 h-4 w-4"/>
                          </div>



                            <div onClick={openModal} className="p-1.5 bg-blue-800 rounded-md hover:bg-slate-900 hover:cursor-pointer *:scrollbar-hidden">
                              <Icon name={"Eye"} className="text-slate-50 h-4 w-4"/>
                              { isModalOpen&& (<FileDrawer transparency={"bg-slate-900/30 dark:bg-slate-900/20"} width='w-1/2' isModalOpen={isModalOpen} closeModal={setModalOpen}>
                                        <DocumentList files={ []} justOpen={true}/>
                                        {console.log(data," id---->",id," item---->",item)}
                              </FileDrawer>)}
                          </div>
                          
                  </div>
      );
      case 63:
        return(
            <div className="flex w-full justify-start gap-1.5 items-center ">
                            <div onClick={openModal} className=" hover:cursor-pointer *:scrollbar-hidden">
                                {/* <Icon name={"Eye"} className="text-slate-50 h-4 w-4"/> */}
                                <div><p className='hover:underline text-blue-500 hover:text-blue-700'>{nickname}</p></div>
                                { isModalOpen&& (
                                  <FileDrawer transparency={"bg-slate-900/30 dark:bg-slate-900/20"} width='w-1/2' isModalOpen={isModalOpen} closeModal={setModalOpen}>
                                          {/* <PayrollReportDrawer data={data}/> */}
                                          <Comps data={data}/>
                                </FileDrawer>)}
                            </div>
                            
                    </div>
        );
      case 64:
        return(
          <div className="flex w-full  gap-1.5 items-center ">
                          <div onClick={deleteItem} className="p-1.5 bg-red-600 rounded-md hover:bg-red-900 hover:cursor-pointer *:scrollbar-hidden">
                              <Icon name={"Trash"} className="text-slate-50 h-4 w-4"/>
                          </div>



                            <div onClick={openModal} className="p-1.5 bg-blue-800 rounded-md hover:bg-slate-900 hover:cursor-pointer *:scrollbar-hidden">
                              <Icon name={"Eye"} className="text-slate-50 h-4 w-4"/>
                              { isModalOpen&& (<FileDrawer transparency={"bg-slate-900/30 dark:bg-slate-900/20"} width='w-1/2' isModalOpen={isModalOpen} closeModal={setModalOpen}>
                                        <Comps month={D1} demoEmployees={rawData} Id={`${data?.id}`}/>
                                        {/* {console.log("aaaaaaaaaaaaaaaaaaaaaaaa",data[id]?.id)} */}
                                        {/* {console.log("data in table structure---->",data," id---->",id," item---->",item," rawData---->",rawData,"D1",D1)} */}
                              </FileDrawer>)}
                          </div>
                          
                  </div>
      );

      default:
        return <p>-</p>;
    }
  };

export default TableStructures