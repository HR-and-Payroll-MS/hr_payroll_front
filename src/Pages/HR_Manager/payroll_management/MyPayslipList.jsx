import React from "react";

function MyPayslipList({ payslips, onView }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3">Month</th>
            <th className="p-3">Net Salary</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {payslips.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{p.month}</td>
              <td className="p-3">${p.net.toLocaleString()}</td>
              <td className="p-3">
                <button
                  onClick={() => onView(p)}
                  className="text-blue-600 underline"
                >
                  View Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyPayslipList;
