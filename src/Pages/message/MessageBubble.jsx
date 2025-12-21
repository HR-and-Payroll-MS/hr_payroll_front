// message/MessageBubble.jsx
import React from 'react';
import { Play, Pause, Check, CheckCheck } from 'lucide-react';

const AudioPlayer = ({ duration }) => (
  <div className="flex items-center gap-3 w-48">
    <button className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full text-slate-800 hover:bg-white">
      <Play fill="currentColor" size={14} />
    </button>
    <div className="flex-1 flex items-center gap-[2px] h-6 overflow-hidden">
        {/* Fake Audio Visualizer */}
        {[...Array(20)].map((_, i) => (
            <div key={i} className={`w-1 bg-emerald-500 rounded-full`} style={{height: `${Math.random() * 100}%`}}></div>
        ))}
    </div>
    <span className="text-xs text-slate-300 font-mono">{duration}</span>
  </div>
);

const MessageBubble = ({ msg }) => {
  const isMe = msg.sender === 'me';
  
  return (
    <div className={`flex w-full mb-6 ${isMe ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
      
      {/* Message Container */}
      <div className={`relative max-w-[65%] group`}>
        
        {/* The Bubble */}
        <div className={`p-4 rounded-2xl ${
            isMe 
            ? 'bg-[#1e293b] text-slate-200 rounded-tr-sm' 
            : 'bg-white text-slate-800 rounded-tl-sm'
        }`}>
            
            {/* Text Type */}
            {msg.type === 'text' && (
                <p className="text-sm leading-relaxed">{msg.content}</p>
            )}

            {/* Audio Type */}
            {msg.type === 'audio' && (
                <AudioPlayer duration={msg.content} />
            )}

            {/* Image Type */}
            {msg.type === 'image' && (
                <div className="space-y-2">
                    <img src={msg.content} alt="attachment" className="rounded-lg w-full h-auto object-cover max-h-60" />
                    {msg.caption && <p className="text-sm font-medium">{msg.caption}</p>}
                </div>
            )}
        </div>

        {/* Metadata (Time & Ticks) */}
        <div className={`flex items-center gap-1 mt-1 text-xs text-slate-500 ${isMe ? 'flex-row-reverse' : ''}`}>
            <span>{msg.time}</span>
            {isMe && (
               msg.status === 'read' 
               ? <CheckCheck size={14} className="text-emerald-500" /> 
               : <Check size={14} />
            )}
        </div>

        {/* Floating Reactions Bar (Simulated hover effect from screenshot) */}
        {msg.reactions && (
            <div className="absolute -top-8 right-0 bg-[#0f172a] border border-slate-700 p-1.5 rounded-full flex gap-2 shadow-lg z-10">
                {msg.reactions.map(r => <span key={r} className="text-sm hover:scale-125 cursor-pointer transition-transform">{r}</span>)}
            </div>
        )}

        {/* Attached Reaction */}
        {msg.reaction && (
            <div className="absolute -bottom-3 -left-2 bg-slate-700 rounded-full p-1 border-2 border-[#0f172a] text-xs">
                {msg.reaction}
            </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;