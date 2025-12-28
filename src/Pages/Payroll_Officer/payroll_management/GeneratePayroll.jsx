import React, { useEffect, useMemo, useState } from 'react';
import { Generatepayroll } from '../../../Components/Level2Hearder';
import Header from '../../../Components/Header';
import Table from '../../../Components/Table';
import ExportTable from '../../../Components/ExportTable';
import { RefreshCw, Lock, CheckCircle, DollarSign, Users, Settings, AlertCircle } from 'lucide-react';
import Dropdown from '../../../Components/Dropdown';
import dayjs from 'dayjs';
import Icon from '../../../Components/Icon';
import ViewerLoader from './ViewerLoader';
import Modal from '../../../Components/Modal'; // Your new Modal component
import PayslipTemplate2 from '../../../Components/PayslipTemplate2'; // The view-only template
import EmployeePayslipTemplate from '../../../Components/EmployeePayslipTemplate';
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
    // FULL PAYLOAD FOR TEMPLATE
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

const TaxCoverageSummary = ({ employees }) => {
  const total = employees.length;
  const withTax = employees.filter(e => e.taxCode).length;
  const missing = total - withTax;
  const progress = total > 0 ? (withTax / total) * 100 : 0;

  const distribution = employees.reduce((acc, curr) => {
    if (curr.taxCode) acc[curr.taxCode] = (acc[curr.taxCode] || 0) + 1;
    return acc;
  }, {});

  const missingDepts = [...new Set(employees.filter(e => !e.taxCode).map(e => e.department))];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border-x border-b dark:border-slate-700 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 border-slate-200 p-3 rounded-b-lg mb-2 flex flex-col gap-3">
      <div className="flex items-center gap-3 w-full">
        <span className="text-xs font-semibold text-slate-500 w-24">Coverage:</span>
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-bold text-slate-600">{withTax}/{total} Ready</span>
      </div>
      <div className="flex justify-between items-start text-xs">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-slate-400">Active Regimes:</span>
          {Object.entries(distribution).map(([code, count]) => (
            <span key={code} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full border border-blue-200 font-medium">{code}: {count}</span>
          ))}
        </div>
        {missing > 0 && (
          <div className="flex gap-2 items-center dark:border-slate-700  text-red-600 bg-red-50 px-3 py-1 rounded border border-red-100">
            <AlertCircle size={12} />
            <span className="font-semibold">Missing in:</span>
            <span>{missingDepts.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

function GeneratePayroll() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('draft');
  const [employees, setEmployees] = useState([]);
  const [syncing, setSyncing] = useState(false);
  const [month, setMonth] = useState(dayjs().format('MMMM'));
  const [year, setYear] = useState(currentYear.toString());
  const [isOpen, setIsOpen] = useState(false)
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPayslipData, setSelectedPayslipData] = useState(null);

  const [taxConfig, setTaxConfig] = useState({ scope: 'All Employees', regime: '', version: '' });

  // Mock Tax Regimes (These would also come from backend ideally)
  const TAX_REGIMES = { 'Standard': { versions: ['2025 v1.0'] }, 'Exempt': { versions: ['Statutory v1'] }, 'Contractor': { versions: ['Flat Rate A'] } };

  const departments = useMemo(() => ['All Employees', 'Finance', 'IT', 'HR', 'Operations'], []);

  // INITIAL LOAD FROM BACKEND
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(MOCK_BACKEND_PAYROLL); // Simulate backend fetch
      setLoading(false);
    }, 1200);
  }, [month, year]);

  // SIMULATE BACKEND RECALCULATION
  const applyTaxConfiguration = () => {
    if (!taxConfig.regime || !taxConfig.version) return;
    setSyncing(true);
    
    // Simulate API request: POST /api/payroll/calculate { scope, regime, version }
    setTimeout(() => {
      const recalculatedFromBackend = employees.map(emp => {
        const isTarget = taxConfig.scope === 'All Employees' || emp.department === taxConfig.scope;
        if (isTarget) {
          // This whole object would be returned by the backend
          return {
            ...emp,
            taxCode: taxConfig.regime,
            taxVersion: taxConfig.version,
            taxDisplay: `${taxConfig.regime} (${taxConfig.version})`,
            taxAmount: emp.baseSalary * 0.2, // Backend did the math
            netPay: (emp.baseSalary + emp.bonus) - (emp.baseSalary * 0.2),
            details: { ...emp.details, net: (emp.baseSalary + emp.bonus) - (emp.baseSalary * 0.2) } 
          };
        }
        return emp;
      });
      setEmployees(recalculatedFromBackend);
      setSyncing(false);
    }, 800);
  };

  const handleSyncAttendance = () => {
    setSyncing(true);
    setTimeout(() => {
      // Simulate Backend Refreshing Attendance
      setSyncing(false);
    }, 1000);
  };

  const handleFinalize = () => {
    if (employees.some(e => !e.taxCode)) {
      alert("Cannot finalize: Some employees have no Tax Code assigned.");
      return;
    }
    if (window.confirm("Are you sure? This will lock the payroll.")) setStatus('finalized');
  };

  const totals = useMemo(() => {
    return employees.reduce((acc, curr) => ({
      gross: acc.gross + (curr.baseSalary || 0) + (curr.bonus || 0) - (curr.lopDeduction || 0),
      tax: acc.tax + (curr.taxAmount || 0),
      net: acc.net + (curr.netPay || 0)
    }), { gross: 0, tax: 0, net: 0 });
  }, [employees]);

  // Action for Table Row click (Assuming your Table component supports a callback)
  const viewPayslip = (emp) => {
    setSelectedPayslipData({
      ...emp.details,
      employee: { name: emp.name, id: emp.id, department: emp.department, jobTitle: emp.jobTitle, bankAccount: emp.bankAccount }
    });
    setIsViewModalOpen(true);
  };

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
            {status === 'finalized' && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><Lock size={10} /> LOCKED</span>}
          </div>
        }>
        <div className="flex gap-3">
          {status === 'draft' ? (
            <>
              <button onClick={handleSyncAttendance} disabled={syncing} className="flex items-center gap-2 px-4 py-2 dark:border-slate-700  border border-slate-300 text-slate-700 text-xs rounded-lg hover:bg-slate-50 dark:bg-slate-900 disabled:opacity-50">
                <RefreshCw size={14} className={syncing ? "animate-spin" : ""} /> Sync Attendance
              </button>
              <button onClick={() => setStatus('generate')} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 shadow text-xs active:scale-95">
                <CheckCircle size={14} /> Generate
              </button>
            </>
          ) : (status === 'generate' ? (
            <>
              <button onClick={() => setStatus('draft')} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 text-slate-700 text-xs rounded-lg">
                <Icon name={"ArrowLeft"} className="w-4 h-4" /> Re-Generate
              </button>
              <button onClick={handleFinalize} className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 shadow text-xs active:scale-95">
                <CheckCircle size={14} /> Finalize & Lock
              </button>
            </>
          ) : (
            <ExportTable fileName={`Payslips_${month}_${year}`} keys={key1} bodyStructure={structure} title={title} data={employees} />
          ))}
        </div>
      </Header>

      <main className="h-screen relative overflow-y-scroll dark:bg-slate-950 bg-slate-100 flex flex-col p-2 gap-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
          <MetricCard title="Total Gross Payout" amount={totals.gross} icon={Users} colorClass="bg-blue-50 text-blue-600" />
          <MetricCard title="Total Taxes (Statutory)" amount={totals.tax} icon={DollarSign} colorClass="bg-amber-50 text-amber-600" warning={totals.tax === 0 && totals.gross > 0} />
          <MetricCard title="Total Net Payout" amount={totals.net} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
        </div>

        {(status === 'draft' || status === 'generate') && (
            <>
            <div className="bg-white dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 border dark:border-slate-700 border-slate-200 p-3 rounded-t-lg shadow-sm flex flex-wrap items-center gap-4 relative ">
                <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold tracking-wider">
                  <Settings size={14} /> Tax Configuration
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Apply to:</span>
                  <div className="w-40"><Dropdown options={departments} placeholder={taxConfig.scope} onChange={(val) => setTaxConfig(prev => ({ ...prev, scope: val }))} padding="py-1" /></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Code:</span>
                  <div className="w-40"><Dropdown options={Object.keys(TAX_REGIMES)} placeholder={taxConfig.regime || "Select Code"} onChange={(val) => setTaxConfig(prev => ({ ...prev, regime: val, version: '' }))} padding="py-1" /></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Version:</span>
                  <div className="w-40"><Dropdown options={taxConfig.regime ? TAX_REGIMES[taxConfig.regime].versions : []} placeholder={taxConfig.version || "Select Ver"} onChange={(val) => setTaxConfig(prev => ({ ...prev, version: val }))} padding="py-1" /></div>
                </div>
                <button onClick={applyTaxConfiguration} disabled={syncing} className="ml-auto flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-1.5 rounded text-xs font-semibold">
                  {syncing ? "Applying..." : "Apply Rules"}
                </button>
            </div>
            <TaxCoverageSummary employees={employees} />
            </>
        )}

        <div className="bg-white dark:border-slate-700 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 dark:bg-slate-800 rounded shadow border flex-1 flex flex-col border-slate-200 min-h-0">
          <Generatepayroll employees={employees.length} />
          <div className="flex-1 overflow-y-auto">
            {/* Pass the viewPayslip function to the table to handle row clicks */}
            <Table 
              // components={EmployeePayslipTemplate} 
              components={PayslipTemplate2} 
              D2={currentYear + "/" + yearOptions} 
              pages={9} D1={status} ke={key1} 
              Data={employees} 
              titleStructure={titleStructure} 
              Structure={structure} 
              title={title}
              // onRowClick={viewPayslip} 
            />
          </div>
          <ClockoutModal isOpen={isOpen} close={() => setIsOpen(false)}/>  
          <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900 px-6 py-4 shadow border-t dark:border-slate-800 border-slate-200 dark:shadow-slate-900 dark:shadow-md dark:inset-shadow-xs dark:inset-shadow-slate-600 flex justify-end gap-8 text-xs">
            <div className='flex-1'>
               <span className="text-slate-400">
                  {employees.filter(e => !e.taxCode).length > 0 ? `⚠️ ${employees.filter(e => !e.taxCode).length} missing tax codes` : "All tax codes assigned"}
               </span>
            </div>
            <div onClick={()=>setIsOpen(true)}>modal?</div>
            <div>Gross: <span className="font-semibold">{formatMoney(totals.gross)}</span></div>
            <div>Tax: <span className="font-semibold">{formatMoney(totals.tax)}</span></div>
            <div className="text-indigo-600 dark:text-indigo-300 font-bold">Net Pay: {formatMoney(totals.net)}</div>
          </div>
        </div>
      </main>

      {/* PAYSLIP VIEW MODAL */}
      
    </div>
  );
}


