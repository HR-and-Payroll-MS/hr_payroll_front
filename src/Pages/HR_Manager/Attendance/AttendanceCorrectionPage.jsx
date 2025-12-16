import React, { useState, useEffect } from "react";
import ThreeDots from "../../../animations/ThreeDots";
import { RenderFields } from "../../../utils/renderFields";
import { useParams } from "react-router-dom";
import useAuth from "../../../Context/AuthContext";

export default function AttendanceCorrectionPage({ Data }) {
  const { id } = useParams();
  const { axiosPrivate } = useAuth();

  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState({
    attendance: false,
  });

  // ------------------- FORMAT BACKEND DATA -------------------
  const formatBackendData = (d) => {
    if (!d) return null;

    return {
      employee: {
        name: d.employee_name || "",
        email: "",        // backend does not provide it
        pic: "",          // backend does not provide it
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

  // ------------------- LOAD DATA -------------------
  useEffect(() => {
    const load = async () => {
      try {
        // If Data is already passed from parent
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

  // ------------------- LOADING -------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ThreeDots />
      </div>
    );
  }

  if (!userData || !userData.employee || !userData.attendance) {
    return (
      <div className="text-gray-500 text-center p-4">
        No Attendance Data Found
      </div>
    );
  }

  // ------------------------ EDIT TOGGLE ---------------------------
  const toggleEdit = () => {
    setEditMode({ attendance: !editMode.attendance });
  };

  // ------------------ HANDLE INPUT CHANGE -------------------------
  const handleInputChange = (sectionKey, field, value) => {
    setUserData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value === "" ? null : value,
      },
    }));

    setUpdatedData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value === "" ? null : value,
      },
    }));
  };

  // ---------------------------- SAVE ------------------------------
  const handleSave = async () => {
    try {
      console.log("Saving updated data:", updatedData);

      // Example backend payload (only changed fields)
      const payload = {
        ...updatedData.attendance,
      };

      // await axiosPrivate.patch(
      //   `/attendances/${userData.attendance.attendance_id}/`,
      //   payload
      // );

      setOriginalData(userData);
      setUpdatedData({});
      setEditMode({ attendance: false });
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // --------------------------- CANCEL -----------------------------
  const handleCancel = () => {
    setUserData(originalData);
    setUpdatedData({});
    setEditMode({ attendance: false });
  };

  // --------------------------- RENDER -----------------------------
  return (
    <div className="bg-white rounded-md w-full p-4 flex flex-col gap-6">

      {/* -------------------- Employee Info -------------------- */}
      <div className="flex flex-col items-center gap-2">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={userData.employee.pic || "/avatar.png"}
          alt="Profile"
        />
        <p className="font-bold text-gray-700 text-lg">
          {userData.employee.name}
        </p>
        {userData.employee.email && (
          <p className="text-sm text-gray-500">
            {userData.employee.email}
          </p>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* -------------------- Attendance Header -------------------- */}
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
