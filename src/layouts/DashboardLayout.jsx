import React, { useState } from 'react'
import SummaryCard from '../Components/SummaryCard'
import {table} from '../Hooks/useTableStructure'
import Table from '../Components/Table';
import Modal from '../Components/Modal'
import BarChartExample from '../Example/BarChartExample';
import LineChartExample from '../Example/LineChartExample';
import PieChartExample from '../Example/PieChartExample';
function DashboardLayout() {
  const [isOpen,setClose]=useState(true)  
  const data=[1,2,2,2,3]
  const {bodyStructure,headerStructure}=table.Attendance;
  return (
    <div className='h-full scrollbar-hidden w-full p-2.5 flex overflow-y-scroll flex-col gap-4'>
        <Modal isOpen={isOpen} location={"center"}>
            {/* transform -translate-x-full transition-transform duration-300 ease-in-out */}
            <div className='  text-center justify-center  items-center rounded h-fit  lg:w-3/12  sm:w-3/5 md:w-5/12 p-6 bg-gray-50 flex flex-col'>
                <div className='flex-1 flex flex-col p-2  '>
                    <img className='flex-1 m-1.5 max-h-28  bg-amber-500' src="pic\image.png" alt="" />
                    <p className='font-bold text-3xl '>Welcome to HR Dashboard</p>
                    <p className='font-semibold text-wrap '>Enjoy the Comenience of managing your company's employees</p>
                </div>
                <button className='bg-slate-800 cursor-pointer w-full text-slate-100 py-1 rounded' onClick={()=>setClose(false)}>Let's Go</button>
            </div>
        </Modal>
        <div className='flex gap-4 flex-1 h-fit w-full'>
            <SummaryCard/>
            </div>
        <div className='flex gap-4  w-full flex-2'>
            <div className='bg-gray-50 h-full rounded flex-1 '><BarChartExample/></div>
            <div className='bg-gray-50 h-full rounded flex-1 '><LineChartExample/></div>
            <div className='bg-gray-50 h-full rounded flex-1 '><PieChartExample/></div>
            </div>
        <div className='flex gap-4 rounded flex-1 h-fit w-full bg-gray-50'>
            <Table data={data} bodyStructure={bodyStructure} headerStructure={headerStructure}/>
            </div>
        <div className='h-fit flex w-full gap-4'>
            <div className='bg-gray-50 h-full p-2 rounded flex-1 '>1</div>
            <div className='bg-gray-50 h-full p-2 rounded flex-1 '>1</div>
            <div className='bg-gray-50 h-full p-2 rounded flex-1 '>1</div>
            
        </div>
    </div>
  )
}

export default DashboardLayout