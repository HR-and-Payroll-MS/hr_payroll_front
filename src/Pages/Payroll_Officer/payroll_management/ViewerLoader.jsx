import PayslipTemplate from "../../../Components/PayslipTemplate";

// ViewerLoader: Renders PayslipTemplate with provided data
export default function ViewerLoader({ data }) {
  if (!data) return <div className="text-sm text-slate-500 p-4">Select an employee to view payslip</div>;

  return (
    <div className="p-4 border dark:border-slate-400 dark:bg-slate-700 overflow-y-auto h-full rounded hover-bar bg-white">
      <p className="text-2xl dark:text-slate-200 mb-7 font-bold">Preview for {data.employee_name || data?.name || "Employee"}</p>
      <PayslipTemplate payroll={data.details || data} />
    </div>
  );
}