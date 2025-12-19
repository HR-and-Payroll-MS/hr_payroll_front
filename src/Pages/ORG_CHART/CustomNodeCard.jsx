// src/components/org-chart/CustomNodeCard.jsx
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { PlusCircle, Trash2, User } from 'lucide-react';

const CustomNodeCard = ({ data, id }) => {
  // data contains: name, role, image, status, onAddChild, onDelete
  const isRoot = data.isRoot;

  return (
    <div className="relative group">
      {/* The connecting dots (Handles) */}
      {!isRoot && (
        <Handle type="target" position={Position.Top} className="!bg-gray-300" />
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300" />

      {/* The Card UI */}
      <div className="w-[200px] bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center relative hover:shadow-md transition-shadow">
        
        {/* Status indicator */}
        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${data.status === 'active' ? 'bg-green-400' : 'bg-gray-300'}`}></div>

        <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm">
          {data.image ? (
            <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
          ) : (
            <User className="text-gray-400" size={32} />
          )}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">{data.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{data.role}</p>
        <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{data.department || 'Office'}</span>

        {/* Controls (Visible on Hover) */}
        <div className="absolute -bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={() => data.onAddChild(id)}
                className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600" title="Add subordinate">
                <PlusCircle size={16} />
            </button>
            {!isRoot && (
            <button 
                onClick={() => data.onDelete(id)}
                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600" title="Delete Node">
                <Trash2 size={16} />
            </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default memo(CustomNodeCard);