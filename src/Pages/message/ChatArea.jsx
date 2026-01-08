// message/ChatArea.jsx
import React, { useRef, useEffect } from 'react';
import {
  MoreVertical, Smile, Mic, Paperclip,
  User, BarChart2, FileText, Image as ImageIcon, Send
} from 'lucide-react';
import { useChat } from './useChat';
import MessageBubble from './MessageBubble';

const ChatArea = ({ activeUser }) => {
  const { messages, isLoading, sendMessage, isTyping, sendTyping } = useChat(activeUser?.id);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]); // Scroll when typing starts too

  if (!activeUser) return <div className="flex-1 bg-[#0f172a] flex items-center justify-center text-slate-500">Select a chat</div>;

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] relative">

      {/* 1. Chat Header */}
      <div className="h-20 px-6 border-b border-slate-800 flex items-center justify-between bg-[#0f172a]">
        <div className="flex items-center gap-4">
          <img src={activeUser.avatar} alt="active" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="text-white font-semibold">{activeUser.name}</h2>
            <p className="text-slate-400 text-xs">
              {isTyping ? <span className="text-emerald-500 font-bold animate-pulse">typing...</span> : "Last Seen 09:40"}
            </p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* 2. Messages Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Toolbar (Mini Menu inside chat) */}
        <div className="w-16 flex flex-col items-center gap-8 pt-8">
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all">
            <User size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all">
            <BarChart2 size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all">
            <FileText size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-emerald-600 transition-all">
            <ImageIcon size={18} />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto px-8 pt-8 custom-scrollbar">
          {isLoading ? (
            <div className="text-center text-slate-500 mt-10">Loading conversation...</div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))
          )}

          {/* Typing Bubble */}
          {isTyping && (
            <div className="flex gap-3 mb-6 animate-pulse">
              <img src={activeUser.avatar} className="w-8 h-8 rounded-full" alt="typing" />
              <div className="bg-[#1e293b] text-slate-400 p-3 rounded-2xl rounded-tl-none text-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* 3. Input Area */}
      <div className="p-6">
        <div className="bg-[#1e293b] rounded-2xl p-2 flex items-center gap-2 pr-4">
          {/* Input Left Actions */}
          <button className="p-3 text-slate-400 hover:text-emerald-500">
            <Paperclip size={20} />
          </button>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Write message here..."
            className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none h-10"
            onChange={() => sendTyping()} // Trigger typing event
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(e.target.value);
                e.target.value = '';
              }
            }}
          />

          {/* Input Right Actions */}
          <button className="p-2 text-slate-400 hover:text-yellow-400">
            <Smile size={20} />
          </button>

          <button className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;