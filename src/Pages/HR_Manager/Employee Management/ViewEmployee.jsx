import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../../Context/AuthContext";
import Icon from "../../../Components/Icon";
import ThreeDots from "../../../animations/ThreeDots";

const ViewEmployee = () => {
  const { id } = useParams(); // assuming route: /employees/:id
  const { axiosPrivate } = useAuth();

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // setLoading(true);
        // const response = await axiosPrivate.get(`/employees/${id}`);
        // setEmployeeData(response.data);

        const response = {
  "id": 1,
  "general": {
    "fullname": "Eyob Taye",
    "gender": "Male",
    "dateofbirth": "1997-04-15",
    "maritalstatus": "Single",
    "nationality": "Ethiopian",
    "personaltaxid": "TX-9584732",
    "emailaddress": "eyob.taye@example.com",
    "socialinsurance": "SI-558932",
    "healthinsurance": "HI-229584",
    "phonenumber": "+251911223344",
    "primaryaddress": "123 Sunshine Avenue",
    "country": "Ethiopia",
    "state": "Addis Ababa",
    "city": "Addis Ababa",
    "postcode": "1000",
    "emefullname": "Marta Taye",
    "emephonenumber": "+251944556677",
    "emestate": "Addis Ababa",
    "emecity": "Addis Ababa",
    "emepostcode": "1000"
  },
  "job": {
    "employeeid": "EMP-001",
    "serviceyear": "3",
    "joindate": "2022-03-10",
    "jobtitle": "Frontend Developer",
    "positiontype": "Full-Time",
    "employmenttype": "Permanent",
    "linemanager": "Samuel Bekele",
    "contractnumber": "CN-8942",
    "contractname": "Frontend Developer Contract",
    "contracttype": "Indefinite",
    "startdate": "2022-03-10",
    "enddate": ""
  },
  "payroll": {
    "employeestatus": "Active",
    "employmenttype": "Permanent",
    "jobdate": "2022-03-10",
    "lastworkingdate": "",
    "salary": 25000,
    "offset": 200,
    "onset": 100
  },
  "documents": {
    "files": [
      {
        "name": "Employment Contract.pdf",
        "url": "https://example.com/files/contract.pdf"
      },
      {
        "name": "ID Card.png",
        "url": "https://example.com/files/idcard.png"
      }
    ]
  }

}
  setEmployeeData(response)

      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    // if (id)
     fetchEmployee();
  }, [axiosPrivate, id]);

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
    const { general, job, payroll, documents } = employeeData;

  // reusable section wrapper
  const Section = ({ title, children }) => (
    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
      <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Icon name="User" className="text-green-600 h-4 w-4" />
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
    <div className="w-full h-full flex flex-col mx-auto p-6 bg-white rounded-2xl overflow-y-auto">
      <h1 className="text-xl font-semibold text-slate-800 mb-6">
        Employee Details
      </h1>

      <div className="space-y-5">
        {/* General Info */}
        <Section title="General Information">
          {renderItem("Full Name", general?.fullname)}
          {renderItem("Gender", general?.gender)}
          {renderItem("Date of Birth", general?.dateofbirth)}
          {renderItem("Marital Status", general?.maritalstatus)}
          {renderItem("Nationality", general?.nationality)}
          {renderItem("Personal Tax ID", general?.personaltaxid)}
          {renderItem("Email Address", general?.emailaddress)}
          {renderItem("Social Insurance", general?.socialinsurance)}
          {renderItem("Health Insurance", general?.healthinsurance)}
          {renderItem("Phone Number", general?.phonenumber)}
          {renderItem("Primary Address", general?.primaryaddress)}
          {renderItem("Country", general?.country)}
          {renderItem("State", general?.state)}
          {renderItem("City", general?.city)}
          {renderItem("Postcode", general?.postcode)}
          <div className="col-span-full mt-2 border-t border-gray-100 pt-2">
            <p className="font-medium text-gray-700 mb-1">Emergency Contact</p>
            {renderItem("Full Name", general?.emefullname)}
            {renderItem("Phone Number", general?.emephonenumber)}
            {renderItem("State", general?.emestate)}
            {renderItem("City", general?.emecity)}
            {renderItem("Postcode", general?.emepostcode)}
          </div>
        </Section>
        {/* Job Info */}
        <Section title="Job Information">
          {renderItem("Employee ID", job?.employeeid)}
          {renderItem("Service Year", job?.serviceyear)}
          {renderItem("Join Date", job?.joindate)}
          {renderItem("Job Title", job?.jobtitle)}
          {renderItem("Position Type", job?.positiontype)}
          {renderItem("Employment Type", job?.employmenttype)}
          {renderItem("Line Manager", job?.linemanager)}
          {renderItem("Contract Number", job?.contractnumber)}
          {renderItem("Contract Name", job?.contractname)}
          {renderItem("Contract Type", job?.contracttype)}
          {renderItem("Start Date", job?.startdate)}
          {renderItem("End Date", job?.enddate)}
        </Section>

        {/* Payroll Info */}
        <Section title="Payroll Information">
          {renderItem("Employee Status", payroll?.employeestatus)}
          {renderItem("Employment Type", payroll?.employmenttype)}
          {renderItem("Job Date", payroll?.jobdate)}
          {renderItem("Last Working Date", payroll?.lastworkingdate)}
          {renderItem("Salary", payroll?.salary)}
          {renderItem("Offset", payroll?.offset)}
          {renderItem("Onset", payroll?.onset)}
        </Section>

        {/* Documents */}
        <Section title="Documents">
          {documents?.files?.length > 0 ? (
            <ul className="col-span-full list-disc ml-5 space-y-1">
              {documents.files.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Icon name="FileText" className="text-blue-600 h-4 w-4" />
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {file.name || `File ${index + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="col-span-full text-gray-400 italic">
              No documents uploaded
            </p>
          )}
        </Section>
      </div>
    </div>
  );
};
export default ViewEmployee;