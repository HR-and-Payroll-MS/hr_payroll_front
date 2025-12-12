import PayslipTemplate from "../../../Components/PayslipTemplate";
import calcPayrollForEmployee from "./calcPayrollForEmployee";

// ViewerLoader: converts key back to payroll object and renders PayslipTemplate
export default function ViewerLoader({ keyId,demoEmployees }) {
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