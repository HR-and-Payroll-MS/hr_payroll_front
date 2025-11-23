import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import FileDrawer from "./FileDrawer";
import PDFViewer from "./PDFViewer";

export default function FileUploader({
  onFileSelect,
  label = "Upload File",
  className = "flex flex-col items-center justify-center cursor-pointer transition-all duration-200",
  children,
  data
}) {
  
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(()=>{
    console.log(data)
  setSelectedFile(Array.isArray(data.files) ? data.files[0] : data.files);
}, [data]);

  const fileInputRef = useRef(null);
  const [isModalOpen,closeModal] =useState(false);
// i don't know what the below line of code is saying 
  const handleClick = () => fileInputRef.current.click();
//sets selected file to "file" and sets the onFileSelect to "file"
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    onFileSelect?.(file);
  };
//sets isDragging to true
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
//sets isdragging to false check the first e.data.files[0] if so set's selectedfile to "file" and onfileselect to "file"
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setSelectedFile(file);
    onFileSelect?.(file);
  };
//i don't know what e.stopPropagation is but it also sets selectedfile to null and if the fileinputref to null if not. i don't know why we use the ref thing too 
  const handleDelete = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };
//again this e.stoppropagation thing plus calls the handleclick function
  const handleChangeFile = (e) => {
    e.stopPropagation();
    handleClick();
  };

  return (
    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`${className} rounded-2xl p-4 ${isDragging ? "border-2 border-dashed border-green-600 bg-green-50": ""}`}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=""/>

      {!selectedFile && (
        <>
          {children ? <>
            {children}
         
            <div onClick={handleClick} className="flex hover:cursor-pointer items-center p-2.5 m-2  rounded-lg bg-slate-950 text-slate-100">
              <Icon name="FileText" className="h-4" />
              <p className="text-sm text-center px-2">{label}</p>
            </div>

          </>: ""}
        </>
      )}

      {selectedFile && (
        <div className="w-full flex items-center justify-between mt-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
          <div onClick={()=>closeModal(true)} className="flex group items-center space-x-2">
            <Icon name="FileText" className="text-red-600 group-hover:text-green-700 h-5 w-5 flex-shrink-0" />
            <div className="flex hover:cursor-pointer group flex-col">
              <p className="text-sm group-hover:text-green-700 font-medium text-gray-800">
                {selectedFile.name}
              </p>
              <p className="text-xs group-hover:text-green-700 text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            {isModalOpen && <FileDrawer isModalOpen={isModalOpen} closeModal={closeModal} >
              <PDFViewer file={selectedFile}/>
              </FileDrawer>}
            
          </div>{/* over all displays file icon with the file and the file name and size */}

          
          <div className="flex items-center space-x-2">
            {/* Change file */}
            <button type="button" onClick={handleChangeFile} className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 transition" title="Change file" >
              <Icon name="RefreshCw" className="h-4 w-4" />
            </button>

            {/* Delete file ------------check this */}
            <button type="button" onClick={handleDelete} className="p-1.5 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition" title="Remove file" >
              <Icon name="Trash2" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
