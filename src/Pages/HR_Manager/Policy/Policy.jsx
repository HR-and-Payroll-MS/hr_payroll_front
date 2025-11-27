
import React, { useEffect, useState } from "react";
import useAuth from "../../../Context/AuthContext";
import ThreeDots from "../../../animations/ThreeDots";
import { initialPolicies } from "./policiesSchema";
import Header from "../../../Components/Header";
import StepHeader from "../../../Components/forms/StepHeader";
import RenderStepPolicy from "./RenderStepPolicy"
function Policy() {
  const { axiosPrivate } = useAuth(); // keep for real fetches
  const steps = [
    "General",
    "Attendance Policy",
    "Leave Policy",
    "Holiday Policy",
    "Shift Policy",
    "OverTime Policy",
    "Disciplinary Policy",
    "Job Structure Policy",
    "Salary Structure Policy",
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [policyData, setPolicyData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState({}); // dynamic per section
  const organizationId = 1;

  // Simulate initial fetch
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // replace with axiosPrivate.get(...) when integrating
        // const res = await axiosPrivate.get(`/orgs/${organizationId}/policies`);
        // setPolicyData(res.data);
        // setOriginalData(res.data);
        const res = initialPolicies;
        setPolicyData(res);
        setOriginalData(JSON.parse(JSON.stringify(res)));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch policy data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [axiosPrivate, organizationId]);

  // HANDLE CHANGE (deep)
  const handleInputChange = (section, fieldPath, value) => {
    setPolicyData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      // helper setNested
      const setNested = (obj, path, val) => {
        // support "a.b[0].c" paths
        const parts = path
        .replace(/\[(\d+)\]/g, (m, p1) => `.${p1}`)
          .split(".")
          .filter(Boolean);
        let cur = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          if (cur[parts[i]] === undefined) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = val;
      };

      if (!next[section]) next[section] = {};
      setNested(next[section], fieldPath, value);
      return next;
    });
  };

  const handleAddItem = (section, path, defaultValue = {}) => {
    setPolicyData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const getArr = (obj, pathStr) => {
        if (!pathStr) return obj;
        const parts = pathStr
          .replace(/\[(\d+)\]/g, (m, p1) => `.${p1}`)
          .split(".")
          .filter(Boolean);
        let cur = obj;
        for (let p of parts) {
          cur = cur[p];
          if (cur === undefined) return undefined;
        }
        return cur;
      };

      if (!next[section]) next[section] = {};
      const arr = getArr(next[section], path);
      if (Array.isArray(arr)) {
        arr.push(defaultValue);
      } else {
        // If path points to undefined, create it as an array
        // e.g., add item to "leaveTypes" that didn't exist before
        const parts = path
          .replace(/\[(\d+)\]/g, (m, p1) => `.${p1}`)
          .split(".")
          .filter(Boolean);
        let cur = next[section];
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = [defaultValue];
      }
      return next;
    });
  };
  const handleRemoveItem = (section, path, index) => {
    setPolicyData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path
        .replace(/\[(\d+)\]/g, (m, p1) => `.${p1}`)
        .split(".")
        .filter(Boolean);
      let cur = next[section];
      for (let i = 0; i < parts.length; i++) {
        if (i === parts.length - 1) {
          if (Array.isArray(cur[parts[i]])) {
            cur[parts[i]].splice(index, 1);
          }
        } else {
          cur = cur[parts[i]];
          if (!cur) break;
        }
      }
      return next;
    });
  };

  const handleEditToggle = (section) => {
    setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async (section) => {
    try {
      // simulate saving only the section payload
      const payload = { [section]: policyData[section] };
      console.log("Saving payload to backend:", payload);

      // integrate real save:
      // await axiosPrivate.put(`/orgs/${organizationId}/policies/${section}`, payload);

      setOriginalData((prev) => {
        const next = JSON.parse(JSON.stringify(prev || policyData));
        next[section] = JSON.parse(JSON.stringify(policyData[section]));
        return next;
      });

      setEditMode((prev) => ({ ...prev, [section]: false }));
      console.log("Saved (simulated).");
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save. Try again.");
    }
  };

  const handleCancel = (section) => {
    if (!originalData) return;
    setPolicyData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[section] = JSON.parse(JSON.stringify(originalData[section] || {}));
      return next;
    });
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

  if (!policyData)
    return (
      <div className="p-4 text-center text-gray-500">No policy data available.</div>
    );

  return (
    <div className="flex flex-col px-4 w-full h-full justify-start bg-gray-50 dark:bg-slate-900">
      <Header Title={"Policy"} subTitle={"Company Policies"} />
      <div className="flex flex-1 gap-5 overflow-y-scroll scrollbar-hidden rounded-md h-full">
        <div className="h-full flex flex-col shadow rounded-md overflow-clip w-1/4">
          <StepHeader
            childclassname="flex rounded-md text-md w-full p-2 justify-between items-center"
            classname="flex bg-white w-full  flex-col  h-full  p-2 "
            steps={steps}
            iscurrentstyle="bg-slate-50 dark:bg-slate-700 shadow "
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        <div className="flex-1  relative bg-white rounded-md shadow overflow-y-auto scrollbar-hidden">
          <RenderStepPolicy
            currentStep={currentStep}
            editMode={editMode}
            policyData={policyData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleEditToggle={handleEditToggle}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
}

export default Policy;











































// import React, { useEffect, useState } from 'react'
// import useAuth from '../../../Context/AuthContext';
// import ThreeDots from '../../../animations/ThreeDots';
// import StepHeader from '../../../Components/forms/StepHeader';
// import Header from '../../../Components/Header';
// import { RenderStepPolicy } from './RenderStepPolicy';

// function Policy() {
    
//   const { axiosPrivate } = useAuth(); // must supply axiosPrivate configured with baseURL + auth
//   const steps = ["Attendance Policy", "Leave Policy", "Holiday Policy","Shift Policy","OverTime Policy","Disciplinary Policy","Job Structure Policy","Salary Structure Policy"];
//   const [currentStep, setCurrentStep] = useState(0);
//   const [employeeData, setEmployeeData] = useState(null);
//   const [originalData, setOriginalData] = useState(null); // keep backend snapshot
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editMode, setEditMode] = useState({attendancePolicy: false, leavePolicy: false, holidayPolicy: false, shiftPolicy: false,overtimePolicy:false,disciplinaryPolicy:false,jobStructurePolicy:false,salaryStructurePolicy:false});
//   const employeeId = 33;

