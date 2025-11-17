import React from "react";
import Icon from "../Icon";

const StepReview = ({ data }) => {
  const { general, job, payroll, documents } = data;

  const Section = ({ title, children }) => (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
      <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Icon name="CheckCircle2" className="text-green-600 h-4 w-4" />
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
        {children}
      </div>
    </div>
  );

  const renderItem = (label, value) => (
    <p>
      <span className="font-medium text-gray-800">{label}:</span>{" "}
      {value || <span className="text-gray-400 italic">Not provided</span>}
    </p>
  );

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">
        Review Your Information
      </h2>

      {/* General Info */}
      <Section title="General Information">
        {renderItem("Full Name", general.fullname)}
        {renderItem("Gender", general.gender)}
        {renderItem("Date of Birth", general.dateofbirth)}
        {renderItem("Marital Status", general.maritalstatus)}
        {renderItem("Nationality", general.nationality)}
        {renderItem("Personal Tax ID", general.personaltaxid)}
        {renderItem("Email Address", general.emailaddress)}
        {renderItem("Social Insurance", general.socialinsurance)}
        {renderItem("Health Insurance", general.healthinsurance)}
        {renderItem("Phone Number", general.phonenumber)}
        {renderItem("Primary Address", general.primaryaddress)}
        {renderItem("Country", general.country)}
        {renderItem("State", general.state)}
        {renderItem("City", general.city)}
        {renderItem("Postcode", general.postcode)}
        <div className="col-span-full mt-2 border-t border-gray-100 pt-2">
          <p className="font-medium text-gray-700 mb-1">Emergency Contact</p>
          {renderItem("Full Name", general.emefullname)}
          {renderItem("Phone Number", general.emephonenumber)}
          {renderItem("State", general.emestate)}
          {renderItem("City", general.emecity)}
          {renderItem("Postcode", general.emepostcode)}
        </div>
      </Section>

      {/* Job Info */}
      <Section title="Job Information">
        {renderItem("Employee ID", job.employeeid)}
        {renderItem("Service Year", job.serviceyear)}
        {renderItem("Join Date", job.joindate)}
        {renderItem("Job Title", job.jobtitle)}
        {renderItem("Position Type", job.positiontype)}
        {renderItem("Employment Type", job.employmenttype)}
        {renderItem("Line Manager", job.linemanager)}
        {renderItem("Contract Number", job.contractnumber)}
        {renderItem("Contract Name", job.contractname)}
        {renderItem("Contract Type", job.contracttype)}
        {renderItem("Start Date", job.startdate)}
        {renderItem("End Date", job.enddate)}
      </Section>

      {/* Payroll Info */}
      <Section title="Payroll Information">
        {renderItem("Employee Status", payroll.employeestatus)}
        {renderItem("Employment Type", payroll.employmenttype)}
        {renderItem("Job Date", payroll.jobdate)}
        {renderItem("Last Working Date", payroll.lastworkingdate)}
        {renderItem("Salary", payroll.salary)}
        {renderItem("Offset", payroll.offset)}
        {renderItem("Onset", payroll.onset)}
      </Section>

      {/* Documents */}
      <Section title="Documents">
        {/* {console.log(documents.files)} */}
        {documents.files? (
          <ul className="col-span-full list-disc ml-5 space-y-1">
            {/* {documents.files.map((file, index) => ( */}
              <li className="flex items-center gap-2">
                <Icon name="FileText" className="text-blue-600 h-4 w-4" />
                <span>{documents.files.name || `File `}</span>
              </li>
            {/* ))} */}
          </ul>
        ) : (
          <p className="col-span-full text-gray-400 italic">
            No documents uploaded
          </p>
        )}
      </Section>
    </div>
  );
};

export default StepReview;
