// src/components/OrgChartPage.jsx
import React, { useState } from 'react';
import OrgChartEditor from './OrgChartEditor';
import { Search, Filter, Download, Share2 } from 'lucide-react';

// Mock Data resembling your screenshot
const initialMockData = {
  nodes: [
    // Root Node
    {
      id: 'root-1', type: 'orgCard', position: { x: 0, y: 0 },
      data: { isRoot: true, name: 'Largest Office', role: 'Head Office', status: 'active', department: 'Corporate', image: 'https://i.pravatar.cc/150?u=root' }
    },
    // Level 2
    {
      id: 'l2-1', type: 'orgCard', position: { x: 0, y: 0 },
      data: { name: 'Angelina Beller', role: 'CFO', status: 'active', department: 'Finance', image: 'https://i.pravatar.cc/150?u=l2-1' }
    },
    {
      id: 'l2-2', type: 'orgCard', position: { x: 0, y: 0 },
      data: { name: 'Alfredo George', role: 'CTO', status: 'active', department: 'Technology', image: 'https://i.pravatar.cc/150?u=l2-2' }
    },
    {
      id: 'l2-3', type: 'orgCard', position: { x: 0, y: 0 },
      data: { name: 'Davis Levin', role: 'COO', status: 'active', department: 'Operations', image: 'https://i.pravatar.cc/150?u=l2-3' }
    },
    {
      id: 'l2-4', type: 'orgCard', position: { x: 0, y: 0 },
      data: { name: 'Carla Workman', role: 'CPO', status: 'active', department: 'Product', image: 'https://i.pravatar.cc/150?u=l2-4' }
    },
     // Level 3 (under Carla)
     {
      id: 'l3-1', type: 'orgCard', position: { x: 0, y: 0 },
      data: { name: 'Corey Lipshutz', role: 'Project Manager', status: 'active', department: 'Product', image: 'https://i.pravatar.cc/150?u=l3-1' }
    },
  ],
  edges: [
    { id: 'e1', source: 'root-1', target: 'l2-1', type: 'smoothstep', style: { stroke: '#cbd5e1' } },
    { id: 'e2', source: 'root-1', target: 'l2-2', type: 'smoothstep', style: { stroke: '#cbd5e1' } },
    { id: 'e3', source: 'root-1', target: 'l2-3', type: 'smoothstep', style: { stroke: '#cbd5e1' } },
    { id: 'e4', source: 'root-1', target: 'l2-4', type: 'smoothstep', style: { stroke: '#cbd5e1' } },
    { id: 'e5', source: 'l2-4', target: 'l3-1', type: 'smoothstep', style: { stroke: '#cbd5e1' } },
  ]
};


const OrgChartPage = () => {
  // In a real app, you might fetch this data from an API
  const [chartData] = useState(initialMockData);

  return (
    <div className="p-6 bg-white h-full overflow-hidden flex flex-col">
      {/* Header Controls Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl font-semibold text-gray-800">ORG Chart</h1>
        
        {/* Search and Actions Toolbar */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-64"
            />
          </div>
          
          <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-sm border border-gray-200">
                  <Filter size={18}/> Filter
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <Download size={18}/>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <Share2 size={18}/>
              </button>
          </div>
        </div>
      </div>

      {/* The Chart Container */}
      <div className="flex-grow relative">
         {/* We pass initialData. The Editor component handles its own internal state 
           for adding/removing nodes visually.
         */}
        <OrgChartEditor initialData={chartData} />
      </div>
    </div>
  );
};

export default OrgChartPage;