import React, { useState } from 'react'
import Dropdown from '../../../Components/Dropdown';
import TextEditor from '../../../Components/TextEditor';
import SearchDate from '../../../Components/SearchDate';
import FileUploader from '../../../Components/FileUploader';

function SendRequestForEmployee({ role="HR_MANAGER" }) {
   const [message,setMessage]=useState("");
   const [category,setCategory]=useState("hr");

  const LEAVE_TYPES = [
  "Annual",
  "Sick",
  "Casual",
  "Maternity",
  "Paternity",
  "Unpaid",
  "Compensatory",
  "Bereavement",
  "Study",
  "Sabbatical",
];

 
   function submit(e){
     e.preventDefault();
   }
 
   return (
     <form onSubmit={submit} className=" mx-auto p- space-y-4">
       <div className="flex items-center gap-2">
        <p>Type</p>
         {/* <InputField placeholder="Title..." maxWidth={"w-full"} icon={false} onSelect={setTitle}/> */}
         <Dropdown padding="p-1.5 w-120" width='w-120' onChange={()=>console.log("setReceiver")} placeholder="Casual" options={LEAVE_TYPES}/>
            <SearchDate applyButton={false} style=''/><FileUploader btnBackground='hover:bg-slate-50' IconName='Link2' buttonOnly={true} label='Attach File' onFileSelect={(e)=>console.log(e)}>.</FileUploader>
       </div>
       <TextEditor onChange={setMessage}/>
       
       <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">Send</button>
     </form>
   );
}

export default SendRequestForEmployee
/* leave types :-annual,sick leave,casual leave,maternity leave,paternity leave,parental */

// 1. Paid Leaves

// Annual Leave / Vacation Leave – standard paid time off employees accrue annually.

// Sick Leave – paid leave when the employee is unwell.

// Casual Leave – short-term leave for personal reasons, usually paid.

// Maternity Leave – for childbirth, typically paid (duration varies by country).

// Paternity Leave – for new fathers, sometimes paid.

// Parental / Adoption Leave – for adoption or child care.

// 2. Unpaid / Special Leaves

// Unpaid Leave – taken without pay, sometimes used when paid leave is exhausted.

// Leave Without Pay (LWOP) – similar to unpaid leave, HR term.

// Compensatory Off / Time Off in Lieu – if the employee worked extra hours/days.

// Study / Educational Leave – for courses, certifications, exams.

// Sabbatical Leave – extended unpaid leave for personal or professional reasons.

// 3. Emergency / Short-term Leaves

// Bereavement / Compassionate Leave – in case of death or serious illness of family.

// Public / National Holidays – sometimes recorded as “leave type” if you track separately.

// 4. Other Organizational Specific Types

// Work From Home (WFH) – sometimes treated as a leave type for attendance purposes.

// Half-Day Leave – could be part of annual, sick, or casual leave.

// Medical Leave / Hospitalization – sometimes separate from general sick leave.