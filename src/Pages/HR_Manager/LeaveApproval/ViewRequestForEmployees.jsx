import React from 'react'
import { useState } from "react";

export default function ViewRequestForEmployees({ requests }) {
    requests = requests ||  [
  {
    id: 1,
    type: "Paid",
    startDate: "2025-12-01",
    endDate: "2025-12-03",
    status: "Approved",
    progress: ["Dept Manager approved", "Waiting HR approval"],
    employeeMessage: "Need this leave for personal reasons",
    comments: [
      { from: "HR", message: "Check with manager" },
      { from: "Manager", message: "Approved" }
    ]
  },
  {
    id: 2,
    type: "Unpaid",
    startDate: "2025-12-05",
    endDate: "2025-12-06",
    status: "Pending",
    progress: ["Waiting Dept Manager approval"],
    employeeMessage: "Medical leave",
    comments: []
  }
];

  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className=" mx-auto mt-8">
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="rounded-lg shadow p-4 bg-white cursor-pointer hover:bg-gray-50 transition"
            onClick={() => toggleOpen(req.id)}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  {req.type} Leave ({req.startDate} - {req.endDate})
                </p>
                <p className="text-sm text-gray-500">{req.status}</p>
              </div>
              {/* Status Badge */}
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  req.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : req.status === "Denied"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {req.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mt-2 text-sm text-gray-600">
              Progress:{" "}
              {req.progress.map((step, i) => (
                <span key={i}>
                  {step}
                  {i < req.progress.length - 1 ? " → " : ""}
                </span>
              ))}
            </div>

            {/* Expanded content */}
            {openId === req.id && (
              <div className="mt-4 border-t pt-2 space-y-2 text-sm text-gray-700">
                {/* Employee message */}
                {req.employeeMessage && (
                  <div>
                    <p className="font-semibold">Your Message:</p>
                    <p>{req.employeeMessage}</p>
                  </div>
                )}

                {/* Comments */}
                {req.comments.length > 0 && (
                  <div>
                    <p className="font-semibold">Comments:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {req.comments.map((c, i) => (
                        <li key={i}>
                          <span className="font-semibold">{c.from}:</span>{" "}
                          {c.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* No comments */}
                {req.comments.length === 0 && <p>No comments yet.</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}