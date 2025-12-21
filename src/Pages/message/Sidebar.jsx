// message/Sidebar.jsx
import React from 'react';
import { Search, MoreVertical } from 'lucide-react';

const users = [
  { id: 1, name: 'Davis Rosser', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 2, avatar: 'https://i.pravatar.cc/150?u=1', online: true },
  { id: 2, name: 'Emerson Levin', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 2, avatar: 'https://i.pravatar.cc/150?u=2', online: false },
  { id: 3, name: 'Lydia Franci', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 0, avatar: 'https://i.pravatar.cc/150?u=3', online: true },
  { id: 4, name: 'Miracle Botosh', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 2, avatar: 'https://i.pravatar.cc/150?u=4', online: true }, // Active in screenshot
  { id: 5, name: 'Zaire Mango', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 0, avatar: 'https://i.pravatar.cc/150?u=5', online: false },
];

const Sidebar = ({ activeId, setActiveId }) => {
  return (
    <div className="w-80 flex-shrink-0 border-r border-slate-700 bg-[#0f172a] flex flex-col h-full">
      {/* Search Header */}
      <div className="p-5">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search message..." 
            className="w-full bg-[#1e293b] text-slate-300 text-sm rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="absolute right-3 top-3 text-slate-400 w-5 h-5" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 flex gap-6 text-sm font-medium pb-2">
        <button className="text-emerald-400 border-b-2 border-emerald-400 pb-2">All</button>
        <button className="text-slate-400 hover:text-slate-200 pb-2">Unread</button>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {users.map((user) => (
          <div 
            key={user.id} 
            onClick={() => setActiveId(user.id)}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-800 transition-colors relative ${activeId === user.id ? 'bg-[#1e293b] border-l-4 border-emerald-500' : 'border-l-4 border-transparent'}`}
          >
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              {user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></div>}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-slate-200 font-semibold text-sm truncate">{user.name}</h3>
                <span className="text-xs text-slate-500">{user.time}</span>
              </div>
              <p className="text-slate-400 text-xs truncate pr-2">{user.msg}</p>
            </div>

            {user.unread > 0 && (
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-md">
                {user.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;