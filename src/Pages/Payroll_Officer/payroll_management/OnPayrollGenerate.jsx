// src/pages/GeneratePayroll.jsx
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import PayslipTemplate from "../../../Components/PayslipTemplate";
import { generatePdfBlobFromElement } from "../../../utils/pdf";
// import { idbPut, idbDelete } from "../utils/indexedDB";
import PayslipList from "../../../Components/PayslipList";

/**
 * calcPayrollForEmployee(emp, month)
 * returns payroll object
 */
function calcPayrollForEmployee(emp, month) {
  const baseMap = { Finance: 20000, HR: 15000, IT: 18000 };
  const base = baseMap[emp.department] || 12000;
  const allowance = Math.round(base * 0.2);
  const bonus = Math.round(base * 0.05);
  const overtime = 0;
  const gross = base + allowance + bonus + overtime;

  const tax = Math.round(gross * 0.1);
  const pension = Math.round(gross * 0.03);
  const other = 0;

  const totalDeductions = tax + pension + other;
  const net = gross - totalDeductions;

  return {
    employee: emp,
    month,
    company: {
      name: "ACME Corp",
      address: "1 Example Street",
      phone: "+251 555 123",
      email: "hr@acme.test",
      logoUrl: "",
    },
    earnings: [
      { label: "Basic Salary", amount: base },
      { label: "Allowance", amount: allowance },
      { label: "Bonus", amount: bonus },
    ],
    deductions: [
      { label: "Income Tax (10%)", amount: tax },
      { label: "Pension (3%)", amount: pension },
    ],
    gross,
    totalDeductions,
    net,
    paymentMethod: "Bank Transfer",
    paymentDate: new Date().toLocaleDateString(),
  };
}

/**
 * Demo employee dataset.
 * In real app, load from API
 */
const demoEmployees = [
  { id: "EMP001", name: "John Doe", department: "Finance", jobTitle: "Accountant", bankAccount: "0011223344" },
  { id: "EMP002", name: "Mary Smith", department: "HR", jobTitle: "HR Officer", bankAccount: "9988776655" },
  { id: "EMP003", name: "Ali Mohammed", department: "IT", jobTitle: "Developer", bankAccount: "2233445566" },
];

