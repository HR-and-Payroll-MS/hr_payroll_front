import CustomDatePicker from "../Components/CustomDatePicker";
import CustomTimePicker from "../Components/CustomTimePicker";
import Dropdown from "../Components/Dropdown";
import { formatDateForInput } from "./formatDateForInput";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

{/* <DateTimePicker
  value={value ? dayjs(value) : null}
  onChange={(newValue) => {
    const iso = newValue?.format() || null; // full ISO: "2025-12-21T14:30:00"
    handleInputChange(sectionKey, key, iso);
  }}
/> */}

const deletableFields = ["clockIn", "clockOut"];
const timeFields = ["clockIn", "clockOut","Offset","Onset"];

// const EMPLOYEE_STATUS_OPTIONS = [
//   { label: "Active", value: "Active" },
//   { label: "Inactive", value: "Inactive" },
//   { label: "On Leave", value: "On Leave" },
//   { label: "Terminated", value: "Terminated" },
// ];

const FIELD_DROPDOWN_OPTIONS = {
  payroll: {
    employeestatus: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
      { label: "On Leave", value: "On Leave" },
      { label: "Terminated", value: "Terminated" },
    ],
  },
  job: {
    employmenttype: [
      { label: "Full-time", value: "Full-time" },
      { label: "Part-time", value: "Part-time" },
      { label: "Contract", value: "Contract" },
      { label: "Intern", value: "Intern" },
    ],
    positiontype: [
      { label: "Permanent", value: "Permanent" },
      { label: "Temporary", value: "Temporary" },
    ],
  },
  general: {
    gender: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
    maritalstatus: [
      { label: "Single", value: "Single" },
      { label: "Married", value: "Married" },
      { label: "Divorced", value: "Divorced" },
      { label: "Widowed", value: "Widowed" },
    ],
  },
  // Add more sections and fields as needed
};

/** Extract HH:mm from ISO */
const extractTime = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return "";
  return d.toISOString().slice(11, 16);
};

/** Merge HH:mm back into ISO datetime */
const mergeTimeIntoISO = (originalISO, timeValue) => {
  if (!originalISO || !timeValue) return null;

  const base = new Date(originalISO);
  if (isNaN(base)) return null;

  const [h, m] = timeValue.split(":");
  base.setHours(h, m, 0, 0);

  return base.toISOString();
};

export const RenderFields = ({
  handleInputChange,
  sectionKey,
  sectionData,
  editMode,
  editableFields = null,
}) => {




const renderSpecialField = (sectionKey, key, value, handleInputChange) => {
  // Look up if this field has dropdown options
  const options = FIELD_DROPDOWN_OPTIONS[sectionKey]?.[key];

  if (options) {
    return (
      <Dropdown
        value={value || ""} padding="p-1"
        onChange={(selectedValue) => handleInputChange(sectionKey, key, selectedValue)}
        options={options.map((opt) => opt.label)} 
      />
    );
  }

  // No special dropdown → let default input render
  return null;
};
















  if (!sectionData) return null;

  const isEditing = !!editMode?.[sectionKey];

  return Object.entries(sectionData).map(([key, value]) => {
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());

    const isFieldEditable =
      isEditing && (!editableFields || editableFields.includes(key));

    // const isTimeField = timeFields.includes(key);
const normalizedKey = key.toLowerCase();
const isTimeField = ["clockin", "clockout", "offset", "onset"].includes(normalizedKey);
    const showDelete = deletableFields.includes(key);

    return (
      <div key={key} className="w-96 flex gap-2 justify-between text-nowrap">
       {label!=="Photo" && <p className="flex w-full">
          <span className="min-w-40 text-gray-400 mr-3">{label}</span>

          {isFieldEditable ? (
            key === "notes" ? (
              <textarea
                rows={3}
                value={value || ""}
                onChange={(e) =>
                  handleInputChange(sectionKey, key, e.target.value)
                }
                className="w-full border rounded px-3 py-1 focus:ring-1 focus:ring-green-500"
              />
            ) : (
              <>
               {renderSpecialField(sectionKey, key, value, handleInputChange)
                                ||
                (key.toLowerCase().includes("date") ? (
                  <CustomDatePicker
                    value={value}
                    onChange={(newValue) => handleInputChange(sectionKey, key, newValue)}
                    className="rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500"
                  />
                ) : isTimeField ? (
                  <CustomTimePicker
                    value={value}
                    onChange={(newValue) => handleInputChange(sectionKey, key, newValue)}
                    className="rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => handleInputChange(sectionKey, key, e.target.value)}
                    className="w-full rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500 border border-gray-300"
                  />
                ))
                                  
               }
               {/* {sectionKey === "payroll" && key === "employeestatus" ? (<Dropdown onChange={(e) => handleInputChange(sectionKey, key, e)} options={EMPLOYEE_STATUS_OPTIONS.map((o)=>o.label)}/>
               ) :
                (
                <input type={ key.toLowerCase().includes("date") ? "date" : isTimeField ? "time" : "text" }
                value={ key.toLowerCase().includes("date") ? formatDateForInput(value) : isTimeField ? extractTime(value) : value || "" } onChange={(e) => { const newValue = isTimeField ? mergeTimeIntoISO(value, e.target.value) : e.target.value; 
                  handleInputChange(sectionKey, key, newValue); }} className="w-full  rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500" /> )
                  
                  
              } */}



                {showDelete && (
                  <button type="button" className="ml-2 text-red-500 px-2 py-1 text-sm border border-red-300 rounded hover:bg-red-100"
                    onClick={() =>
                      handleInputChange(sectionKey, key, null)
                    }
                  >Delete
                  </button>
                )}
              </>
            )
            ) : (
              <span className="text-gray-700 font-semibold">
                {value || (
                  <span className="text-gray-400 italic">
                    Not provided
                  </span>
                )}
              </span>
          )}
        </p>}
        <span className="text-slate-100">|</span>
      </div>
    );
  });
};








