import React, { useEffect, useState } from 'react'
import useAuth from '../../../../Context/AuthContext';
import ThreeDots from '../../../../animations/ThreeDots';
import Icon from '../../../../Components/Icon';
import Header from '../../../../Components/Header';
import StepHeader from '../../../../Components/forms/StepHeader';
import { RenderStepContent } from '../../../../utils/RenderStepContent';
import EmployeeProfile from './EmployeeProfile';

function ViewEmployeeDetail() {
    
  const { axiosPrivate } = useAuth(); // must supply axiosPrivate configured with baseURL + auth
  const steps = ["General", "Job", "Payroll", "Documents"];
  const [currentStep, setCurrentStep] = useState(0);
  const [employeeData, setEmployeeData] = useState(null);
  const [originalData, setOriginalData] = useState(null); // keep backend snapshot
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState({general: false, job: false, payroll: false, documents: false,});
  const employeeId = 33;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
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
        setEmployeeData(response[0]);
        setOriginalData(response[0]);
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

      console.log("Saved successfully (simulated):", data);
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

export default ViewEmployeeDetail