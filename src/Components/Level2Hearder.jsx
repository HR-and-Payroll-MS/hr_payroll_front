import InputField from "./InputField"
import Icon from "../Components/Icon"
import Dropdown from "./Dropdown"
import { useState } from "react"
export  function SearchStatus() {
//  const isprime=(n)=>{
//   if(n<=1) return false
//   for ( let i = 2; i*i <= n; i++){
//     if(n%i == 0) return false
//   }
//   return true;
//  }
//   const prime =()=>{
//     let n=500
//     console.log("prime numbers up to ",n,"\n")
//     for(let i = 2 ; i <= n; i++){
//       if(isprime(i))
//         console.log(i,"%d")
//     }
//     console.log("\n\n composite numbers upto ",n,":\n")
//     for (let i = 4; i<= n;i++){
//         if(!isprime(i))console.log('" ": %d', i)
//     }
//     console.log()
//   }
      const viewOptions = [
        {content:'Card View',svg:"Grip"},
        {content:'Tabular View',svg:"Grid3x3"}
      ]
      const depOptions = [
        {content:'Human Resource',svg:null},
        {content:'Finance',svg:null},
        {content:'IT',svg:null},

      ]
      const genderOptions = [
        {content:'Female',svg:null},
        {content:'Male',svg:null},
        {content:'What else ?',svg:null},

      ]
      const jobOptions = [
        {content:'fullTime',svg:null},
        {content:'PartTime',svg:null},

      ]
      const statOptions = [
        {content:'Active',svg:null},
        {content:'InActive',svg:null},

      ]
      const handleView=(item)=>{
        console.log(item)
      }
    const left = 
    <div id="left" className="flex py-2.5 gap-3  justify-between items-center  ">
         <InputField placeholder={"Search Employee"}/>
          

          <div className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700  items-center  justify-between rounded-md`}>
            <Dropdown onChange={handleView} options={jobOptions} text="text-xs  font-semibold" placeholder="Job Type"  border="border gap-1 border-gray-100"/>
          </div>
          <div className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700  items-center  justify-between rounded-md`}>
            <Dropdown onChange={handleView} options={genderOptions} text="text-xs  font-semibold" placeholder="Gender"  border="border gap-1 border-gray-100"/>
          </div>
          <div className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700  items-center  justify-between rounded-md`}>
            <Dropdown onChange={handleView} options={depOptions} text="text-xs  font-semibold" placeholder="Department"  border="border gap-1 border-gray-100"/>
          </div>
          
          
          
          <div className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700  items-center  justify-between rounded-md`}>
            <Dropdown onChange={handleView} options={statOptions} text="text-xs  font-semibold" placeholder="All Status"  border="border gap-1 border-gray-100"/>
          </div>
          <div className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700  items-center  justify-between rounded-md`}>
            <Dropdown onChange={handleView} options={viewOptions} text="text-xs font-semibold" placeholder="View" showIcons={true} Svg={"AlignEndVertical"} border="border gap-1 border-gray-100"/>
          </div>
        </div>
  return (
    <>{left}</>
  )
}
export  function DateStatus() {
    const left = <div
          id="left"
          className="flex py-2.5 gap-3  justify-between items-center  "
        >
          <div
            className={`flex  dark:text-slate-300 dark:border-slate-700 flex-1  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <p className="text-xs font-semibold">01 Jan 2023 - 10 Mar 2023</p>
            <img className="h-4" src="\svg\date-2-svgrepo-com.svg" alt="" />
          </div>
          <div
            className={`flex  dark:text-slate-300 dark:border-slate-700  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <p className="text-xs font-semibold">All Record</p>
            <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
          </div>
          <div
            className={`flex  dark:text-slate-300 dark:border-slate-700  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <p className="text-xs font-semibold">All Location</p>
            <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
          </div>
          <div
            className={`flex dark:text-slate-300 dark:border-slate-700  text-gray-700 border border-gray-100 items-center  justify-between gap-1.5 px-5 py-2.5 rounded-md`}
          >
            <div
              onClick={() => setOpen((set) => !set)}
              className="text-xs cursor-pointer  font-semibold"
            >
              All Status
            </div>
            <img className="h-4" src="\svg\down-arrow-5-svgrepo-com.svg" alt="" />
          </div>
        </div>
  return (
    <>{left}</>
  )
}