export default GeneratePayroll;





































// import React, { useEffect, useMemo, useState } from 'react';
// import { Generatepayroll } from '../../../Components/Level2Hearder';
// import Header from '../../../Components/Header';
// import Table from '../../../Components/Table';
// import ExportTable from '../../../Components/ExportTable';
// import { RefreshCw, Lock, CheckCircle, DollarSign, Users, X, AlertTriangle, Settings, Filter, PieChart, AlertCircle } from 'lucide-react';
// import Dropdown from '../../../Components/Dropdown';
// import dayjs from 'dayjs';
// import Icon from '../../../Components/Icon';
// import ViewerLoader from './ViewerLoader';

// // ... (Keep TAX_REGIMES and INITIAL_EMPLOYEES the same as before) ...
// // // --- CONSTANTS & MOCK DATA ---
// const allMonths = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
// const currentYear = new Date().getFullYear();
// const yearOptions = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());

// const MetricCard = ({ title, amount, icon: Icon, colorClass, warning }) => (
//   <div className={`bg-white p-6 rounded shadow flex items-start justify-between relative overflow-hidden ${warning ? 'ring-2 ring-red-500' : ''}`}>
//     <div>
//       <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
//       <h3 className="text-2xl font-bold text-slate-800">{formatMoney(amount)}</h3>
//       {warning && <p className="text-[10px] text-red-500 font-bold mt-1 animate-pulse">⚠ CONFIG MISSING</p>}
//     </div>
//     <div className={`p-3 rounded-lg ${colorClass}`}>
//       <Icon size={24} />
//     </div>
//   </div>
// );
// const TAX_REGIMES = {
//     'Standard': {
//       versions: ['2025 v1.0', '2024 v2.1'],
//       rules: {
//         '2025 v1.0': (salary) => (salary > 5000 ? salary * 0.20 : salary * 0.10),
//         '2024 v2.1': (salary) => (salary > 4500 ? salary * 0.18 : salary * 0.10),
//       }
//     },
//     'Exempt': {
//       versions: ['Statutory v1', 'Medical v2'],
//       rules: {
//         'Statutory v1': () => 0, // No tax
//         'Medical v2': (salary) => salary * 0.01, // 1% admin fee only
//       }
//     },
//     'Contractor': {
//       versions: ['Flat Rate A', 'Flat Rate B'],
//       rules: {
//         'Flat Rate A': (salary) => salary * 0.15, // Flat 15%
//         'Flat Rate B': (salary) => salary * 0.12, // Flat 12%
//       }
//     }
//   };
  
