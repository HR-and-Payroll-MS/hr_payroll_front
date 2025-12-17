import React, { useState, useEffect } from "react";
import ThreeDots from "../../../animations/ThreeDots";
import { RenderFields } from "../../../utils/renderFields";
import { useParams } from "react-router-dom";
import useAuth from "../../../Context/AuthContext";

const EDITABLE_ATTENDANCE_FIELDS = [
  "clockIn",
  "clockOut",
  "clockInLocation",
  "clockOutLocation",
  "notes",
];

const DEFAULT_LOCATION = "Onsite";


const ATTENDANCE_FIELD_MAP = {
  clockIn: "clock_in",
  clockOut: "clock_out",
  clockInLocation: "clock_in_location",
  clockOutLocation: "clock_out_location",
  notes: "notes",
};


export default function AttendanceCorrectionPage({ Data }) {
  const { id } = useParams();
  const { axiosPrivate } = useAuth();

  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState({ attendance: false });

  const formatBackendData = (d) => {
    if (!d) return null;

    return {
      employee: {
        name: d.employee_name || "",
        email: "",
        pic: "",
      },
      attendance: {
        attendance_id: d.attendance_id,
        date: d.date || "",
        clockIn: d.clock_in || "",
        clockOut: d.clock_out || "",
        clockInLocation: d.clock_in_location || "",
        clockOutLocation: d.clock_out_location || "",
        paidTime: d.paid_time || "",
        workScheduleHours: d.work_schedule_hours || "",
        status: d.status || "",
        notes: d.notes || "",
      },
    };
  };

  useEffect(() => {
    const load = async () => {
      try {
        const formatted = formatBackendData(Data);
        setUserData(formatted);
        setOriginalData(formatted);
        setUpdatedData({});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [Data, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ThreeDots />
      </div>
    );
  }

  if (!userData?.attendance) {
    return (
      <div className="text-gray-500 text-center p-4">
        No Attendance Data Found
      </div>
    );
  }

  const toggleEdit = () => {
    setEditMode({ attendance: !editMode.attendance });
  };

  const handleInputChange = (sectionKey, field, value) => {
  setUserData((prev) => {
    const updatedSection = { ...prev[sectionKey] };

    // 1️⃣ Deleting CLOCK IN → wipe everything
    if (field === "clockIn" && value === null) {
      updatedSection.clockIn = null;
      updatedSection.clockOut = null;
      updatedSection.clockInLocation = null;
      updatedSection.clockOutLocation = null;
    }

    // 2️⃣ Deleting CLOCK OUT → wipe clockOut + clockOutLocation
    else if (field === "clockOut" && value === null) {
      updatedSection.clockOut = null;
      updatedSection.clockOutLocation = null;
    }

    // 3️⃣ Location cleared → apply default
    else if (
      (field === "clockInLocation" || field === "clockOutLocation") &&
      (value === null || value === "")
    ) {
      updatedSection[field] = DEFAULT_LOCATION;
    }

    // Normal update
    else {
      updatedSection[field] = value;
    }

    return {
      ...prev,
      [sectionKey]: updatedSection,
    };
  });

  // 🔁 Mirror same logic for updatedData
  setUpdatedData((prev) => {
    const updatedSection = { ...(prev[sectionKey] || {}) };

    if (field === "clockIn" && value === null) {
      updatedSection.clockIn = null;
      updatedSection.clockOut = null;
      updatedSection.clockInLocation = null;
      updatedSection.clockOutLocation = null;
    } else if (field === "clockOut" && value === null) {
      updatedSection.clockOut = null;
      updatedSection.clockOutLocation = null;
    } else if (
      (field === "clockInLocation" || field === "clockOutLocation") &&
      (value === null || value === "")
    ) {
      updatedSection[field] = DEFAULT_LOCATION;
    } else {
      updatedSection[field] = value;
    }

    return {
      ...prev,
      [sectionKey]: updatedSection,
    };
  });
};


  // const handleInputChange = (sectionKey, field, value) => {
  //   setUserData((prev) => ({
  //     ...prev,
  //     [sectionKey]: {
  //       ...prev[sectionKey],
  //       [field]: value === "" ? null : value,
  //     },
  //   }));

  //   setUpdatedData((prev) => ({
  //     ...prev,
  //     [sectionKey]: {
  //       ...prev[sectionKey],
  //       [field]: value === "" ? null : value,
  //     },
  //   }));
  // };

  const handleSave = async () => {
  try {
    const payload = {};

    Object.entries(updatedData.attendance || {}).forEach(
      ([frontendKey, value]) => {
        const backendKey = ATTENDANCE_FIELD_MAP[frontendKey];

        if (backendKey !== undefined) {
          payload[backendKey] = value;
        }
      }
    );

    console.log("PATCH payload (backend format):", payload);

    if (Object.keys(payload).length === 0) {
      console.log("No changes to save");
      setEditMode({ attendance: false });
      return;
    }

    await axiosPrivate.patch(
      `/attendances/${userData.attendance.attendance_id}/`,
      payload
    );

    setOriginalData(userData);
    setUpdatedData({});
    setEditMode({ attendance: false });
  } catch (err) {
    console.error("Save failed:", err);
  }
};


  // const handleSave = async () => {
  //   try {
  //     const payload = {};

  //     EDITABLE_ATTENDANCE_FIELDS.forEach((field) => {
  //       if (updatedData.attendance?.hasOwnProperty(field)) {
  //         payload[field] = updatedData.attendance[field];
  //       }
  //     });

  //     console.log("PATCH payload:", payload);

  //     await axiosPrivate.patch(
  //       `/attendances/${userData.attendance.attendance_id}/`,
  //       payload
  //     );

  //     setOriginalData(userData);
  //     setUpdatedData({});
  //     setEditMode({ attendance: false });
  //   } catch (err) {
  //     console.error("Save failed:", err);
  //   }
  // };

  const handleCancel = () => {
    setUserData(originalData);
    setUpdatedData({});
    setEditMode({ attendance: false });
  };

  return (
    <div className="bg-white rounded-md w-full p-4 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={userData.employee.pic || "/avatar.png"}
          alt="Profile"
        />
        <p className="font-bold text-gray-700 text-lg">
          {userData.employee.name}
        </p>
      </div>

      <hr />

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-700 text-md">
          Attendance Details
        </h2>

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

      <RenderFields
        sectionKey="attendance"
        sectionData={userData.attendance}
        handleInputChange={handleInputChange}
        editMode={editMode}
        editableFields={EDITABLE_ATTENDANCE_FIELDS}
      />
    </div>
  );
}






































// import React, { useState, useEffect } from "react";
// import ThreeDots from "../../../animations/ThreeDots";
// import { RenderFields } from "../../../utils/renderFields";
// import { useParams } from "react-router-dom";
// import useAuth from "../../../Context/AuthContext";

// const EDITABLE_ATTENDANCE_FIELDS = [
//   "clockIn",
//   "clockOut",
//   "clockInLocation",
//   "clockOutLocation",
// ];

// export default function AttendanceCorrectionPage({ Data }) {
//   const { id } = useParams();
//   const { axiosPrivate } = useAuth();

//   const [userData, setUserData] = useState(null);
//   const [originalData, setOriginalData] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [editMode, setEditMode] = useState({
//     attendance: false,
//   });

//   // ---------------- FORMAT BACKEND DATA ----------------
//   const formatBackendData = (d) => {
//     if (!d) return null;

//     return {
//       employee: {
//         name: d.employee_name || "",
//         email: "",
//         pic: "",
//       },
//       attendance: {
//         attendance_id: d.attendance_id,
//         date: d.date || "",
//         clockIn: d.clock_in || "",
//         clockOut: d.clock_out || "",
//         clockInLocation: d.clock_in_location || "",
//         clockOutLocation: d.clock_out_location || "",
//         paidTime: d.paid_time || "",
//         workScheduleHours: d.work_schedule_hours || "",
//         status: d.status || "",
//         notes: d.notes || "",
//       },
//     };
//   };

//   // ---------------- LOAD DATA ----------------
//   useEffect(() => {
//     const load = async () => {
//       try {
//         console.log("Initial Data:", Data);
//         const formatted = formatBackendData(Data);
//         setUserData(formatted);
//         setOriginalData(formatted);
//         setUpdatedData({});
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [Data, id]);

//   // ---------------- LOADING ----------------
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <ThreeDots />
//       </div>
//     );
//   }

//   if (!userData?.attendance) {
//     return (
//       <div className="text-gray-500 text-center p-4">
//         No Attendance Data Found
//       </div>
//     );
//   }

//   // ---------------- EDIT TOGGLE ----------------
//   const toggleEdit = () => {
//     setEditMode({ attendance: !editMode.attendance });
//   };

//   // ---------------- INPUT CHANGE ----------------
//   const handleInputChange = (sectionKey, field, value) => {
//     setUserData((prev) => ({
//       ...prev,
//       [sectionKey]: {
//         ...prev[sectionKey],
//         [field]: value === "" ? null : value,
//       },
//     }));

//     setUpdatedData((prev) => ({
//       ...prev,
//       [sectionKey]: {
//         ...prev[sectionKey],
//         [field]: value === "" ? null : value,
//       },
//     }));
//   };

//   // ---------------- SAVE ----------------
//   const handleSave = async () => {
//     try {
//       const payload = {};

//       EDITABLE_ATTENDANCE_FIELDS.forEach((field) => {
//         if (updatedData.attendance?.hasOwnProperty(field)) {
//           payload[field] = updatedData.attendance[field];
//         }
//       });

//       console.log("Payload:", payload);

//       await axiosPrivate.patch(
//         `/attendances/${userData.attendance.attendance_id}/`,
//         payload
//       );

//       setOriginalData(userData);
//       setUpdatedData({});
//       setEditMode({ attendance: false });
//     } catch (err) {
//       console.error("Save failed:", err);
//     }
//   };

//   // ---------------- CANCEL ----------------
//   const handleCancel = () => {
//     setUserData(originalData);
//     setUpdatedData({});
//     setEditMode({ attendance: false });
//   };

//   // ---------------- RENDER ----------------
//   return (
//     <div className="bg-white rounded-md w-full p-4 flex flex-col gap-6">
//       {/* Employee */}
//       <div className="flex flex-col items-center gap-2">
//         <img
//           className="w-20 h-20 rounded-full object-cover"
//           src={userData.employee.pic || "/avatar.png"}
//           alt="Profile"
//         />
//         <p className="font-bold text-gray-700 text-lg">
//           {userData.employee.name}
//         </p>
//       </div>

//       <hr />

//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-gray-700 text-md">
//           Attendance Details
//         </h2>

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

//       {/* Fields */}
//       <RenderFields
//         sectionKey="attendance"
//         sectionData={userData.attendance}
//         handleInputChange={handleInputChange}
//         editMode={editMode}
//         editableFields={EDITABLE_ATTENDANCE_FIELDS}
//       />
//     </div>
//   );
// }

















// import React, { useState, useEffect } from "react";
// import ThreeDots from "../../../animations/ThreeDots";
// import { RenderFields } from "../../../utils/renderFields";
// import { useParams } from "react-router-dom";
// import useAuth from "../../../Context/AuthContext";

// export default function AttendanceCorrectionPage({ Data }) {
//   const { id } = useParams();
//   const { axiosPrivate } = useAuth();

//   const [userData, setUserData] = useState(null);
//   const [originalData, setOriginalData] = useState(null);
//   const [updatedData, setUpdatedData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [editMode, setEditMode] = useState({
//     attendance: false,
//   });

//   // ------------------- FORMAT BACKEND DATA -------------------
//   const formatBackendData = (d) => {
//     if (!d) return null;

//     return {
//       employee: {
//         name: d.employee_name || "",
//         email: "",        // backend does not provide it
//         pic: "",          // backend does not provide it
//       },
//       attendance: {
//         attendance_id: d.attendance_id,
//         date: d.date || "",
//         clockIn: d.clock_in || "",
//         clockOut: d.clock_out || "",
//         clockInLocation: d.clock_in_location || "",
//         clockOutLocation: d.clock_out_location || "",
//         paidTime: d.paid_time || "",
//         workScheduleHours: d.work_schedule_hours || "",
//         status: d.status || "",
//         notes: d.notes || "",
//       },
//     };
//   };

//   // ------------------- LOAD DATA -------------------
//   useEffect(() => {
//     const load = async () => {
//       try {
//         // If Data is already passed from parent
//         const formatted = formatBackendData(Data);

//         setUserData(formatted);
//         setOriginalData(formatted);
//         setUpdatedData({});
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [Data, id]);

//   // ------------------- LOADING -------------------
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <ThreeDots />
//       </div>
//     );
//   }

//   if (!userData || !userData.employee || !userData.attendance) {
//     return (
//       <div className="text-gray-500 text-center p-4">
//         No Attendance Data Found
//       </div>
//     );
//   }

//   // ------------------------ EDIT TOGGLE ---------------------------
//   const toggleEdit = () => {
//     setEditMode({ attendance: !editMode.attendance });
//   };

//   // ------------------ HANDLE INPUT CHANGE -------------------------
//   const handleInputChange = (sectionKey, field, value) => {
//     setUserData((prev) => ({
//       ...prev,
//       [sectionKey]: {
//         ...prev[sectionKey],
//         [field]: value === "" ? null : value,
//       },
//     }));

//     setUpdatedData((prev) => ({
//       ...prev,
//       [sectionKey]: {
//         ...prev[sectionKey],
//         [field]: value === "" ? null : value,
//       },
//     }));
//   };

//   // ---------------------------- SAVE ------------------------------
//   const handleSave = async () => {
//     try {
//       console.log("Saving updated data:", updatedData);

//       // Example backend payload (only changed fields)
//       const payload = {
//         ...updatedData.attendance,
//       };

//       await axiosPrivate.patch(
//         `/attendances/${userData.attendance.attendance_id}/`,
//         payload
//       );
// console.log("Payload to be sent to backend:", payload);
//       setOriginalData(userData);
//       setUpdatedData({});
//       setEditMode({ attendance: false });
//     } catch (err) {
//       console.error("Save failed:", err);
//     }
//   };

//   // --------------------------- CANCEL -----------------------------
//   const handleCancel = () => {
//     setUserData(originalData);
//     setUpdatedData({});
//     setEditMode({ attendance: false });
//   };

//   // --------------------------- RENDER -----------------------------
//   return (
//     <div className="bg-white rounded-md w-full p-4 flex flex-col gap-6">

//       {/* -------------------- Employee Info -------------------- */}
//       <div className="flex flex-col items-center gap-2">
//         <img
//           className="w-20 h-20 rounded-full object-cover"
//           src={userData.employee.pic || "/avatar.png"}
//           alt="Profile"
//         />
//         <p className="font-bold text-gray-700 text-lg">
//           {userData.employee.name}
//         </p>
//         {userData.employee.email && (
//           <p className="text-sm text-gray-500">
//             {userData.employee.email}
//           </p>
//         )}
//       </div>

//       <hr className="border-gray-200" />

//       {/* -------------------- Attendance Header -------------------- */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-gray-700 text-md">
//           Attendance Details
//         </h2>

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

//       {/* -------------------- Attendance Fields -------------------- */}
//       <RenderFields
//         sectionKey="attendance"
//         sectionData={userData.attendance}
//         handleInputChange={handleInputChange}
//         editMode={editMode}
//       />
//     </div>
//   );
// }
