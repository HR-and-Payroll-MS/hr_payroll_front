import { useState } from "react";
import FileDrawer from "./FileDrawer";
import PDFViewer from "./PDFViewer";

const DocumentList = ({ files = [], isEditing = false, onChange }) => {
  const [isModalOpen,setIsModalOpen] =useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  // immediate deletion (optimistic)
  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };
  
  const openViewer = (file)=>{
    // console.log(file)
    setSelectedFile(file)
    setIsModalOpen(true)
  }
 
  return (
    <div>
      {files.map((file, index) => (
        <div key={file.id ?? index}  className="flex justify-between items-center p-2 bg-slate-100 shadow rounded mb-2">
          {/* <a href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline"> */}
            <span onClick={()=> openViewer(file)} className="flex justify-between items-center  cursor-pointer hover:text-green-600">
            {file.name}
            </span>
          {/* </a> */}
   
          {isEditing && (
            <button
              onClick={() => handleDelete(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          )}
        </div>
      ))}
      {files.length === 0 && <p className="text-sm text-gray-500">No documents</p>}
      {isModalOpen && selectedFile &&( <FileDrawer isModalOpen={isModalOpen} closeModal={setIsModalOpen} >
                 <PDFViewer file={selectedFile}/>
                 {console.log("selected file ",selectedFile)}
                 </FileDrawer>)}
    </div>
  );
};

export default DocumentList; // optional if you want to import elsewhere

































// const DocumentList = ({ files, isEditing, onChange }) => {
  
//   const handleDelete = (index) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     onChange(updatedFiles);
//   };

//   return (
//     <div>
//       {files.map((file, index) => (
//         <div key={index} className="flex justify-between items-center p-2 border rounded">
          
//           <a 
//             href={file.url}
//             target="_blank"
//             className="text-blue-600 hover:underline"
//           >
//             {file.name}
//           </a>

//           {isEditing && (
//             <button
//               onClick={() => handleDelete(index)}
//               className="px-2 py-1 bg-red-500 text-white"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DocumentList;

// import DocumentList from "./components/DocumentList";
// import { useFileDelete } from "./hooks/useFileDelete";

// const fileDelete = useFileDelete();

// <DocumentList
//   files={employeeData.documents.files}
//   isEditing={editMode.documents}
//   fileDelete={fileDelete}
// />
