// HREfficiencyForm.jsx
import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import { initialEfficiencyPolicy } from "./initialEfficiencyPolicy";
import FormRenderer from "./FormRenderer";
import Header from "../Components/Header";

export default function HREfficiencyForm() {
  const [formData, setFormData] = useState(initialEfficiencyPolicy);

  const handleSave = () => {
    const json = JSON.stringify(formData, null, 2);
    alert("Form Saved!\n" + json);
    // Send to backend here if needed
  };

  const handleReset = () => {
    if (window.confirm("Reset to initial form?")) {
      setFormData(initialEfficiencyPolicy);
    }
  };

  return (
    <div className="p-4 mx-auto h-full hover-bar overflow-y-auto">
      <Header Title={"HR: Efficiency Form Builder & Preview"}/>
     
        
          <FormBuilder formData={formData} setFormData={setFormData} />
        

        {/* Right: Live Preview + Scoring */}
        {/* <div>
          <h2 className="text-2xl font-bold mb-6">Live Form Preview</h2>
          <FormRenderer savedForm={formData} />
        </div> */}

      <div className="mt-8 flex justify-start gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-slate-600 text-white rounded hover:bg-slate-700 "
        >
          Save Form Configuration
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-600 "
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}