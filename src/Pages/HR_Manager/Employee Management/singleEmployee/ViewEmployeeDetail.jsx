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
import { getLocalData } from '../../../../Hooks/useLocalStorage';
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
  Manager: [0, 1, 2, 3],        // General, Job, Payroll, Documents
  payroll: [1, 2],        // Job, Payroll
};

const defaultSteps = ["General", "Job", "Payroll", "Documents"]
function ViewEmployeeDetail() {
  const role = getLocalData("role")
  const activeStep =  role || "Employee";
    useEffect(() => {
  const stepMap =
    activeStep === "Manager" ?stepIndexMapByRole.Manager:
       stepIndexMapByRole.payroll;

  setSteps(
    stepMap?.map((i) => defaultSteps[i])
  );

  setUiStep(0);
  setCurrentStep(stepMap[0]); 
}, [activeStep]);

  
  const { axiosPrivate } = useAuth(); 
  const [currentStep, setCurrentStep] = useState(0);
  const [uiStep, setUiStep] = useState(0);
  const [employeeData, setEmployeeData] = useState(null);
  const [steps, setSteps] = useState(defaultSteps)
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState({general: false, job: false, payroll: false, documents: false,});
  const employeeId = useParams().id;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
         const daattaa = await axiosPrivate.get(`/employees/${employeeId}`);
         console.log(daattaa.data.documents[0]);

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
      <div className="p-4 text-center h-full justify-center items-center flex flex-col text-red-500 bg-slate-50  rounded-lg">
        <img className='w-2/6' src='/pic/F24.png'/>
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
  <div className="flex flex-col w-full  h-full justify-start bg-white dark:bg-slate-800 transition-colors duration-300">
    <Header className={"px-6"} Title={"Employee Detail"} Breadcrumb={"Employee detail"} />
    <div className="flex flex-1 gap-4 p-2.5 overflow-hidden h-full">
      <div className="w-1/4 h-full bg-gray-50 dark:bg-slate-700 shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 rounded overflow-hidden">
          <EmployeeProfile role={role} employeeData={employeeData} />
      </div>
      <div className="flex flex-col flex-1 gap-4 h-full overflow-hidden">
        <div className="bg-gray-50 dark:bg-slate-700 shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 rounded p-1">
          <StepHeader
            steps={steps}
            currentStep={uiStep}
            onStepClick={(index) => {
              const stepMap =
                role === "payroll"
                  ? stepIndexMapByRole.payroll
                  : stepIndexMapByRole.Manager;

              setUiStep(index);
              setCurrentStep(stepMap[index]);
            }}
          />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hidden bg-gray-50 dark:bg-slate-700 shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 rounded p-6">
          <div className="max-w-5xl mx-auto">
             <RenderStepContent
                currentStep={currentStep}
                editable={role === "payroll" ? editableByPayroll : editableByHR}
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
  </div>
);

}

export default ViewEmployeeDetail