//   const INITIAL_EMPLOYEES = [
//     { id: 'EMP001', department: 'Finance', jobTitle: "Accountant", bankAccount: "****3248", name: "Sarah Jenkins", role: "Senior Dev", baseSalary: 6000, attendedDays: 22, lopDays: 0, bonus: 0 },
//     { id: 'EMP002', department: 'IT', jobTitle: "Developer", bankAccount: "****1122", name: "Michael Chen", role: "UX Designer", baseSalary: 4500, attendedDays: 21, lopDays: 1, bonus: 0 },
//     { id: 'EMP003', department: 'HR', jobTitle: "Manager", bankAccount: "****9988", name: "Amara Osei", role: "Product Manager", baseSalary: 7000, attendedDays: 22, lopDays: 0, bonus: 500 },
//     { id: 'EMP004', department: 'IT', jobTitle: "Junior Dev", bankAccount: "****7744", name: "David Kim", role: "Junior Dev", baseSalary: 3000, attendedDays: 20, lopDays: 2, bonus: 0 },
//     { id: 'EMP005', department: 'Finance', jobTitle: "Analyst", bankAccount: "****5566", name: "Elena Rodriguez", role: "QA Engineer", baseSalary: 4000, attendedDays: 22, lopDays: 0, bonus: 200 },
//   ];
// const formatMoney = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

// // --- NEW COMPONENT: TAX COVERAGE SUMMARY ---
// const TaxCoverageSummary = ({ employees }) => {
//   // Calculate Stats
//   const total = employees.length;
//   const withTax = employees.filter(e => e.taxCode).length;
//   const missing = total - withTax;
//   const progress = (withTax / total) * 100;

//   // Group by Tax Code to show distribution
//   const distribution = employees.reduce((acc, curr) => {
//     if (curr.taxCode) {
//       acc[curr.taxCode] = (acc[curr.taxCode] || 0) + 1;
//     }
//     return acc;
//   }, {});

//   // Find departments that have missing taxes
//   const missingDepts = [...new Set(employees.filter(e => !e.taxCode).map(e => e.department))];

//   return (
//     <div className="bg-slate-50 border-x border-b border-slate-200 p-3 rounded-b-lg mb-2 flex flex-col gap-3 animate-in fade-in slide-in-from-top-1">
      
//       {/* 1. Progress Bar */}
//       <div className="flex items-center gap-3 w-full">
//         <span className="text-xs font-semibold text-slate-500 w-24">Coverage:</span>
//         <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
//           <div 
//             className={`h-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//         <span className="text-xs font-bold text-slate-600">{withTax}/{total} Ready</span>
//       </div>

//       {/* 2. Breakdown Section */}
//       <div className="flex justify-between items-start text-xs">
        
