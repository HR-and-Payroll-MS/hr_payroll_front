
import React, { useEffect, useState } from "react";
import useAuth from "../../../Context/AuthContext";
import ThreeDots from "../../../animations/ThreeDots";
import { initialPolicies } from "./policiesSchema";
import Header from "../../../Components/Header";
import StepHeader from "../../../Components/forms/StepHeader";
import RenderStepPolicy from "./RenderStepPolicy"
function Policy() {
  const { axiosPrivate } = useAuth();
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
    "Recruitment Policy",
    "Efficiency Policy",
    "Announcement Policy",
    "Probation Policy",
    "Expense Policy",
    "Loan Policy",
    "Termination Policy",
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
        // co axiosPrivate.get(...) when integrating
        const res = await axiosPrivate.get(`/orgs/${organizationId}/policies`);
        // Merge with defaults to ensure completely new sections appear
        const merged = { ...initialPolicies, ...(res.data || {}) };
        setPolicyData(merged);
        setOriginalData(merged);



        // const res = initialPolicies;
        // console.log(res)
        // setPolicyData(res);
        // setOriginalData(JSON.parse(JSON.stringify(res)));
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
      const setNested = (obj, path, val) => {
        const parts = path.replace(/\[(\d+)\]/g, (m, p1) => `.${p1}`).split(".").filter(Boolean);
        let cur = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          if (cur[parts[i]] === undefined) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = val;
      };
      //replace(/\[(\d+)\]/g...) → turns [2] into .2
      // split(".") → splits into array pieces
      // filter(Boolean) → removes empty values

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
      await axiosPrivate.put(`/orgs/${organizationId}/policies/${section}`, payload);

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
    <div className="flex flex-col gap-4 w-full p-2 h-full justify-start dark:bg-slate-900 bg-gray-50 overflow-hidden transition-colors">
      {/* HEADER SECTION */}
      <div className="flex justify-evenly shrink-0">
        <Header Title={"Policy"} subTitle={"Company Policies"} />
      </div>

      <div className="flex flex-1 gap-5 rounded-md overflow-hidden">

        {/* LEFT SIDEBAR - Restored StepHeader with your exact props */}
        <div className="h-full w-1/5 shadow rounded-md dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 bg-white dark:bg-slate-800 overflow-y-auto scrollbar-hidden transition-all">
          <StepHeader
            childclassname="flex dark:text-slate-300 rounded-md text-md w-full p-2 justify-between items-center"
            classname="flex bg-white dark:bg-slate-800 justify-start items-start text-start w-full flex-col h-full p-2 gap-2 transition-colors"
            steps={steps}
            iscurrentstyle="bg-slate-100 dark:bg-slate-700 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 shadow-sm"
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* RIGHT CONTENT - Main Content Area */}
        <div className="flex flex-1 h-full bg-white dark:bg-slate-800 rounded-md shadow dark:shadow-slate-600 dark:inset-shadow-xs dark:inset-shadow-slate-600 overflow-hidden transition-all">
          <div className="h-full w-full overflow-y-auto scrollbar-hidden">
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
    </div>
  );
}

export default Policy;

