import React, { useState, useEffect } from 'react';
import PayrollReportsTable from './PayrollReportsTable';
import PayrollReportDrawer from './PayrollReportDrawer';
import GeneratePayroll from '../../Payroll_Officer/payroll_management/GeneratePayroll';
import useAuth from '../../../Context/AuthContext';
import ViewerLoader from '../../Payroll_Officer/payroll_management/ViewerLoader';

function PayrollReportsPage() {
  const { axiosPrivate } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Fetch all cycles. Annotations in backend provide totals.
        const res = await axiosPrivate.get('/payroll/cycles/');
        if (isMounted) {
          const data = res.data.results || res.data;
          const mapped = data.map(cycle => ({
            id: cycle.id,
            month: cycle.name, // e.g., "2025-01 Payroll"
            totalEmployees: cycle.employee_count || 0,
            totalPayout: parseFloat(cycle.total_payout || 0),
            status: cycle.status,
            raw: cycle
          }));
          setReports(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch payroll reports", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchReports();
    return () => { isMounted = false; };
  }, [axiosPrivate]);

  if (loading) return <ViewerLoader />;

  return (
    <div className="p-5 h-full overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Payroll Reports</h1>

      {reports.length > 0 ? (
        <PayrollReportsTable
          reports={reports}
          onView={(report) => setSelectedReport(report)}
        />
      ) : (
        <div className="text-center p-10 text-slate-500 italic">No payroll cycles found.</div>
      )}

      {/* Drawer or Modal for viewing specific report details could go here */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 h-full shadow-2xl overflow-y-auto relative p-6 animate-slide-in-right">
            <button onClick={() => setSelectedReport(null)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full">✕</button>
            <h2 className="text-xl font-bold mb-4">Report Details: {selectedReport.month}</h2>
            {/* 
                  Reuse GeneratePayroll in read-only mode or specific Report View? 
                  For now detailed view is complex, leaving placeholder.
                */}
            <div className="p-4 bg-slate-50 border rounded">
              <p>Total Payout: <b>${selectedReport.totalPayout.toLocaleString()}</b></p>
              <p>Employees: <b>{selectedReport.totalEmployees}</b></p>
              <p>Status: <b>{selectedReport.status}</b></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayrollReportsPage;
