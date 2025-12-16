import React, { forwardRef, useState, useImperativeHandle } from "react";

const PayslipTemplate = forwardRef(({ payroll, isEditable = false, onSave }, ref) => {
  const [isEditing, setIsEditing] = useState(isEditable);
  const [editedData, setEditedData] = useState(payroll);
  const originalData = payroll;
  console.log(payroll,"from the template")

  // Expose methods to parent (e.g., to trigger save/cancel from outside)
  useImperativeHandle(ref, () => ({
    startEditing: () => setIsEditing(true),
    cancelEditing: handleCancel,
    save: handleSave,
  }));

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEarningsChange = (index, subfield, value) => {
    const newEarnings = [...editedData.earnings];
    newEarnings[index] = { ...newEarnings[index], [subfield]: value };
    setEditedData((prev) => ({ ...prev, earnings: newEarnings }));
  };

  const handleDeductionsChange = (index, subfield, value) => {
    const newDeductions = [...editedData.deductions];
    newDeductions[index] = { ...newDeductions[index], [subfield]: value };
    setEditedData((prev) => ({ ...prev, deductions: newDeductions }));
  };

  const recalculateTotals = (data) => {
    const gross = data.earnings.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const totalDeductions = data.deductions.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const net = gross - totalDeductions;
    return { gross, totalDeductions, net };
  };

  const handleSave = () => {
    const { gross, totalDeductions, net } = recalculateTotals(editedData);
    const finalData = {
      ...editedData,
      gross,
      totalDeductions,
      net,
    };
    setEditedData(finalData);
    setIsEditing(false);

    if (onSave) {
      onSave(finalData);
    }
  };

  const handleCancel = () => {
    setEditedData(originalData);
    setIsEditing(false);
  };

  if (!payroll) return null;

  const {
    company,
    employee,
    month,
    earnings,
    deductions,
    gross,
    totalDeductions,
    net,
    paymentMethod,
    paymentDate,
  } = isEditing ? editedData : payroll;

  const displayData = isEditing ? editedData : payroll;
  const { gross: displayGross, totalDeductions: displayTotalDeductions, net: displayNet } =
    isEditing ? recalculateTotals(displayData) : { gross, totalDeductions, net };

  return (
    <div
      style={{
        maxWidth: "768px",
        margin: "0 auto",
        backgroundColor: "white",
        padding: "1.5rem",
        color: "rgb(30,30,30)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Edit Mode Buttons */}
      {isEditing && (
        <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgb(22,163,74)",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgb(239,68,68)",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          {company?.logoUrl ? (
            <img src={company.logoUrl} alt="logo" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
          ) : (
            <div style={{ width: "64px", height: "64px", backgroundColor: "rgb(226,232,240)", borderRadius: "0.25rem" }} />
          )}
          <div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{company?.name || "Company Name"}</h1>
            <div style={{ fontSize: "0.875rem" }}>{company?.address}</div>
            <div style={{ fontSize: "0.75rem", color: "rgb(100,116,139)" }}>
              {company?.phone} • {company?.email}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.875rem", color: "rgb(100,116,139)" }}>Payslip for</div>
          <div style={{ fontSize: "1.125rem", fontWeight: 600 }}>{month}</div>
          <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Payslip ID: {`${employee.id}-${month}`}</div>
        </div>
      </div>

      {/* Employee & Payment Info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ fontWeight: 600 }}>Employee Details</h3>
          <table style={{ fontSize: "0.875rem" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: "0.5rem" }}>Name:</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={employee.name}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, employee: { ...prev.employee, name: e.target.value } }))}
                      style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
                    />
                  ) : (
                    employee.name
                  )}
                </td>
              </tr>
              <tr><td style={{ paddingRight: "0.5rem" }}>Employee ID:</td><td>{employee.id}</td></tr>
              <tr>
                <td style={{ paddingRight: "0.5rem" }}>Department:</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={employee.department || ""}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, employee: { ...prev.employee, department: e.target.value } }))}
                      style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
                    />
                  ) : (
                    employee.department || "-"
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "0.5rem" }}>Job Title:</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={employee.jobTitle || ""}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, employee: { ...prev.employee, jobTitle: e.target.value } }))}
                      style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
                    />
                  ) : (
                    employee.jobTitle
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 style={{ fontWeight: 600 }}>Payment Info</h3>
          <table style={{ fontSize: "0.875rem" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: "0.5rem" }}>Payment Method:</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={paymentMethod}
                      onChange={(e) => handleChange("paymentMethod", e.target.value)}
                      style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
                    />
                  ) : (
                    paymentMethod
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "0.5rem" }}>Payment Date:</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={paymentDate}
                      onChange={(e) => handleChange("paymentDate", e.target.value)}
                      style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
                    />
                  ) : (
                    paymentDate
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: "0.5rem" }}>Bank Account:</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={employee.bankAccount || ""}
                      onChange={(e) => setEditedData((prev) => ({ ...prev, employee: { ...prev.employee, bankAccount: e.target.value } }))}
                      style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem" }}
                    />
                  ) : (
                    employee.bankAccount || "-"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Earnings & Deductions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ backgroundColor: "rgb(248,250,252)", padding: "0.75rem", borderRadius: "0.25rem" }}>
          <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Earnings</h4>
          <table style={{ width: "100%", fontSize: "0.875rem" }}>
            <tbody>
              {earnings.map((e, idx) => (
                <tr key={idx}>
                  <td style={{ width: "75%" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={e.label}
                        onChange={(ev) => handleEarningsChange(idx, "label", ev.target.value)}
                        style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem", width: "100%" }}
                      />
                    ) : (
                      e.label
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        value={e.amount}
                        onChange={(ev) => handleEarningsChange(idx, "amount", Number(ev.target.value) || 0)}
                        style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem", width: "100px", textAlign: "right" }}
                      />
                    ) : (
                      e.amount.toLocaleString()
                    )}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid #ccc", fontWeight: 600 }}>
                <td>Total Earnings</td>
                <td style={{ textAlign: "right" }}>{displayGross.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: "rgb(248,250,252)", padding: "0.75rem", borderRadius: "0.25rem" }}>
          <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Deductions</h4>
          <table style={{ width: "100%", fontSize: "0.875rem" }}>
            <tbody>
              {deductions.map((d, idx) => (
                <tr key={idx}>
                  <td style={{ width: "75%" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={d.label}
                        onChange={(ev) => handleDeductionsChange(idx, "label", ev.target.value)}
                        style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem", width: "100%" }}
                      />
                    ) : (
                      d.label
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        value={d.amount}
                        onChange={(ev) => handleDeductionsChange(idx, "amount", Number(ev.target.value) || 0)}
                        style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem", width: "100px", textAlign: "right" }}
                      />
                    ) : (
                      d.amount.toLocaleString()
                    )}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid #ccc", fontWeight: 600 }}>
                <td>Total Deductions</td>
                <td style={{ textAlign: "right" }}>{displayTotalDeductions.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gross & Net */}
      <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem", backgroundColor: "rgb(249,250,251)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.875rem", color: "rgb(100,116,139)" }}>Gross Salary</div>
            <div style={{ fontSize: "1.125rem", fontWeight: 600 }}>{displayGross.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.875rem", color: "rgb(100,116,139)" }}>Net Pay</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgb(22,163,74)" }}>{displayNet.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "rgb(100,116,139)" }}>
          This is a computer-generated payslip and does not require a signature.
        </div>
      </div>
    </div>
  );
});

export default PayslipTemplate;


















































// import React, { forwardRef } from "react";

// /**
//  * PDF-safe PayslipTemplate: all Tailwind colors replaced with inline RGB
//  */
// const PayslipTemplate = forwardRef(({ payroll }, ref) => {
//   if (!payroll) return null;

//   const { company, employee, month, earnings, deductions, gross, totalDeductions, net, paymentMethod, paymentDate } = payroll;

//   return (
//     <div
//       ref={ref}
//       style={{ maxWidth: "768px", margin: "0 auto", backgroundColor: "white", padding: "1.5rem", color: "rgb(30,30,30)", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", fontFamily: "sans-serif", }} >
//       {/* Header */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
//         <div style={{ display: "flex", gap: "1rem" }}>
//           {company?.logoUrl ? (
//             <img src={company.logoUrl} alt="logo" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
//           ) : (
//             <div style={{ width: "64px", height: "64px", backgroundColor: "rgb(226,232,240)", borderRadius: "0.25rem" }} />
//           )}
//           <div>
//             <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{company?.name || "Company Name"}</h1>
//             <div style={{ fontSize: "0.875rem" }}>{company?.address}</div>
//             <div style={{ fontSize: "0.75rem", color: "rgb(100,116,139)" }}>
//               {company?.phone} • {company?.email}
//             </div>
//           </div>
//         </div>
//         <div style={{ textAlign: "right" }}>
//           <div style={{ fontSize: "0.875rem", color: "rgb(100,116,139)" }}>Payslip for</div>
//           <div style={{ fontSize: "1.125rem", fontWeight: 600 }}>{month}</div>
//           <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Payslip ID: {`${employee.id}-${month}`}</div>
//         </div>
//       </div>

//       {/* Employee & Payment Info */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
//         <div>
//           <h3 style={{ fontWeight: 600 }}>Employee Details</h3>
//           <table style={{ fontSize: "0.875rem" }}>
//             <tbody>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Name:</td><td>{employee.name}</td></tr>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Employee ID:</td><td>{employee.id}</td></tr>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Department:</td><td>{employee.department}</td></tr>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Job Title:</td><td>{employee.jobTitle}</td></tr>
//             </tbody>
//           </table>
//         </div>
//         <div>
//           <h3 style={{ fontWeight: 600 }}>Payment Info</h3>
//           <table style={{ fontSize: "0.875rem" }}>
//             <tbody>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Payment Method:</td><td>{paymentMethod}</td></tr>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Payment Date:</td><td>{paymentDate}</td></tr>
//               <tr><td style={{ paddingRight: "0.5rem" }}>Bank Account:</td><td>{employee.bankAccount || "-"}</td></tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Earnings & Deductions */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
//         <div style={{ backgroundColor: "rgb(248,250,252)", padding: "0.75rem", borderRadius: "0.25rem" }}>
//           <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Earnings</h4>
//           <table style={{ width: "100%", fontSize: "0.875rem" }}>
//             <tbody>
//               {earnings.map((e, idx) => (
//                 <tr key={idx}>
//                   <td style={{ width: "75%" }}>{e.label}</td>
//                   <td style={{ textAlign: "right" }}>{e.amount.toLocaleString()}</td>
//                 </tr>
//               ))}
//               <tr style={{ borderTop: "1px solid #ccc", fontWeight: 600 }}>
//                 <td>Total Earnings</td>
//                 <td style={{ textAlign: "right" }}>{gross.toLocaleString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div style={{ backgroundColor: "rgb(248,250,252)", padding: "0.75rem", borderRadius: "0.25rem" }}>
//           <h4 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Deductions</h4>
//           <table style={{ width: "100%", fontSize: "0.875rem" }}>
//             <tbody>
//               {deductions.map((d, idx) => (
//                 <tr key={idx}>
//                   <td style={{ width: "75%" }}>{d.label}</td>
//                   <td style={{ textAlign: "right" }}>{d.amount.toLocaleString()}</td>
//                 </tr>
//               ))}
//               <tr style={{ borderTop: "1px solid #ccc", fontWeight: 600 }}>
//                 <td>Total Deductions</td>
//                 <td style={{ textAlign: "right" }}>{totalDeductions.toLocaleString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Gross & Net */}
//       <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "0.25rem", backgroundColor: "rgb(249,250,251)" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <div>
//             <div style={{ fontSize: "0.875rem", color: "rgb(100,116,139)" }}>Gross Salary</div>
//             <div style={{ fontSize: "1.125rem", fontWeight: 600 }}>{gross.toLocaleString()}</div>
//           </div>
//           <div>
//             <div style={{ fontSize: "0.875rem", color: "rgb(100,116,139)" }}>Net Pay</div>
//             <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "rgb(22,163,74)" }}>{net.toLocaleString()}</div>
//           </div>
//         </div>
//         <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "rgb(100,116,139)" }}>
//           This is a computer-generated payslip and does not require a signature.
//         </div>
//       </div>
//     </div>
//   );
// });

// export default PayslipTemplate;































































// // src/components/PayslipTemplate.jsx
// import React, { forwardRef } from "react";
// const PayslipTemplate = forwardRef(({ payroll }, ref) => {
//   if (!payroll) return null;
//   const { company, employee, month, earnings, deductions, gross, totalDeductions, net, paymentMethod, paymentDate } = payroll;

//   return (
//     <div ref={ref} className="max-w-3xl mx-auto bg-white p-6 text-gray-800 shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-4">
//           {company?.logoUrl ? <img src={company.logoUrl} alt="logo" className="w-16 h-16 object-contain" /> : <div className="w-16 h-16 bg-slate-200 rounded" />}
//           <div>
//             <h1 className="text-xl font-bold">{company?.name || "Company Name"}</h1>
//             <div className="text-sm">{company?.address}</div>
//             <div className="text-xs text-slate-500">{company?.phone} • {company?.email}</div>
//           </div>
//         </div>
//         <div className="text-right">
//           <div className="text-sm text-slate-500">Payslip for</div>
//           <div className="text-lg font-semibold">{month}</div>
//           <div className="text-xs mt-2">Payslip ID: {`${employee.id}-${month}`}</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <h3 className="font-semibold">Employee Details</h3>
//           <table className="text-sm">
//             <tbody>
//               <tr><td className="pr-2">Name:</td><td>{employee.name}</td></tr>
//               <tr><td className="pr-2">Employee ID:</td><td>{employee.id}</td></tr>
//               <tr><td className="pr-2">Department:</td><td>{employee.department}</td></tr>
//               <tr><td className="pr-2">Job Title:</td><td>{employee.jobTitle}</td></tr>
//             </tbody>
//           </table>
//         </div>
//         <div>
//           <h3 className="font-semibold">Payment Info</h3>
//           <table className="text-sm">
//             <tbody>
//               <tr><td className="pr-2">Payment Method:</td><td>{paymentMethod}</td></tr>
//               <tr><td className="pr-2">Payment Date:</td><td>{paymentDate}</td></tr>
//               <tr><td className="pr-2">Bank Account:</td><td>{employee.bankAccount || "-"}</td></tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-slate-50 p-3 rounded">
//           <h4 className="font-semibold mb-2">Earnings</h4>
//           <table className="w-full payslip-table text-sm">
//             <tbody>
//               {earnings.map((e, idx) => (
//                 <tr key={idx}>
//                   <td className="w-3/4">{e.label}</td>
//                   <td className="text-right">{e.amount.toLocaleString()}</td>
//                 </tr>
//               ))}
//               <tr className="border-t">
//                 <td className="font-semibold">Total Earnings</td>
//                 <td className="text-right font-semibold">{gross.toLocaleString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="bg-slate-50 p-3 rounded">
//           <h4 className="font-semibold mb-2">Deductions</h4>
//           <table className="w-full payslip-table text-sm">
//             <tbody>
//               {deductions.map((d, idx) => (
//                 <tr key={idx}>
//                   <td className="w-3/4">{d.label}</td>
//                   <td className="text-right">{d.amount.toLocaleString()}</td>
//                 </tr>
//               ))}
//               <tr className="border-t">
//                 <td className="font-semibold">Total Deductions</td>
//                 <td className="text-right font-semibold">{totalDeductions.toLocaleString()}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="mt-4 p-4 border rounded bg-gray-50">
//         <div className="flex justify-between items-center">
//           <div>
//             <div className="text-sm text-slate-600">Gross Salary</div>
//             <div className="text-lg font-semibold">{gross.toLocaleString()}</div>
//           </div>
//           <div>
//             <div className="text-sm text-slate-600">Net Pay</div>
//             <div className="text-2xl font-bold text-green-600">{net.toLocaleString()}</div>
//           </div>
//         </div>
//         <div className="mt-3 text-xs text-slate-500">
//           This is a computer-generated payslip and does not require a signature.
//         </div>
//       </div>
//     </div>
//   );
// });

// export default PayslipTemplate;
