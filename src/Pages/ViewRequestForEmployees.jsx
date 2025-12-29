import React, { useState } from "react";

export default function ViewRequestForEmployees({
  requests,
  status = "all",
  date = "all",
  q = "",
}) {
  const data = requests || [
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
        { from: "Manager", message: "Approved" },
      ],
    },
    {
      id: 2,
      type: "Unpaid",
      startDate: "2025-12-05",
      endDate: "2025-12-06",
      status: "Pending",
      progress: ["Waiting Dept Manager approval"],
      employeeMessage: "Medical leave",
      comments: [],
    },
  ];

  const [openId, setOpenId] = useState(null);
  const toggleOpen = (id) =>
    setOpenId((prev) => (prev === id ? null : id));

  // 🔹 DATE FILTER PARSING
  let from = null;
  let to = null;

  if (date !== "all") {
    if (date.includes(":")) {
      [from, to] = date.split(":");
    } else {
      from = date;
      to = date;
    }
  }

  const filtered = data.filter((req) => {
    // STATUS
    if (
      status !== "all" &&
      req.status.toLowerCase() !== status
    ) {
      return false;
    }

    // DATE
    if (from && to) {
      if (req.endDate < from || req.startDate > to) {
        return false;
      }
    }

    // SEARCH
    if (q) {
      const text = [
        req.type,
        req.employeeMessage,
        ...(req.comments || []).map(
          (c) => `${c.from} ${c.message}`
        ),
      ]
        .join(" ")
        .toLowerCase();

      if (!text.includes(q.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="mx-auto mt-8">
      <div className="space-y-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="rounded-lg shadow p-4 bg-white cursor-pointer dark:bg-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
            onClick={() => toggleOpen(req.id)}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold dark:text-slate-50">
                  {req.type} Leave ({req.startDate} - {req.endDate})
                </p>
                <p className="text-sm dark:text-slate-400 text-gray-500">
                  {req.status}
                </p>
              </div>

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
            <div className="mt-2 text-sm dark:text-slate-300 text-gray-600">
              Progress:{" "}
              {req.progress.map((step, i) => (
                <span key={i}>
                  {step}
                  {i < req.progress.length - 1 ? " → " : ""}
                </span>
              ))}
            </div>

            {/* Expanded */}
            {openId === req.id && (
              <div className="mt-4 border-t pt-2 dark:border-slate-400 space-y-2 text-sm dark:text-slate-200 text-gray-700">
                {req.employeeMessage && (
                  <div>
                    <p className="font-semibold">Your Message:</p>
                    <p>{req.employeeMessage}</p>
                  </div>
                )}

                {req.comments.length > 0 ? (
                  <div>
                    <p className="font-semibold">Comments:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {req.comments.map((c, i) => (
                        <li key={i}>
                          <span className="font-semibold">
                            {c.from}:
                          </span>{" "}
                          {c.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
