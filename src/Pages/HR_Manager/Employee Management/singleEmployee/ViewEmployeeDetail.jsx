import React, { useEffect, useState } from 'react'
import useAuth from '../../../../Context/AuthContext';
import ThreeDots from '../../../../animations/ThreeDots';
import Icon from '../../../../Components/Icon';
import Header from '../../../../Components/Header';
import StepHeader from '../../../../Components/forms/StepHeader';
import { RenderStepContent } from '../../../../utils/RenderStepContent';
import EmployeeProfile from './EmployeeProfile';
import { useLocation, useParams } from 'react-router-dom';
import { Commet, OrbitProgress } from 'react-loading-indicators';
const editableByHR = {
  general: true,
  job: true,
  payroll: true,
  documents: true,
};

const editableByPayroll = {
  general: false,
  job: true,
  payroll: true,
  documents: false,
};
const stepIndexMapByRole = {
  HR: [0, 1, 2, 3],        // General, Job, Payroll, Documents
  payroll: [1, 2],        // Job, Payroll
};

const defaultSteps = ["General", "Job", "Payroll", "Documents"]
function ViewEmployeeDetail({role='HR'}) {
  const { state } = useLocation();
  const { Role } = state || {};
  const activeStep = Role ?? role;
    useEffect(() => {
  const stepMap =
    activeStep === "payroll"
      ? stepIndexMapByRole.payroll
      : stepIndexMapByRole.HR;

  setSteps(
    stepMap.map((i) => defaultSteps[i])
  );

  setUiStep(0);
  setCurrentStep(stepMap[0]); // logical index
}, [activeStep]);

  
  const { axiosPrivate } = useAuth(); // must supply axiosPrivate configured with baseURL + auth
  const [currentStep, setCurrentStep] = useState(0);
  const [uiStep, setUiStep] = useState(0);
  const [employeeData, setEmployeeData] = useState(null);
  const [steps, setSteps] = useState(defaultSteps)
  const [originalData, setOriginalData] = useState(null); // keep backend snapshot
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState({general: false, job: false, payroll: false, documents: false,});
  const employeeId = useParams().id;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
         const daattaa = await axiosPrivate.get(`/employees/${employeeId}`);
         console.log(daattaa.data.documents[0]);

      //    const daattaa = {data:[
      //     {
      //     id: 1,
      //     general: {
      //       gender: "e",
      //       dateofbirth: "7-04-15",
      //       maritalstatus: "gle",
      //       nationality: "iopian",
      //       personaltaxid: "9584732",
      //       emailaddress: "b.taye@example.com",
      //       socialinsurance: "558932",
      //       healthinsurance: "229584",
      //       phonenumber: "+911223344",
      //       primaryaddress: " Sunshine Avenue",
      //       country: "Eopia",
      //       state: "Ad Ababa",
      //       city: "Ad Ababa",
      //       postcode: "0",
      //       emefullname: "ta Taye",
      //       emephonenumber: "+254556677",
      //       emestate: "Ad Ababa",
      //       emecity: "Ad Ababa",
      //       emepostcode: "1",
      //     },
      //     job: {
      //       fullname: "be Beso",
      //       employeeid: "001",
      //       serviceyear: "3",
      //       joindate: "203-10",
      //       jobtitle: "Frnd Developer",
      //       positiontype: "Fuime",
      //       employmenttype: "Pnent",
      //       linemanager: "Sl Bekele",
      //       contractnumber: "C42",
      //       contractname: "Frod Developer Contract",
      //       contracttype: "Indite",
      //       startdate: "2022-0",
      //       enddate: "",
      //     },
      //     payroll: {
      //       employeestatus: "Ae",
      //       employmenttype: "Pnent",
      //       jobdate: "202-10",
      //       lastworkingdate: "",
      //       salary: 25000,
      //       offset: 200,
      //       onset: 100,
      //     },
      //     documents: {
      //       files: [
      //         {
      //           name: "Empent Contract.pdf",
      //           url: "https://example.com/files/contract.pdf",
      //         },
      //         {
      //           name: "tailwind_cheat_sheet.pdf",
      //           url: "https://example.com/files/idcard.png",
      //           type: "application/pdf",
      //           size: 3717,
      //           webkitRelativePath: ""
      //         },
      //       ],
      //     },
      //   }
      // ]};
        setEmployeeData(daattaa.data);
        setOriginalData(daattaa.data);
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
    console.log('updatedFiles',updatedFiles)
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
      const res= await axiosPrivate.patch(`/employees/${employeeId}/`, data);
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
      <div className="flex opacity-50 justify-center items-center h-64">
        {/* <ThreeDots /> */}
        <Commet color="#32cd32" size="medium" textColor="" text="Loading"/>
      </div>
    );
if (error)
    return (
      <div className="p-4 text-center text-red-500 bg-red-50  rounded-lg">
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
        <div className="h-fit shadow rounded-xl overflow-clip w-1/4"><EmployeeProfile role={Role  } employeeData={employeeData}/></div>

        <div className="flex flex-col rounded-md shadow h-full flex-1 gap-4 p-4 bg-white">
                <StepHeader
          steps={steps}
          currentStep={uiStep}
          onStepClick={(index) => {
            const stepMap =
              Role === "payroll"
                ? stepIndexMapByRole.payroll
                : stepIndexMapByRole.HR;

            setUiStep(index);
            setCurrentStep(stepMap[index]); // 👈 THIS FIXES EVERYTHING
          }}
        />

          <div className="flex-1 hover-bar overflow-y-auto">
            <RenderStepContent
              currentStep={currentStep}
              editable={Role === "payroll" ? editableByPayroll : editableByHR}
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