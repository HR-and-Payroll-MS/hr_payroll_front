import DocumentList from "../../../Components/DocumentList";
import Icon from "../../../Components/Icon";
import { RenderFields } from "../../../utils/renderFields";
import { RenderNestedPolicyFields } from "../../../utils/RenderNestedPolicyFields";


export const RenderStepPolicy = ({
  currentStep,
  editMode,
  employeeData,
  handleInputChange,
  handleSave,
  handleCancel,
  handleEditToggle,
  handleDocumentUpdate,
}) => {
  switch (currentStep) {
      case 0:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.attendancePolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("attendancePolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("attendancePolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("attendancePolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.attendancePolicy}
                    sectionKey="attendancePolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 1:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.leavePolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("leavePolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("leavePolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("leavePolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.leavePolicy}
                    sectionKey="leavePolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 2:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.holidayPolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("holidayPolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("holidayPolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("holidayPolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.holidayPolicy}
                    sectionKey="holidayPolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 3:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.shiftPolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("shiftPolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("shiftPolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("shiftPolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.shiftPolicy}
                    sectionKey="shiftPolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 4:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.overtimePolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("overtimePolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("overtimePolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("overtimePolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.overtimePolicy}
                    sectionKey="overtimePolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 5:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.disciplinaryPolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("disciplinaryPolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("disciplinaryPolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("disciplinaryPolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.disciplinaryPolicy}
                    sectionKey="disciplinaryPolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 6:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.jobStructurePolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("jobStructurePolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("jobStructurePolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("jobStructurePolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.jobStructurePolicy}
                    sectionKey="jobStructurePolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );
      case 7:
            return (
                <div className="flex-1 flex-col flex">
                <div className="flex p-4 bg-amber-50 shadow sticky top-0 justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">Attendance Policy</h2>

                    {editMode?.salaryStructurePolicy ? (
                    <div className="flex gap-2">
                        <button onClick={() => handleSave("salaryStructurePolicy")} className="px-3 py-1 bg-green-500 text-white rounded">
                        Save
                        </button>
                        <button onClick={() => handleCancel("salaryStructurePolicy")} className="px-3 py-1 bg-gray-300 rounded">
                        Cancel
                        </button>
                    </div>
                    ) : (
                    <button
                        onClick={() => handleEditToggle("salaryStructurePolicy")}
                        className="px-3 py-1 rounded hover:bg-slate-100"
                    >
                        Edit
                    </button>
                    )}
                </div>

                <div className="p-4">
                    <RenderNestedPolicyFields
                    data={employeeData.salaryStructurePolicy}
                    sectionKey="salaryStructurePolicy"
                    handleInputChange={handleInputChange}
                    editMode={editMode}
                    />
                </div>
                </div>
            );


    
    default:
      return null;
  }
};
