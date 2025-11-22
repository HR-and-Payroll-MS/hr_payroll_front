const DocumentList = ({ files, isEditing, fileDelete }) => {
  return (
    <div>
      {files.map((file, index) => (
        <div key={index} className="flex justify-between items-center p-2 border rounded">
          
          <a href={file.url} target="_blank" className={`text-blue-600 hover:underline ${ fileDelete.isMarked(index) ? "line-through" : "" }`} >
            {file.name}
          </a>

          {isEditing && (
            <div>
              {fileDelete.isMarked(index) ? (
                <button onClick={() => fileDelete.cancelDelete(index)} className="px-2 py-1 bg-gray-300" >
                  Cancel
                </button>
              ) : (
                <button onClick={() => fileDelete.markDelete(index)} className="px-2 py-1 bg-red-500 text-white" >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentList;

// import DocumentList from "./components/DocumentList";
// import { useFileDelete } from "./hooks/useFileDelete";

// const fileDelete = useFileDelete();

// <DocumentList
//   files={employeeData.documents.files}
//   isEditing={editMode.documents}
//   fileDelete={fileDelete}
// />
