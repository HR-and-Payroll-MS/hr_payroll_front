import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  searchEmployees,
  uploadDocuments,
  fetchDocuments,
  deleteDocument,
} from '../../../Example/api';
import UploadDrawer from '../../../Example/UploadDrawer';
import DocumentsTable from '../../../Example/DocumentsTable';
import PreviewModal from '../../../Example/PreviewModal';
import InputField from '../../../Components/InputField';
import Table from '../../../Components/Table';
import Icon from '../../../Components/Icon';
import Header from '../../../Components/Header';
import useAuth from '../../../Context/AuthContext';

export default function UploadDocuments() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeesOptions, setEmployeesOptions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {axiosPrivate} = useAuth();
  const key =[ ['document'],['Type'],['UploadOn'],['UploadedBy'],['Notes'],['Actions'],]
  const title =['document','Type','UploadOn','UploadedBy','Notes','Actions',]
  const structure=[1, 1, 1, 1, 1, 1]


  // Fetch documents for selected employee when it changes
  // take the real employee id and search for any docs on the fetchdoc api end.
  const loadDocuments = useCallback(async (employeeId) => {
    setLoadingDocs(true);
    try {
      const res= await axiosPrivate.get(`/employees/${employeeId}`)
      setDocuments([res.data]|| [])
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
    const handleEmployeeSelect = (emp) => {
    console.log("Selected employee:", emp);

    setSelectedEmployee(emp);
    loadDocuments(emp.id); // send ID only
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
        <Header Title={"Employee Documents"} subTitle={"Upload and manage employee"}/>
        {/* the input part only put what you wrote. the other part will give you suggestions and if you click one employee it will 
                  set selectedEmployee the employee object... and setEmployeeOptions which will contain array of employees that match the input to show as a suggustions
              */}
        <div className="flex items-center gap-3">
          <InputField placeholder={'Search Employee'} apiEndpoint="/api/employees/search" displayKey="name" onSelect={(item) => handleEmployeeSelect(item)} />          
          <button onClick={() => setDrawerOpen(true)} disabled={!selectedEmployee} className={`inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm text-sm ${ selectedEmployee ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
            <Icon name={"Plus"} className="h-4 w-4" />
            Upload Document
          </button>
        </div>
      </header>
      {/* overall it will check selected employee and if there is any it will render the firstdiv.id one shows personal infos like profile pics etc the other one is going to render employee docs via table */}
      <main>
        <div id="firstdiv" className="mb-4">
          <p className="text-sm">Selected Employee:</p>
          {selectedEmployee ? (
            <div className="flex items-center gap-3 mt-2">
              <img
                src={selectedEmployee.avatar || '/pic/default-avatar.png'}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="font-semibold">{selectedEmployee.name}</div>
                <div className="text-xs text-slate-500">
                  {selectedEmployee.department || selectedEmployee.email}
                </div>
              </div>
              <button
                className="ml-4 text-sm text-slate-500"
                onClick={() => setSelectedEmployee(null)}
              >
                Change
              </button>
            </div>
          ) : (
            <div className="mt-2 text-slate-500">
              No employee selected. Search above to pick an employee.
            </div>
          )}
        </div>
         <Table Data={documents} title={title} Structure={structure} ke={key}/>
        {/* <Table Data={documents} Structure={structure} key={key} title={title} onRowClick={(data) => console.log(data)} /> */}
        {/* <DocumentsTable documents={documents} loading={loadingDocs} onPreview={(doc) => setPreviewDoc(doc)} onDelete={handleDelete}/> */}
      </main>

      <UploadDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} employee={selectedEmployee} onUpload={async (payload) => { await handleUpload(payload); setDrawerOpen(false);}} uploading={uploading} />
      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </div>
  );
}


















































































































// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   searchEmployees,
//   uploadDocuments,
//   fetchDocuments,
//   deleteDocument,
// } from '../../../Example/api';
// import UploadDrawer from '../../../Example/UploadDrawer';
// import DocumentsTable from '../../../Example/DocumentsTable';
// import PreviewModal from '../../../Example/PreviewModal';
// import InputField from '../../../Components/InputField';
// import Table from '../../../Components/Table';
// import Icon from '../../../Components/Icon';
// import Header from '../../../Components/Header';
// import useAuth from '../../../Context/AuthContext';

// export default function UploadDocuments() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [loadingDocs, setLoadingDocs] = useState(false);
//   const [previewDoc, setPreviewDoc] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const {axiosPrivate} =useAuth()

//   // ----- TABLE STRUCTURE FIXED -----
//   const structure = [3, 1, 1, 1, 1, 1]; // 6 columns
//   const title = ["USER", "PHONE", "DEPARTMENT", "GENDER", "STATUS", "TYPE"];
//   const key = [
//     ["photo", "full_name", "email"],
//     ["phone"],
//     ["department"],
//     ["gender"],
//     ["status"],
//     ["job_title"]
//   ];
//   // (Removed extra 7th key "id", because structure has 6 columns)

//   // ----- FETCH DOCUMENTS -----
//   const loadDocuments = useCallback(async (employeeId) => {
//     console.log("loading documents for employee:", employeeId);
//     setLoadingDocs(true);

//     try {
//       // const res = await fetchDocuments({ employeeId });
//       const res = await axiosPrivate.get("/employees/")
//       console.log("documents from API:", res);

//       setDocuments(res.data.results || []);
//     } catch (err) {
//       console.error("fetch docs error:", err);
//       setDocuments([]);
//     } finally {
//       setLoadingDocs(false);
//     }
//   }, []);

//   // ----- HANDLE EMPLOYEE SELECT -----
//   const handleEmployeeSelect = (emp) => {
//     console.log("Selected employee:", emp);

//     setSelectedEmployee(emp);
//     loadDocuments(emp.id); // send ID only
//   };

//   // ----- UPLOAD DOCUMENT -----
//   const handleUpload = async ({ files, type, notes, onProgress }) => {
//     if (!selectedEmployee) throw new Error("No employee selected");

//     const form = new FormData();
//     form.append("employeeId", selectedEmployee.id);
//     form.append("type", type);
//     form.append("notes", notes || "");

//     files.forEach((f) => form.append("files", f));

//     setUploading(true);
// try {
//       const res = await uploadDocuments(form, (ev) => {
//         if (onProgress) onProgress(Math.round((ev.loaded * 100) / ev.total));
//       });

//       console.log("Uploaded docs:", res);

//       // append new docs to table
//       setDocuments((prev) => [...prev, ...res]);

//       return res;
//     } catch (err) {
//       console.error("upload error:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ----- DELETE DOCUMENT -----
//   const handleDelete = async (docId) => {
//     const prev = documents;
//     setDocuments((d) => d.filter((x) => x.id !== docId));

//     try {
//       await deleteDocument(docId);
//     } catch (err) {
//       console.error("delete failed", err);
//       setDocuments(prev); // rollback
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* HEADER */}
//       <header className="flex items-center justify-between mb-6">
//         <Header 
//           Title="Employee Documents" 
//           subTitle="Upload and manage employee files"
//         />

//         {/* SEARCH */}
//         <div className="flex items-center gap-3">
//           <InputField
//             placeholder="Search Employee"
//             apiEndpoint="/api/employees/search"
//             displayKey="name"
//             onSelect={handleEmployeeSelect}
//           />

//           <button 
//             onClick={() => setDrawerOpen(true)}
//             disabled={!selectedEmployee}
//             className={`inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm text-sm ${
//               selectedEmployee
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-slate-100 text-slate-400 cursor-not-allowed'
//             }`}
//           >
//             <Icon name="Plus" className="h-4 w-4" />
//             Upload Document
//           </button>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main>
//         {/* SELECTED EMPLOYEE */}
//         <div className="mb-4">
//           <p className="text-sm">Selected Employee:</p>

//           {selectedEmployee ? (
//             <div className="flex items-center gap-3 mt-2">
//               <img
//                 src={selectedEmployee.avatar || '/pic/default-avatar.png'}
//                 className="h-10 w-10 rounded-full"
//               />

//               <div>
//                 <div className="font-semibold">{selectedEmployee.name}</div>
//                 <div className="text-xs text-slate-500">
//                   {selectedEmployee.department || selectedEmployee.email}
//                 </div>
//               </div>

//               <button 
//                 className="ml-4 text-sm text-slate-500"
//                 onClick={() => setSelectedEmployee(null)}
//               >
//                 Change
//               </button>
//             </div>
//           ) : (
//             <div className="mt-2 text-slate-500">
//               No employee selected. Search above to pick an employee.
//             </div>
//           )}
//         </div>

//         {/* TABLE */}
//         <Table
//           Data={documents}
//           title={title}
//           Structure={structure}
//           ke={key}
//         />
//       </main>

//       {/* DRAWER */}
//       <UploadDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         employee={selectedEmployee}
//         onUpload={async (payload) => {
//           await handleUpload(payload);
//           setDrawerOpen(false);
//         }}
//         uploading={uploading}
//       />

//       {/* PREVIEW MODAL */}
//       <PreviewModal 
//         doc={previewDoc}
//         onClose={() => setPreviewDoc(null)}
//       />
//     </div>
//   );
// }

















