import React from 'react';
import { Search } from 'lucide-react';

export default function RequestList({ requests, employees, filter, setFilter, onOpen }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <input value={filter.q} onChange={(e)=>setFilter({...filter, q: e.target.value})} placeholder="Search employee..." className="w-full border rounded px-3 py-2" />
          <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <select value={filter.status} onChange={(e)=>setFilter({...filter, status: e.target.value})} className="border rounded px-3 py-2">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
        </select>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-auto">
        {requests.map(req => {
          const emp = employees.find(e => e.id === req.employeeId);
          return (
            <div key={req.id} onClick={()=>onOpen(req)} className="p-3 border rounded cursor-pointer hover:bg-gray-50">
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
