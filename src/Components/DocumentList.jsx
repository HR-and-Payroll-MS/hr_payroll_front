
import React, { useEffect, useState } from "react";
import PDFViewer from "./PDFViewer";
import FileDrawer from "./FileDrawer"; // Assume you have this modal/drawer component
import useAuth from "../Context/AuthContext";
const DocumentList = ({ files = [], isEditing = false, onChange , justOpen=false}) => {
  const {axiosPrivate} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete file
  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  useEffect(()=>{
    if(justOpen){
      openViewer(files[0]);
    }
  },[])

  // Open viewer - fetch as blob to bypass X-Frame-Options
  const openViewer = async (file) => {
    setSelectedFile(file);
    setError(null);

    // If it's a local File/Blob (just uploaded), use directly
    if (file instanceof File || file instanceof Blob) {
      setBlobUrl(URL.createObjectURL(file));
      setIsModalOpen(true);
      return;
    }


    // If it's from the backend (has an ID), fetch via the serve-document endpoint
    if (file?.id) {
      setLoading(true);
      try {
        // Use the global serve-document endpoint
        const response = await axiosPrivate.get(
          `/employees/serve-document/${file.id}/`,
          { responseType: "blob" }
        );

        // Create a blob URL from the response
        const blob = new Blob([response.data], { 
          type: response.headers['content-type'] || 'application/pdf' 
        });
        const url = URL.createObjectURL(blob);
        
        setBlobUrl(url);
        setIsModalOpen(true);
      } catch (err) {
        console.error("Failed to fetch document:", err);
        setError("Failed to load document. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Close modal and cleanup blob URL
  const handleClose = () => {
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
    setIsModalOpen(false);
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className="h-full">
      {files.length === 0 && (
        <p className="text-sm text-gray-500">No documents</p>
      )}

      {files.map((file, index) => (
        <div
          key={file?.id ?? index}
          className="flex justify-between items-center p-2 bg-slate-100 shadow rounded mb-2"
        >
          <span
            onClick={() => openViewer(file)}
            className="flex-1 cursor-pointer hover:text-green-600"
          >
            {file?.name ?? "Unnamed File"}
          </span>

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

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-500">Loading document...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

     {isModalOpen && selectedFile && blobUrl && (
  justOpen ? (
    <PDFViewer
      url={blobUrl}
      onClose={handleClose}
    />
  ) : (
    <FileDrawer isModalOpen={isModalOpen} closeModal={handleClose}>
      <PDFViewer
        url={blobUrl}
        onClose={handleClose}
      />
    </FileDrawer>
  )
)}

    </div>
  );
};

export default DocumentList;















































































































// import React, { useState } from "react";
// import PDFViewer from "./PDFViewer";
// import FileDrawer from "./FileDrawer"; // Assume you have this modal/drawer component

// const DocumentList = ({ files = [], isEditing = false, onChange }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [blobUrl, setBlobUrl] = useState(null);

//   // Delete file
//   const handleDelete = (index) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     onChange(updatedFiles);
//   };

//   // Open viewer
//   const openViewer = async (file) => {
//     setSelectedFile(file);

//     if (file instanceof File || file instanceof Blob) {
//       setBlobUrl(null); // already a file, no need to fetch
//       setIsModalOpen(true);
//       return;
//     }

//     if (file?.url) {
//       // Use backend URL directly
//       setBlobUrl(file.url);
//       setIsModalOpen(true);
//     }
//   };

//   // Close modal
//   const handleClose = () => {
//     if (blobUrl) setBlobUrl(null);
//     setIsModalOpen(false);
//     setSelectedFile(null);
//   };

//   return (
//     <div>
//       {files.length === 0 && (
//         <p className="text-sm text-gray-500">No documents</p>
//       )}

//       {files.map((file, index) => (
//         <div
//           key={file?.id ?? index}
//           className="flex justify-between items-center p-2 bg-slate-100 shadow rounded mb-2"
//         >
//           <span
//             onClick={() => openViewer(file)}
//             className="flex-1 cursor-pointer hover:text-green-600"
//           >
//             {file?.name ?? "Unnamed File"}
//           </span>

//           {isEditing && (
//             <button
//               onClick={() => handleDelete(index)}
//               className="px-2 py-1 bg-red-500 text-white rounded"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       ))}

//       {isModalOpen && selectedFile && (
//         <FileDrawer isModalOpen={isModalOpen} closeModal={handleClose}>
//           <PDFViewer
//             file={selectedFile instanceof File || selectedFile instanceof Blob ? selectedFile : null}
//             url={blobUrl ?? selectedFile?.url ?? null}
//             onClose={handleClose}
//           />
//         </FileDrawer>
//       )}
//     </div>
//   );
// };

// export default DocumentList;



























































// import { useState } from "react";
// import FileDrawer from "./FileDrawer";
// import PDFViewer from "./PDFViewer";

// const DocumentList = ({ files = [], isEditing = false, onChange }) => {
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedFile, setSelectedFile] = useState(null);
// const [blobUrl, setBlobUrl] = useState(null);

// // Delete a file (optimistic)
// const handleDelete = (index) => {
// const updatedFiles = files.filter((_, i) => i !== index);
// onChange(updatedFiles);
// };

// // Open modal / drawer to preview a file
// const openViewer = async (file) => {
// setSelectedFile(file);
// // If it's a File object (uploaded), no need to fetch
// if (file instanceof File) {
// setBlobUrl(null);
// setIsModalOpen(true);
// return;
// }

// // Otherwise, fetch backend URL as blob
// try {
//   // const res = await fetch(file.url);
//   // const blob = await res.blob();
//   // const url = URL.createObjectURL(blob);
//   setBlobUrl(file.url); // Use the URL directly
  
//   console.log("File URL to fetch as blob:", file.url);
//   setIsModalOpen(true);
// } catch (err) {
//   console.error("Failed to fetch file as blob", err);
// }

// };

// // Clean up blob URL when modal closes
// const handleClose = () => {
// if (blobUrl) {
// URL.revokeObjectURL(blobUrl);
// setBlobUrl(null);
// }
// setIsModalOpen(false);
// setSelectedFile(null);
// };

// return ( <div>
// {files.length === 0 && <p className="text-sm text-gray-500">No documents</p>}


//   {files.map((file, index) => (
//     <div
//       key={file.id ?? index}
//       className="flex justify-between items-center p-2 bg-slate-100 shadow rounded mb-2"
//     >
//       <span
//         onClick={() => openViewer(file)}
//         className="flex-1 cursor-pointer hover:text-green-600"
//       >
//         {file.name}
//       </span>

//       {isEditing && (
//         <button
//           onClick={() => handleDelete(index)}
//           className="px-2 py-1 bg-red-500 text-white rounded"
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   ))}

//   {isModalOpen && selectedFile && (
//     <FileDrawer isModalOpen={isModalOpen} closeModal={handleClose}>
//       <PDFViewer
//         // file={selectedFile instanceof File ? selectedFile : null}
//         url={blobUrl ?? (typeof selectedFile === "object" ? selectedFile.url : null)}
//       />
//     </FileDrawer>
//   )}
// </div>

// );
// };

// export default DocumentList;























































// import { useState } from "react";
// import FileDrawer from "./FileDrawer";
// import PDFViewer from "./PDFViewer";

// const DocumentList = ({ files = [], isEditing = false, onChange }) => {
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedFile, setSelectedFile] = useState(null);

// // Delete a file (optimistic)
// const handleDelete = (index) => {
// const updatedFiles = files.filter((_, i) => i !== index);
// onChange(updatedFiles);
// };

// // Open modal / drawer to preview a file
// const openViewer = (file) => {
// setSelectedFile(file);
// setIsModalOpen(true);
// };

// return ( <div>
// {files.length === 0 && <p className="text-sm text-gray-500">No documents</p>}

// ```
//   {files.map((file, index) => (
//     <div
//       key={file.id ?? index}
//       className="flex justify-between items-center p-2 bg-slate-100 shadow rounded mb-2"
//     >
//       <span
//         onClick={() => openViewer(file)}
//         className="flex-1 cursor-pointer hover:text-green-600"
//       >
//         {file.name}
//       </span>

//       {isEditing && (
//         <button
//           onClick={() => handleDelete(index)}
//           className="px-2 py-1 bg-red-500 text-white rounded"
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   ))}

//   {isModalOpen && selectedFile && (
//     <FileDrawer isModalOpen={isModalOpen} closeModal={setIsModalOpen}>
//       <PDFViewer
//         file={selectedFile instanceof File ? selectedFile : null}
//         url={typeof selectedFile === "object" && selectedFile.url ? selectedFile.url : null}
//       />
//     </FileDrawer>
//   )}
// </div>

// );
// };

// export default DocumentList;


































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
