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
    <div className="flex flex-col h-full transition-colors">
  {/* Filter Header Area */}
  <div className="p-4 border-b border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 sticky top-0 z-10 backdrop-blur-sm">
    <div className="flex gap-2">
      <ApproveReject FiltersChange={setFilter}/>
    </div>
  </div>

  {/* Scrollable List Area */}
  <div className="flex-1 p-2 space-y-3 overflow-auto scrollbar-hidden">
    {requests.map(req => {
      const emp = employees.find(e => e.id === req.employeeId);
      const isPending = req.status === 'pending';
      
      return (
        <div 
          key={req.id} 
          onClick={() => onOpen(req)} 
          className="group relative p-4 bg-white dark:bg-slate-700/50 rounded shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700  transition-all active:scale-[0.99]"
        >
          {/* Status Indicator Bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l ${
            req.status === 'approved' ? 'bg-emerald-500' : 
            req.status === 'denied' ? 'bg-red-500' : 'bg-green-500'
          }`} />

          <div className="flex justify-between items-start pl-2">
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                {emp.name} 
                <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 rounded">
                  {emp.dept}
                </span>
              </div>
              
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                {req.type} • <span className="text-xs">{new Date(req.startDate).toLocaleDateString()} — {new Date(req.endDate).toLocaleDateString()}</span>
              </div>
              
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-2 line-clamp-1 italic">
                "{req.reason}"
              </div>
            </div>

            <div className="text-[10px] font-bold uppercase text-slate-400 group-hover:text-green-500 transition-colors">
              View Details →
            </div>
          </div>
        </div>
      );
    })}

    {requests.length === 0 && (
      <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm italic">
        No requests found for this filter.
      </div>
    )}
  </div>
</div>
  );
}
