import React, { useState, useEffect } from "react";
import MyPayslipList from "../../MyPayslipList";
import MyPayslipDrawer from "./MyPayslipDrawer";
import Table from '../../../Components/Table'
import PayrollReportDrawer from "./PayrollReportDrawer";
import PayslipTemplate from "../../../Components/PayslipTemplate";
import EmployeePayslipTemplate from "../../../Components/EmployeePayslipTemplate";
import useAuth from "../../../Context/AuthContext";
import { getLocalData } from "../../../Hooks/useLocalStorage";

function MyPayrollPage({ background, headerfont = "text-2xl" }) {
  const { axiosPrivate } = useAuth();
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPayslips = async () => {
      try {
        const employeeId = getLocalData("user_id");
        if (!employeeId) {
          console.warn("No employee_id found in local storage");
          setLoading(false);
          return;
        }
        // Fetch reports filtered by this employee
        const response = await axiosPrivate.get(`/payroll/reports/?employee=${employeeId}`);

        if (isMounted) {
          const data = response.data.map(item => ({
            id: item.cycle_id, // or item.id if available
            month: item.cycle_name, // e.g., "2025-01 Payroll"
            gross: item.gross,
            deductions: item.total_deductions || (item.gross - item.net),
            net: item.net,
          }));
          setPayslips(data);
        }
      } catch (err) {
        console.error("Failed to fetch payslips", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPayslips();
    return () => { isMounted = false; };
  }, [axiosPrivate]);

  const structure = [1, 1, 63]
  const key = [['month'], ['net']]
  const title = ["Month", "Net Salary", "Action"]

  const [selected, setSelected] = useState(null);

  if (loading) {
    return <div className={`p-5 ${background} text-slate-500`}>Loading payslips...</div>;
  }

  return (
    <div className={`p-5 ${background}`}>
      <h1 className={` font-semibold mb-4 ${headerfont}`}>Payslips</h1>

      {payslips.length > 0 ? (
        <Table
          D1="generate"
          Data={payslips}
          Structure={structure}
          ke={key}
          title={title}
          nickname="View Payslip"
          components={EmployeePayslipTemplate}
        />
      ) : (
        <div className="text-slate-500 italic">No payslips found.</div>
      )}

    </div>
  );
}

export default MyPayrollPage;
