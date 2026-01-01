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
import { useTable } from "../../../Context/useTable";
import { useTableContext } from "../../../Context/TableContext";

const AddEmployee = () => {
  const { refreshTableSilently } = useTableContext();
  
  const [loading, setLoading] = useState(false);
  const { axiosPrivate } = useAuth();
  const [formData, setFormData] = useState({
    general: {
      firstname: "", lastname: "", gender: "", dateofbirth: "", maritalstatus: "", nationality: "", personaltaxid: "", emailaddress: "", socialinsurance: "", healthinsurance: "", phonenumber: "",
      primaryaddress: "", country: "", state: "", city: "", postcode: "",
      emefullname: "", emephonenumber: "", emestate: "", emecity: "", emepostcode: ""
    },
    job: { employeeid: "", serviceyear: "", joindate: "", jobtitle: "", positiontype: "", employmenttype: "", linemanager: "", contractnumber: "", contractname: "", contracttype: "", startDate: "", enddate: "" },
    payroll: { employeestatus: "", employmenttype: "", jobdate: "", lastworkingdate: "", salary: "", offset: "", oneoff: "" },
    documents: { files: null },
  });
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["General", "Job", "Payroll", "Documents", "Review"];
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
    const uploadData = new FormData();

    // General
    uploadData.append("first_name", formData.general.firstname);
    uploadData.append("last_name", formData.general.lastname);
    uploadData.append("gender", formData.general.gender);
    uploadData.append("date_of_birth", formData.general.dateofbirth);
    uploadData.append("marital_status", formData.general.maritalstatus);
    uploadData.append("nationality", formData.general.nationality);
    uploadData.append("personal_tax_id", formData.general.personaltaxid);
    uploadData.append("social_insurance", formData.general.socialinsurance);
    uploadData.append("health_care", formData.general.healthinsurance);
    uploadData.append("phone", formData.general.phonenumber);

    // Job
    uploadData.append("line_manager", formData.job.linemanager);
    uploadData.append("position", formData.job.positiontype);
    uploadData.append("employment_type", formData.job.employmenttype);
    uploadData.append("job_title", formData.job.jobtitle);
    uploadData.append("join_date", formData.job.joindate);
    uploadData.append("service_years", formData.job.serviceyear);
    // Payroll
    uploadData.append("status", formData.payroll.employeestatus);
    uploadData.append("last_working_date", formData.payroll.lastworkingdate);
    uploadData.append("offset", formData.payroll.offset);
    uploadData.append("one_off", formData.payroll.oneoff);
    uploadData.append("salary", formData.payroll.salary);

    const docs = formData.documents?.files;

    if (docs) {
      const files = docs instanceof File ? [docs] : Array.from(docs);
      files.forEach(file => uploadData.append("documents", file));
    }

    try {
      console.log("going")
      const response = await axiosPrivate.post("/employees/", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      refreshTableSilently('users');

      console.log("done")
      return response.data;
    } catch (error) {
      console.error("Error submitting profile:", error.response?.data || error);
    } finally {
      setLoading(false)
    }
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
        return <StepPayroll data={formData.payroll}
          onChange={(newData) => handleDataChange("payroll", newData)} />;
      case 3:
        return <StepDocument data={formData.documents}
          onChange={(newData) => handleDataChange("documents", newData)} />;
      case 4:
        return <StepReview data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col mx-auto p-4 md:p-6 bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 transition-all overflow-hidden">
  
  {/* Step Header remains at the top */}
  <div className="shrink-0 border-b border-slate-400 dark:border-slate-700 pb-4">
    <StepHeader steps={steps} currentStep={currentStep} onStepClick={goToStep} />
  </div>

  {/* Render Step - Now scrollable with your custom scrollbar style */}
  <div className="mt-6 overflow-y-auto flex-1 scrollbar-hidden pr-2">
    {renderStep()}
  </div>

  {/* Footer Navigation - Fixed at bottom */}
  <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-400 dark:border-slate-700 shrink-0">
    {currentStep > 0 ? (
      <button
        onClick={prevStep}
        className="px-6 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-600 transition-all active:scale-95"
      >
        Previous
      </button>
    ) : (
      <div /> // Spacer to keep Next button on the right
    )}

    {currentStep < steps.length - 1 ? (
      <button
        onClick={nextStep}
        className="px-8 py-2 bg-green-600 text-white rounded font-bold text-xs uppercase tracking-wider hover:bg-green-700 shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-95"
      >
        Next
      </button>
    ) : (
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-8 py-2 bg-emerald-600 text-white rounded font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? <ThreeDots /> : "Submit Record"}
      </button>
    )}
  </div>
</div>
    // <div className="w-full h-full flex flex-col mx-auto p-6 bg-white rounded-2xl">
    //   <StepHeader steps={steps} currentStep={currentStep} onStepClick={goToStep} />

    //   <div className="mt-6 hover-bar overflow-y-auto flex-1 ">{renderStep()}</div>

    //   <div className="flex justify-between mt-8">
    //     {currentStep > 0 && (
    //       <button
    //         onClick={prevStep}
    //         className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    //       >
    //         Previous
    //       </button>
    //     )}

    //     {currentStep < steps.length - 1 ? (
    //       <button
    //         onClick={nextStep}
    //         className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    //       >
    //         Next
    //       </button>
    //     ) : (
    //       <button
    //         onClick={handleSubmit}
    //         className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    //       >
    //         {loading ? <ThreeDots /> : "submit"}
    //       </button>
    //     )}
    //   </div>
    // </div>
  );
};

export default AddEmployee;