// const policies = [
//   {
//     id: 1,
//     attendancePolicy: {
//       shiftTimes: [
//         { id: 1, name: "Day Shift", start: "09:00", end: "17:00" },
//         { id: 2, name: "Night Shift", start: "18:00", end: "02:00" }
//       ],
//       gracePeriod: {
//         minutesAllowed: 10,
//         lateAfter: 10,
//         penaltyRule: "3 late arrivals per month = 1 warning"
//       },
//       lateEarlyRules: {
//         halfDayLateAfterMinutes: 120,
//         halfDayEarlyLeaveMinutes: 120,
//         acceptableLateMinutes: 10
//       },
//       absentRules: {
//         absentAfterMinutes: 240,
//         noClockInAbsent: true
//       },
//       overtimeRules: {
//         overtimeAllowed: true,
//         overtimeApprovalRequired: true,
//         minMinutes: 60,
//         maxDailyHours: 4,
//         maxWeeklyHours: 20
//       },
//       breakRules: {
//         lunchBreakAutoDeduct: true,
//         lunchBreakMinutes: 60,
//         breakType: "fixed"
//       },
//       attendanceCorrection: {
//         documentationRequired: true,
//         approvalFlow: ["manager", "hr"]
//       }
//     },

//     leavePolicy: {
//       leaveTypes: [
//         { id: 1, name: "Annual Leave", paid: true },
//         { id: 2, name: "Sick Leave", paid: true },
//         { id: 3, name: "Unpaid Leave", paid: false },
//         { id: 4, name: "Maternity Leave", paid: true },
//         { id: 5, name: "Paternity Leave", paid: true }
//       ],
//       accrualRules: {
//         monthlyAccrualDays: 1.75,
//         carryoverLimit: 12,
//         expiryMonths: 12
//       },
//       eligibilityRules: {
//         maternityMinServiceMonths: 3,
//         sabbaticalMinYears: 5
//       },
//       documentationRules: {
//         sickLeaveCertificateAfterDays: 2,
//         bereavementRequired: true,
//         studyLeaveDocs: "Enrollment letter"
//       },
//       approvalWorkflow: {
//         annualLeave: ["manager", "hr"],
//         sickLeave: ["hr"],
//         maternityLeave: ["hr"]
//       }
//     },

//     holidayPolicy: {
//       fixedHolidays: [
//         { date: "2025-01-01", name: "New Year" },
//         { date: "2025-04-20", name: "National Day" }
//       ],
// floatingHolidays: [
//         { name: "Easter", rule: "auto-calc" }
//       ],
//       companyHolidays: [
//         { date: "2025-12-31", name: "Company Foundation Day" }
//       ],
//       holidayPayRules: {
//         holidayIsPaid: true,
//         holidayOvertimeRate: 2
//       }
//     },

//     shiftPolicy: {
//       workweek: ["Mon", "Tue", "Wed", "Thu", "Fri"],
//       weeklyOff: ["Sat", "Sun"],
//       shiftPatterns: [
//         { id: 1, name: "Fixed Day Shift", type: "fixed" },
//         { id: 2, name: "Night Rotation", type: "rotational" }
//       ],
//       rotationRules: {
//         rotationEveryDays: 7,
//         nightShiftAllowance: 300
//       }
//     },

