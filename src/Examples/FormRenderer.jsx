// FormRenderer.jsx
import React, { useState } from "react";
import InputField from "../Components/InputField";
import Dropdown from "../Components/Dropdown";

export default function FormRenderer({ savedForm }) {
    console.log("Rendered Form Data:", savedForm);
  const [answers, setAnswers] = useState({});
  const [finalScore, setFinalScore] = useState(null);

  const handleChange = (fieldId, value) => {
    setAnswers({ ...answers, [fieldId]: value });
  };

  const calculateScore = () => {
  let achieved = 0;
  let possible = 0;

  savedForm.performanceMetrics.forEach((field) => {
    const answer = answers[field.id];

    // Determine max possible for this field
    let maxForField = 0;

    if (field.type === "number") {
      maxForField = field.weight;
      achieved += Math.min(parseFloat(answer) || 0, maxForField);
    }

    if (field.type === "dropdown") {
      const maxOption = Math.max(...field.options.map(o => o.point));
      maxForField = maxOption;
        console.log("MaxOption",maxOption)
      const selected = field.options.find(o => o.label === answer);
      achieved += selected ? selected.point : 0;
      console.log("selected",selected)
    }

    possible += maxForField;
  });

  const percentage = possible > 0 ? (achieved / possible) * 100 : 0;
  setFinalScore(percentage.toFixed(1));
};


  return (
    <div className="shadow bg-slate-50 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{savedForm?.title}</h1>

      {savedForm?.performanceMetrics.map((field) => (
        <div key={field?.id} className="mb-6">
          <label className="block text-lg font-medium mb-2">
            {field?.name} <span className="text-sm text-gray-500">(Weight: {field?.weight})</span>
          </label>

          {field?.type === "number" && (
            <input
              type="number"
              min="0"
              max={field?.weight}
              step="0.1"
              onChange={(e) => handleChange(field?.id, e.target.value)}
              className="border outline-none rounded p-3 w-full inset-shadow-2xs bg-white border-slate-200"
            />
          )}

          {field?.type === "dropdown" && (
            // <select
            //   onChange={(e) => handleChange(field?.id, e.target.value)}
            //   className="border rounded p-3 w-full"
            // >
            //   <option value="">Choose...</option>
            //   {field?.options.map((opt) => (
            //     <option key={opt.id} value={opt.label}>
            //       {opt.label} → {opt.point} points
            //     </option>
            //   ))}
            // </select>
            
            <Dropdown  onChange={(e) => handleChange(field?.id, e)} options={field?.options.map(item => `${item.label}→ ${item.point} points`)}/>
          )}
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-700">Feedback</h2>
      {savedForm?.feedbackSections.map((field) => (
        <div key={field?.id} className="mb-6">
          <label className="block text-lg font-medium mb-2">{field?.name}</label>
          {field?.type === "textarea" ? (
            <textarea
              onChange={(e) => handleChange(field?.id, e.target.value)}
              className="border bg-white inset-shadow-2xs outline-none border-slate-200 rounded p-3 w-full h-32"
            />
          ) : field?.type === "dropdown" ? (
            // <select
            //   onChange={(e) => handleChange(field?.id, e.target.value)}
            //   className="border rounded p-3 w-full"
            // >
            //   <option value="">Select...</option>
            //   {field?.options.map((o) => (
            //     <option key={o.id}>{o.label}</option>
            //   ))}
            // </select>
            
            <Dropdown  onChange={(e) => handleChange(field?.id, e)} options={field?.options.map(item => item.label)}/>
                        
          ) : (
            // <input
            //   type="text"
            //   onChange={(e) => handleChange(field?.id, e.target.value)}
            //   className="border  inset-shadow-2xs outline-none border-slate-200  rounded p-3 w-full"
            // />
             <InputField  border="inset-shadow-2xs border border-slate-200" maxWidth=" bg-white"  suggestion={false} placeholder="" icon={false} onSelect={(e) => handleChange(field?.id, e)}/>
     
          )}
        </div>
      ))}

      <button
        onClick={calculateScore}
        className="mt-8 px-8 py-4 bg-green-600 text-white text-lg rounded hover:bg-green-700"
      >
        Submit & Calculate Efficiency
      </button>

      {finalScore !== null && (
        <div className="mt-10 p-8 bg-green-50 border-4 border-green-300 rounded-xl text-center">
          <h2 className="text-4xl font-bold text-green-800">
            Final Efficiency Score: {finalScore}%
          </h2>
        </div>
      )}
    </div>
  );
}