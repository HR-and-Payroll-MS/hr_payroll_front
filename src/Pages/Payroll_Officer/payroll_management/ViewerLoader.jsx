import PayslipTemplate from "../../../Components/PayslipTemplate";
import calcPayrollForEmployee from "./calcPayrollForEmployee";

// ViewerLoader: converts key back to payroll object and renders PayslipTemplate
export default function ViewerLoader({ Id,demoEmployees,month= new Date().toISOString().split("T")[0] }) {
  console.log("Payroll rebuilt in ViewerLoader:", "payroll");
  console.log("Employee ID:", Id);
  if (!Id) return null;

  // key format: EMP001_2025-12
  // const [eid, monthFromKey] = keyId.split("_");

  // find employee
  console.log("demoEmployees:", demoEmployees);
  const emp = demoEmployees.find((e) => e.id === Id);
  console.log("Employee found:", emp);

  if (!emp) return <div className="text-sm text-red-500">Employee not found</div>;

  // rebuild payroll using the existing calculator (pass month parsed from key)
  const payroll = calcPayrollForEmployee(emp, month);

  return (
    <div className="p-4 border rounded bg-white">
      <PayslipTemplate payroll={payroll} />
    </div>
  );
}