//         {/* Active Codes Chips */}
//         <div className="flex gap-2 items-center flex-wrap">
//           <span className="text-slate-400">Active Regimes:</span>
//           {Object.entries(distribution).length === 0 && <span className="text-slate-400 italic">None applied</span>}
//           {Object.entries(distribution).map(([code, count]) => (
//             <span key={code} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full border border-blue-200 font-medium">
//               {code}: {count}
//             </span>
//           ))}
//         </div>

//         {/* Missing Departments Warning */}
//         {missing > 0 && (
//           <div className="flex gap-2 items-center text-red-600 bg-red-50 px-3 py-1 rounded border border-red-100">
//             <AlertCircle size={12} />
//             <span className="font-semibold">Missing in:</span>
//             <span>{missingDepts.join(", ")}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// function GeneratePayroll() {
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState('draft');
//   const [employees, setEmployees] = useState([]);
//   const [syncing, setSyncing] = useState(false);
//   const [month, setMonth] = useState(dayjs().format('MMMM'));
//   const [year, setYear] = useState(currentYear.toString());

//   const [taxConfig, setTaxConfig] = useState({
//     scope: 'All Employees',
//     regime: '',
//     version: ''
//   });

//   const departments = useMemo(() => {
//     const deps = new Set(INITIAL_EMPLOYEES.map(e => e.department));
//     return ['All Employees', ...Array.from(deps)];
//   }, []);

//   const calculatePayroll = (emp) => {
//     const dailyRate = emp.baseSalary / 30;
//     const lopDeduction = dailyRate * emp.lopDays;
//     const taxableIncome = emp.baseSalary + emp.bonus - lopDeduction;

//     let taxAmount = 0;
//     if (emp.taxCode && emp.taxVersion && TAX_REGIMES[emp.taxCode]) {
//       const formula = TAX_REGIMES[emp.taxCode].rules[emp.taxVersion];
//       if (formula) taxAmount = formula(taxableIncome);
//     }

//     const netPay = taxableIncome - taxAmount;

//     return {
//       ...emp,
//       lopDeduction,
//       taxAmount,
//       netPay,
//       taxDisplay: emp.taxCode ? `${emp.taxCode} (${emp.taxVersion})` : '⚠️ Select Code'
//     };
//   };

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       const processed = INITIAL_EMPLOYEES.map(emp => calculatePayroll({ ...emp, taxCode: null, taxVersion: null }));
//       setEmployees(processed);
//       setLoading(false);
//     }, 1200);
//   }, [month, year]);

//   const applyTaxConfiguration = () => {
//     if (!taxConfig.regime || !taxConfig.version) {
//       alert("Please select both a Tax Regime and a Version.");
//       return;
//     }
//     setSyncing(true);
//     setTimeout(() => {
//       const updatedEmployees = employees.map(emp => {
//         const isTarget = taxConfig.scope === 'All Employees' || emp.department === taxConfig.scope;
//         if (isTarget) {
//           return calculatePayroll({ ...emp, taxCode: taxConfig.regime, taxVersion: taxConfig.version });
//         }
//         return emp;
//       });
//       setEmployees(updatedEmployees);
//       setSyncing(false);
//     }, 600);
//   };

//   const handleSyncAttendance = () => {
//     setSyncing(true);
//     setTimeout(() => {
//       const updated = employees.map(emp => calculatePayroll({
//         ...emp,
//         attendedDays: 22,
//         lopDays: Math.floor(Math.random() * 2)
//       }));
//       setEmployees(updated);
//       setSyncing(false);
//     }, 1000);
//   };

//   const handleFinalize = () => {
//     const missingTaxes = employees.some(e => !e.taxCode);
//     if (missingTaxes) {
//       alert("Cannot finalize: Some employees have no Tax Code assigned.");
//       return;
//     }
//     if (window.confirm("Are you sure? This will lock the payroll.")) {
//       setStatus('finalized');
//     }
//   };

//   const totals = useMemo(() => {
//     return employees.reduce((acc, curr) => ({
//       gross: acc.gross + curr.baseSalary + curr.bonus - curr.lopDeduction,
//       tax: acc.tax + curr.taxAmount,
//       net: acc.net + curr.netPay
//     }), { gross: 0, tax: 0, net: 0 });
//   }, [employees]);

//   const key1 = [["name", "role"],['baseSalary'],['bankAccount'],['attendedDays'],['lopDays'],['bonus'],['taxDisplay'],['taxAmount'],['netPay']];
//   const structure = [71, 72, 1, 73, 74, 75, 1,77, 77, 78]; 
//   const titleStructure = [771, 772, 772, 772, 773, 774, 775, 776, 777,11];
//   const title = ['EMPLOYEE', 'BASE SALARY', 'BANK ACCOUNT', 'ATTENDANCE', 'DEDUCTIONS', 'ADJ', 'TAX CODE', 'TAX AMT', 'NETPAY', 'ACTION'];
//   const title2 = ['EMPLOYEE', 'BASE SALARY', 'BANK ACCOUNT', 'ATTENDANCE', 'DEDUCTIONS', 'ADJ', 'TAX CODE', 'TAX AMT', 'NETPAY'];

//   if (loading) return <ViewerLoader />;

