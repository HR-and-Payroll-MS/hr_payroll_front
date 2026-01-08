import React, { useEffect, useMemo, useState } from 'react';
import { Generatepayroll } from '../../../Components/Level2Hearder';
import Header from '../../../Components/Header';
import Table from '../../../Components/Table';
import ExportTable from '../../../Components/ExportTable';
import { RefreshCw, Lock, CheckCircle, DollarSign, Users, Settings, AlertCircle, ChevronDown, ArrowLeft, Send, RotateCcw } from 'lucide-react';
import Dropdown from '../../../Components/Dropdown';
import dayjs from 'dayjs';
import Icon from '../../../Components/Icon';
import ViewerLoader from './ViewerLoader';
import PayslipTemplate2 from '../../../Components/PayslipTemplate2';
import ClockoutModal from '../../../Components/Modals/ClockoutModal';
import useAuth from '../../../Context/AuthContext';
import { useSocketEvent } from '../../../Context/SocketProvider';
import { EVENT_PAYROLL_PROGRESS } from '../../../api/socketEvents';

function GeneratePayroll() {
  const { axiosPrivate } = useAuth();
  const [userRole] = useState('payroll_officer'); // TODO: Get from Auth Context

  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMetricsExpanded, setIsMetricsExpanded] = useState(false);

  const [cycles, setCycles] = useState([]);
  const [activeCycle, setActiveCycle] = useState(null);
  const [slips, setSlips] = useState([]);

  const [syncing, setSyncing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initial Fetch: Get Pay Cycles
  useEffect(() => {
    let isMounted = true;
    const fetchCycles = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get('/payroll/cycles/');
        if (isMounted) {
          const fetchedCycles = res.data.results || res.data;
          setCycles(fetchedCycles);
          // Default to most recent or first
          if (fetchedCycles.length > 0) setActiveCycle(fetchedCycles[0]);
        }
      } catch (err) {
        console.error("Failed to fetch cycles", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCycles();
    return () => { isMounted = false; };
  }, [axiosPrivate]);

  // Fetch Slips when Active Cycle changes
  useEffect(() => {
    if (!activeCycle) return;

    let isMounted = true;
    const fetchSlips = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get(`/payroll/slips/?cycle=${activeCycle.id}`);
        if (isMounted) {
          const fetchedSlips = res.data.results || res.data;
          // Map backend slip to frontend table format
          const mapped = fetchedSlips.map(slip => ({
            id: slip.id,
            employee_id: slip.employee, // ID
            name: slip.employee_name || "Unknown",
            role: slip.job_title || "Employee",
            department: slip.department || "--",
            baseSalary: parseFloat(slip.base_salary),
            bonus: 0, // TODO: Extract from line items if needed
            bankAccount: slip.bank_account || "N/A",
            attendedDays: 22, // Placeholder or fetch attendance
            lopDays: 0,
            taxDisplay: "Standard",
            taxAmount: parseFloat(slip.total_deductions || 0), // Simplified
            netPay: parseFloat(slip.net_pay),
            status: slip.status,
            details: slip // Pass full object for viewer
          }));
          setSlips(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch slips", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchSlips();
    return () => { isMounted = false; };
  }, [activeCycle, axiosPrivate]);

  // Actions
  const handleGenerate = async () => {
    if (!activeCycle) return;
    setSyncing(true);
    try {
      await axiosPrivate.post(`/payroll/cycles/${activeCycle.id}/generate/`);
      // Refresh slips
      const res = await axiosPrivate.get(`/payroll/slips/?cycle=${activeCycle.id}`);
      window.location.reload(); // Quick refresh or re-fetch logic
    } catch (err) {
      console.error("Generation failed", err);
    } finally {
      setSyncing(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!activeCycle) return;
    setSyncing(true);
    try {
      // Assuming PATCH to cycle updates status
      // Note: Backend might need specific endpoints for transitions if simple PATCH isn't allowed
      // For now using PATCH as per standard DRF
      await axiosPrivate.patch(`/payroll/cycles/${activeCycle.id}/`, { status: newStatus.toUpperCase() });
      setActiveCycle(prev => ({ ...prev, status: newStatus.toUpperCase() }));
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setSyncing(false);
    }
  };

  // Metrics
  const totals = useMemo(() => {
    return slips.reduce((acc, curr) => ({
      gross: acc.gross + (curr.baseSalary || 0),
      tax: acc.tax + (curr.taxAmount || 0), // This is total deductions currently
      net: acc.net + (curr.netPay || 0)
    }), { gross: 0, tax: 0, net: 0 });
  }, [slips]);

  const key1 = [["name", "role"], ['baseSalary'], ['bankAccount'], ['attendedDays'], ['lopDays'], ['bonus'], ['taxDisplay'], ['taxAmount'], ['netPay']];
  const structure = [71, 72, 1, 73, 74, 75, 1, 77, 77, 78];
  const titleStructure = [771, 772, 772, 772, 773, 774, 775, 776, 777, 11];
  const title = ['EMPLOYEE', 'BASE SALARY', 'BANK ACCOUNT', 'ATTENDANCE', 'DEDUCTIONS', 'ADJ', 'TAX CODE', 'TAX AMT', 'NETPAY', 'ACTION'];

  if (loading && !activeCycle) return <ViewerLoader />;

  const currentStatus = activeCycle?.status?.toLowerCase() || 'draft';

  // Real-time Progress Listener
  const [progressMsg, setProgressMsg] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  useSocketEvent(EVENT_PAYROLL_PROGRESS, (payload) => {
    // payload: { cycle_id, status, total, processed, percentage }
    if (activeCycle && payload.cycle_id == activeCycle.id) {
      setSyncing(true); // Ensure loading state is on
      setProgressMsg(`Processing ${payload.processed} / ${payload.total}`);
      setProgressPercent(payload.percentage);

      if (payload.percentage >= 100) {
        setTimeout(() => {
          setSyncing(false);
          setProgressMsg("");
          setProgressPercent(0);
          window.location.reload(); // Or re-fetch slips
        }, 1000);
      }
    }
  });

  return (
    <div className="h-full dark:bg-slate-900 flex flex-col w-full text-slate-900 font-sans relative">
      {/* Global Progress Overlay */}
      {syncing && (
        <div className="absolute inset-x-0 top-0 h-1 bg-blue-100 z-50">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      <Header className={"bg-white dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 px-6"} Title={"Payroll Processor"}
        subTitle={
          <div className="flex items-center text-sm text-slate-500">
            {/* Cycle Selector */}
            {cycles.length > 0 ? (
              <Dropdown
                padding='py-1'
                border=''
                onChange={(name) => {
                  const c = cycles.find(cy => cy.name === name);
                  if (c) setActiveCycle(c);
                }}
                placeholder={activeCycle?.name || "Select Cycle"}
                options={cycles.map(c => c.name)}
              />
            ) : (
              <span>No Pay Cycles Found</span>
            )}

            <span className={`ml-2 px-2 py-0.5 rounded uppercase text-[10px] font-bold ${currentStatus === 'closed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {currentStatus}
            </span>
          </div>
        }>
        <div className="flex gap-3">
          {userRole === 'payroll_officer' && (
            <>
              {(currentStatus === 'draft' || currentStatus === 'running') && (
                <button onClick={handleGenerate} disabled={syncing} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 shadow text-xs active:scale-95 transition-all">
                  <CheckCircle size={14} /> {syncing ? "Processing..." : "Generate / Refresh"}
                </button>
              )}
              {/* Add submit logic etc if needed */}
              {currentStatus === 'draft' && slips.length > 0 && (
                <button onClick={() => updateStatus('generated')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow text-xs active:scale-95 transition-all">
                  <Send size={14} /> Mark Generated
                </button>
              )}
            </>
          )}

          {/* Export */}
          {currentStatus === 'closed' && (
            <ExportTable fileName={`Payroll_${activeCycle?.name}`} keys={key1} bodyStructure={structure} title={title} data={slips} />
          )}
        </div>
      </Header>

      <main className="h-screen relative overflow-y-scroll hover-bar dark:bg-slate-950 bg-slate-100 flex flex-col p-2 gap-2">
        {/* COLLAPSIBLE METRICS */}
        <div className="flex flex-col shrink-0">
          {!isMetricsExpanded && (
            <div
              onClick={() => setIsMetricsExpanded(true)}
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all mb-1"
            >
              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-2"><Users size={14} className="text-blue-600" /><span className="text-[10px] font-bold text-slate-400 uppercase">Gross:</span><span className="text-xs font-black dark:text-slate-200">{formatMoney(totals.gross)}</span></div>
                <div className="flex items-center gap-2"><DollarSign size={14} className="text-amber-600" /><span className="text-[10px] font-bold text-slate-400 uppercase">Tax:</span><span className="text-xs font-black dark:text-slate-200">{formatMoney(totals.tax)}</span></div>
                <div className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-600" /><span className="text-[10px] font-bold text-slate-400 uppercase">Net:</span><span className="text-xs font-black dark:text-slate-200">{formatMoney(totals.net)}</span></div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase">Analysis <ChevronDown size={12} /></div>
            </div>
          )}
          <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isMetricsExpanded ? "grid-rows-[1fr] opacity-100 mb-2" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="min-h-0 relative">
              <button onClick={() => setIsMetricsExpanded(false)} className="absolute top-2 right-2 z-10 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400"><ChevronDown size={16} className="rotate-180" /></button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard title="Total Gross Payout" amount={totals.gross} icon={Users} colorClass="bg-blue-50 text-blue-600" />
                <MetricCard title="Total Taxes (Statutory)" amount={totals.tax} icon={DollarSign} colorClass="bg-amber-50 text-amber-600" />
                <MetricCard title="Total Net Payout" amount={totals.net} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white dark:border-slate-700 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 rounded shadow border flex-1 flex flex-col border-slate-200 min-h-0">
          <Generatepayroll employees={slips.length} />
          <div className="flex-1 overflow-y-auto">
            {slips.length > 0 ? (
              <Table components={PayslipTemplate2} D2={activeCycle?.name} pages={9} D1={currentStatus} ke={key1} Data={slips} titleStructure={titleStructure} Structure={structure} title={title} />
            ) : (
              <div className="p-10 text-center text-slate-500">No payslips generated for this cycle. Click "Generate" to start.</div>
            )}

          </div>
          <ClockoutModal isOpen={isOpen} close={() => setIsOpen(false)} />
          <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900 px-6 py-4 shadow border-t dark:border-slate-800 border-slate-200 flex justify-end gap-8 text-xs">
            <div className='flex-1'>
              <span className="text-slate-400 italic">
                Cycle: {activeCycle?.name} | Status: {currentStatus}
              </span>
            </div>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer hover:underline text-indigo-500">View Logs</div>
            <div>Gross: <span className="font-semibold">{formatMoney(totals.gross)}</span></div>
            <div>Deductions: <span className="font-semibold">{formatMoney(totals.tax)}</span></div>
            <div className="text-indigo-600 dark:text-indigo-300 font-bold">Net Pay: {formatMoney(totals.net)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GeneratePayroll;

const formatMoney = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const MetricCard = ({ title, amount, icon: Icon, colorClass, warning }) => (
  <div className={`bg-white dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 p-6 rounded shadow flex items-start justify-between relative overflow-hidden ${warning ? 'ring-2 ring-red-500' : ''}`}>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl dark:text-slate-100 font-bold text-slate-800">{formatMoney(amount)}</h3>
      {warning && <p className="text-[10px] text-red-500 font-bold mt-1 animate-pulse">⚠ CONFIG MISSING</p>}
    </div>
    <div className={`p-3 rounded-lg ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);