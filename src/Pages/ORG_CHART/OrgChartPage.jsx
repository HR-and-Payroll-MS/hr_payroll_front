import React, { useState } from 'react';
import OrgChartEditor from './OrgChartEditor';

const OrgChartPage = () => {
  // SIMULATE ROLE: Change this to 'Employee' to see read-only mode
  const [currentUserRole, setCurrentUserRole] = useState('HR');

  const chartData = {
    nodes: [
      { id: '1', type: 'orgCard', data: { isRoot: true, name: 'Largest Office', role: 'CEO', department: 'Executive', image: 'https://i.pravatar.cc/150?u=root' }, position: {x:0, y:0} }
    ],
    edges: []
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Organizational Structure</h1>
          <p className="text-gray-500">Logged in as: <span className="font-bold text-green-600">{currentUserRole}</span></p>
        </div>
        
        {/* Role Toggle for testing */}
        <select 
          value={currentUserRole} 
          onChange={(e) => setCurrentUserRole(e.target.value)}
          className="p-2 border rounded-lg bg-white text-sm"
        >
          <option value="HR">View as HR (Editor)</option>
          <option value="Manager">View as Manager (Editor)</option>
          <option value="Employee">View as Employee (Read-Only)</option>
        </select>
      </div>

      <OrgChartEditor initialData={chartData} userRole={currentUserRole} />
    </div>
  );
};

export default OrgChartPage;