//   return (
//     <div className="h-full bg-slate-50 flex flex-col w-full text-slate-900 font-sans">
//       <Header className={"bg-white px-6"} Title={"Payroll Processor"}
//         subTitle={
//           <div>
//             <div className="flex items-center text-sm text-slate-500">
//               <Dropdown padding='py-1' border='' onChange={setMonth} placeholder={month} options={allMonths} /> <span>/</span>
//               <Dropdown padding='py-1' onChange={setYear} placeholder={year} border='' options={yearOptions} />
//               {status === 'finalized' && <span className=" px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><Lock size={10} /> LOCKED</span>}
//             </div>
//           </div>}>
//         <div className="flex gap-3">
//           {status === 'draft' ? (
//             <>
//               <button onClick={handleSyncAttendance} disabled={syncing} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">
//                 <RefreshCw size={14} className={syncing ? "animate-spin" : ""} /> Sync Attendance
//               </button>
//               <button onClick={() => setStatus('generate')} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-normal rounded-lg hover:bg-slate-800 shadow transition-all text-xs active:scale-95">
//                 <CheckCircle size={14} /> Generate
//               </button>
//             </>
//           ) : (status === 'generate' ? (
//             <>
//               <button onClick={() => setStatus('draft')} disabled={syncing} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-300 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-100 transition-colors">
//                 <Icon name={"ArrowLeft"} className="w-4 h-4" /> Re-Generate
//               </button>
//               <button onClick={handleFinalize} className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-normal rounded-lg hover:bg-green-800 shadow transition-all text-xs active:scale-95">
//                 <CheckCircle size={14} /> Finalize & Lock
//               </button>
//             </>
//           ) : (
//             <ExportTable fileName={`Payslips_${month}_${year}`} keys={key1} bodyStructure={structure} title={title2} data={employees} />
//           ))}
//         </div>
//       </Header>

//       <main className="h-screen relative overflow-y-scroll bg-slate-100 flex flex-col p-2 gap-2">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
//           <MetricCard title="Total Gross Payout" amount={totals.gross} icon={Users} colorClass="bg-blue-50 text-blue-600" />
//           <MetricCard title="Total Taxes (Statutory)" amount={totals.tax} icon={DollarSign} colorClass="bg-amber-50 text-amber-600" warning={totals.tax === 0 && totals.gross > 0} />
//           <MetricCard title="Total Net Payout" amount={totals.net} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
//         </div>

//         {/* --- TAX CONFIGURATION TOOLBAR --- */}
//         {(status === 'draft' || status === 'generate') && (
//             <>
//             <div className="bg-white border border-slate-200 p-3 rounded-t-lg shadow-sm flex flex-wrap items-center gap-4 animate-in slide-in-from-top-2 relative z-10">
//                 <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold tracking-wider">
//                 <Settings size={14} /> Tax Configuration
//                 </div>
//                 <div className="flex items-center gap-2">
//                 <span className="text-xs text-slate-500">Apply to:</span>
//                 <div className="w-40">
//                     <Dropdown options={departments} placeholder={taxConfig.scope} onChange={(val) => setTaxConfig(prev => ({ ...prev, scope: val }))} padding="py-1" />
//                 </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                 <span className="text-xs text-slate-500">Code:</span>
//                 <div className="w-40">
//                     <Dropdown options={Object.keys(TAX_REGIMES)} placeholder={taxConfig.regime || "Select Code"} onChange={(val) => setTaxConfig(prev => ({ ...prev, regime: val, version: '' }))} padding="py-1" />
//                 </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                 <span className="text-xs text-slate-500">Version:</span>
//                 <div className="w-40">
//                     <Dropdown options={taxConfig.regime ? TAX_REGIMES[taxConfig.regime].versions : []} placeholder={taxConfig.version || "Select Ver"} onChange={(val) => setTaxConfig(prev => ({ ...prev, version: val }))} padding="py-1" />
//                 </div>
//                 </div>
//                 <button onClick={applyTaxConfiguration} disabled={syncing} className="ml-auto flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-1.5 rounded text-xs font-semibold transition-colors">
//                 {syncing ? "Applying..." : "Apply Rules"}
//                 </button>
//             </div>
            
//             {/* --- NEW: VISUAL BREAKDOWN BENEATH HEADER --- */}
//             <TaxCoverageSummary employees={employees} />
//             </>
//         )}

//         <div className="bg-white rounded shadow border flex-1 flex flex-col border-slate-200 min-h-0">
//           <Generatepayroll employees={employees.length} />
//           <div className="flex-1 overflow-y-auto">
//             <Table components={ViewerLoader} D2={currentYear + "/" + yearOptions} pages={9} D1={status} ke={key1} Data={employees} titleStructure={titleStructure} Structure={structure} title={title} />
//           </div>
//           <div className="sticky bottom-0 bg-slate-50 z-20 px-6 py-4 border-t border-slate-200 flex justify-end gap-8 text-xs">
//             <div className='flex-1'>
//                <span className="text-slate-400">
//                   {employees.filter(e => !e.taxCode).length > 0 ? `⚠️ ${employees.filter(e => !e.taxCode).length} employees missing tax codes` : "All tax codes assigned"}
//                </span>
//             </div>
//             <div className="text-slate-500">Gross: <span className="font-semibold text-slate-700">{formatMoney(totals.gross)}</span></div>
//             <div className="text-slate-500">Tax: <span className="font-semibold text-slate-700">{formatMoney(totals.tax)}</span></div>
//             <div className="text-indigo-600 font-bold text-xs">Net Pay: {formatMoney(totals.net)}</div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default GeneratePayroll;













// import React, { useEffect, useMemo, useState } from 'react';
// import { Generatepayroll } from '../../../Components/Level2Hearder';
// import Header from '../../../Components/Header';
// import Table from '../../../Components/Table';
// import ExportTable from '../../../Components/ExportTable';
// import { RefreshCw, Lock, CheckCircle, DollarSign, Users, X, AlertTriangle, Settings, Filter } from 'lucide-react';
// import Dropdown from '../../../Components/Dropdown';
// import dayjs from 'dayjs';
// import Icon from '../../../Components/Icon';
// import ViewerLoader from './ViewerLoader';

