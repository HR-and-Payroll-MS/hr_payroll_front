import React, { useState } from 'react';
import Dropdown from '../Components/Dropdown';
import TextEditor from '../Components/TextEditor';
import SearchDate from '../Components/SearchDate';
import FileUploader from '../Components/FileUploader';
import useAuth from '../Context/AuthContext';

export default function SendRequestForEmployee({ role = 'HR_MANAGER' }) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('hr');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null);
  const { axiosPrivate } = useAuth();
  const LEAVE_TYPES = [
    'Annual',
    'Sick',
    'Casual',
    'Maternity',
    'Paternity',
    'Unpaid',
    'Compensatory',
    'Bereavement',
    'Study',
    'Sabbatical',
  ];

  function toISODate(date) {
    if (!date) return null;

    const d = new Date(date);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  async function submit(e) {
    e.preventDefault();

    console.log('message', message);
    console.log('category', category);
    console.log('file', file);
    console.log('date', date);

    const startDateISO = toISODate(date?.from);
    const endDateISO = toISODate(date?.to);

    try {
      let res;

      if (file instanceof File) {
        const fd = new FormData();
        fd.append('type', category);
        fd.append('startDate', startDateISO);
        fd.append('endDate', endDateISO);
        if (message) fd.append('reason', message);
        fd.append('attachment', file);
        console.log(startDateISO, endDateISO);
        res = await axiosPrivate.post('/leaves/requests/', fd);
      } else {
        const payload = {
          type: category,
          startDate: startDateISO,
          endDate: endDateISO,
          ...(message ? { reason: message } : {}),
        };

        res = await axiosPrivate.post('/leaves/requests/', payload);
      }

      console.log('BACKEND RESPONSE →', res.data);
      alert('Request sent (check network tab)');
    } catch (err) {
      console.error('BACKEND ERROR →', err);
      alert('Request failed – check console');
    }
  }

  return (
    <form onSubmit={submit} className=" mx-auto p- space-y-4">
      <div className="flex items-center gap-2">
        <p>Type</p>
        {/* <InputField placeholder="Title..." maxWidth={"w-full"} icon={false} onSelect={setTitle}/> */}
        <Dropdown
          padding="p-1.5 w-120"
          width="w-120"
          onChange={setCategory}
          placeholder="Casual"
          options={LEAVE_TYPES}
        />
        <SearchDate onSubmit={setDate} applyButton={false} style="" />
        <FileUploader
          btnBackground="hover:bg-slate-50"
          IconName="Link2"
          buttonOnly={true}
          label="Attach File"
          onFileSelect={setFile}
        >
          .
        </FileUploader>
      </div>
      <TextEditor onChange={setMessage} />

      <button
        type="submit"
        className="px-4 py-2 bg-slate-800 text-white rounded"
      >
        Send
      </button>
    </form>
  );
}

// import React, { useState } from 'react';
// import Dropdown from '../../../Components/Dropdown';
// import TextEditor from '../../../Components/TextEditor';
// import SearchDate from '../../../Components/SearchDate';
// import FileUploader from '../../../Components/FileUploader';
// import useAuth from '../../../Context/AuthContext';

// function SendRequestForEmployee() {
//   const {axiosPrivate}= useAuth()
//   const [message, setMessage] = useState("");
//   const [leaveType, setLeaveType] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [attachment, setAttachment] = useState("");

//   const LEAVE_TYPES = [
//     "Annual",
//     "Sick",
//     "Casual",
//     "Maternity",
//     "Paternity",
//     "Unpaid",
//     "Compensatory",
//     "Bereavement",
//     "Study",
//     "Sabbatical",
//   ];

//   const LEAVE_POLICY_MAP = {
//     Annual: 1,
//     Sick: 2,
//     Casual: 3,
//     Maternity: 4,
//     Paternity: 5,
//     Unpaid: 6,
//     Compensatory: 7,
//     Bereavement: 8,
//     Study: 9,
//     Sabbatical: 10,
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       start_date: startDate || "",
//       end_date: endDate || "",
//       start_time: new Date().toISOString(),
//       end_time: new Date().toISOString(),
//       duration: "0",
//       notes: message || "",
//       attachment: attachment || "",
//       policy: LEAVE_POLICY_MAP[leaveType] || 0,
//       assigned_approver: 0,
//     };

//     console.log("SENDING PAYLOAD →", payload);

//     try {
//       const res = await axiosPrivate.post(
//         "/leaves/requests/",
//         payload
//       );
//       console.log("BACKEND RESPONSE →", res.data);
//       alert("Request sent (check network tab)");
//     } catch (err) {
//       console.error("BACKEND ERROR →", err);
//       alert("Request failed – check console");
//     }
//   };

//   return (
//     <form onSubmit={submit} className="mx-auto space-y-4">

//       <div className="flex items-center gap-3">
//         <p>Type</p>

//         <Dropdown
//           options={LEAVE_TYPES}
//           placeholder="Select Leave Type"
//           onChange={(value) => {
//             console.log("LEAVE TYPE:", value);
//             setLeaveType(value);
//           }}
//         />

//         <SearchDate
//           applyButton={false}
//           onChange={(range) => {
//             console.log("DATE RANGE:", range);
//             setStartDate(range?.startDate || "");
//             setEndDate(range?.endDate || "");
//           }}
//         />

