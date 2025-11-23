import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  searchEmployees,
  uploadDocuments,
  fetchDocuments,
  deleteDocument,
} from '../../../Example/api';
import UploadDrawer from '../../../Example/UploadDrawer';
import PreviewModal from '../../../Example/PreviewModal';
import InputField from '../../../Components/InputField';
import Table from '../../../Components/Table';
import Icon from '../../../Components/Icon';
import Header from '../../../Components/Header';
import useAuth from '../../../Context/AuthContext';

export default function UploadDocuments() {
  const employee = {
          id: 1,
          general: {
            fullname: "be Beso",
            gender: "e",
            dateofbirth: "7-04-15",
            maritalstatus: "gle",
            nationality: "iopian",
            personaltaxid: "9584732",
            emailaddress: "b.taye@example.com",
            socialinsurance: "558932",
            healthinsurance: "229584",
            phonenumber: "+911223344",
            primaryaddress: " Sunshine Avenue",
            country: "Eopia",
            state: "Ad Ababa",
            city: "Ad Ababa",
            postcode: "0",
            emefullname: "ta Taye",
            emephonenumber: "+254556677",
            emestate: "Ad Ababa",
            emecity: "Ad Ababa",
            emepostcode: "1",
          },
          job: {
            employeeid: "001",
            serviceyear: "3",
            joindate: "203-10",
            jobtitle: "Frnd Developer",
            positiontype: "Fuime",
            employmenttype: "Pnent",
            linemanager: "Sl Bekele",
            contractnumber: "C42",
            contractname: "Frod Developer Contract",
            contracttype: "Indite",
            startdate: "2022-0",
            enddate: "",
          },
          payroll: {
            employeestatus: "Ae",
            employmenttype: "Pnent",
            jobdate: "202-10",
            lastworkingdate: "",
            salary: 25000,
            offset: 200,
            onset: 100,
          },
          documents: {
            files: [
              {
                name: "Empent Contract.pdf",
                url: "https://example.com/files/contract.pdf",
              },
              {
                name: "ID .png",
                url: "https://example.com/files/idcard.png",
              },
            ],
          },
        }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(employee);
  const [employeesOptions, setEmployeesOptions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {axiosPrivate} = useAuth();
  const key =[ ['document'],['Type'],['UploadOn'],['UploadedBy'],['Notes'],['Actions'],]
  const key2 =[ ['general_fullname'],['general_gender'],['general_state'],['general_city'],['general_country'],['general_postcode'],]
  const title =['document','Type','UploadOn','UploadedBy','Notes','Actions',]
  const structure=[1, 1, 1, 1, 1, 1]
    const response = [
          {
          id: 1,
          general: {
            fullname: "be Beso",
            gender: "e",
            dateofbirth: "7-04-15",
            maritalstatus: "gle",
            nationality: "iopian",
            personaltaxid: "9584732",
            emailaddress: "b.taye@example.com",
            socialinsurance: "558932",
            healthinsurance: "229584",
            phonenumber: "+911223344",
            primaryaddress: " Sunshine Avenue",
            country: "Eopia",
            state: "Ad Ababa",
            city: "Ad Ababa",
            postcode: "0",
            emefullname: "ta Taye",
            emephonenumber: "+254556677",
            emestate: "Ad Ababa",
            emecity: "Ad Ababa",
            emepostcode: "1",
          },
          job: {
            employeeid: "001",
            serviceyear: "3",
            joindate: "203-10",
            jobtitle: "Frnd Developer",
            positiontype: "Fuime",
            employmenttype: "Pnent",
            linemanager: "Sl Bekele",
            contractnumber: "C42",
            contractname: "Frod Developer Contract",
            contracttype: "Indite",
            startdate: "2022-0",
            enddate: "",
          },
          payroll: {
            employeestatus: "Ae",
            employmenttype: "Pnent",
            jobdate: "202-10",
            lastworkingdate: "",
            salary: 25000,
            offset: 200,
            onset: 100,
          },
          documents: {
            files: [
              {
                name: "Empent Contract.pdf",
                url: "https://example.com/files/contract.pdf",
              },
              {
                name: "ID .png",
                url: "https://example.com/files/idcard.png",
              },
            ],
          },
        },
      ]
  const loadDocuments = useCallback(async (employeeId) => {
    // setLoadingDocs(true);
    // try {
    //   const res= await axiosPrivate.get(`/employees/${employeeId}`)
    //   setDocuments([res.data]|| [])
    // } catch (err) {
    //   console.error('fetch docs error', err);
    //   setDocuments([]);
    // } finally {
    //   setLoadingDocs(false);
    // }
    setDocuments(response)
  }, []);useEffect(() => {
    if (selectedEmployee?.id) {
      loadDocuments(selectedEmployee.id);
    } else {
      setDocuments([]);
    }
  }, [selectedEmployee, loadDocuments]);
 const handleUpload = async ({ files, type, notes, onProgress }) => {
  console.log(files, type, notes, onProgress)
    // if (!selectedEmployee)
    //   throw new Error('Employee must be selected before uploading.');
    // const form = new FormData();
    // form.append('employeeId', selectedEmployee.id);
    // form.append('type', type);
    // form.append('notes', notes || '');
    // files.forEach((f) => form.append('files', f));
    // setUploading(true);
    // try {
    //   const res = await uploadDocuments(form, (ev) => {
    //     if (onProgress) onProgress(Math.round((ev.loaded * 100) / ev.total));
    //   });
    //   setDocuments((prev) => [...res, ...prev]);
    //   return res;
    // } finally {
    //   setUploading(false);
    // }
  };
    const handleEmployeeSelect = (emp) => {
    console.log("Selected employee:", emp);

    setSelectedEmployee(emp);
    loadDocuments(emp.id); // send ID only
  };
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
        <Header Title={"Employee Documents"} subTitle={"Upload and manage employee"}/>
        <div className="flex items-center gap-3">
          <InputField placeholder={'Search Employee'} apiEndpoint="/api/employees/search" displayKey="name" onSelect={(item) => handleEmployeeSelect(item)} />          
          <button onClick={() => setDrawerOpen(true)} disabled={!selectedEmployee} className={`inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm text-sm ${ selectedEmployee ? 'bg-slate-800 hover:bg-slate-950 hover:cursor-pointer dark:text-slate-700 dark:bg-slate-300 dark:hover:bg-slate-50 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
            <Icon name={"Plus"} className="h-4 w-4" />
            Upload Document
          </button>
        </div>
      </header>
      <main>
        <div id="firstdiv" className="mb-4">
          <p className="text-sm dark:text-slate-300">Selected Employee:</p>
          {selectedEmployee ? (
            <div className="flex items-center gap-3 mt-2">
              <img
                src={selectedEmployee.avatar || '/pic/avatar.jpg'}
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
                className="ml-4 hover:cursor-pointer dark:hover:text-slate-50 hover:text-slate-950 text-sm text-slate-500"
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
        <Table Data={response} Structure={structure} ke={key2} title={title} onRowClick={(data) => console.log(data)} />
       </main>

      <UploadDrawer open={drawerOpen} onClose={setDrawerOpen} employee={selectedEmployee} onUpload={async (payload) => { await handleUpload(payload); setDrawerOpen(false);}} uploading={uploading} />
      <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
    </div>
  );
}

