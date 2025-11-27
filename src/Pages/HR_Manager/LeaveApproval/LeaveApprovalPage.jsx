import React, { useState, useMemo } from 'react';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import ActionPanel from './ActionPanel';
import ToastContainer from './ToastContainer';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import FileDrawer from '../../../Components/FileDrawer';


const EMPLOYEES = [
{ id: 'e1', name: 'Aisha Khan', dept: 'Engineering', role: 'Senior Dev', avatarColor: 'bg-indigo-500', leaveBalance: 10 },
{ id: 'e2', name: 'Liam Murphy', dept: 'Sales', role: 'Account Exec', avatarColor: 'bg-emerald-500', leaveBalance: 4 },
{ id: 'e3', name: 'Chen Wei', dept: 'Product', role: 'PM', avatarColor: 'bg-rose-500', leaveBalance: 18 }
];


const REQUESTS = [
{
id: 'r1', employeeId: 'e1', type: 'Annual', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
reason: 'Family holiday', status: 'pending', submittedAt: '2025-11-20T09:12:00', approvalChain: [
{ step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, { step: 2, role: 'HR', approver: null, status: 'pending' }
], notes: []
}
];


export default function LeaveApprovalPage() {
const [requests, setRequests] = useState(REQUESTS);
const [employees] = useState(EMPLOYEES);
const [selectedRequest, setSelectedRequest] = useState(null);
const [drawerOpen, setDrawerOpen] = useState(false);
const [filter, setFilter] = useState({ q: '', status: 'all' });
const [toasts, setToasts] = useState([]);


const filtered = useMemo(() => requests.filter(r => {
const emp = employees.find(e => e.id === r.employeeId);
if (filter.q && !emp.name.toLowerCase().includes(filter.q.toLowerCase())) return false;
if (filter.status !== 'all' && r.status !== filter.status) return false;
return true;
}), [requests, filter, employees]);


function openDetails(req) { setSelectedRequest(req); setDrawerOpen(true); }
function closeDrawer() { setDrawerOpen(false); }


function pushToast(msg) { const id = Math.random().toString(36); setToasts(t => [...t, { id, msg }]); setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500); }


function handleDecision(reqId, decision, comment) {
setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: decision, notes: [...r.notes, { by: 'You', at: new Date().toISOString(), text: comment }] } : r));
pushToast(decision === 'approved' ? 'Approved' : 'Denied');
}


const analytics = useMemo(() => {
const map = {}; requests.forEach(r => map[r.type] = (map[r.type] || 0) + r.days);
return Object.entries(map).map(([name, days]) => ({ name, days }));
}, [requests]);


return (
<div className="p-6 bg-gray-50 min-h-screen">
<div className="flex items-center justify-between">
<div>
<h1 className="text-2xl font-semibold">Leave Requests</h1>
<p className="text-sm text-gray-600">Approve or deny leave requests — opens details in your Drawer</p>
</div>
</div>


<div className="mt-4 grid grid-cols-3 gap-6">
<div className="col-span-1">
<RequestList
requests={filtered}
employees={employees}
filter={filter}
setFilter={setFilter}
onOpen={openDetails}
/>
</div>


<div className="col-span-2">
<div className="bg-white p-4 rounded shadow">
<h3 className="font-medium">Analytics</h3>
<div className="h-40 mt-3">
<ResponsiveContainer width="100%" height="100%">
<BarChart data={analytics}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="days" /></BarChart>
</ResponsiveContainer>
</div>
</div>
</div>
</div>
<FileDrawer open={drawerOpen} onClose={closeDrawer}>
{selectedRequest && (
<div className="p-4">
<RequestDetails req={selectedRequest} employees={employees} />
<div className="mt-4"><ActionPanel request={selectedRequest} onApprove={(c)=>handleDecision(selectedRequest.id,'approved',c)} onDeny={(c)=>handleDecision(selectedRequest.id,'denied',c)} /></div>
</div>
)}
</FileDrawer>


<ToastContainer toasts={toasts} />
</div>
);
}