// // --- CONSTANTS & MOCK DATA ---
// const allMonths = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
// const currentYear = new Date().getFullYear();
// const yearOptions = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());

// // 1. ADVANCED TAX REGIMES DATABASE
// // This simulates your backend tax versions
// const TAX_REGIMES = {
//   'Standard': {
//     versions: ['2025 v1.0', '2024 v2.1'],
//     rules: {
//       '2025 v1.0': (salary) => (salary > 5000 ? salary * 0.20 : salary * 0.10),
//       '2024 v2.1': (salary) => (salary > 4500 ? salary * 0.18 : salary * 0.10),
//     }
//   },
//   'Exempt': {
//     versions: ['Statutory v1', 'Medical v2'],
//     rules: {
//       'Statutory v1': () => 0, // No tax
//       'Medical v2': (salary) => salary * 0.01, // 1% admin fee only
//     }
//   },
//   'Contractor': {
//     versions: ['Flat Rate A', 'Flat Rate B'],
//     rules: {
//       'Flat Rate A': (salary) => salary * 0.15, // Flat 15%
//       'Flat Rate B': (salary) => salary * 0.12, // Flat 12%
//     }
//   }
// };

// const INITIAL_EMPLOYEES = [
//   { id: 'EMP001', department: 'Finance', jobTitle: "Accountant", bankAccount: "****3248", name: "Sarah Jenkins", role: "Senior Dev", baseSalary: 6000, attendedDays: 22, lopDays: 0, bonus: 0 },
//   { id: 'EMP002', department: 'IT', jobTitle: "Developer", bankAccount: "****1122", name: "Michael Chen", role: "UX Designer", baseSalary: 4500, attendedDays: 21, lopDays: 1, bonus: 0 },
//   { id: 'EMP003', department: 'HR', jobTitle: "Manager", bankAccount: "****9988", name: "Amara Osei", role: "Product Manager", baseSalary: 7000, attendedDays: 22, lopDays: 0, bonus: 500 },
//   { id: 'EMP004', department: 'IT', jobTitle: "Junior Dev", bankAccount: "****7744", name: "David Kim", role: "Junior Dev", baseSalary: 3000, attendedDays: 20, lopDays: 2, bonus: 0 },
//   { id: 'EMP005', department: 'Finance', jobTitle: "Analyst", bankAccount: "****5566", name: "Elena Rodriguez", role: "QA Engineer", baseSalary: 4000, attendedDays: 22, lopDays: 0, bonus: 200 },
// ];

// const formatMoney = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

// // --- COMPONENTS ---

// const MetricCard = ({ title, amount, icon: Icon, colorClass, warning }) => (
//   <div className={`bg-white p-6 rounded shadow flex items-start justify-between relative overflow-hidden ${warning ? 'ring-2 ring-red-500' : ''}`}>
//     <div>
//       <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
//       <h3 className="text-2xl font-bold text-slate-800">{formatMoney(amount)}</h3>
//       {warning && <p className="text-[10px] text-red-500 font-bold mt-1 animate-pulse">⚠ CONFIG MISSING</p>}
//     </div>
//     <div className={`p-3 rounded-lg ${colorClass}`}>
//       <Icon size={24} />
//     </div>
//   </div>
// );

// // --- MAIN PAGE COMPONENT ---
// function GeneratePayroll() {
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState('draft');
//   const [employees, setEmployees] = useState([]);
//   const [syncing, setSyncing] = useState(false);
//   const [month, setMonth] = useState(dayjs().format('MMMM'));
//   const [year, setYear] = useState(currentYear.toString());

//   // --- NEW: Tax Configuration State ---
//   const [taxConfig, setTaxConfig] = useState({
//     scope: 'All Employees', // 'All Employees' | 'Finance' | 'IT' | ...
//     regime: '',
//     version: ''
//   });

//   // Unique Departments for Dropdown
//   const departments = useMemo(() => {
//     const deps = new Set(INITIAL_EMPLOYEES.map(e => e.department));
//     return ['All Employees', ...Array.from(deps)];
//   }, []);

//   // 2. PAYROLL ENGINE (Updated to use Dynamic Tax Codes)
//   const calculatePayroll = (emp) => {
//     const dailyRate = emp.baseSalary / 30;
//     const lopDeduction = dailyRate * emp.lopDays;
//     const taxableIncome = emp.baseSalary + emp.bonus - lopDeduction;

//     // --- LOOKUP TAX LOGIC ---
//     let taxAmount = 0;
    
//     if (emp.taxCode && emp.taxVersion && TAX_REGIMES[emp.taxCode]) {
//       // Find the specific formula for this version
//       const formula = TAX_REGIMES[emp.taxCode].rules[emp.taxVersion];
//       if (formula) {
//         taxAmount = formula(taxableIncome);
//       }
//     } else {
//       // Fallback or unassigned state
//       taxAmount = 0; 
//     }

//     const netPay = taxableIncome - taxAmount;

//     return {
//       ...emp,
//       lopDeduction,
//       taxAmount,
//       netPay,
//       // Create a display string for the table
//       taxDisplay: emp.taxCode ? `${emp.taxCode} (${emp.taxVersion})` : '⚠️ Select Code'
//     };
//   };

