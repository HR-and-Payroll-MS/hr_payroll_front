// FormRenderer.jsx
import React, { useState } from "react";
import InputField from "../Components/InputField";
import Dropdown from "../Components/Dropdown";
import MetricCards from "./MetricCards";

export default function FormRenderer({ savedForm }) {
  const [answers, setAnswers] = useState({});
  const [finalScore, setFinalScore] = useState(null);
  const [report, setReport] = useState(null);

  const handleChange = (fieldId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

const calculateScore = () => {
  let totalAchieved = 0;
  let totalPossible = 0;

  const metricReports = [];
  const metricSummaries = []; // <-- now an array

  savedForm.performanceMetrics.forEach((field) => {
    const answer = answers[field.id];
    let fieldAchieved = 0;
    let fieldPossible = 0;

    // NUMBER FIELD
    if (field.type === "number") {
      fieldPossible = field.weight;
      fieldAchieved = Math.min(Number(answer) || 0, fieldPossible);
    }

    // DROPDOWN FIELD
    if (field.type === "dropdown") {
      fieldPossible = Math.max(...field.options.map((o) => o.point));

      if (answer) {
        const match = answer.match(/(\d+(\.\d+)?)/);
        fieldAchieved = match ? Number(match[0]) : 0;
      }
    }

    totalAchieved += fieldAchieved;
    totalPossible += fieldPossible;

    metricReports.push({
      id: field.id,
      name: field.name,
      type: field.type,
      weight: field.weight,
      selected: answer ?? null,
      achievedPoints: fieldAchieved,
      possiblePoints: fieldPossible
    });

    // JSON summary as array
    metricSummaries.push({
      name: field.name,
      scored: `${fieldAchieved} out of ${fieldPossible}`
    });
  });

  const feedbackReports = savedForm.feedbackSections.map((field) => ({
    id: field.id,
    name: field.name,
    type: field.type,
    value: answers[field.id] ?? null
  }));

  const totalEfficiency = totalPossible > 0 ? (totalAchieved / totalPossible) * 100 : 0;

  const report = {
    title: savedForm.title,
    totalEfficiency: Number(totalEfficiency.toFixed(1)),
    summary: {
      totalAchieved,
      totalPossible,
      perMetric: metricSummaries // <-- array now, no overwriting
    },
    performanceMetrics: metricReports,
    feedback: feedbackReports
  };

  setFinalScore(report.totalEfficiency);
  setReport(report);
  console.log("Full Efficiency Report with All Metrics:", report);
};






  return (
    <div className="shadow bg-slate-50 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {savedForm?.title}
      </h1>

      {savedForm?.performanceMetrics.map((field) => (
        <div key={field.id} className="mb-6">
          <label className="block text-lg font-medium mb-2">
            {field.name}
            <span className="text-sm text-gray-500 ml-2">
              (Weight: {field.weight})
            </span>
          </label>

          {/* NUMBER */}
          {field.type === "number" && (
            <input
              type="number"
              min="0"
              max={field.weight}
              step="0.1"
              onChange={(e) =>
                handleChange(field.id, e.target.value)
              }
              className="border outline-none rounded p-3 w-full inset-shadow-2xs bg-white border-slate-200"
            />
          )}

          {/* DROPDOWN (STRING OPTIONS ONLY) */}
          {field.type === "dropdown" && (
            <Dropdown
              onChange={(value) =>
                handleChange(field.id, value)
              }
              options={field?.options.map(item => `${item.label}→ ${item.point} points`)}
            />
          )}
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-700">
        Feedback
      </h2>

      {savedForm?.feedbackSections.map((field) => (
        <div key={field.id} className="mb-6">
          <label className="block text-lg font-medium mb-2">
            {field.name}
          </label>

          {field.type === "textarea" ? (
            <textarea
              onChange={(e) =>
                handleChange(field.id, e.target.value)
              }
              className="border bg-white inset-shadow-2xs outline-none border-slate-200 rounded p-3 w-full h-32"
            />
          ) : field.type === "dropdown" ? (
            <Dropdown
              onChange={(value) =>
                handleChange(field.id, value)
              }
              options={field?.options.map(item => item.label)}
            />
          ) : (
            <InputField
              border="inset-shadow-2xs border border-slate-200"
              maxWidth="bg-white"
              suggestion={false}
              icon={false}
              onSelect={(value) =>
                handleChange(field.id, value)
              }
            />
          )}
        </div>
      ))}

      <button
        onClick={calculateScore}
        className="mt-8 px-4 py-2 bg-green-600 shadow text-white rounded hover:bg-green-700"
      >
        Submit & Calculate Efficiency
      </button>

      {finalScore !== null && (
        <div className="mt-10 p-8 bg-green-50 shadow rounded text-center">
          <h2 className="text-4xl font-bold text-green-800">
            Final Efficiency Score: {finalScore}%
          </h2>
        </div>
      )}
      {report && <MetricCards Data={report} />}

    </div>
  );
}
