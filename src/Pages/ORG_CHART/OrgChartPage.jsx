import React, { useState, useEffect } from 'react';
import OrgChartEditor from './OrgChartEditor';
import { getLocalData } from '../../Hooks/useLocalStorage';
import { ReactFlowProvider } from 'reactflow'; // Required to fix the error

const OrgChartPage = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = getLocalData('role') || 'HR'; 

  const initialMockData = {
    nodes: [
      { id: '1', type: 'orgCard', data: { isRoot: true, name: 'Largest Office', role: 'CEO', department: 'Executive', image: '' }, position: { x: 400, y: 0 } },
      { id: '2', type: 'orgCard', data: { name: 'Alice Johnson', role: 'CTO', department: 'Technology', image: '' }, position: { x: 150, y: 200 } },
      { id: '3', type: 'orgCard', data: { name: 'Michael Brown', role: 'CFO', department: 'Finance', image: '' }, position: { x: 400, y: 200 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
      { id: 'e1-3', source: '1', target: '3', type: 'smoothstep' }
    ]
  };

  useEffect(() => {
    // === PLACEHOLDER: Fetch from backend here ===
    // axios.get('/api/org-chart').then(res => setChartData(res.data))
    
    setTimeout(() => {
      setChartData(initialMockData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="p-8 font-semibold text-slate-500">Initializing Org Chart...</div>;

  return (
    <div className="p-8 w-full h-[90vh]">
      {/* Wrapping here solves the 'useStoreApi' / Zustand error */}
      <ReactFlowProvider>
        <OrgChartEditor initialData={chartData} userRole={role} />
      </ReactFlowProvider>
    </div>
  );
};

export default OrgChartPage;