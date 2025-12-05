import React from "react";
import FileDrawer from "../../../Components/FileDrawer"

function MyPayslipDrawer({ data }) {
  return (
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

      </div>
  );
}

export default MyPayslipDrawer;
