import React from "react";
import RenderNestedPolicyFields from "./RenderNestedPolicyFields";
import Icon from "../../../Components/Icon";
import { policyFormSchemas } from "./PolicyFormSchemas";

// Map step index to policy key in policyData
const stepMap = [
  "general",
  "attendancePolicy",
  "leavePolicy",
  "holidayPolicy",
  "shiftPolicy",
  "overtimePolicy",
  "disciplinaryPolicy",
  "jobStructurePolicy",
  "salaryStructurePolicy",
];

const prettyTitle = {
  general: "General Information",
  attendancePolicy: "Attendance Policy",
  leavePolicy: "Leave Policy",
  holidayPolicy: "Holiday Policy",
  shiftPolicy: "Shift Policy",
  overtimePolicy: "OverTime Policy",
  disciplinaryPolicy: "Disciplinary Policy",
  jobStructurePolicy: "Job Structure Policy",
  salaryStructurePolicy: "Salary Structure Policy",
};

const RenderStepPolicy = ({
  currentStep,
  editMode,
  policyData,
  handleInputChange,
  handleSave,
  handleCancel,
  handleEditToggle,
  handleAddItem,
  handleRemoveItem,
}) => {
  const sectionKey = stepMap[currentStep];

  if (!sectionKey) return null;

  return (
    <div className="flex-1 flex-col flex">
      <div className="flex p-4 z-4 bg-white shadow sticky top-0 justify-between items-center mb-2 ">
        <h2 className="font-semibold  text-lg">{prettyTitle[sectionKey]}</h2>
        {editMode?.[sectionKey] ? (
          <div className="flex gap-2">
            <button onClick={() => handleSave(sectionKey)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" >
              Save
            </button>
            <button onClick={() => handleCancel(sectionKey)} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => handleEditToggle(sectionKey)} className="px-3 py-1 rounded hover:bg-slate-100" >
            <Icon className="w-4 h-4" name={"Pen"} />
          </button>
        )}
      </div>
<div className="flex flex-1 gap-5 p-4 justify-start items-start flex-wrap">
        {/* <RenderNestedPolicyFields data={policyData?.[sectionKey]} sectionKey={sectionKey} handleInputChange={handleInputChange} editMode={editMode} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} /> */}
        <RenderNestedPolicyFields
          data={policyData?.[sectionKey]}
          sectionKey={sectionKey}
          handleInputChange={handleInputChange}
          editMode={editMode}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          formSchemas={policyFormSchemas}
        />

      </div>
    </div>
  );
};

export default RenderStepPolicy;