import React from 'react';
import PolicyChecks from './PolicyChecks';

export default function RequestDetails({ req, employees }) {
  const emp = employees.find(e => e.id === req.employeeId);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white ${emp.avatarColor}`}>{emp.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
        <div>
          <div className="font-semibold">{emp.name}</div>
          <div className="text-sm text-gray-500">{emp.role} • {emp.dept}</div>
        </div>
      </div>

      <div className="text-sm">
        <div><strong>Type:</strong> {req.type}</div>
        <div><strong>Dates:</strong> {new Date(req.startDate).toLocaleDateString()} → {new Date(req.endDate).toLocaleDateString()}</div>
        <div><strong>Days:</strong> {req.days}</div>
        <div><strong>Reason:</strong> {req.reason}</div>
      </div>

      <div>
        <h4 className="font-medium">Policy checks</h4>
        <PolicyChecks req={req} emp={emp} />
      </div>

      <div>
        <h4 className="font-medium">Approval Chain</h4>
        <ul className="text-sm text-gray-600">
          {req.approvalChain.map(step => (
            <li key={step.step} className="flex justify-between"><div>{step.role} {step.approver?`— ${step.approver}`:''}</div><div className={`text-xs ${step.status==='approved'?'text-green-600':step.status==='denied'?'text-red-600':'text-yellow-600'}`}>{step.status}</div></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium">Notes</h4>
        <div className="text-sm text-gray-600">
          {req.notes.length? req.notes.map((n,idx)=>(<div key={idx} className="mb-2"><div className="text-xs text-gray-500">{n.by} • {new Date(n.at).toLocaleString()}</div><div>{n.text}</div></div>)) : <div className="text-gray-500">No notes</div>}
        </div>
      </div>
    </div>
  );
}
