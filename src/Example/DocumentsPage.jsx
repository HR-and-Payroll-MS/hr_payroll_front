import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { searchEmployees, uploadDocuments, fetchDocuments, deleteDocument, } from './api';
import UploadDrawer from './UploadDrawer';
import DocumentsTable from './DocumentsTable';
import PreviewModal from './PreviewModal';
import { Plus } from 'lucide-react'
import InputField from '../Components/InputField';
import Table from '../Components/Table';

export default function DocumentsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeesOptions, setEmployeesOptions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Debounced employee search or checks out every 300ms
  useEffect(() => {
    if (!query) return setEmployeesOptions([]);
    const t = setTimeout(() => {
      (async () => {
        try {
          const res = await searchEmployees(query);
          setEmployeesOptions(res || []);
        } catch (err) {
          console.error('employee search error', err);
        }
      })();
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch documents for selected employee when it changes
  // take the real employee id and search for any docs on the fetchdoc api end.
  const loadDocuments = useCallback(async (employeeId) => {
    setLoadingDocs(true);
    try {
      // const res = await fetchDocuments({ employeeId });
      // setDocuments(res || []);
      console.log('loading docs for emp id:', employeeId);
    } catch (err) {
      console.error('fetch docs error', err);
      setDocuments([]);
    } finally {
      setLoadingDocs(false);
    }
  }, []);
//if employee is selected it will call loadDocuments. it watchs selectedEmployee and loadDocuments
  useEffect(() => {
    if (selectedEmployee?.id) {
      loadDocuments(selectedEmployee.id);
    } else {
      setDocuments([]);
    }
  }, [selectedEmployee, loadDocuments]);

// Handle upload result (optimistic or real)
//watch where the arguments came from other wise it will take array of files it append them all then if the backend returns array of docs it will set them to docs variable/state
//how does the line 67th and 74th work ?file=files,type and notes ,onprogress is a function i guess it takes numbers as a parameter
  const handleUpload = async ({ files, type, notes, onProgress }) => {
    if (!selectedEmployee)
      throw new Error('Employee must be selected before uploading.');
    const form = new FormData();
    form.append('employeeId', selectedEmployee.id);
    form.append('type', type);
    form.append('notes', notes || '');
    files.forEach((f) => form.append('files', f));
    setUploading(true);
    try {
      const res = await uploadDocuments(form, (ev) => {
        if (onProgress) onProgress(Math.round((ev.loaded * 100) / ev.total));
      });
      // assume API returns created docs array -> append to state
      setDocuments((prev) => [...res, ...prev]);
      return res;
    } finally {
      setUploading(false);
    }
  };
//it will do something on line 83 then send the doc id to the delete api end in order to delete overall it stores it to temp file and rolls back if there is an error
  const handleDelete = async (docId) => {
    const prev = documents;
    setDocuments((d) => d.filter((x) => x.id !== docId));
    try {
      await deleteDocument(docId);
    } catch (err) {
      console.error('delete failed', err);
      setDocuments(prev); // rollback
    }
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Employee Documents</h1>
          <p className="text-sm text-slate-500">
            Upload and manage employee files
          </p>
        </div>
              {/* the input part only put what you wrote. the other part will give you suggestions and if you click one employee it will 
                  set selectedEmployee the employee object... and setEmployeeOptions which will contain array of employees that match the input to show as a suggustions
              */}
        <div className="flex items-center gap-3">
          <InputField  placeholder={"Search Employee"} apiEndpoint="/api/employees/search" displayKey="name" onSelect={(item)=>loadDocuments(item)}/>
          

          <button onClick={() => setDrawerOpen(true)} disabled={!selectedEmployee} className={`inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm text-sm ${selectedEmployee? 'bg-blue-600 text-white': 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
            <Plus className="h-4 w-4" />
            Upload Document
          </button>
        </div>
      </header>
{/* overall it will check selected employee and if there is any it will render the firstdiv.id one shows personal infos like profile pics etc the other one is going to render employee docs via table */}
      <main>
        <div id='firstdiv' className="mb-4">
          <p className="text-sm">Selected Employee:</p>
          {selectedEmployee ? (
            <div className="flex items-center gap-3 mt-2">
              <img src={selectedEmployee.avatar || '/pic/default-avatar.png'} alt="" className="h-10 w-10 rounded-full"/>
              <div>
                <div className="font-semibold">{selectedEmployee.name}</div>
                <div className="text-xs text-slate-500">
                  {selectedEmployee.department || selectedEmployee.email}
                </div>
              </div>
              <button className="ml-4 text-sm text-slate-500" onClick={() => setSelectedEmployee(null)}>
                Change
              </button>
            </div>
          ) : (
            <div className="mt-2 text-slate-500">
              No employee selected. Search above to pick an employee.
            </div>
          )}
        </div>
          <Table data={documents} Structure={[1,1,1,1,1,1]} key={[["document"],["Type"],["UploadOn"],["UploadedBy"],["Notes"],["Actions"]] } title={["document","Type","UploadOn","UploadedBy","Notes","Actions"]} onRowClick={(data)=>console.log(data)}/>
        <DocumentsTable documents={documents} loading={loadingDocs} onPreview={(doc) => setPreviewDoc(doc)} onDelete={handleDelete}/>
      </main>


      <UploadDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} employee={selectedEmployee} 
        onUpload={async (payload) => {
          await handleUpload(payload);
          setDrawerOpen(false);
        }}
        uploading={uploading}
      />

      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </div>
  );
}






































// import React, { useEffect, useState } from 'react'
// import Icon from './Icon'
// import SuggestionBox from './SuggestionBox';
// function InputField({placeholder = "Search...",apiEndpoint = "/api/search",displayKey="name",onSelect}) {
//   const [query,setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([])
//   const [loading, setLoading] = useState(false);

//   useEffect(()=>{
//     const delay = setTimeout(()=>{
//       if (query.trim().length > 1){
//         fetchSuggestions(query)
//       } else {
//         setSuggestions([]);
//       }
//     },400)
//     return () => clearTimeout(delay)
//   },[query])

//   const fetchSuggestions = async (text) => {
//     try{
//       setLoading(true);
//       // const res = await axios.get(apiEndpoint,{params:{ q:text }});
//       // setSuggestions(res.data.results || "");

//       setSuggestions([{name:"name"},{name:"nome"},{name:"nami"}])

//     } catch (err){
//       console.error("Error fetching suggestions: ",err);
//     } finally {
//       setLoading (false);
//     }
//   };

//   const handleSelect = (item) => {
//     setQuery(item[displayKey] || "");
//     setSuggestions([]);
//     if (onSelect) onSelect(item);
//   }
//   return (
//           <div className="flex text-slate-700 dark:text-slate-200   flex-1 border rounded items-center justify-between px-2.5  py-1.5 dark:border-slate-500 border-slate-300">
//             <input onChange={(e) => setQuery(e.target.value)}  value={query} className=" text-slate-700 dark:text-slate-200  h-full outline-none rounded w-full" type="text"  placeholder={`${placeholder}`} />
//             <Icon name={"Search"} className={"text-slate-400 w-4 h-4"}/>
//             {loading && (
//               <div className='absolute right-2 top-2 textp-gray-400 text-sm'>...</div>
//             )}
//             <div className=''>
//             <SuggestionBox suggestions={suggestions} onSelect={handleSelect}/></div>
//           </div>
//   )
// }

// export default InputField
// import React from 'react'

// function SuggestionBox({suggestions=[], onSelect}) {
//     if(!suggestions.length) return null;
//   return (
//     <ul>
//         {suggestions.map((item, index)=>(
//             <li key = {index} onClick={()=> onSelect(item)} className='p-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800'>
//                 {item.name || item.title || item.toString()}
//             </li>
//         ))}
//     </ul>
//   )
// }

// export default SuggestionBox   in this code I want the suggestions to appear beneath the search bar equal with width and absolute position right now it's not working what should I do