//     overtimePolicy: {
//       overtimeRate: 1.5,
//       weekendRate: 2,
//       holidayRate: 2,
//       minOvertimeMinutes: 30,
//       approvalRequired: true
//     },

//     disciplinaryPolicy: {
//       warningRules: {
//         firstWarning: "3 lateness in a month",
//         secondWarning: "6 lateness in a month",
//         thirdWarning: "Disciplinary meeting"
//       },
//       penalties: {
//         repeatedLatePenalty: "Salary deduction",
//         absencePenalty: "Written warning"
//       },
//       escalation: {
//         steps: ["manager", "hr", "director"]
//       }
//     },

//     jobStructurePolicy: {
//       jobLevels: ["Junior", "Mid", "Senior", "Lead"],
//       departments: ["HR", "Finance", "Engineering", "Operations"],
//       promotionRules: {
//         minimumMonthsPerLevel: 12,
//         requiredPerformanceRating: "B or higher"
//       }
//     },

//     salaryStructurePolicy: {
//       baseSalaryTemplate: {
//         gradeA: 25000,
//         gradeB: 20000,
//         gradeC: 15000
//       },
//       allowances: {
//         transport: 1000,
//         housing: 3000,
//         meal: 500
//       },
// deductions: {
//         pensionPercent: 7,
//         taxBracket: [
//           { min: 0, max: 10000, rate: 5 },
//           { min: 10001, max: 20000, rate: 15 },
//           { min: 20001, max: 40000, rate: 25 }
//         ]
//       }
//     }
//   }
// ];

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//          const response = policies[0]
//         setEmployeeData(response);
//         setOriginalData(response);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch employee details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployee();
//   }, [axiosPrivate, employeeId]);
  
//   const handleDocumentUpdate = (updatedFiles) => {
//     setEmployeeData((prev) => ({
//       ...prev,
//       documents: {
//         ...prev.documents,
//         files: updatedFiles,
//       },
//     }));
//   };

//   const handleEditToggle = (section) => {
//     setEditMode((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//  const handleInputChange = (section, fieldPath, value) => {
//   setEmployeeData((prev) => {
//     const newData = structuredClone(prev);

//     let pointer = newData[section];
//     const parts = fieldPath.split(".");

//     for (let i = 0; i < parts.length - 1; i++) {
//       // handle array paths like shiftTimes[0].start
//       if (parts[i].includes("[")) {
//         const [arrKey, index] = parts[i].split(/[[\]]/);
//         pointer = pointer[arrKey][Number(index)];
//       } else {
//         pointer = pointer[parts[i]];
//       }
//     }

//     const lastKey = parts.at(-1);
//     pointer[lastKey] = value;

//     return newData;
//   });
// };

//   const handleSave = async (section) => {
//     try {
//       const payload = { [section]: employeeData[section] };
//       console.log("Sending payload:", payload);
//       const data = {
//         ...employeeData,
//         [section]: employeeData[section],
//       };

//       setEmployeeData(data);
//       setOriginalData(data);
//       setEditMode((prev) => ({ ...prev, [section]: false }));

//       console.log("Saved successfully (simulated):", data);
//     } catch (err) {
//       console.error("Save failed:", err);
//       setError("Failed to save. Try again.");
//     }
//   };

//   const handleCancel = (section) => {
//     if (!originalData) return;
//     setEmployeeData((prev) => ({
//       ...prev,
//       [section]: originalData[section],
//     }));
//     setEditMode((prev) => ({ ...prev, [section]: false }));
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <ThreeDots />
//       </div>
//     );
// if (error)
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

//   return (
//     <div className="flex flex-col px-4 w-full h-screen justify-start bg-gray-50 dark:bg-slate-900">
//       <Header Title={"Policy"} subTitle={"Company Policies"} />

//       <div className="flex flex-1 gap-5 overflow-y-scroll scrollbar-hidden rounded-md h-full">
//         <div className="h-full flex flex-col shadow rounded-md overflow-clip w-1/4">
//             <StepHeader 
//                 childclassname='flex rounded-md w-full p-2 justify-between items-center' 
//                 classname='flex bg-white w-full  flex-col  h-full  p-2 ' 
//                 steps={steps} 
//                 iscurrentstyle='bg-slate-50 dark:bg-slate-700 shadow '
//                 currentStep={currentStep} 
//                 onStepClick={setCurrentStep} />
//         </div>
//         <div className="flex-1  relative bg-white rounded-md shadow overflow-y-auto scrollbar-hidden">
//              <RenderStepPolicy currentStep={currentStep} editMode={editMode} employeeData={employeeData} handleInputChange={handleInputChange} handleSave={handleSave} handleCancel={handleCancel} handleEditToggle={handleEditToggle} handleDocumentUpdate={handleDocumentUpdate} />
//         </div>
//       </div>
//     </div>
//   );

// }


// export default Policy