import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function ActionPanel({ request, onApprove, onDeny }) {
  const [comment, setComment] = useState('');

  // Determine if actions should be disabled
  const isApprovedOrDenied = request.status === 'approved' || request.status === 'denied';

  return (
    <div className="h-full gap-2 flex flex-col rounded py-3">
      <p className="font-semibold text-sm">Add Comment</p>
      <textarea
        className="w-full bg-slate-100 rounded p-2 text-sm"
        rows={3}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        // disabled={isApprovedOrDenied} 
      />
      <div className="flex items-end flex-1 gap-2 mt-3">
        <button
          disabled={request.status === 'approved'}
          onClick={() => {
            onApprove(comment);
            setComment('');
          }}
          className={`flex-1 h-fit flex items-center justify-center gap-2 rounded py-2 ${
            request.status === 'approved'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:cursor-pointer text-white'
          }`}
        >
          <CheckCircle size={16} /> Approve
        </button>

        <button
          disabled={request.status === 'denied'}
          onClick={() => {
            onDeny(comment);
            setComment('');
          }}
          className={`flex-1 h-fit flex items-center justify-center gap-2 rounded py-2 ${
            request.status === 'denied'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:cursor-pointer text-white'
          }`}
        >
          <XCircle size={16} /> Deny
        </button>
      </div>
    </div>
  );
}

