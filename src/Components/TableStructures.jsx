import React, { useState } from 'react'
import Icon from './Icon';
import FileDrawer from './FileDrawer';
import Drawer from './Drawer';
import AttendanceCorrectionPage from '../Pages/HR_Manager/Attendance/AttendanceCorrectionPage';

function TableStructures({id, item}) {
    
  const [isModalOpen,closeModal] =useState(false);
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
      case 61:
        return(
            <div className="flex w-full justify-center gap-1.5 items-center ">
                            <div onClick={()=>closeModal(true)} className="p-1.5 bg-blue-800 rounded-md hover:bg-slate-900 hover:cursor-pointer">
                                <Icon name={"Eye"} className="text-slate-50 h-4 w-4"/>
                                <FileDrawer transparency={"bg-slate-900/30 dark:bg-slate-900/20"} width='w-1/2' isModalOpen={isModalOpen} closeModal={closeModal}>
                                         <AttendanceCorrectionPage/>
    
                                </FileDrawer>
                                {/* <Drawer width='w-1/3' isOpen={[]}/> */}
                            </div>
                            
                    </div>
        );


      default:
        return <p>-</p>;
    }
  };

export default TableStructures