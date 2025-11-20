import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import useAuth from "../../../Context/AuthContext";
import StepHeader from "../../../Components/forms/StepHeader";
import ThreeDots from "../../../animations/ThreeDots";
import Icon from "../../../Components/Icon";
import Header from "../../../Components/Header";

const ViewEmployee = () => {
  const { id } = useParams();
  const what = useLocation();
  // console.log(what);
  const { axiosPrivate } = useAuth();
  const steps = ["General", "Job", "Payroll", "Documents"];
  const [currentStep, setCurrentStep] = useState(0);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Track which step is in edit mode
  const [editMode, setEditMode] = useState({
    general: false,
    job: false,
    payroll: false,
    documents: false,
  });

  //to Track documents marked for deletion
  const [documentsToDelete, setDocumentsToDelete] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const userData= await axiosPrivate.get(`/employees/${id}`)
        console.log(userData.data)
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
        }
      ];
        setEmployeeData(response[0]);
      } catch (err) {
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEmployee();
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

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (section, field, value) => {
    setEmployeeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSave = (section) => {
    // Here you can send updated data to backend
    console.log("Saved data for section:", section, employeeData[section]);
    setEditMode((prev) => ({ ...prev, [section]: false }));
  };

const handleCancel = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: false }));
    // Optionally reset employeeData from original API
  };

  const handleDocumentDelete = (index) => {
    setDocumentsToDelete((prev) => [...prev, index]);
  };

  const handleDocumentCancelDelete = (index) => {
    setDocumentsToDelete((prev) => prev.filter((i) => i !== index));
  };

  // Render fields dynamically
  const renderFields = (sectionKey, sectionData) => {
            const isEditing = editMode[sectionKey];

            return Object.entries(sectionData).map(([key, value]) => {
            // Skip nested emergency fields for documents
            const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());
            return (
                <div key={key} className="w-96 flex gap-2 justify-between  text-nowrap">
                <p  className="flex ">
                <span className="min-w-40 text-gray-400 ">{label} </span>
                {isEditing ? (
                    <input
                    type={key.toLowerCase().includes("date") ? "date" : "text"}
                    value={value || ""}
                    onChange={(e) => handleInputChange(sectionKey, key, e.target.value)}
                    className="w-full border outline-none border-slate-300 rounded px-3   mt-1   py-1 focus:ring-1 focus:ring-green-500"
                    />
                ) : (
                    <span className="text-gray-700 font-semibold ">{value || <span className="text-gray-400 italic">Not provided</span>}</span>
                )}
                </p><span className="text-slate-100">|</span></div>
            );
            });
  };

  const renderDocuments = () => {
    const isEditing = editMode.documents;
    return employeeData.documents.files.map((file, index) => {
      const markedForDelete = documentsToDelete.includes(index);
      return (
        <div
          key={index}
          className="flex justify-between items-center gap-2 p-2 border rounded"
        >
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-600 hover:underline ${
              markedForDelete ? "line-through" : ""
            }`}
          >
            {file.name}
          </a>
          {isEditing && (
            <div className="flex gap-2">
              {markedForDelete ? (
                <button
                  onClick={() => handleDocumentCancelDelete(index)}
                  className="text-sm px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              ): (
                <button
                  onClick={() => handleDocumentDelete(index)}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Icon className='w-4 h-4' name={'Trash'}/>
                </button>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex-1 flex-col p-2 flex">
                    <div className="flex justify-between items-center mb-2 ">
                        <h2 className="font-semibold text-lg">General Information</h2>
                        {editMode.general ? (
                            <div className="flex gap-2">
                                <button onClick={() => handleSave("general")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600" >
                                    Save
                                </button>
                                <button onClick={() => handleCancel("general")} className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                                <button onClick={() => handleEditToggle("general")} className="px-3 py-1  rounded hover:bg-slate-100 hover:cursor-pointer">
                                    <Icon className='w-4 h-4' name={'Pen'}/>
                                </button>
                        )}
                    </div>
                    <div className="flex flex-1 gap-5 p-4 justify-start items-start flex-wrap  ">
                    {renderFields("general", employeeData.general)}
                    </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2 ">
              <h2 className="font-semibold text-lg">Job Information</h2>
              {editMode.job ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("job")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel("job")}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (<button
                  onClick={() => handleEditToggle("job")}
                  className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100"
                >
                  <Icon className='w-4 h-4' name={'Pen'}/>
                </button>
              )}
            </div>
            <div className="flex gap-5 p-4 justify-start items-start flex-wrap">
              {renderFields("job", employeeData.job)}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2 ">
              <h2 className="font-semibold text-lg">Payroll Information</h2>
              {editMode.payroll ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("payroll")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel("payroll")}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("payroll")}
                  className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100"
                >
                  <Icon className='w-4 h-4' name={'Pen'}/>
                </button>
              )}
            </div>
            <div className="flex gap-5 p-4 justify-start items-start flex-wrap">
              {renderFields("payroll", employeeData.payroll)}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2 ">
              <h2 className="font-semibold text-lg">Documents</h2>
              {editMode.documents ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("documents")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel("documents")}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditToggle("documents")}
                  className="px-3 py-1 text-gray-700 rounded hover:bg-slate-100"
                >
                  <Icon className='w-4 h-4' name={'Pen'}/>
                </button>
              )}
            </div>
            <div className="space-y-2">{renderDocuments()}</div>
          </div>
        );
      default:
        return null;
    }
  };

 const left = (
  <div id="left" className="flex bg-white w-full flex-col h-full p-2 px-4 gap-4">
    {/* TOP SECTION */}
    <div id="top" className="items-center justify-center flex flex-col flex-2">
      <div className="flex items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
        <img
          className="w-20 h-20 object-fill rounded-full"
          src={employeeData?.general?.profilepicture || "\\pic\\download (48).png"}
          alt="Profile"
        />
      </div>

      <div className="flex flex-col items-center gap-1.5 justify-start p-2 rounded hover:bg-slate-50">
        <p className="font-bold text-gray-700 text-lg">
          {employeeData?.general?.fullname || "Pristia Candra"}
        </p>
        <p className="font-semibold text-gray-500 text-xs">
          {employeeData?.job?.jobtitle || "3D Designer"}
        </p>
      </div>

      <div className="flex items-center gap-1.5 justify-center p-2 rounded hover:bg-slate-50">
        <p className={`font-bold px-6 py-1 text-xs rounded-md ${
          employeeData?.payroll?.employeestatus === "Active"
            ? "bg-green-50 text-green-800"
            : "bg-red-50 text-red-800"
        }`}>
          {employeeData?.payroll?.employeestatus || "Active"}
        </p>
       <Icon className='w-4 h-4' name={'ChevronDown'}/>
      </div>
    </div>

    <hr className="text-gray-200" />

    {/* MIDDLE SECTION */}
    <div id="middle" className="items-start flex flex-col flex-1">
      <div className="flex items-start gap-2 justify-start p-2 rounded hover:bg-slate-50">
        <Icon className='w-4 h-4' name={'Mail'}/>
        <p className="font-semibold text-xs text-gray-700 rounded-md">
          {employeeData?.general?.emailaddress || "Some12email@gmail.com"}
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
        <Icon className='w-4 h-4' name={'ChevronRight'}/>
      </div>

      <div className="flex items-center gap-1.5 justify-between p-2 rounded hover:bg-slate-50">
        <div>
          <p className="font-semibold text-gray-400 text-xs">Office</p>
          <p className="font-bold text-gray-700 text-xs">
            {employeeData?.job?.office || "Unpixel Studio"}
          </p>
        </div>
        <Icon className='w-4 h-4' name={'ChevronRight'}/>
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
        <Icon className='w-4 h-4' name={'ChevronRight'}/>
      </div>

      <div className="flex bg-slate-800 text-white items-center justify-center gap-1.5 px-5 py-3 rounded-md">
        <p className="text-xs font-semibold">Action</p>
        <Icon className='w-4 h-4' name={'Pen'}/>
      </div>
    </div>
  </div>
);


  return (
    <div className="flex  flex-col  w-full h-full justify-start  bg-gray-50 dark:bg-slate-900 ">
                
                            <Header Title={"this is title"} Breadcrumb={"this is breadcrub employee detail"}/>
                
    <div className="flex  flex-1 gap-5 overflow-y-scroll rounded-md h-full">
        <div className="h-fit shadow rounded-xl overflow-clip w-1/4 "> 
                            {left}
        </div>
        <div className="flex  flex-col rounded-md shadow h-full flex-1 gap-4  p-4 bg-white">
            <StepHeader
                steps={steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
            />
            <div className=" flex-1  overflow-y-auto">{renderStepContent()}</div>
        </div>
    </div>
    </div>
  );
};

export default ViewEmployee;






































































































































// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useAuth from "../../../Context/AuthContext";
// import Icon from "../../../Components/Icon";
// import ThreeDots from "../../../animations/ThreeDots";

// const ViewEmployee = () => {
//   const { id } = useParams();
//   const { axiosPrivate } = useAuth();

//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editSection, setEditSection] = useState(null); // track which section is being edited

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         // Simulated data
//         const response = {
//           id: 1,
//           general: {
//             fullname: "Eyob Taye",
//             gender: "Male",
//             dateofbirth: "1997-04-15",
//             maritalstatus: "Single",
//             nationality: "Ethiopian",
//             personaltaxid: "TX-9584732",
//             emailaddress: "eyob.taye@example.com",
//             socialinsurance: "SI-558932",
//             healthinsurance: "HI-229584",
//             phonenumber: "+251911223344",
//             primaryaddress: "123 Sunshine Avenue",
//             country: "Ethiopia",
//             state: "Addis Ababa",
//             city: "Addis Ababa",
//             postcode: "1000",
//             emefullname: "Marta Taye",
//             emephonenumber: "+251944556677",
//             emestate: "Addis Ababa",
//             emecity: "Addis Ababa",
//             emepostcode: "1000",
//           },
//           job: {
//             employeeid: "EMP-001",
//             serviceyear: "3",
//             joindate: "2022-03-10",
//             jobtitle: "Frontend Developer",
//             positiontype: "Full-Time",
//             employmenttype: "Permanent",
//             linemanager: "Samuel Bekele",
//             contractnumber: "CN-8942",
//             contractname: "Frontend Developer Contract",
//             contracttype: "Indefinite",
//             startdate: "2022-03-10",
//             enddate: "",
//           },
//           payroll: {
//             employeestatus: "Active",
//             employmenttype: "Permanent",
//             jobdate: "2022-03-10",
//             lastworkingdate: "",
//             salary: 25000,
//             offset: 200,
//             onset: 100,
//           },
//           documents: {
//             files: [
//               {
//                 name: "Employment Contract.pdf",
//                 url: "https://example.com/files/contract.pdf",
//               },
//               {
//                 name: "ID Card.png",
//                 url: "https://example.com/files/idcard.png",
//               },
//             ],
//           },
//         };

//         setEmployeeData(response);
//       } catch (err) {
//         setError("Failed to fetch employee details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     // if (id) 
//         fetchEmployee();
//   }, [axiosPrivate, id]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <ThreeDots />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
//         {error}
//       </div>
//     );

//   if (!employeeData)
//     return (
//       <div className="p-4 text-center text-gray-500">
//         No employee data available.
//       </div>
//     );

//   const { general, job, payroll, documents } = employeeData;

//   // reusable section wrapper
//   const Section = ({ title, sectionKey, children }) => {
//     const isEditing = editSection === sectionKey;

//     return (
//       <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 relative">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-base font-semibold text-gray-700 flex items-center gap-2">
//             <Icon name="User" className="text-green-600 h-4 w-4" />
//             {title}
//           </h3>

//           {isEditing ? (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleSave(sectionKey)}
//                 className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => handleCancel(sectionKey)}
//                 className="text-sm px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => setEditSection(sectionKey)}
//               className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Edit
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
//           {children(isEditing)}
//         </div>
//       </div>
//     );
//   };

//   const renderItem = (label, value, name, onChange, isEditing) => (
//     <p className="flex flex-col">
//       <span className="font-medium text-gray-800">{label}</span>
//       {isEditing ? (
//         <input type="text" name={name} value={value || ""} onChange={onChange} className="mt-1 border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-green-500"/>
//       ) : ( <span>{value || <span className="text-gray-400 italic">Not provided</span>}</span>
//       )}
//     </p>
//   );

//   // handle save + cancel
//   const handleSave = (sectionKey) => {
//     setEditSection(null);
//     console.log("Saved Data:", employeeData[sectionKey]);
//     // later: call API PUT /employees/:id with updated data
//   };

//   const handleCancel = (sectionKey) => {
//     setEditSection(null);
//     // optional: revert changes if using temp state
//   };

//   // handle input change
//   const handleChange = (sectionKey, field, value) => {
//     setEmployeeData((prev) => ({
//       ...prev,
//       [sectionKey]: {
//         ...prev[sectionKey],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="w-full h-full flex flex-col mx-auto p-6 bg-gray-50 rounded-2xl overflow-y-auto space-y-5">
//       <h1 className="text-xl font-semibold text-slate-800 mb-4">
//         Employee Details
//       </h1>
//       {/* General Section */}
//       <Section title="General Information" sectionKey="general">
//         {(isEditing) =>
//           Object.entries(general).map(([key, value]) =>
//             renderItem(
//               key.replace(/([A-Z])/g, " $1"),
//               value,
//               key,
//               (e) => handleChange("general", key, e.target.value),
//               isEditing
//             )
//           )
//         }
//       </Section>

//       {/* Job Section */}
//       <Section title="Job Information" sectionKey="job">
//         {(isEditing) =>
//           Object.entries(job).map(([key, value]) =>
//             renderItem(
//               key.replace(/([A-Z])/g, " $1"),
//               value,
//               key,
//               (e) => handleChange("job", key, e.target.value),
//               isEditing
//             )
//           )
//         }
//       </Section>

//       {/* Payroll Section */}
//       <Section title="Payroll Information" sectionKey="payroll">
//         {(isEditing) =>
//           Object.entries(payroll).map(([key, value]) =>
//             renderItem(
//               key.replace(/([A-Z])/g, " $1"),
//               value,
//               key,
//               (e) => handleChange("payroll", key, e.target.value),
//               isEditing
//             )
//           )
//         }
//       </Section>
//       {/* Documents Section */}
//       <Section title="Documents" sectionKey="documents">
//         {(isEditing) =>
//           isEditing ? (
//             <p className="col-span-full text-gray-500 italic">
//               Document editing coming soon...
//             </p>
//           ) : documents?.files?.length > 0 ? (
//             <ul className="col-span-full list-disc ml-5 space-y-1">
//               {documents.files.map((file, index) => (
//                 <li key={index} className="flex items-center gap-2">
//                   <Icon name="FileText" className="text-blue-600 h-4 w-4" />
//                   <a
//                     href={file.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {file.name || `File ${index + 1}`}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="col-span-full text-gray-400 italic">
//               No documents uploaded
//             </p>
//           )
//         }
//       </Section>
//     </div>
//   );
// };

// export default ViewEmployee;