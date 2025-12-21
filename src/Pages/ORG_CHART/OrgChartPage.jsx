import React, { useState } from 'react';
import OrgChartEditor from './OrgChartEditor';
import { getLocalData } from '../../Hooks/useLocalStorage';

const OrgChartPage = () => {
  const role = getLocalData('role')
  const [currentUserRole, setCurrentUserRole] = useState(role||'Employee');

  const chartData = {
  nodes: [
    // Root
    {
      id: '1',
      type: 'orgCard',
      data: {
        isRoot: true,
        name: 'Largest Office',
        role: 'CEO',
        department: 'Executive',
        image: 'https://i.pravatar.cc/150?u=ceo',
      },
      position: { x: 400, y: 0 },
    },

    // C-Level
    {
      id: '2',
      type: 'orgCard',
      data: {
        name: 'Alice Johnson',
        role: 'CTO',
        department: 'Technology',
        image: 'https://i.pravatar.cc/150?u=cto',
      },
      position: { x: 150, y: 200 },
    },
    {
      id: '3',
      type: 'orgCard',
      data: {
        name: 'Michael Brown',
        role: 'CFO',
        department: 'Finance',
        image: 'https://i.pravatar.cc/150?u=cfo',
      },
      position: { x: 400, y: 200 },
    },
    {
      id: '4',
      type: 'orgCard',
      data: {
        name: 'Sarah Lee',
        role: 'COO',
        department: 'Operations',
        image: 'https://i.pravatar.cc/150?u=coo',
      },
      position: { x: 650, y: 200 },
    },

    // Managers
    {
      id: '5',
      type: 'orgCard',
      data: {
        name: 'Daniel Smith',
        role: 'Engineering Manager',
        department: 'Technology',
        image: 'https://i.pravatar.cc/150?u=eng-manager',
      },
      position: { x: 100, y: 400 },
    },
    {
      id: '6',
      type: 'orgCard',
      data: {
        name: 'Emily Davis',
        role: 'Finance Manager',
        department: 'Finance',
        image: 'https://i.pravatar.cc/150?u=finance-manager',
      },
      position: { x: 400, y: 400 },
    },

    // Employees
    {
      id: '7',
      type: 'orgCard',
      data: {
        name: 'John Doe',
        role: 'Frontend Developer',
        department: 'Technology',
        image: 'https://i.pravatar.cc/150?u=frontend',
      },
      position: { x: 0, y: 600 },
    },
    {
      id: '8',
      type: 'orgCard',
      data: {
        name: 'Jane Wilson',
        role: 'Backend Developer',
        department: 'Technology',
        image: 'https://i.pravatar.cc/150?u=backend',
      },
      position: { x: 200, y: 600 },
    },
    {
      id: '9',
      type: 'orgCard',
      data: {
        name: 'Samuel Green',
        role: 'Accountant',
        department: 'Finance',
        image: 'https://i.pravatar.cc/150?u=accountant',
      },
      position: { x: 400, y: 600 },
    },
  ],

  edges: [
    // CEO to C-Level
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '1', target: '4' },

    // C-Level to Managers
    { id: 'e2-5', source: '2', target: '5' },
    { id: 'e3-6', source: '3', target: '6' },

    // Managers to Employees
    { id: 'e5-7', source: '5', target: '7' },
    { id: 'e5-8', source: '5', target: '8' },
    { id: 'e6-9', source: '6', target: '9' },
  ],
};


  return (
    <div className="p-8 w-full min-h-9/12 max-h-full">
      <OrgChartEditor initialData={chartData} userRole={currentUserRole} />
    </div>
  );
};

export default OrgChartPage;






























{/* <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Organizational Structure</h1>
          <p className="text-gray-500">Logged in as: <span className="font-bold text-green-600">{currentUserRole}</span></p>
        </div>
        
        
        <select 
          value={currentUserRole} 
          onChange={(e) => setCurrentUserRole(e.target.value)}
          className="p-2 border rounded-lg bg-white text-sm"
        >
          <option value="HR">View as HR (Editor)</option>
          <option value="Manager">View as Manager (Editor)</option>
          <option value="Employee">View as Employee (Read-Only)</option>
        </select>
      </div> */}