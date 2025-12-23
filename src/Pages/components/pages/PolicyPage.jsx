// src/pages/PolicyPage.jsx
import React, { useState } from 'react';
import PolicyStepSidebar from '../policy/PolicyStepSidebar';

// Import your Section Views
import TaxPolicyView from '../policy/TaxPolicyView';
// import GeneralPolicyView from '../components/policy/GeneralPolicyView'; 
// import AttendancePolicyView from '../components/policy/AttendancePolicyView';

const PolicyPage = () => {
  const [activeStep, setActiveStep] = useState('tax'); // Default to Tax for demo

  // Simple factory to render the correct component
  const renderSection = () => {
    switch (activeStep) {
      case 'general':
        return <div className="p-10 text-gray-400">General Policy Component Here</div>; // Placeholder
      case 'attendance':
        return <div className="p-10 text-gray-400">Attendance Policy Component Here</div>; // Placeholder
      case 'tax':
        return <TaxPolicyView />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
        <p className="text-gray-500">Configure HR rules, tax codes, and leave entitlements.</p>
      </header>

      <div className="flex gap-8 items-start max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <PolicyStepSidebar 
          activeStep={activeStep} 
          onStepChange={setActiveStep} 
        />

        {/* Right Content Area */}
        <main className="flex-1">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default PolicyPage;