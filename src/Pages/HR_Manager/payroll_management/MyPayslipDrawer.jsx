import React from "react";
import FileDrawer from "../../../Components/FileDrawer"

function MyPayslipDrawer({ data, close }) {
  return (
    <FileDrawer
      isModalOpen={true}
      closeModal={close}
      width="w-1/3"
      transparency={false}
    >
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">
          Payslip - {data.month}
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Gross Salary:</strong> ${data.gross.toLocaleString()}
          </p>
          <p>
            <strong>Deductions:</strong> ${data.deductions.toLocaleString()}
          </p>
          <p>
            <strong>Net Salary:</strong> ${data.net.toLocaleString()}
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

export default MyPayslipDrawer;
