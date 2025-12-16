import React from "react";

export default function MetricCards({ Data }) {
 if (!Data) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-slate-200 w-full max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-800 mb-4">
        {Data.title}
      </h2>

      {/* Total Efficiency */}
      <p className="text-green-700 font-semibold mb-4">
        Total Efficiency: {Data.totalEfficiency}%
      </p>

      {/* Metrics */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          Performance Metrics
        </h3>
        <div className="space-y-3">
          {Data.summary.perMetric.map((metric, index) => (
            <div key={index} className="bg-slate-50 border border-slate-200 rounded p-3">
              <h4 className="text-lg font-medium text-slate-700">
                {metric.name}
              </h4>
              <p className="text-green-600 font-bold">{metric.scored}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          Feedback
        </h3>
        <div className="space-y-3">
          {Data.feedback.map((fb, index) => (
            <div key={index} className="bg-slate-50 border border-slate-200 rounded p-3">
              <h4 className="text-lg font-medium text-slate-700">{fb.name}</h4>
              <p className="text-slate-600">{fb.value || "No feedback provided"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
