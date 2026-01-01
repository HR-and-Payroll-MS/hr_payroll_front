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

const MOCK_BACKEND_PAYROLL = [
  { 
    id: 'EMP001', 
    department: 'Finance', 
    jobTitle: "Senior Accountant", 
    bankAccount: "GTB ****3248", 
    name: "Sarah Jenkins", 
    baseSalary: 6000, 
    bonus: 500,
    attendedDays: 22, 
    lopDays: 0,
    taxCode: 'Standard', 
    taxVersion: '2025 v1.0',
    taxAmount: 1200, 
    netPay: 5300,
    taxDisplay: "Standard (2025 v1.0)",
    details: {
      company: { 
        name: "TechCorp Solutions Ltd", 
        address: "123 Business Avenue, Lagos, Nigeria", 
        phone: "+234 812 345 6789", 
        email: "payroll@techcorp.com", 
        logoUrl: "https://via.placeholder.com/64" 
      },
      month: "December 2025",
      paymentDate: "2025-12-30",
      paymentMethod: "Bank Transfer",
      earnings: [
        { label: "Basic Salary", amount: 6000 },
        { label: "Performance Bonus", amount: 500 },
        { label: "Housing Allowance", amount: 1000 }
      ],
      deductions: [
        { label: "Income Tax (PAYE)", amount: 1200 },
        { label: "Pension Contribution", amount: 500 },
        { label: "Health Insurance", amount: 200 },
        { label: "Lateness Deduction", amount: 0 }
      ],
      gross: 7500,
      totalDeductions: 1900,
      net: 5600
    }
  },
  { 
    id: 'EMP003', 
    department: 'HR', 
    jobTitle: "Human Resources Manager", 
    bankAccount: "UBA ****9988", 
    name: "Amara Osei", 
    baseSalary: 7000, 
    bonus: 500,
    attendedDays: 22, 
    lopDays: 0,
    taxCode: 'Exempt', 
    taxVersion: 'Medical v2',
    taxAmount: 75, 
    netPay: 7425,
    taxDisplay: "Exempt (Medical v2)",
    details: {
      company: { 
        name: "TechCorp Solutions Ltd", 
        address: "123 Business Avenue, Lagos, Nigeria", 
        phone: "+234 812 345 6789", 
        email: "payroll@techcorp.com"
      },
      month: "December 2025",
      paymentDate: "2025-12-30",
      paymentMethod: "Bank Transfer",
      earnings: [
        { label: "Basic Salary", amount: 7000 },
        { label: "Bonus", amount: 500 }
      ],
      deductions: [
        { label: "Medical Admin Fee (1%)", amount: 75 }
      ],
      gross: 7500,
      totalDeductions: 75,
      net: 7425
    }
  },
  { 
    id: 'EMP004', 
    department: 'IT', 
    jobTitle: "External Consultant", 
    bankAccount: "ZEN ****7744", 
    name: "David Kim", 
    baseSalary: 3000, 
    bonus: 0,
    attendedDays: 20, 
    lopDays: 2,
    taxCode: 'Contractor', 
    taxVersion: 'Flat Rate A',
    taxAmount: 450, 
    netPay: 2550,
    taxDisplay: "Contractor (Flat Rate A)",
    details: {
      company: { name: "TechCorp Solutions Ltd", address: "123 Business Avenue, Lagos", phone: "+234 812 345 6789", email: "payroll@techcorp.com" },
      month: "December 2025",
      paymentDate: "2025-12-30",
      paymentMethod: "Wire Transfer",
      earnings: [
        { label: "Consultancy Fees", amount: 3000 }
      ],
      deductions: [
        { label: "Withholding Tax (15%)", amount: 450 }
      ],
      gross: 3000,
      totalDeductions: 450,
      net: 2550
    }
  }
];

const allMonths = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());

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