{/*

// (
// <input type={ key.toLowerCase().includes("date") ? "date" : isTimeField ? "time" : "text" }
// value={ key.toLowerCase().includes("date") ? formatDateForInput(value) : isTimeField ? extractTime(value) : value || "" } onChange={(e) => { const newValue = isTimeField ? mergeTimeIntoISO(value, e.target.value) : e.target.value; 
//   handleInputChange(sectionKey, key, newValue); }} className="w-full  rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500" /> )
//                   ------------------------------------------- Date picker___________
//(key.toLowerCase().includes("date") ? (
//   <CustomDatePicker
//     value={value}
//     onChange={(newValue) => handleInputChange(sectionKey, key, newValue)}
//     className="rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500"
//   />
// ) : (
//   <input
//     type={isTimeField ? "time" : "text"}
//     value={isTimeField ? extractTime(value) : value || ""}
//     onChange={(e) => {
//       const newValue = isTimeField
//         ? mergeTimeIntoISO(value, e.target.value)
//         : e.target.value;
//       handleInputChange(sectionKey, key, newValue);
//     }}
//     className="w-full rounded px-3 py-1 focus:ring-1 outline-0 focus:ring-green-500 border border-gray-300"
//   />
// ))

//----------------------- Timepicker too___________
 */}
{/* <input
                  type={
                    key.toLowerCase().includes("date")
                      ? "date"
                      : isTimeField
                      ? "time"
                      : "text"
                  }
                  value={
                    key.toLowerCase().includes("date")
                      ? formatDateForInput(value)
                      : isTimeField
                      ? extractTime(value)
                      : value || ""
                  }
                  onChange={(e) => {
                    const newValue = isTimeField
                      ? mergeTimeIntoISO(value, e.target.value)
                      : e.target.value;

                    handleInputChange(sectionKey, key, newValue);
                  }}
                  className="w-full border rounded px-3 py-1 focus:ring-1 focus:ring-green-500"
                /> */}
//can't handle the date format plus i don't know maybe note is not editable i guess

// import { formatDateForInput } from "./formatDateForInput";

// const deletableFields = ["clockIn", "clockOut"];

// export const RenderFields = ({
//   handleInputChange,
//   sectionKey,
//   sectionData,
//   editMode,
//   editableFields = null, // 👈 OPTIONAL
// }) => {
//   if (!sectionData) return null;

//   const isEditing = !!editMode?.[sectionKey];

//   return Object.entries(sectionData).map(([key, value]) => {
//     const label = key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());

//     // 👇 CORE LOGIC (does NOT affect other pages)
//     const isFieldEditable =
//       isEditing &&
//       (!editableFields || editableFields.includes(key));

//     const showDelete = deletableFields.includes(key);

//     return (
//       <div key={key} className="w-96 flex gap-2 justify-between text-nowrap">
//         <p className="flex w-full">
//           <span className="min-w-40 text-gray-400 mr-3">{label}</span>

