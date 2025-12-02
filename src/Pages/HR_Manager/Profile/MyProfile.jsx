import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useAuth from '../../../Context/AuthContext';
import Header from '../../../Components/Header';
import StepHeader from '../../../Components/forms/StepHeader';
import { RenderStepContent } from '../../../utils/RenderStepContent';
import Icon from '../../../Components/Icon';
import ThreeDots from '../../../animations/ThreeDots';
function EmployeeProfile({employeeData}) {     
  return ( <div id="left" className="flex bg-white w-full flex-col h-full p-2 px-4 gap-4">
        {/* TOP SECTION */}
        <div id="top" className="items-center justify-center flex flex-col flex-2">
          <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
            <img
              className="w-20 h-20 object-fill rounded-full"
                src={
    employeeData?.general?.photo
      ? `http://172.16.27.124:3000${employeeData.general.photo}`
      : "/pic/download (48).png"
  }
              alt="Profile"
            />
          </div>
    
          <div className="flex flex-col items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
            <p className="font-bold text-gray-700 text-lg">
              {employeeData?.general?.fullname || "Not Provided"}
            </p>
            <p className="font-semibold text-gray-500 text-xs">
              {employeeData?.job?.jobtitle || "Not Provided"}
            </p>
          </div>
    
          <div className="flex items-center gap-1.5 justify-center p-2 rounded hover:bg-slate-50">
            <p className={`font-bold px-6 py-1 text-xs rounded-md ${
              employeeData?.payroll?.employeestatus === "Active"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}>
              {employeeData?.payroll?.employeestatus || "unknown"}
            </p>
          </div>
        </div>
    
        <hr className="text-gray-200" />
    
        {/* MIDDLE SECTION */}
        <div id="middle" className="items-start flex flex-col flex-1">
          <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
            <Icon className='w-4 h-4' name={'Mail'}/>
            <p className="font-semibold text-xs text-gray-700 rounded-md">
              {employeeData?.general?.emailaddress || "No email"}
            </p>
          </div>
    
          <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
            <Icon className='w-4 h-4' name={'Phone'}/>
            <p className="font-semibold text-xs text-gray-700 rounded-md">
              {employeeData?.general?.phonenumber || "0972334145"}
            </p>
          </div>
    
          <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
            <Icon className='w-4 h-4' name={'MapPinned'}/>
            <p className="font-semibold text-xs text-gray-700 rounded-md">
              {employeeData?.general?.timezone || "GMT+07:00"}
            </p>
          </div>
        </div>
    
        <hr className="text-gray-200" />
    
        {/* BOTTOM SECTION */}
        <div id="bottom" className="flex-2">
          <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
            <div>
              <p className="font-semibold text-gray-400 text-xs">Department</p>
              <p className="font-bold text-gray-700 text-xs">
                {employeeData?.job?.department || "Designer"}
              </p>
            </div>
          </div>
    
          <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
            <div>
              <p className="font-semibold text-gray-400 text-xs">Office</p>
              <p className="font-bold text-gray-700 text-xs">
                {employeeData?.job?.office || "Unpixel Studio"}
              </p>
            </div>
          </div>
    
          <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
            <div>
              <p className="font-semibold text-gray-400 text-xs">Line Manager</p>
              <div className="flex items-center gap-1.5 my-1.5">
               <img
              className="w-6 h-6 object-fill rounded-full"
              src={employeeData?.general?.profilepicture || "\\pic\\download (48).png"}
              alt="Profile"
            />
                <p className="font-bold text-gray-700 text-xs">
                  {employeeData?.job?.linemanager || "Skylar Catzoni"}
                </p>
              </div>
            </div>
          </div>
    
          <div className="flex bg-red-800 text-white items-center justify-center gap-1.5 px-5 py-3 rounded-md">
            <p className="text-xs font-semibold">Delete User</p>
            <Icon className='w-4 h-4' name={'Trash'}/>
          </div>
        </div>
      </div>
    );
    
  
}


function MyProfile() {
    
  const { axiosPrivate } = useAuth(); // must supply axiosPrivate configured with baseURL + auth
  const steps = ["General", "Job", "Payroll", "Documents"];
  const [currentStep, setCurrentStep] = useState(0);
  const [employeeData, setEmployeeData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // keep backend snapshot
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState({general: false, job: false, payroll: false, documents: false,});
  const employeeId = 0
//   const employeeId = useParams().id;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        //  const daattaa = await axiosPrivate.get(`/employees/${employeeId}`);
        //  console.log(daattaa.data.general.photo);

         const response = [
          {
          id: 1,
          general: {
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
            fullname: "be Beso",
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
                name: "tailwind_cheat_sheet.pdf",
                url: "https://example.com/files/idcard.png",
                type: "application/pdf",
                size: 3717,
                webkitRelativePath: ""
              },
            ],
          },
        }
      ];
        setEmployeeData(response[employeeId]);
        setOriginalData(response[employeeId]);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [axiosPrivate, employeeId]);
  
  const handleDocumentUpdate = (updatedFiles) => {
    setEmployeeData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        files: updatedFiles,
      },
    }));
  };

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (section, field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const handleSave = async (section) => {
    try {
      const payload = { [section]: employeeData[section] };
      console.log("Sending payload:", payload);
      const data = {
        ...employeeData,
        [section]: employeeData[section],
      };

      setEmployeeData(data);
      setOriginalData(data);
      setEditMode((prev) => ({ ...prev, [section]: false }));
      const res= await axiosPrivate.put(`/employees/${employeeId}`, data);
      console.log("Saved successfully (simulated):", data," Response:", res.data);
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save. Try again.");
    }
  };

  const handleCancel = (section) => {
    if (!originalData) return;
    setEmployeeData((prev) => ({
      ...prev,
      [section]: originalData[section],
    }));
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <ThreeDots />
      </div>
    );
if (error)
    return (
      <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
        {error}
      </div>
    );

  if (!employeeData)
    return (
      <div className="p-4 text-center text-gray-500">
        No employee data available.
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full justify-start bg-gray-50 dark:bg-slate-900">
      <Header Title={"Employee Detail"} Breadcrumb={"Employee detail"} />

      <div className="flex flex-1 gap-5 overflow-y-scroll rounded-md h-full">
        <div className="h-fit shadow rounded-xl overflow-clip w-1/4"><EmployeeProfile employeeData={employeeData}/></div>

        <div className="flex flex-col rounded-md shadow h-full flex-1 gap-4 p-4 bg-white">
          <StepHeader steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

          <div className="flex-1 overflow-y-auto">
            <RenderStepContent
              currentStep={currentStep}
              editMode={editMode}
              employeeData={employeeData}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
              handleEditToggle={handleEditToggle}
              handleDocumentUpdate={handleDocumentUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );

}

export default MyProfile