export default function OnPayrollGenerate() {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [employees] = useState(demoEmployees);
  const [selectedPayslipKey, setSelectedPayslipKey] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const printRef = useRef();

  async function handlePreviewAndSummary() {
    // build payrolls (pass month explicitly)
    const payrolls = employees.map((e) => calcPayrollForEmployee(e, month));
    // compute summary
    const totalPayout = payrolls.reduce((s, p) => s + p.net, 0);
    const missing = payrolls.filter((p) => !p.employee.bankAccount).length;
    setSummary({ totalEmployees: payrolls.length, totalPayout, missing, payrolls });
    // scroll to preview (optional)
  }


async function handleGenerateConfirmed() {
  if (!summary) return;
  setProcessing(true);

  try {
    for (const p of summary.payrolls) {
      // Create an offscreen container
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "800px"; 
      document.body.appendChild(container);

      // React 18 root
      const root = createRoot(container);

      // Render the payslip inside the container
      root.render(<PayslipTemplate payroll={p} />);

      // Wait for fonts to load (much more reliable than timeout)
      await document.fonts.ready;

      // Also wait for next animation frame (ensures full layout)
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // Get the actual rendered node
      const node = container.firstElementChild;

      // Generate PDF
      const blob = await generatePdfBlobFromElement(node);

      // Generate key: EMP001_2024-11
      const key = `${p.employee.id}_${p.month}`;

      // Optional storage (uncomment if using IndexedDB)
      // await idbDelete(key);
      // await idbPut(key, blob);

      // Cleanup React root
      root.unmount();
      document.body.removeChild(container);
    }

    alert("Payroll generated and payslips stored locally.");
  } catch (err) {
    console.error(err);
    alert("Failed generating payslips: " + err.message);
  } finally {
    setProcessing(false);
  }
}


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Generate Payroll</h2>
        <div className="flex gap-2">
          <input value={month} onChange={(e) => setMonth(e.target.value)} className="border px-3 py-2 rounded" />
          <button onClick={handlePreviewAndSummary} className="px-4 py-2 bg-blue-600 text-white rounded">
            Preview Summary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Employees to include</h3>
            <table className="w-full text-sm">
              <thead className="text-left text-slate-600">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Job Title</th>
                  <th>Bank</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="py-2">{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.department}</td>
                    <td>{e.jobTitle}</td>
                    <td>{e.bankAccount || <span className="text-xs text-red-500">Missing</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border rounded">
            {!selectedPayslipKey ? (<>
              <h3 className="font-semibold mb-2">Preview Payslip (example)</h3>
              
              <div className="text-sm text-slate-500">Select a payslip from the stored list to view</div>
              <div className="mb-3">
                <button onClick={() => setSelectedPayslipKey(`${employees[0].id}_${month}`)} className="px-3 py-1 text-sm bg-slate-100 rounded">
                  Open latest stored for {employees[0].id}
                </button>
              </div>
              <div className="bg-white p-3 rounded shadow">
                <PayslipTemplate payroll={calcPayrollForEmployee(employees[0], month)} ref={printRef} />
              </div>
            </>) : (
            <>
              <h3 className="font-semibold mb-2">Open Payslip Viewer</h3>
                <div>
                  <div className="mb-2 text-sm">Viewing: {selectedPayslipKey}</div>
                  <div className="bg-white p-3 rounded">
                    {/* Viewer now renders the PayslipTemplate using the selected key */}
                    <ViewerLoader keyId={selectedPayslipKey} />
                  </div>
                </div>
              
            </>
          )}
          </div>


           

      











          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Actions</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!summary) return alert("Preview summary first.");
                  if (!confirm("Generate payslips for all employees? This will replace existing payslips for this month.")) return;
                  handleGenerateConfirmed();
                }}
                disabled={processing}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
              >
                {processing ? "Generating..." : "Generate & Store Payslips"}
              </button>
            </div>

            <div className="mt-3 text-sm text-slate-600">
              When generated, payslips are stored locally in your browser. Re-generating for the same employee+month will replace the old PDF.
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Summary (Preview)</h3>
            {!summary && <div className="text-sm text-slate-500">Click "Preview Summary" to view payroll totals.</div>}
            {summary && (
              <div>
                <div className="text-sm">
                  Employees: <strong>{summary.totalEmployees}</strong>
                </div>
                <div className="text-sm">
                  Total Payroll (Net): <strong>{summary.totalPayout.toLocaleString()}</strong>
                </div>
                <div className="text-sm">
                  Missing bank info: <strong>{summary.missing}</strong>
                </div>
                <div className="mt-2">
                  <button onClick={() => handleGenerateConfirmed()} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Confirm Generate
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Stored Payslips</h3>
            <PayslipList onSelect={(k) => setSelectedPayslipKey(k)} />
          </div>
        </aside>
      </div>
    </div>
  );
}

// ViewerLoader: converts key back to payroll object and renders PayslipTemplate
function ViewerLoader({ keyId }) {
  if (!keyId) return null;

  // key format: EMP001_2025-12
  const [eid, monthFromKey] = keyId.split("_");

  // find employee
  const emp = demoEmployees.find((e) => e.id === eid);
  if (!emp) return <div className="text-sm text-red-500">Employee not found</div>;

  // rebuild payroll using the existing calculator (pass month parsed from key)
  const payroll = calcPayrollForEmployee(emp, monthFromKey);

  return (
    <div className="p-4 border rounded bg-white">
      <PayslipTemplate payroll={payroll} />
    </div>
  );
}
