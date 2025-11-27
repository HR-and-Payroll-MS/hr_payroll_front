import React, { useState } from "react";
import PayrollReportsTable from "./PayrollReportsTable";
import PayrollReportDrawer from "./PayrollReportDrawer";

function PayrollReportsPage() {
  // static data placeholder
  const mockReports = [
    {
      id: 1,
      month: "January 2025",
      totalEmployees: 42,
      totalPayout: 280000,
      status: "Completed",
    },
    {
      id: 2,
      month: "February 2025",
      totalEmployees: 41,
      totalPayout: 276500,
      status: "Completed",
    },
  ];

  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">Payroll Reports</h1>

      <PayrollReportsTable
        reports={mockReports}
        onView={(report) => setSelectedReport(report)}
      />

      {selectedReport && (
        <PayrollReportDrawer
          data={selectedReport}
          close={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}

export default PayrollReportsPage;