//   // Initial Load
//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       // Initialize with NO tax code assigned initially (or load from DB)
//       const processed = INITIAL_EMPLOYEES.map(emp => calculatePayroll({ ...emp, taxCode: null, taxVersion: null }));
//       setEmployees(processed);
//       setLoading(false);
//     }, 1200);
//   }, [month, year]);

//   // 3. APPLY TAX CONFIGURATION HANDLER
//   const applyTaxConfiguration = () => {
//     if (!taxConfig.regime || !taxConfig.version) {
//       alert("Please select both a Tax Regime and a Version.");
//       return;
//     }

//     setSyncing(true); // Show loading state briefly

//     setTimeout(() => {
//       const updatedEmployees = employees.map(emp => {
//         // Check Scope: Is this employee in the target group?
//         const isTarget = taxConfig.scope === 'All Employees' || emp.department === taxConfig.scope;
        
//         if (isTarget) {
//           return calculatePayroll({
//             ...emp,
//             taxCode: taxConfig.regime,
//             taxVersion: taxConfig.version
//           });
//         }
//         return emp;
//       });

//       setEmployees(updatedEmployees);
//       setSyncing(false);
//     }, 600);
//   };

//   const handleSyncAttendance = () => {
//     setSyncing(true);
//     setTimeout(() => {
//       const updated = employees.map(emp => calculatePayroll({
//         ...emp,
//         attendedDays: 22,
//         lopDays: Math.floor(Math.random() * 2)
//       }));
//       setEmployees(updated);
//       setSyncing(false);
//     }, 1000);
//   };

//   const handleFinalize = () => {
//     // Validation: Don't finalize if taxes are missing
//     const missingTaxes = employees.some(e => !e.taxCode);
//     if (missingTaxes) {
//       alert("Cannot finalize: Some employees have no Tax Code assigned.");
//       return;
//     }

//     if (window.confirm("Are you sure? This will lock the payroll.")) {
//       setStatus('finalized');
//     }
//   };

//   const totals = useMemo(() => {
//     return employees.reduce((acc, curr) => ({
//       gross: acc.gross + curr.baseSalary + curr.bonus - curr.lopDeduction,
//       tax: acc.tax + curr.taxAmount,
//       net: acc.net + curr.netPay
//     }), { gross: 0, tax: 0, net: 0 });
//   }, [employees]);

//   // --- TABLE CONFIGURATION ---
//   // Added 'taxDisplay' to keys and 'TAX CODE' to title
//   const key1 = [
//     ["name", "role"],
//     ['baseSalary'],
//     ['bankAccount'],
//     ['attendedDays'],
//     ['lopDays'],
//     ['bonus'],
//     ['taxDisplay'], // NEW COLUMN KEY
//     ['taxAmount'],
//     ['netPay'],
//   ];
  
//   const structure = [71, 72, 1, 73, 74, 75, 76, 77, 78]; 
//   const titleStructure = [771, 772, 772, 772, 773, 774, 775, 776, 777]; // Adjusted length
//   const title = ['EMPLOYEE', 'BASE SALARY', 'BANK ACCOUNT', 'ATTENDANCE', 'DEDUCTIONS (LOP)', 'ADJUSTMENTS', 'TAX CODE', 'TAX AMT', 'NETPAY', 'ACTION'];
//   const title2 = ['EMPLOYEE', 'BASE SALARY', 'BANK ACCOUNT', 'ATTENDANCE', 'DEDUCTIONS (LOP)', 'ADJUSTMENTS', 'TAX CODE', 'TAX AMT', 'NETPAY'];

//   if (loading) return <ViewerLoader />;

//   return (
//     <div className="h-full bg-slate-50 flex flex-col w-full text-slate-900 font-sans">
//       <Header className={"bg-white px-6"} Title={"Payroll Processor"}
//         subTitle={
//           <div>
//             <div className="flex items-center text-sm text-slate-500">
//               <Dropdown padding='py-1' border='' onChange={setMonth} placeholder={month} options={allMonths} /> <span>/</span>
//               <Dropdown padding='py-1' onChange={setYear} placeholder={year} border='' options={yearOptions} />
//               {status === 'finalized' && (
//                 <span className=" px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><Lock size={10} /> LOCKED</span>
//               )}
//             </div>
//           </div>}>
//         <div className="flex gap-3">
//           {status === 'draft' ? (
//             <>
//               <button onClick={handleSyncAttendance} disabled={syncing} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">
//                 <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
//                 Sync Attendance
//               </button>
//               <button onClick={() => setStatus('generate')} className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white font-normal rounded-lg hover:bg-slate-800 shadow transition-all text-xs active:scale-95">
//                 <CheckCircle size={14} />
//                 Generate
//               </button>
//             </>
//           ) : (status === 'generate' ? (
//             <>
//               <button onClick={() => setStatus('draft')} disabled={syncing} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-300 text-slate-700 text-xs font-normal rounded-lg hover:bg-slate-100 transition-colors">
//                 <Icon name={"ArrowLeft"} className="w-4 h-4" />
//                 Re-Generate
//               </button>
//               <button onClick={handleFinalize} className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white font-normal rounded-lg hover:bg-green-800 shadow transition-all text-xs active:scale-95">
//                 <CheckCircle size={14} />
//                 Finalize & Lock
//               </button>
//             </>
//           ) : (
//             <ExportTable fileName={`Payslips_${month}_${year}`} keys={key1} bodyStructure={structure} title={title2} data={employees} />
//           ))}
//         </div>
//       </Header>

