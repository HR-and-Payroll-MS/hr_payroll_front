import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import PayslipTemplate from "../../../Components/PayslipTemplate";
import { generatePdfBlobFromElement } from "../../../utils/pdf";
import PayslipList from "../../../Components/PayslipList";
import calcPayrollForEmployee from "./calcPayrollForEmployee";
import ViewerLoader from "./ViewerLoader";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";
// import ExportTable from "../../../Components/ExportTable";
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
  const [progress, setProgress] = useState("");
  const [employees] = useState(demoEmployees);
  const [selectedPayslipKey, setSelectedPayslipKey] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const printRef = useRef();

// map over all employees and sum up the net pay and store in summary state
  async function handlePreviewAndSummary() {
    const payrolls = employees.map((e) => calcPayrollForEmployee(e, month));
    console.log(payrolls);
    const totalPayout = payrolls.reduce((s, p) => s + p.net, 0);
    // const missing = payrolls.filter((p) => !p.employee.bankAccount).length;
    setSummary(
      { totalEmployees: payrolls.length,
         totalPayout,
          // missing,
          payrolls });
  }
async function handleGenerateConfirmed() {
  if (!summary?.payrolls?.length) {
    alert("No payroll data to process.");
    return;
  }

  setProcessing(true);
  setProgress("Generating and uploading payslips...");

  let count = 0;
  const total = summary.payrolls.length;

  try {
    for (const p of summary.payrolls) {
      count++;
      setProgress(`Processing ${count}/${total}: ${p.employee.name}`);

      // === Offscreen rendering (same as before) ===
      const container = document.createElement("div");
      container.style.cssText = "position:fixed;left:-9999px;top:0;width:800px;background:white;";
      document.body.appendChild(container);

      const root = createRoot(container);
      root.render(<PayslipTemplate payroll={p} month={p.month} />);

      await document.fonts.ready;
      let node = container.firstElementChild;
      while (!node) {
        await new Promise(r => requestAnimationFrame(r));
        node = container.firstElementChild;
      }
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

      const blob = await generatePdfBlobFromElement(node);

      // === UPLOAD PDF DIRECTLY TO DJANGO USING FormData ===
      const formData = new FormData();
      formData.append("pdf_file", blob, `payslip_${p.employee.id}_${p.month}.pdf`);
      formData.append("employee_id", p.employee.id);
      formData.append("month", p.month);
      formData.append("gross", p.gross.toString());
      formData.append("net", p.net.toString());

      // This calls your Django endpoint
      await axios.post("/api/payslips/generate/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add auth if needed (JWT, session, etc.)
          // Authorization: `Bearer ${token}`,
        },
      });

      // Cleanup DOM
      root.unmount();
      document.body.removeChild(container);

      // Prevent browser freeze on large batches
      if (count % 10 === 0) await new Promise(r => setTimeout(r, 0));
    }

    setProgress(`Success! All ${total} payslips generated and saved.`);
    alert(`Payroll processed successfully!\n${total} payslips uploaded to server.`);
    
  } catch (err) {
    console.error("Payslip generation failed:", err);
    const msg = err.response?.data?.detail || err.message || "Unknown error";
    alert(`Failed at employee ${count}: ${msg}`);
    setProgress("Error occurred");
  } finally {
    setProcessing(false);
    setTimeout(() => setProgress(""), 6000);
  }
}

  return (
    <div className="p-6">

      {/* summary sheet view on click it calls the handlepreviewAndSummary and the input on change it calls setmonth to contain the value */}
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
                    <ViewerLoader demoEmployees={demoEmployees} keyId={selectedPayslipKey} />
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
{processing && (
  <div style={{
    position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
    background: "#333", color: "white", padding: "12px 24px",
    borderRadius: 8, zIndex: 9999, fontSize: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
  }}>
    {progress || "Processing..."}
  </div>
)}
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

























// async function handleGenerateConfirmed() {
//   if (!summary?.payrolls?.length) {
//     alert("No payroll data to generate.");
//     return;
//   }

//   setProcessing(true);
//   setProgress("Starting payslip generation...");

//   const zip = new JSZip(); // For optional bulk download
//   let count = 0;
//   const total = summary.payrolls.length;

//   try {
//     for (const p of summary.payrolls) {
//       count++;
//       setProgress(`Generating payslip ${count} of ${total}: ${p.employee.name}`);

//       // Create offscreen container
//       const container = document.createElement("div");
//       container.style.position = "fixed";
//       container.style.left = "-9999px";
//       container.style.top = "0";
//       container.style.width = "800px";
//       container.style.background = "white";
//       document.body.appendChild(container);

//       const root = createRoot(container);
//      root.render(<PayslipTemplate payroll={p} month={p.month} />);

// // Wait for the component to be fully mounted and rendered
// let node = container.firstElementChild;

// await document.fonts.ready;

// // Double rAF + small fallback loop — this is the gold standard
// await new Promise((resolve) => {
//   const check = () => {
//     node = container.firstElementChild;
//     if (node) {
//       resolve();
//     } else {
//       requestAnimationFrame(check);
//     }
//   };
//   requestAnimationFrame(check);
// });

// // Final safety: wait one more frame after node exists
// await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

//       // Generate PDF blob
//       const blob = await generatePdfBlobFromElement(node);

//       // Unique filename
//       const filename = `Payslip_${p.employee.id}_${p.employee.name.replace(/\s+/g, "_")}_${p.month}.pdf`;
//       const storageKey = `${p.employee.id}_${p.month}`;

//       // Save to IndexedDB (optional - uncomment if using idb-keyval or similar)
//       // await idbPut(storageKey, blob);

//       // Add to ZIP for bulk download
//       zip.file(filename, blob);

//       // Cleanup
//       root.unmount();
//       document.body.removeChild(container);

//       // Small delay to prevent browser freeze on large batches (>100)
//       if (count % 10 === 0) await new Promise((r) => setTimeout(r, 0));
//     }

//     // ALL DONE!
//     setProgress(`Completed! Generated ${total} payslips.`);

//     // Option 1: Offer ZIP download
//     const zipBlob = await zip.generateAsync({ type: "blob" });
//     saveAs(zipBlob, `Payslips_${summary.month}_Batch_${new Date().toISOString().slice(0,10)}.zip`);

//     alert(`Success! ${total} payslips generated and downloaded as ZIP.`);

//     // Option 2: Just show success (if you prefer individual storage only)
//     // alert(`All ${total} payslips generated and saved locally.`);

//   } catch (err) {
//     console.error("Payslip generation failed:", err);
//     setProgress("Error occurred");
//     alert(`Failed at payslip ${count}: ${err.message || err}`);
//   } finally {
//     setProcessing(false);
//     setTimeout(() => setProgress(""), 5000); // Clear progress after 5 sec
//   }
// }