import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ActionPanel({ request, onApprove, onDeny }) {
  const [comment, setComment] = useState('');
  return (
    <div className="border rounded p-3">
      <textarea className="w-full border rounded p-2 text-sm" rows={3} placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value)} />
      <div className="flex gap-2 mt-3">
        <button onClick={()=>{ onApprove(comment); setComment(''); }} className="flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"><CheckCircle size={16} /> Approve</button>
        <button onClick={()=>{ onDeny(comment); setComment(''); }} className="flex-1 bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"><XCircle size={16} /> Deny</button>
      </div>
    </div>
  );
}
