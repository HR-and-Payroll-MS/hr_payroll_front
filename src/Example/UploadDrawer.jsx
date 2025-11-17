import React, { useState, useRef } from 'react';

const DOC_TYPES = ['ID Card', 'Contract', 'Tax Form', 'Certificate', 'Other'];

export default function UploadDrawer({open,onClose,employee,onUpload,uploading,}) {
  const [type, setType] = useState(DOC_TYPES[0]);
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef();

  // reset when open/close generally it sets every state in this component to their initial value most probably null all states not userefs though
  React.useEffect(() => {
    if (!open) {
      setType(DOC_TYPES[0]);
      setNotes('');
      setFiles([]);
      setProgress(0);
    }
  }, [open]);
  // i guess when we drag and drop it will add the files to files state via setfiles but before that what kind of data did it store in that fucking dtFiles???check it 
  const onDrop = (ev) => {
    ev.preventDefault();
    const dtFiles = Array.from(ev.dataTransfer.files);
    setFiles((f) => [...f, ...dtFiles]);
  };
  // the same as the onDrop function but instead of on drop it's onpick
  const onPickFiles = (e) => setFiles((f) => [...f, ...Array.from(e.target.files)]);
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

  if (!open) return null;

  return (
    // overlay + drawer
    <div className="fixed inset-0 z-40 flex">
     <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="ml-auto -z-50 w-full max-w-md bg-white dark:bg-slate-800 h-full p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upload Document</h2>
          <button onClick={onClose} className="text-slate-500">Close</button>
        </div>
        <div className="space-y-4">
          {/* this div checks if there is employee then if so it will display their profile and name and department other wise it will display please select an employee first */}
          <div>
            <label className="text-sm block mb-1">Employee</label>
            {employee ? (
              <div className="flex items-center gap-3 p-3 border rounded">
                <img src={employee.avatar || '/pic/default-avatar.png'} alt="" className="h-8 w-8 rounded-full" />
                <div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-xs text-slate-500">
                    {employee.department}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-red-500 text-sm">
                Please select an employee first.
              </div>
            )}
          </div>
          {/* makes me chose file type from the above keys its like a selector thing  */}
          <div>
            <label className="text-sm block mb-1">Document Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2" >
              {DOC_TYPES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {/* i guess it is little note that will make us take a note about what kind of document it is */}
          <div>
            <label className="text-sm block mb-1">Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded p-2 text-sm" rows={3} />
          </div>

          <div>
            <label className="text-sm block mb-1">Files</label>
            {/* div for dragging and droping file or simply selecting files */}
            <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()} className="border-2 border-dashed rounded p-4 text-center cursor-pointer" onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" className="hidden" multiple onChange={onPickFiles} />
              <div className="text-sm text-slate-500">
                Drop files here or click to pick. Allowed: pdf, png, jpg, docx
              </div>
            </div>
            {/* this div is trying to display what is selected and allow us to remove and also show the size and the type of the file */}
            <div className="mt-3 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 p-2 rounded" >
                  <div className="flex items-center gap-3">
                    <div className="w-8 text-xs">
                      {f.type.includes('image')? 'IMG': f.type.includes('pdf')? 'PDF': 'DOC'}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{f.name}</div>
                      <div className="text-xs text-slate-500">
                        {Math.round(f.size / 1024)} KB
                      </div>
                    </div>
                  </div>
                  <div> 
                    <button onClick={() => removeFile(i)} className="text-red-500 text-sm" >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
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
        </div>
      </aside>
    </div>
  );
}
