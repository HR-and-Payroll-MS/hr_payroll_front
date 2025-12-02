import React from 'react';
import { Search } from 'lucide-react';
import InputField from '../../../Components/InputField';
import Dropdown from '../../../Components/Dropdown';
import { ApproveReject } from '../../../Components/Level2Hearder';

export default function RequestList({ requests, employees, filter, setFilter, onOpen }) {
  const status = [
    {content:'all',svg:null,placeholder:true},
    {content:'pending',svg:null},
    {content:'approved',svg:null},
    {content:'denied',svg:null},
  ];
  // {
  //   id: 'r1', employeeId: 'e1', type: 'Annual', startDate: '2025-12-22', endDate: '2025-12-29', days: 6,
  //   reason: 'Family holiday', status: 'pending', submittedAt: '2025-11-20T09:12:00',
  //   approvalChain: 
  //           [
  //               { step: 1, role: 'Manager', approver: 'Lina', status: 'approved' }, 
  //               { step: 2, role: 'HR', approver: null, status: 'pending' }
  //           ],
  //   notes: []
  //   },
  return (
    <div className="bg-white p-4 rounde">
      <div className="flex gap-2 mb-3">
        <ApproveReject FiltersChange={setFilter}/>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-auto scrollbar-hidden">
        {console.log("requests",requests)}
        {requests.map(req => {
          const emp = employees.find(e => e.id === req.employeeId);
          return (
            <div key={req.id} onClick={()=>onOpen(req)} className="p-4 bg-white rounded shadow m-2 cursor-pointer  hover:bg-gray-50">
              <div className="font-medium">{emp.name} <span className="text-xs text-gray-500">• {emp.dept}</span></div>
              <div className="text-sm text-gray-500">{req.type} — {new Date(req.startDate).toLocaleDateString()} to {new Date(req.endDate).toLocaleDateString()}</div>
              <div className="text-xs text-gray-400 mt-1">{req.reason}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