//         <FileUploader
//           buttonOnly
//           label="Attach File"
//           onFileSelect={(file) => {
//             console.log("FILE:", file);
//             setAttachment(file?.name || "");
//           }}
//         />
//       </div>

//       <TextEditor
//         onChange={(value) => {
//           console.log("MESSAGE:", value);
//           setMessage(value);
//         }}
//       />

//       <button
//         type="submit"
//         className="px-4 py-2 bg-slate-800 text-white rounded"
//       >
//         Send
//       </button>
//     </form>
//   );
// }

// export default SendRequestForEmployee;

// import React, { useState } from 'react';
// import Dropdown from '../../../Components/Dropdown';
// import TextEditor from '../../../Components/TextEditor';
// import SearchDate from '../../../Components/SearchDate';
// import FileUploader from '../../../Components/FileUploader';
// import useAuth from '../../../Context/AuthContext';

// function SendRequestForEmployee({ role = "HR_MANAGER" }) {
//   const [message, setMessage] = useState("");
//   const [leaveType, setLeaveType] = useState(null);
//   const [dateRange, setDateRange] = useState({
//     start_date: "",
//     end_date: "",
//   });
//   const [attachment, setAttachment] = useState(null);
//   const {axiosPrivate} = useAuth();
//   const LEAVE_TYPES = [
//     { label: "Annual", value: 1 },
//     { label: "Sick", value: 2 },
//     { label: "Casual", value: 3 },
//     { label: "Maternity", value: 4 },
//     { label: "Paternity", value: 5 },
//     { label: "Unpaid", value: 6 },
//     { label: "Compensatory", value: 7 },
//     { label: "Bereavement", value: 8 },
//     { label: "Study", value: 9 },
//     { label: "Sabbatical", value: 10 },
//   ];

//   const calculateDuration = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = endDate - startDate;
//     return diffTime / (1000 * 60 * 60 * 24) + 1;
//   };

//   async function submit(e) {
//     e.preventDefault();

//     if (!dateRange.start_date || !dateRange.end_date || !leaveType) return;

//     const payload = {
//       start_date: dateRange.start_date,
//       end_date: dateRange.end_date,
//       start_time: new Date().toISOString(),
//       end_time: new Date().toISOString(),
//       duration: calculateDuration(
//         dateRange.start_date,
//         dateRange.end_date
//       ).toString(),
//       notes: message,
//       attachment: attachment || "",
//       policy: leaveType.value,
//       assigned_approver: 0,
//     };

//     try {
//       const response = await axiosPrivate.post(
//         "/leaves/requests",
//         payload
//       );
//       console.log("Leave request sent:", response.data);
//     } catch (error) {
//       console.error("Error sending leave request", error);
//     }
//   }

//   return (
//     <form onSubmit={submit} className="mx-auto space-y-4">
//       <div className="flex items-center gap-2">
//         <p>Type</p>

//         <Dropdown
//           padding="p-1.5"
//           width="w-120"
//           placeholder="Select Leave Type"
//           options={LEAVE_TYPES.map((e)=>e.label)}
//           onChange={setLeaveType}
//         />

//         <SearchDate
//           applyButton={false}
//           onChange={(range) =>
//             setDateRange({
//               start_date: range.startDate,
//               end_date: range.endDate,
//             })
//           }
//         />

//         <FileUploader
//           btnBackground="hover:bg-slate-50"
//           IconName="Link2"
//           buttonOnly={true}
//           label="Attach File"
//           onFileSelect={(file) => setAttachment(file)}
//         />
//       </div>

//       <TextEditor onChange={setMessage} />

//       <button
//         type="submit"
//         className="px-4 py-2 bg-slate-800 text-white rounded"
//       >
//         Send
//       </button>
//     </form>
//   );
// }

// export default SendRequestForEmployee;

// /* leave types :-annual,sick leave,casual leave,maternity leave,paternity leave,parental */

// // 1. Paid Leaves

// // Annual Leave / Vacation Leave – standard paid time off employees accrue annually.

// // Sick Leave – paid leave when the employee is unwell.

// // Casual Leave – short-term leave for personal reasons, usually paid.

// // Maternity Leave – for childbirth, typically paid (duration varies by country).

// // Paternity Leave – for new fathers, sometimes paid.

// // Parental / Adoption Leave – for adoption or child care.

// // 2. Unpaid / Special Leaves

// // Unpaid Leave – taken without pay, sometimes used when paid leave is exhausted.

// // Leave Without Pay (LWOP) – similar to unpaid leave, HR term.

// // Compensatory Off / Time Off in Lieu – if the employee worked extra hours/days.

// // Study / Educational Leave – for courses, certifications, exams.

// // Sabbatical Leave – extended unpaid leave for personal or professional reasons.

// // 3. Emergency / Short-term Leaves

// // Bereavement / Compassionate Leave – in case of death or serious illness of family.

// // Public / National Holidays – sometimes recorded as “leave type” if you track separately.

// // 4. Other Organizational Specific Types

// // Work From Home (WFH) – sometimes treated as a leave type for attendance purposes.

// // Half-Day Leave – could be part of annual, sick, or casual leave.

// // Medical Leave / Hospitalization – sometimes separate from general sick leave.
