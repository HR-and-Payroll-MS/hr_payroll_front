import React, { useState } from "react";
import useAuth from "../../../Context/AuthContext";
import StepHeader from "../../../Components/forms/StepHeader";
import StepDocument from "../../../Components/forms/StepDocument";
import StepPayroll from "../../../Components/forms/StepPayroll";
import StepJob from "../../../Components/forms/StepJob";
import StepGeneral from "../../../Components/forms/StepGeneral";
import StepReview from "../../../Components/forms/StepReview";
import Modal from "../../../Components/Modal";
import ThreeDots from "../../../animations/ThreeDots";

const AddEmployee = () => {
  
  const [loading, setLoading] = useState(false);
  const {axiosPrivate} = useAuth();
  const [formData, setFormData] = useState({
    general:{ fullname:"",gender:"",dateofbirth:"",maritalstatus:"",nationality:"",personaltaxid:"",emailaddress:"",socialinsurance:"",healthinsurance:"",phonenumber:"",
              primaryaddress:"",country:"",state:"",city:"",postcode:"",
              emefullname:"",emephonenumber:"",emestate:"",emecity:"",emepostcode:"" 
            },
    job:{employeeid:"",serviceyear:"",joindate:"",jobtitle:"",positiontype:"",employmenttype:"",linemanager:"" ,contractnumber:"",contractname:"",contracttype:"",startDate:"",enddate:""},
    payroll:{employeestatus:"",employmenttype:"",jobdate:"",lastworkingdate:"",salary:"",offset:"",onset:""},
    documents:{files:null},
  });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["General", "Job", "Payroll","Documents","Review"];
  const handleDataChange = (section, newData) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...newData },
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const goToStep = (index) => setCurrentStep(index);

const handleSubmit = async (e) => {
  e?.preventDefault(); 
  setLoading(true);

const handleSubmit = async (e) => {
  e?.preventDefault();
  setLoading(true);

  const uploadData = new FormData(); // 👈 renamed
  uploadData.append("employee_id", "string");
  uploadData.append("title", "string");
  uploadData.append("department_id", 1);
  uploadData.append("join_date", "2025-11-08");
  uploadData.append("last_working_date", "2025-11-08");
  uploadData.append("time_zone", "string");
  uploadData.append("office", "string");
  uploadData.append("health_care", "string");
  uploadData.append("is_active", true);
  uploadData.append("photo", formData.documents.files); // now refers to your React state

  try {
    const response = await axiosPrivate.post("/employees/", uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("done")
    return response.data;
  } catch (error) {
    console.error("Error submitting profile:", error.response?.data || error);
  } finally {
    setLoading(false)
  }
};


// const data = {
 
//   "employee_id": "string",
//   "title": "string",
//   "department_id": 1,
//   "join_date": "2025-11-08",
//   "last_working_date": "2025-11-08",
//   "time_zone": "string",
//   "office": "string",
//   "health_care": "string",
//   "is_active": true,
//   "photo": "string"};

//   try {
//     const response = await axiosPrivate.post("/employees/",data);
//     return response.data;
//   } catch (error) {
//     console.error("Error submitting profile:", error.response || error);
//   }
//   finally {
//     setLoading(false);
//   }
};


  // Decide which step to render
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepGeneral
            data={formData.general}
            onChange={(newData) => handleDataChange("general", newData)}
          />
        );
      case 1:
        return (
          <StepJob
            data={formData.job}
            onChange={(newData) => handleDataChange("job", newData)}
          />
        );
        case 2:
          return <StepPayroll  data={formData.payroll}
          onChange={(newData) => handleDataChange("payroll", newData)} />;
          case 3:
            return <StepDocument  data={formData.general}
            onChange={(newData) => handleDataChange("documents", newData)} />;
        case 4:
          return <StepReview data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col mx-auto p-6 bg-white rounded-2xl">
      <StepHeader steps={steps} currentStep={currentStep} onStepClick={goToStep} />

      <div className="mt-6 overflow-y-auto max-h-full">{renderStep()}</div>

      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Previous
          </button>
        )}

        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          > 
          {
            loading?<ThreeDots/>:"submit"
          }
          
          </button>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;











