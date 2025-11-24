import DocumentList from "../Components/DocumentList";
import Icon from "../Components/Icon";
import { RenderFields } from "./renderFields";

export const RenderStepContent = ({
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
        <div className="flex-1 flex-col p-2 flex">
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="font-semibold text-lg">General Information</h2>
            {editMode?.general ? (
              <div className="flex gap-2">
                <button onClick={() => handleSave("general")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  Save
                </button>
                <button onClick={() => handleCancel("general")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => handleEditToggle("general")} className="px-3 py-1 rounded hover:bg-slate-100">
                <Icon className="w-4 h-4" name={"Pen"} />
              </button>
            )}
          </div>

          <div className="flex flex-1 gap-5 p-4 justify-start items-start flex-wrap">
            <RenderFields sectionKey="general" sectionData={employeeData?.general} handleInputChange={handleInputChange} editMode={editMode} />
          </div>
        </div>
      );

    case 1:
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="font-semibold text-lg">Job Information</h2>
            {editMode?.job ? (
              <div className="flex gap-2">
                <button onClick={() => handleSave("job")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  Save
                </button>
                <button onClick={() => handleCancel("job")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => handleEditToggle("job")} className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100">
                <Icon className="w-4 h-4" name={"Pen"} />
              </button>
            )}
          </div>

          <div className="flex gap-5 p-4 justify-start items-start flex-wrap">
            <RenderFields handleInputChange={handleInputChange} sectionKey={"job"} sectionData={employeeData?.job} editMode={editMode} />
          </div>
        </div>
      );
case 2:
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="font-semibold text-lg">Payroll Information</h2>
            {editMode?.payroll ? (
              <div className="flex gap-2">
                <button onClick={() => handleSave("payroll")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  Save
                </button>
                <button onClick={() => handleCancel("payroll")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => handleEditToggle("payroll")} className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100">
                <Icon className="w-4 h-4" name={"Pen"} />
              </button>
            )}
          </div>
          <div className="flex gap-5 p-4 justify-start items-start flex-wrap">
            <RenderFields handleInputChange={handleInputChange} sectionKey={"payroll"} sectionData={employeeData?.payroll} editMode={editMode} />
          </div>
        </div>
      );

    case 3:
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2 ">
            <h2 className="font-semibold text-lg">Documents</h2>
            {editMode?.documents ? (
              <div className="flex gap-2">
                <button onClick={() => handleSave("documents")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                  Save
                </button>
                <button onClick={() => handleCancel("documents")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => handleEditToggle("documents")} className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100">
                <Icon className="w-4 h-4" name={"Pen"} />
              </button>
            )}
          </div>

          <div className="space-y-2 ">
            <DocumentList files={employeeData?.documents?.files || []} isEditing={!!editMode?.documents} onChange={handleDocumentUpdate} />
          </div>
        </div>
      );

    default:
      return null;
  }
};






















































// import DocumentList from "../Components/DocumentList";
// import Icon from "../Components/Icon";
// import { RenderFields } from "./RenderFields";

//   export const RenderStepContent = ({
//     handleInputChange,
//     handleSave,
//     handleCancel,
//     handleEditToggle,
//     editMode=[],
//     employeeData=[],
//     currentStep,
//     fileDelete,
//     handleDocumentUpdate}) => {
    
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="flex-1 flex-col p-2 flex">
//                     <div className="flex justify-between items-center mb-2 ">
//                         <h2 className="font-semibold text-lg">General Information</h2>
//                         {editMode?.general ? (
//                             <div className="flex gap-2">
//                                 <button onClick={() => handleSave("general")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" >
//                                     Save
//                                 </button>
//                                 <button onClick={() => handleCancel("general")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" >
//                                     Cancel
//                                 </button>
//                             </div>
//                         ) : (
//                                 <button onClick={() => handleEditToggle("general")} className="px-3 py-1  rounded hover:bg-slate-100 hover:cursor-pointer">
//                                     <Icon className='w-4 h-4' name={'Pen'}/>
//                                 </button>
//                         )}
//                     </div>
//                     <div className="flex flex-1 gap-5 p-4 justify-start items-start flex-wrap  ">
//                       {/* {console.log("hi",employeeData?.general, "there",editMode)} */}
//                     <RenderFields  sectionKey="general" sectionData={employeeData?.general} handleInputChange={handleInputChange} editMode={editMode}/>
//                     </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center mb-2 ">
//               <h2 className="font-semibold text-lg">Job Information</h2>
//               {editMode?.job ? (
//                 <div className="flex gap-2">
//                   <button onClick={() => handleSave("job")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" >
//                     Save
//                   </button>
//                   <button onClick={() => handleCancel("job")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
//                     Cancel
//                   </button>
//                 </div>
//               ) : (<button onClick={() => handleEditToggle("job")} className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100">
//                   <Icon className='w-4 h-4' name={'Pen'}/>
//                 </button>
//               )}
//             </div>
//             <div className="flex gap-5 p-4 justify-start items-start flex-wrap">
//               <RenderFields handleInputChange={handleInputChange} sectionKey={ "job"} sectionData={ employeeData?.job} editMode={editMode}/>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center mb-2 ">
//               <h2 className="font-semibold text-lg">Payroll Information</h2>
//               {editMode?.payroll ? (
//                 <div className="flex gap-2">
//                   <button onClick={() => handleSave("payroll")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" >
//                     Save
//                   </button>
//                   <button onClick={() => handleCancel("payroll")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <button onClick={() => handleEditToggle("payroll")} className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100">
//                   <Icon className='w-4 h-4' name={'Pen'}/>
//                 </button>
//               )}
//             </div>
//             <div className="flex gap-5 p-4 justify-start items-start flex-wrap">
//               <RenderFields handleInputChange={handleInputChange} sectionKey={ "payroll"} sectionData={ employeeData?.payroll} editMode={editMode}/>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center mb-2 ">
//               <h2 className="font-semibold text-lg">Documents</h2>
              
//             </div>
//             {/* <div className="space-y-2">{renderDocuments()}</div> */}
//             <div className="space-y-2"><DocumentList files={employeeData.documents.files} isEditing={editMode} fileDelete={fileDelete} onChange={handleDocumentUpdate} /></div>
//           </div>
//         );
//       default:
//         return null;
//     }
// };