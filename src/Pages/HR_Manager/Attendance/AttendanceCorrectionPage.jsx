import React, { useState, useEffect } from "react";
import ThreeDots from "../../../animations/ThreeDots";
import { RenderFields } from "../../../utils/renderFields";
import { useParams } from "react-router-dom";
import useAuth from "../../../Context/AuthContext";
export default function AttendanceCorrectionPage({staticUserData}) {
  const { id } = useParams();
  const { axiosPrivate } = useAuth()
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({
    attendance: false,
  });



  // ------------------- LOAD ATTENDANCE DETAILS -------------------
  useEffect(() => {
    const load = async () => {
      try {
        // const d = await fetchEmployeeAttendance(id, axiosPrivate);

        // Format backend → page structure
        // const employee = {
        //   name: d.employee_name || "",
        //   email: d.employee_email || "",
        //   pic: d.employee_pic || null,
        // };

        // const attendance = {
        //   date: d.date || "",
        //   clockIn: d.clockIn || "",
        //   clockOut: d.clockOut || "",
        //   clockInLocation: d.clockInLocation || "",
        //   clockOutLocation: d.clockOutLocation || "",
        // };

        // const formatted = { employee, attendance };

        setUserData(staticUserData);
        setOriginalData(staticUserData);
        setUpdatedData({});
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    load();
  }, [id, axiosPrivate]);

  // --------------- PREVENT CRASH BEFORE DATA LOAD ----------------
  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <ThreeDots />
      </div>
    );

  if (!userData || !userData.employee || !userData.attendance)
    return (
      <div className="text-gray-500 text-center p-4">
        No Attendance Data Found
      </div>
    );
      // ------------------------ EDIT TOGGLE ---------------------------
  const toggleEdit = () => {
    setEditMode((prev) => ({ attendance: !prev.attendance }));
  };

  // ------------------ HANDLE INPUT CHANGE -------------------------
 const handleInputChange = (sectionKey, field, value) => {
  setUserData(prev => ({
    ...prev,
    [sectionKey]: {
      ...prev[sectionKey],
      [field]: value === "" ? null : value,
    }
  }));

  setUpdatedData(prev => ({
    ...prev,
    [sectionKey]: {
      ...prev[sectionKey],
      [field]: value === "" ? null : value
    }
  }));
};


  // ---------------------------- SAVE ------------------------------
 const handleSave = () => {
  console.log("Saving updated data:", updatedData);

  setOriginalData(userData); // store current userData as original
  setUpdatedData({});         // clear updatedData
  setEditMode({ attendance: false });
};


  // --------------------------- CANCEL -----------------------------
  const handleCancel = () => {
  setUserData(originalData);  // revert changes
  setUpdatedData({});         // clear temp changes
  setEditMode({ attendance: false });
};


  // --------------------------- RENDER -----------------------------
  return (
    <div id="here" className="bg-white rounded-md w-full p-4 flex flex-col gap-6">

      {/* -------------------- Employee Info -------------------- */}
      <div className="flex flex-col items-center gap-2">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={userData.employee.pic}
          alt="Profile"
        />
        <p className="font-bold text-gray-700 text-lg">{userData.employee.name}</p>
        <p className="text-sm text-gray-500">{userData.employee.email}</p>
      </div>

      <hr className="border-gray-200" />

      {/* -------------------- Attendance Header -------------------- */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-700 text-md">Attendance Details</h2>

        {!editMode.attendance ? (
          <button
            onClick={toggleEdit}
            className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {/* -------------------- Attendance Fields -------------------- */}
     <RenderFields
  sectionKey="attendance"
  sectionData={userData.attendance}
  handleInputChange={handleInputChange}
  editMode={editMode}
/>

    </div>
  );
}







































// import React, { useState, useEffect } from "react";
// import Icon from "../../../Components/Icon";
// import ThreeDots from "../../../animations/ThreeDots";
// import { RenderFields } from "../../../utils/renderFields";
// export default function AttendanceCorrectionPage({ employeeAttendance }) {
//   const [data, setData] = useState(null);
//   const [originalData, setOriginalData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [editMode, setEditMode] = useState({
//     attendance: false,
//   });
//     const dummyAttendance = {
//   employee: {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     pic: "https://randomuser.me/api/portraits/men/32.jpg"
//   },
//   attendance: {
//     date: "2025-11-23",
//     clockIn: "08:59 AM",
//     clockInLocation: "HQ Office - Main Gate",
//     clockOut: "05:02 PM",
//     clockOutLocation: "HQ Office - Side Exit",
//     workSchedules: "9:00 AM - 5:00 PM",
//     paidTime: "8h 03m",
//     notes: "On time"
//   }
// };

//   // Load static props (simulate backend)
//   useEffect(() => {

//     setTimeout(() => {
//       setData(dummyAttendance);
//       setOriginalData(dummyAttendance);
//       setLoading(false);
//     }, 600); // simulating loading
//   }, [employeeAttendance]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-40">
//         <ThreeDots />
//       </div>
//     );

//   if (!data)
//     return (
//       <div className="text-gray-500 text-center p-4">
//         No Attendance Data Found
//       </div>
//     );

//   const toggleEdit = () => {
//     setEditMode((prev) => ({ attendance: !prev.attendance }));
//   };

//   const handleInputChange = (section, field, value) => {
//     setData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value },
//     }));
//   };

//   const handleSave = () => {
//     setOriginalData(data); // only local save for now
//     setEditMode({ attendance: false });
//   };

//   const handleCancel = () => {
//     setData(originalData);
//     setEditMode({ attendance: false });
//   };

//   return (
//     <div className="bg-white id rounded-md w-full  p-4 flex flex-col gap-6">

//       {/* -------------------- TOP - Employee Info -------------------- */}
//       <div className="flex flex-col items-center gap-2">
//         <img
//           className="w-20 h-20 rounded-full object-cover"
//           src={data.employee.pic}
//           alt="Profile"
//         />
//         <p className="font-bold text-gray-700 text-lg">{data.employee.name}</p>
//         <p className="text-sm text-gray-500">{data.employee.email}</p>
//       </div><hr className="border-gray-200" />

//       {/* -------------------- Attendance Area -------------------- */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-gray-700 text-md">Attendance Details</h2>

//         {!editMode.attendance ? (
//           <button
//             onClick={toggleEdit}
//             className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
//           >
//             Edit
//           </button>
//         ) : (
//           <div className="flex gap-2">
//             <button
//               onClick={handleSave}
//               className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
//             >
//               Save
//             </button>
//             <button
//               onClick={handleCancel}
//               className="bg-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ------- Render Attendance Fields using YOUR Component ------- */}
//       <RenderFields
//         handleInputChange={handleInputChange}
//         sectionKey="attendance"
//         sectionData={data.attendance}
//         editMode={editMode}
//       />
//     </div>
//   );
// }