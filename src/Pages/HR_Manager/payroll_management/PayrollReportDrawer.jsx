import React from "react";
import FileDrawer from "../../../Components/FileDrawer"
function PayrollReportDrawer({ data, close }) {
  return (
    <FileDrawer
      isModalOpen={true}
      closeModal={close}
      width="w-1/3"
      transparency={false}
    >
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-3">
          Payroll Report - {data.month}
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Total Employees:</strong> {data.totalEmployees}
          </p>
          <p>
            <strong>Total Payout:</strong> $
            {data.totalPayout.toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </div>

        <button
          onClick={close}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </FileDrawer>
  );
}

export default PayrollReportDrawer;
