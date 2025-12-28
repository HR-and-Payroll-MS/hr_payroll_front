import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import InputField from '../../Components/InputField';

const NodeModal = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
  const [formData, setFormData] = useState({ name: '', role: '', department: '', image: '' });

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { name: '', role: '', department: '', image: '' });
    }
  }, [isOpen, initialData]);

  // This is the function that actually fills the form
  const selectEmployee = (emp) => {
    console.log(emp?.photo); 
    setFormData({
      name: emp.fullname || emp.name, 
      role: emp.role || 'Staff', // Adjust based on your API
      department: emp.department || (emp.job ? emp.job.department : ''),
      image: emp.photo || (emp.general ? emp.general.photo : '')
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
          <h2 className="text-lg font-semibold">{mode === 'edit' ? 'Edit Details' : 'Add Employee'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Search Employee</label>
            <InputField 
              maxWidth='w-full' 
              icon={true} 
              searchMode='api' 
              apiEndpoint="/employees/" 
              displayKey="fullname" // Use fullname to match your backend map
              onSelect={selectEmployee} // Direct connection to fill the form
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Name (Auto)</label>
                <input disabled className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-700" value={formData.name} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Role (Auto)</label>
                <input disabled className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-500" value={formData.role} />
            </div>
          </div>
          
          <div className="grid grid-cols-1">
            <label className="block text-sm font-medium mb-1 text-gray-400">Dept (Auto)</label>
            <input disabled className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-500" value={formData.department} />
          </div>

          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            {mode === 'edit' ? 'Save Changes' : 'Confirm & Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NodeModal;