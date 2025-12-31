import React, { useState, useMemo } from 'react';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import ActionPanel from './ActionPanel';
import ToastContainer from './ToastContainer';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import FileDrawer from '../../../Components/FileDrawer';
import Header from '../../../Components/Header';
import { SubTitle } from 'chart.js';


const EMPLOYEES = [
{ id: 'e1', name: 'Aisha Khan', dept: 'Engineering', role: 'Senior Dev', avatarColor: 'bg-indigo-500', leaveBalance: 10 },
{ id: 'e2', name: 'Liam Murphy', dept: 'Sales', role: 'Account Exec', avatarColor: 'bg-emerald-500', leaveBalance: 4 },
{ id: 'e3', name: 'Chen Wei', dept: 'Product', role: 'PM', avatarColor: 'bg-rose-500', leaveBalance: 18 }
];
const REQUESTS = [
    {
    id: 'r1', employeeId: 'e2', type: 'daily', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
    reason: 'Family holiday', status: 'approved', submittedAt: '2025-11-20T09:12:00',
    approvalChain: 
            [
                { step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, 
                { step: 2, role: 'HR', approver: null, status: 'pending' }
            ],
    notes: []
    },
    {
    id: 'r2', employeeId: 'e1', type: 'daily', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
    reason: 'Family holiday', status: 'denied', submittedAt: '2025-11-20T09:12:00',
    approvalChain: 
            [
                { step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, 
                { step: 2, role: 'HR', approver: null, status: 'approved' }
            ],
    notes: []
    },
    {
    id: 'r3', employeeId: 'e1', type: 'daily', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
    reason: 'Family holiday', status: 'denied', submittedAt: '2025-11-20T09:12:00',
    approvalChain: 
            [
                { step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, 
                { step: 2, role: 'HR', approver: null, status: 'approved' }
            ],
    notes: []
    },
    {
    id: 'r4', employeeId: 'e1', type: 'Annual', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
    reason: 'Family holiday', status: 'pending', submittedAt: '2025-11-20T09:12:00',
    approvalChain: 
            [
                { step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, 
                { step: 2, role: 'HR', approver: null, status: 'denied' }
            ],
    notes: []
    },
    {
    id: 'r5', employeeId: 'e1', type: 'Annual', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
    reason: 'Family holiday', status: 'pending', submittedAt: '2025-11-20T09:12:00',
    approvalChain: 
            [
                { step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, 
                { step: 2, role: 'HR', approver: null, status: 'denied' }
            ],
    notes: []
    },
];
export default function LeaveApprovalPage() {
const [requests, setRequests] = useState(REQUESTS);
const [employees] = useState(EMPLOYEES);
const [selectedRequest, setSelectedRequest] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);
const [filter, setFilter] = useState({ q: '', status: 'all' });
const [toasts, setToasts] = useState([]);
   
// filtering for now  
const filtered = useMemo(() => requests.filter(r => {
const emp = employees.find(e => e.id === r.employeeId);
if (filter.q && !emp.name.toLowerCase().includes(filter.q.toLowerCase())) return false;
if (filter.status !== 'all' && r.status !== filter.status) return false;
return true;
}), [requests, filter, employees]);

function openModal() { setDrawerOpen(true); }

function openDetails(req) {  setSelectedRequest(req); openModal(); }

function pushToast(msg) 
{ 
    const id = Math.random().toString(36); 
    setToasts(t => [...t, { id, msg }]); 
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500); 
}

function handleDecision(reqId, decision, comment) {
  setRequests(prev =>
    prev.map(r => 
      r.id === reqId
        ? {
            ...r,
            status: decision,
            notes: [
              ...r.notes,
              { by: 'You', at: new Date().toISOString(), text: comment }
            ],
            approvalChain: r.approvalChain.map((step, index) =>
              index === 1
                ? { ...step, status: decision, approver: 'You' }
                : step 
            )
          }
        : r
    )
  );

  setDrawerOpen(false);

  pushToast(decision === 'approved' ? 'Approved' : 'Denied');
}



const analytics = useMemo(() => {
const map = {}; requests.forEach(r => map[r.type] = (map[r.type] || 0) + r.days);
return Object.entries(map).map(([name, days]) => ({ name, days }));
}, [requests]);


return (
  <div className="h-full bg-white w-full flex flex-col gap-4 p-4 md:p-7 dark:bg-slate-800 overflow-hidden transition-colors">
    {/* HEADER SECTION - Matching your Header component style */}
    <div className="flex items-center justify-between shrink-0">
      {/* <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Leave Requests</h1>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          
        </p>
      </div> */}
    <Header Title={"Leave Requests"} subTitle={"Approve or deny leave requests — opens details in your Drawer"}/>
    </div>

    {/* MAIN CONTENT - Inset Shadow Container */}
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-800 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 overflow-hidden transition-all">
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <RequestList
          requests={filtered}
          employees={employees}
          filter={filter}
          setFilter={setFilter}
          onOpen={openDetails}
        />
      </div>
    </div>

    {/* DRAWER CONTENT - Using the same container logic */}
    {drawerOpen && (
      <FileDrawer isModalOpen={drawerOpen} closeModal={setDrawerOpen}>
        {selectedRequest && (
          <div className="h-full flex flex-col bg-white dark:bg-slate-800 transition-colors">
            {/* Scrollable Details Area */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hidden">
              <RequestDetails req={selectedRequest} employees={employees} />
            </div>
            
            {/* Fixed Action Panel at Bottom */}
            <div className="shrink-0 p-4 border-t border-slate-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
              <ActionPanel 
                request={selectedRequest} 
                onApprove={(c) => handleDecision(selectedRequest.id, 'approved', c)} 
                onDeny={(c) => handleDecision(selectedRequest.id, 'denied', c)} 
              />
            </div>
          </div>
        )}
      </FileDrawer>
    )}

    <ToastContainer toasts={toasts} />
  </div>
);
}