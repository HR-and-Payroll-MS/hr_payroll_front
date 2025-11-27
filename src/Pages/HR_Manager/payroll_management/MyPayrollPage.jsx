import React, { useState } from "react";
import MyPayslipList from "./MyPayslipList";
import MyPayslipDrawer from "./MyPayslipDrawer";

function MyPayrollPage() {
  // static placeholder data
  const payslips = [
    {
      id: 1,
      month: "January 2025",
      gross: 8000,
      deductions: 1200,
      net: 6800,
    },
    {
      id: 2,
      month: "February 2025",
      gross: 8000,
      deductions: 1250,
      net: 6750,
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">My Payroll</h1>

      <MyPayslipList payslips={payslips} onView={(p) => setSelected(p)} />

      {selected && (
        <MyPayslipDrawer data={selected} close={() => setSelected(null)} />
      )}
    </div>
  );
}

export default MyPayrollPage;