//       <main className="h-screen relative overflow-y-scroll bg-slate-100 flex flex-col p-2 gap-2">
        
//         {/* Metric Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
//           <MetricCard title="Total Gross Payout" amount={totals.gross} icon={Users} colorClass="bg-blue-50 text-blue-600" />
//           {/* Warn if tax is 0 but gross is high */}
//           <MetricCard 
//             title="Total Taxes (Statutory)" 
//             amount={totals.tax} 
//             icon={DollarSign} 
//             colorClass="bg-amber-50 text-amber-600" 
//             warning={totals.tax === 0 && totals.gross > 0} 
//           />
//           <MetricCard title="Total Net Payout" amount={totals.net} icon={CheckCircle} colorClass="bg-emerald-50 text-emerald-600" />
//         </div>

//         {/* --- NEW: TAX CONFIGURATION TOOLBAR --- */}
//         {status === 'draft' || status === 'generate' ? (
//           <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm flex flex-wrap items-center gap-4 animate-in slide-in-from-top-2">
//             <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold tracking-wider">
//               <Settings size={14} /> Tax Configuration
//             </div>
            
//             {/* 1. Scope Selector */}
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-slate-500">Apply to:</span>
//               <div className="w-40">
//                 <Dropdown 
//                   options={departments} 
//                   placeholder={taxConfig.scope}
//                   onChange={(val) => setTaxConfig(prev => ({ ...prev, scope: val }))}
//                   padding="py-1"
//                 />
//               </div>
//             </div>

//             {/* 2. Tax Code Selector */}
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-slate-500">Code:</span>
//               <div className="w-40">
//                 <Dropdown 
//                   options={Object.keys(TAX_REGIMES)} 
//                   placeholder={taxConfig.regime || "Select Code"}
//                   onChange={(val) => setTaxConfig(prev => ({ ...prev, regime: val, version: '' }))} // Reset version on code change
//                   padding="py-1"
//                 />
//               </div>
//             </div>

//             {/* 3. Version Selector (Dependent on Code) */}
//             <div className="flex items-center gap-2">
//               <span className="text-xs text-slate-500">Version:</span>
//               <div className="w-40">
//                 <Dropdown 
//                   options={taxConfig.regime ? TAX_REGIMES[taxConfig.regime].versions : []} 
//                   placeholder={taxConfig.version || "Select Ver"}
//                   onChange={(val) => setTaxConfig(prev => ({ ...prev, version: val }))}
//                   padding="py-1"
//                 />
//               </div>
//             </div>

//             {/* 4. Apply Button */}
//             <button 
//               onClick={applyTaxConfiguration}
//               disabled={syncing}
//               className="ml-auto flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-1.5 rounded text-xs font-semibold transition-colors"
//             >
//               {syncing ? "Applying..." : "Apply Rules"}
//             </button>
//           </div>
//         ) : null}

//         <div className="bg-white rounded shadow border flex-1 flex flex-col border-slate-200 min-h-0">
//           <Generatepayroll employees={employees.length} />
//           <div className="flex-1 overflow-y-auto">
//             <Table 
//               components={ViewerLoader} 
//               D2={currentYear + "/" + yearOptions} 
//               pages={9} 
//               D1={status} 
//               ke={key1} 
//               Data={employees} 
//               titleStructure={titleStructure} 
//               Structure={structure} 
//               title={title} 
//             />
//           </div>

//           <div className="sticky bottom-0 bg-slate-50 z-20 px-6 py-4 border-t border-slate-200 flex justify-end gap-8 text-xs">
//             <div className='flex-1'>
//                {/* Legend or status text could go here */}
//                <span className="text-slate-400">
//                   {employees.filter(e => !e.taxCode).length > 0 
//                     ? `⚠️ ${employees.filter(e => !e.taxCode).length} employees missing tax codes` 
//                     : "All tax codes assigned"}
//                </span>
//             </div>
//             <div className="text-slate-500">Gross: <span className="font-semibold text-slate-700">{formatMoney(totals.gross)}</span></div>
//             <div className="text-slate-500">Tax: <span className="font-semibold text-slate-700">{formatMoney(totals.tax)}</span></div>
//             <div className="text-indigo-600 font-bold text-xs">Net Pay: {formatMoney(totals.net)}</div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default GeneratePayroll;





























// import React, { useState } from 'react'
// import SearchDate from '../../../Components/SearchDate'
// import { Generatepayroll } from '../../../Components/Level2Hearder'
// import Header from '../../../Components/Header'
// import Table from '../../../Components/Table'
// import { useNavigate } from 'react-router-dom'
// import FileDrawer from '../../../Components/FileDrawer'
// import OnPayrollGenerate from './OnPayrollGenerate'
// import ExportTable from '../../../Components/ExportTable'

// function GeneratePayroll() {
//   const [progress, setProgress] = useState("");
//   const [selectedPayslipKey, setSelectedPayslipKey] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const handledate=(e)=>console.log(e)
//   const [isModalOpen,setModalOpen]=useState(false);
//   const navigate = useNavigate();
//   return (
//     <div className='p-4 gap-3 flex flex-col  overflow-hidden h-full'>
//       <OnPayrollGenerate
//                 progress={progress}
//                 setProgress={setProgress}
//                 selectedPayslipkey={selectedPayslipKey}
//                 setSelectedPayslipkey={setSelectedPayslipKey}
//                 summary={summary}
//                 setSummary={setSummary}
//           />
//     </div>
//   )
// }

// export default GeneratePayroll