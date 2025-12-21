// message/ChatIndex.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

// Helper to find full user object based on ID
// In a real app, you might use Context or Redux
const mockUsers = [
  { id: 1, name: 'Davis Rosser', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 2, avatar: 'https://i.pravatar.cc/150?u=1', online: true },
  { id: 2, name: 'Emerson Levin', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 2, avatar: 'https://i.pravatar.cc/150?u=2', online: false },
  { id: 3, name: 'Lydia Franci', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 0, avatar: 'https://i.pravatar.cc/150?u=3', online: true },
  { id: 4, name: 'Marilyn George', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 2, avatar: 'https://i.pravatar.cc/150?u=4', online: true },
  { id: 5, name: 'Zaire Mango', msg: 'Sure! let me tell you about what...', time: '2m Ago', unread: 0, avatar: 'https://i.pravatar.cc/150?u=5', online: false },
];

export default function ChatIndex() {
  const [activeId, setActiveId] = useState(4); // Default to Marilyn George

  const activeUser = mockUsers.find(u => u.id === activeId);

  return (
    <div className="flex w-full h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeId={activeId} setActiveId={setActiveId} />
      <ChatArea activeUser={activeUser} />
    </div>
  );
}