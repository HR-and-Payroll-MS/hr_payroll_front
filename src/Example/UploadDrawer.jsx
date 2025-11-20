import React, { useState, useRef, useEffect } from 'react';
import FileDrawer from '../Components/FileDrawer';
import Dropdown from '../Components/Dropdown';
import FileUploader from '../Components/FileUploader';


const DOC_TYPES = [{svg:null,content:'ID Card'}, {svg:null,content:'Contract'}, {svg:null,content:'Tax Form'}, {svg:null,content:'Certificate'}, {svg:null,content:'Other'}];
export default function UploadDrawer({open,onClose,employee,onUpload,uploading,}) {
  
  const [type, setType] = useState(DOC_TYPES[0].content);
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  // const fileRef = useRef();

  //reset when open/close generally it sets every state in this component to their initial value most probably null all states not userefs though
  useEffect(() => {
    if (!open) {
      setType(DOC_TYPES[0].content);
      setNotes('');
      setFiles([]);
      setProgress(0);
    }
  }, [open]);

  useEffect(()=>{console.log(files)},[files])
  // will search for the file and delete it or remove from the array
  const removeFile = (idx) => setFiles((f) => f.filter((_, i) => i !== idx));
  
  //check if there is employee ,valid type ,if there is file selected then upload the files,type,notes to the backend there is onProgress and something like that check what it is
  const handleSubmit = async () => {
    if (!employee) {
      alert('Please select an employee before uploading.');
      return;
    }
    if (!type) {
      alert('Please select a document type.');
      return;
    }
    if (files.length === 0) {
      alert('Please pick at least one file to upload.');
      return;
    }

    try {
      await onUpload({ files, type, notes, onProgress: (p) => setProgress(p),});
      // optional: success toast
    } catch (err) {
      console.error('upload err', err);
      alert('Upload failed');
    }
  };











  
  
  
  return (open && <FileDrawer isModalOpen={open} closeModal={onClose} >
              {/* <PDFViewer file={selectedFile}/> */}
        <aside className="ml-auto -z-50 w-full  text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 h-full p-6  overflow-auto">
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Upload Document</h2>
          </div>

              {/* this div checks if there is employee then if so it will display their profile and name and department other wise it will display please select an employee first */}
          <div className="space-y-4" >
            <div>
             <label className="text-sm block mb-1 ">Employee</label>
                {employee ? (
                  <div className="flex items-center gap-3 p-3  ">
                    <img src={employee.avatar || '/pic/avatar.jpg'} alt="" className="h-8 w-8 rounded-full" />
                    <div>
                      <div className="font-medium">{employee.full_name}</div>
                      <div className="text-xs text-slate-500">
                        {employee.employee_id}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-500 text-sm">
                    Please select an employee first.
                  </div>
                )}
            </div>
          </div>
              
              
              {/* makes me chose file type from the above keys its like a selector thing  */}
              <div className='py-1.5'>Document Type</div>
          <Dropdown placeholder='Document Type' options={DOC_TYPES} onChange={(e)=>setType(e)}/>
           {/* i guess it is little note that will make us take a note about what kind of document it is */}
           <div>
             <label className="text-sm py-1.5 block mb-1">Notes (optional)</label>
             <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-slate-300 outline-none rounded p-2 text-sm" rows={3} />
           </div>



          <div>
            <label className="text-sm block mb-1">Files</label>
            {/* div for dragging and droping file or simply selecting files */}
            <FileUploader data={files} onFileSelect={(e)=>console.log(e)} className="flex flex-col gap-2 p-4 justify-center  items-center  ">
                <img className="object-center" src="\pic\F2.png" alt="" />
                <div className="text-sm text-slate-500">
                  Drop files here or click to pick. Allowed: pdf, png, jpg, docx
                </div>
            </FileUploader>
            
            <div> 
              <button onClick={() => removeFile(i)} className="text-red-500 text-sm" >
                Remove
              </button>
            </div>

            {progress > 0 && (
              <div className="mt-3">
                <div className="h-2 bg-slate-200 rounded overflow-hidden">
                  <div style={{ width: `${progress}%` }} className="h-full bg-blue-500" />
                  </div>
                <div className="text-xs text-slate-500 mt-1">{progress}%</div>
              </div>
            )}
          </div>



          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={uploading || !employee || files.length === 0} className={`px-4 py-2 rounded text-white ${uploading ? 'bg-slate-400' : 'bg-blue-600'}`}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>







        </aside>
      </FileDrawer>)


}