const TaxCoverageSummary = ({ employees, isExpanded, onToggle }) => {
  const total = employees.length;
  const withTax = employees.filter(e => e.taxCode).length;
  const missing = total - withTax;

  const distribution = employees.reduce((acc, curr) => {
    if (curr.taxCode) acc[curr.taxCode] = (acc[curr.taxCode] || 0) + 1;
    return acc;
  }, {});

  const missingDepts = [...new Set(employees.filter(e => !e.taxCode).map(e => e.department))];

  return (
    <div 
      onClick={onToggle}
      className={`bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 dark:shadow-slate-900 dark:shadow-md border-slate-200 p-3 shadow-sm flex items-center justify-between cursor-pointer transition-all duration-300 ${isExpanded ? 'rounded-b-lg border-t-0' : 'rounded-lg mb-2'}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 pr-2 border-r border-slate-200 dark:border-slate-700">
           <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
           <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Active Regimes:</span>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          {Object.entries(distribution).length > 0 ? (
            Object.entries(distribution).map(([code, count]) => (
              <span key={code} className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                {code}: <span className="text-indigo-600 dark:text-indigo-400">{count}</span>
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">No regimes applied yet</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {missing > 0 && (
          <div className="flex gap-2 items-center text-[10px] text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/30">
            <AlertCircle size={12} />
            <span className="font-bold uppercase italic">Missing: {missingDepts.join(", ")}</span>
          </div>
        )}
        <div className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
          {withTax}/{total} READY
        </div>
      </div>
    </div>
  );
};

function GeneratePayroll() {
  // ROLE & WORKFLOW LOGIC (Manually change userRole to test)
  const [userRole] = useState('payroll_officer'); // Options: 'payroll_officer' or 'hr_manager'
  const [status, setStatus] = useState('draft'); // draft, generated, submitted, finalized

  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [isMetricsExpanded, setIsMetricsExpanded] = useState(false); 
  const [employees, setEmployees] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [month, setMonth] = useState(dayjs().format('MMMM'));
  const [year, setYear] = useState(currentYear.toString());
  const [isOpen, setIsOpen] = useState(false);
  const [taxConfig, setTaxConfig] = useState({ scope: 'All Employees', regime: '', version: '' });

  const TAX_REGIMES = { 'Standard': { versions: ['2025 v1.0'] }, 'Exempt': { versions: ['Statutory v1'] }, 'Contractor': { versions: ['Flat Rate A'] } };
  const departments = useMemo(() => ['All Employees', 'Finance', 'IT', 'HR', 'Operations'], []);

  // API FETCH PLACEHOLDER
  useEffect(() => {
    setLoading(true);
    /* API CALL HERE: axios.get(`/api/payroll?month=${month}&year=${year}`) 
       Backend should return the current status of that specific month's payroll.
    */
    setTimeout(() => {
      setEmployees(MOCK_BACKEND_PAYROLL);
      setLoading(false);
    }, 1200);
  }, [month, year]);

  // API STATUS UPDATE PLACEHOLDER
  const updateStatus = (newStatus) => {
    setSyncing(true);
    /* API CALL HERE: axios.post(`/api/payroll/status`, { month, year, status: newStatus }) */
    setTimeout(() => {
        setStatus(newStatus);
        setSyncing(false);
    }, 800);
  }

  const applyTaxConfiguration = () => {
    if (!taxConfig.regime || !taxConfig.version) return;
    setSyncing(true);
    /* API CALL HERE: axios.post(`/api/payroll/config`, { ...taxConfig, month, year }) */
    setTimeout(() => {
      const recalculated = employees.map(emp => {
        const isTarget = taxConfig.scope === 'All Employees' || emp.department === taxConfig.scope;
        if (isTarget) {
          return {
            ...emp,
            taxCode: taxConfig.regime,
            taxVersion: taxConfig.version,
            taxDisplay: `${taxConfig.regime} (${taxConfig.version})`,
            taxAmount: emp.baseSalary * 0.2, 
            netPay: (emp.baseSalary + emp.bonus) - (emp.baseSalary * 0.2),
          };
        }
        return emp;
      });
      setEmployees(recalculated);
      setSyncing(false);
    }, 800);
  };

  const totals = useMemo(() => {
    return employees.reduce((acc, curr) => ({
      gross: acc.gross + (curr.baseSalary || 0) + (curr.bonus || 0),
      tax: acc.tax + (curr.taxAmount || 0),
      net: acc.net + (curr.netPay || 0)
    }), { gross: 0, tax: 0, net: 0 });
  }, [employees]);

  const key1 = [["name", "role"],['baseSalary'],['bankAccount'],['attendedDays'],['lopDays'],['bonus'],['taxDisplay'],['taxAmount'],['netPay']];
  const structure = [71, 72, 1, 73, 74, 75, 1, 77, 77, 78]; 
  const titleStructure = [771, 772, 772, 772, 773, 774, 775, 776, 777, 11];
  const title = ['EMPLOYEE', 'BASE SALARY', 'BANK ACCOUNT', 'ATTENDANCE', 'DEDUCTIONS', 'ADJ', 'TAX CODE', 'TAX AMT', 'NETPAY', 'ACTION'];

  if (loading) return <ViewerLoader />;

  return (
    <div className="h-full dark:bg-slate-900 flex flex-col w-full text-slate-900 font-sans">
      <Header className={"bg-white dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 px-6"} Title={"Payroll Processor"}
        subTitle={
          <div className="flex items-center text-sm text-slate-500">
            <Dropdown padding='py-1' border='' onChange={setMonth} placeholder={month} options={allMonths} /> <span>/</span>
            <Dropdown padding='py-1' onChange={setYear} placeholder={year} border='' options={yearOptions} />
            <span className={`ml-2 px-2 py-0.5 rounded uppercase text-[10px] font-bold ${status === 'finalized' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
               {status}
            </span>
          </div>
        }>
        <div className="flex gap-3">
          {/* PAYROLL OFFICER BUTTONS */}
          {userRole === 'payroll_officer' && (
            <>
                {status === 'draft' && (
                  <button onClick={() => updateStatus('generated')} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 shadow text-xs active:scale-95 transition-all">
                    <CheckCircle size={14} /> Generate
                  </button>
                )}
                {status === 'generated' && (
                   <>
                    <button onClick={() => setStatus('draft')} className="flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-all">
                        <ArrowLeft size={14} /> Edit Draft
                    </button>
                    <button onClick={() => updateStatus('submitted')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow text-xs active:scale-95 transition-all">
                        <Send size={14} /> Submit to HR
                    </button>
                   </>
                )}
            </>
          )}

          {/* HR MANAGER BUTTONS */}
          {userRole === 'hr_manager' && status === 'submitted' && (
             <>
                <button onClick={() => updateStatus('draft')} className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50">
                    <RotateCcw size={14} /> Revert to Draft
                </button>
                <button onClick={() => updateStatus('finalized')} className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 shadow text-xs active:scale-95 transition-all">
                    <Lock size={14} /> Finalize Payroll
                </button>
             </>
          )}

          {status === 'finalized' && (
            <ExportTable fileName={`Payroll_${month}_${year}`} keys={key1} bodyStructure={structure} title={title} data={employees} />
          )}
        </div>
      </Header>

      <main className="h-screen relative overflow-y-scroll dark:bg-slate-950 bg-slate-100 flex flex-col p-2 gap-2">
        
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
                <MetricCard title="Total Taxes (Statutory)" amount={totals.tax} icon={DollarSign} colorClass="bg-amber-50 text-amber-600" warning={totals.tax === 0 && totals.gross > 0} />
                <MetricCard title="Total Net Payout" amount={totals.net} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* TAX CONFIG - Only available to Payroll Officer in Draft/Generated */}
        {userRole === 'payroll_officer' && (status === 'draft' || status === 'generated') && (
            <div className="flex flex-col">
              <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="min-h-0">
                  <div className="bg-white dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 border dark:border-slate-700 border-slate-200 p-3 rounded-t-lg shadow-sm flex flex-wrap items-center gap-4 relative ">
                      <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold tracking-wider"><Settings size={14} /> Tax Configuration</div>
                      <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Apply to:</span><div className="w-40"><Dropdown options={departments} placeholder={taxConfig.scope} onChange={(val) => setTaxConfig(prev => ({ ...prev, scope: val }))} padding="py-1" /></div></div>
                      <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Code:</span><div className="w-40"><Dropdown options={Object.keys(TAX_REGIMES)} placeholder={taxConfig.regime || "Select Code"} onChange={(val) => setTaxConfig(prev => ({ ...prev, regime: val, version: '' }))} padding="py-1" /></div></div>
                      <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Version:</span><div className="w-40"><Dropdown options={taxConfig.regime ? TAX_REGIMES[taxConfig.regime].versions : []} placeholder={taxConfig.version || "Select Ver"} onChange={(val) => setTaxConfig(prev => ({ ...prev, version: val }))} padding="py-1" /></div></div>
                      <button onClick={applyTaxConfiguration} disabled={syncing} className="ml-auto flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-1.5 rounded text-xs font-semibold">{syncing ? "Applying..." : "Apply Rules"}</button>
                  </div>
                </div>
              </div>
              <TaxCoverageSummary employees={employees} isExpanded={isExpanded} onToggle={() => setIsExpanded(!isExpanded)} />
            </div>
        )}

        {/* TABLE SECTION */}
        <div className="bg-white dark:border-slate-700 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 rounded shadow border flex-1 flex flex-col border-slate-200 min-h-0">
          <Generatepayroll employees={employees.length} />
          <div className="flex-1 overflow-y-auto">
            <Table components={PayslipTemplate2} D2={currentYear + "/" + yearOptions} pages={9} D1={status} ke={key1} Data={employees} titleStructure={titleStructure} Structure={structure} title={title} />
          </div>
          <ClockoutModal isOpen={isOpen} close={() => setIsOpen(false)}/>  
          <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900 px-6 py-4 shadow border-t dark:border-slate-800 border-slate-200 flex justify-end gap-8 text-xs">
            <div className='flex-1'>
               <span className="text-slate-400 italic">
                  {status === 'submitted' ? "Pending Approval (Read-Only)" : status === 'finalized' ? "Payroll Completed" : "Drafting..."}
               </span>
            </div>
            <div onClick={()=>setIsOpen(true)} className="cursor-pointer hover:underline text-indigo-500">View Logs</div>
            <div>Gross: <span className="font-semibold">{formatMoney(totals.gross)}</span></div>
            <div>Tax: <span className="font-semibold">{formatMoney(totals.tax)}</span></div>
            <div className="text-indigo-600 dark:text-indigo-300 font-bold">Net Pay: {formatMoney(totals.net)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GeneratePayroll;