//           {isFieldEditable ? (
//             <>
//               <input
//                 type={
//                   key.toLowerCase().includes("date")
//                     ? "date"
//                     : showDelete
//                     ? "time"
//                     : "text"
//                 }
//                 value={
//                   key.toLowerCase().includes("date")
//                     ? formatDateForInput(value)
//                     : value || ""
//                 }
//                 onChange={(e) =>
//                   handleInputChange(sectionKey, key, e.target.value)
//                 }
//                 className="w-full border outline-none border-slate-300 rounded px-3 mt-1 py-1 focus:ring-1 focus:ring-green-500"
//               />

//               {showDelete && (
//                 <button
//                   type="button"
//                   className="ml-2 text-red-500 px-2 py-1 text-sm border border-red-300 rounded hover:bg-red-100"
//                   onClick={() =>
//                     handleInputChange(sectionKey, key, "")
//                   }
//                 >
//                   Delete
//                 </button>
//               )}
//             </>
//           ) : (
//             <span className="text-gray-700 font-semibold">
//               {value || (
//                 <span className="text-gray-400 italic">
//                   Not provided
//                 </span>
//               )}
//             </span>
//           )}
//         </p>

//         <span className="text-slate-100">|</span>
//       </div>
//     );
//   });
// };
























//every thing is editable in here

// import { formatDateForInput } from "./formatDateForInput"; 
// const deletableFields = ["clockIn","clockOut"];
// export const RenderFields = ({ handleInputChange, sectionKey, sectionData, editMode }) => {
//   if (!sectionData) return null;

//   const isEditing = !!editMode?.[sectionKey];

//   return Object.entries(sectionData).map(([key, value]) => {
//     const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
//     const showDelete = deletableFields.includes(key)
//     return (
//       <div key={key} className="w-96 flex gap-2 justify-between text-nowrap">
//         <p className="flex w-full">
//           <span className="min-w-40 text-gray-400 mr-3">{label}</span>
//           {isEditing ? (
//             <>
//             <input
//               type={key.toLowerCase().includes("date") ? "date" :showDelete?"time":"text"}
//               value={key.toLowerCase().includes("date") ? formatDateForInput(value) : value || ""}
//               onChange={(e) => handleInputChange(sectionKey, key, e.target.value)}
//               className="w-full border outline-none border-slate-300 rounded px-3 mt-1 py-1 focus:ring-1 focus:ring-green-500"
//             />

//             { showDelete && (<button 
//                 type="button"
//                 className="ml-2 text-red-500 px-2 py-1 text-sm border border-red-300 rounded hover:bg-red-100"
//                 onClick={()=>handleInputChange(sectionKey,key,"")}
//               >
//               Delete</button>
//               )
//             }
// </>

//           ) : (
//             <span className="text-gray-700 font-semibold">
//               {value || <span className="text-gray-400 italic">Not provided</span>}
//             </span>
//           )}
//         </p>
//         <span className="text-slate-100">|</span>
//       </div>
//     );
//   });
// };























// import { formatDateForInput } from "./formatDateForInput"; 
// // Render fields dynamically
// export const RenderFields = ({handleInputChange,sectionKey, sectionData, editMode}) => {
//   console.log("section key: ",sectionKey);
//   console.log("edit Mode: ",editMode);
//   console.log("section data: ",sectionData);
//   console.log("handleInputChange : ",handleInputChange);

//   if (!sectionData) return null;

//   const isEditing = editMode[sectionKey];
//   return Object.entries(sectionData).map(([key, value]) => {
//     const label = key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());

//     return (
//       <div key={key} className="w-96 flex gap-2 justify-between text-nowrap">
//         <p className="flex">
//           <span className="min-w-40 text-gray-400">{label} </span>
//           {isEditing ? (
//             <input
//   type={key.toLowerCase().includes("date") ? "date" : "text"}
//   value={
//     key.toLowerCase().includes("date")
//       ? formatDateForInput(value)
//       : value || ""
//   }
//   onChange={(e) => handleInputChange(sectionKey, key, e.target.value) } className="w-full border outline-none border-slate-300 rounded px-3 mt-1 py-1 focus:ring-1 focus:ring-green-500" />

//           ) : (
//             <span className="text-gray-700 font-semibold">
//               {value || (
//                 <span className="text-gray-400 italic">Not provided</span>
//               )}
//             </span>
//           )}
//         </p>
//         <span className="text-slate-100">|</span>
//       </div>
//     );
//   });
// };
