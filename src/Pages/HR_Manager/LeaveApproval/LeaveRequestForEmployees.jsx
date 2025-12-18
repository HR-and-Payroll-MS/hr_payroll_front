import React, { useState } from 'react'
import ViewRequestForEmployees from './ViewRequestForEmployees';
import SendRequestForEmployee from './SendRequestForEmployee';
import StepHeader from '../../../Components/forms/StepHeader';
import Header from '../../../Components/Header';
import { AnnouncementSearch, LeaveRequest } from '../../../Components/Level2Hearder';

function LeaveRequestForEmployees() {
    const [formData, setFormData] = useState({
    general:{ firstname:"",lastname:"",gender:"",dateofbirth:"",maritalstatus:"",nationality:"",personaltaxid:"",emailaddress:"",socialinsurance:"",healthinsurance:"",phonenumber:"",
                primaryaddress:"",country:"",state:"",city:"",postcode:"",
                emefullname:"",emephonenumber:"",emestate:"",emecity:"",emepostcode:"" 
            },
    job:{employeeid:"",serviceyear:"",joindate:"",jobtitle:"",positiontype:"",employmenttype:"",linemanager:"" ,contractnumber:"",contractname:"",contracttype:"",startDate:"",enddate:""},
    payroll:{employeestatus:"",employmenttype:"",jobdate:"",lastworkingdate:"",salary:"",offset:"",oneoff:""},
    documents:{files:null},
    });
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [ "View Leave Requests","Send Leave Request",];
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

      const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ViewRequestForEmployees
            // data={formData.general}
            // onChange={(newData) => handleDataChange("general", newData)}
          />
        );
      case 1:
        return (
          <SendRequestForEmployee
            // data={formData.job}
            // onChange={(newData) => handleDataChange("job", newData)}
          />
        );
    }
  };
  return (
    <div className='flex flex-col gap-1 h-full'>
        <div className='p-3 px-6 bg-slate-50 shadow overflow-y-auto hover-bar'>
        <Header className={""} Title={"Leave Request Page"}/></div>
        <div className="w-full h-full flex flex-col mx-auto p-6 ">
            
            <StepHeader steps={steps} currentStep={currentStep} onStepClick={goToStep}/>
            <div className='p-2 flex flex-col flex-1 h-full '>
                <LeaveRequest/>
                <div className="border border-t-0 p-2 border-slate-200 hover-bar overflow-y-auto flex-1 "> {renderStep()}</div>
            </div>
        </div>
    </div>
  )
}

export default LeaveRequestForEmployees