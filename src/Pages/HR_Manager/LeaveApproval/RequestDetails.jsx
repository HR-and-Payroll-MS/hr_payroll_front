import React from 'react';
import PolicyChecks from './PolicyChecks';
import { User, Calendar, FileText, GitBranch, MessageSquare, Info } from 'lucide-react';

export default function RequestDetails({ req, employees }) {
  const emp = employees.find(e => e.id === req.employeeId);

  return (
    <div className="h-full scrollbar-hidden w-full flex flex-col gap-4 text-slate-800 dark:text-slate-100">
      
      {/* 1. EMPLOYEE HEADER CARD */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 flex items-center gap-4 transition-colors">
        <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm border-2 border-white dark:border-slate-500 ${emp.avatarColor}`}>
          {emp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <div className="font-bold text-lg">{emp.name}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span className="bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{emp.dept}</span>
            <span>{emp.role}</span>
          </div>
        </div>
      </div>

      {/* 2. REQUEST INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600 space-y-3">
          <div className="flex items-center gap-2 font-bold text-xs uppercase text-slate-400 dark:text-slate-500 border-b dark:border-slate-600 pb-2">
            <Info size={14} /> Request Info
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Type:</span> <span className="font-semibold">{req.type}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Days:</span> <span className="font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 rounded">{req.days} Days</span></div>
            <div className="flex justify-between items-center gap-2 pt-1">
              <Calendar size={14} className="text-slate-400" />
              <span className="font-medium text-xs">
                {new Date(req.startDate).toLocaleDateString()} — {new Date(req.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600">
          <div className="flex items-center gap-2 font-bold text-xs uppercase text-slate-400 dark:text-slate-500 border-b dark:border-slate-600 pb-2 mb-2">
            <FileText size={14} /> Reason
          </div>
          <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed">
            "{req.reason}"
          </p>
        </div>
      </div>

      {/* 3. POLICY CHECKS (Standardized) */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600">
        <h4 className="font-bold text-xs uppercase text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
           Policy Compliance
        </h4>
        <PolicyChecks req={req} emp={emp} />
      </div>

      {/* 4. APPROVAL CHAIN (Timeline Style) */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600">
        <h4 className="font-bold text-xs uppercase text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
          <GitBranch size={14} /> Approval Chain
        </h4>
        <div className="space-y-4 ml-2">
          {req.approvalChain.map((step, idx) => (
            <div key={step.step} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-600 last:border-l-0">
              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white dark:border-slate-700 ${
                step.status === 'approved' ? 'bg-green-500' : step.status === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <div className="flex justify-between items-start">
                <div className="text-sm">
                  <div className="font-bold leading-none">{step.role}</div>
                  <div className="text-xs text-slate-500 mt-1">{step.approver || 'Pending Assignment'}</div>
                </div>
                <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  step.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/20' : 
                  step.status === 'denied' ? 'bg-red-100 text-red-700 dark:bg-red-900/20' : 
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20'
                }`}>
                  {step.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. NOTES SECTION */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded shadow dark:shadow-black dark:inset-shadow-xs dark:inset-shadow-slate-600">
        <h4 className="font-bold text-xs uppercase text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
          <MessageSquare size={14} /> Activity Feed
        </h4>
        <div className="space-y-3">
          {req.notes.length ? req.notes.map((n, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded border border-slate-100 dark:border-slate-600 transition-colors">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{n.by}</span>
                <span className="text-[10px] text-slate-400">{new Date(n.at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200">{n.text}</p>
            </div>
          )) : (
            <div className="text-xs text-slate-400 italic text-center py-2">No activity recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}










// import React from 'react';
// import PolicyChecks from './PolicyChecks';

// export default function RequestDetails({ req, employees }) {
//   const emp = employees.find(e => e.id === req.employeeId);
//   return (
//     <div className="space-y-3">
//       <div className="flex items-center gap-3">
//         <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white ${emp.avatarColor}`}>{emp.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
//         <div>
//           <div className="font-semibold">{emp.name}</div>
//           <div className="text-sm text-gray-500">{emp.role} • {emp.dept}</div>
//         </div>
//       </div>

//       <div className="text-sm">
//         <div><strong>Type:</strong> {req.type}</div>
//         <div><strong>Dates:</strong> {new Date(req.startDate).toLocaleDateString()} → {new Date(req.endDate).toLocaleDateString()}</div>
//         <div><strong>Days:</strong> {req.days}</div>
//         <div><strong>Reason:</strong> {req.reason}</div>
//       </div>

//       <div>
//         <h4 className="font-medium">Policy checks</h4>
//         <PolicyChecks req={req} emp={emp} />
//       </div>

//       <div>
//         <h4 className="font-medium">Approval Chain</h4>
//         <ul className="text-sm text-gray-600">
//           {req.approvalChain.map(step => (
//             <li key={step.step} className="flex justify-between"><div>{step.role} {step.approver?`— ${step.approver}`:''}</div><div className={`text-xs ${step.status==='approved'?'text-green-600':step.status==='denied'?'text-red-600':'text-yellow-600'}`}>{step.status}</div></li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-medium">Notes</h4>
//         <div className="text-sm text-gray-600">
//           {req.notes.length? req.notes.map((n,idx)=>(<div key={idx} className="mb-2"><div className="text-xs text-gray-500">{n.by} • {new Date(n.at).toLocaleString()}</div><div>{n.text}</div></div>)) : <div className="text-gray-500">No notes</div>}
//         </div>
//       </div>
//     </div>
//   );
// }
