// src/components/org-chart/NodeModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Search, User } from 'lucide-react';

// MOCK DATABASE: In the future, you will fetch this from your backend
const MOCK_DB = [
  { id: 'db-1', name: 'John Doe', role: 'Software Engineer', department: 'Tech', image: 'https://i.pravatar.cc/150?u=1' },
  { id: 'db-2', name: 'Jane Smith', role: 'HR Manager', department: 'HR', image: 'https://i.pravatar.cc/150?u=2' },
  { id: 'db-3', name: 'Alice Johnson', role: 'UI Designer', department: 'Design', image: 'https://i.pravatar.cc/150?u=3' },
];

const NodeModal = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
  const [formData, setFormData] = useState({ name: '', role: '', department: '', image: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // If editing, fill form with existing node data; otherwise reset
      setFormData(initialData || { name: '', role: '', department: '', image: '' });
      setSearchTerm(initialData?.name || '');
    }
  }, [isOpen, initialData]);

  // Handle Mock Search Logic
  const handleSearchChange = (val) => {
    setSearchTerm(val);
    if (val.length > 1) {
      // REPLACE THIS: fetch(`/api/employees?search=${val}`)
      const filtered = MOCK_DB.filter(emp => emp.name.toLowerCase().includes(val.toLowerCase()));
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectEmployee = (emp) => {
    setFormData({ name: emp.name, role: emp.role, department: emp.department, image: emp.image });
    setSearchTerm(emp.name);
    setSearchResults([]);
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
          {/* Searchable Input Field */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Search Employee</label>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Type name..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>
            {/* Dropdown Results */}
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white border mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {searchResults.map(emp => (
                  <div 
                    key={emp.id} 
                    onClick={() => selectEmployee(emp)}
                    className="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 border-b last:border-0"
                  >
                    <img src={emp.image} className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-medium">{emp.name}</span>
                    <span className="text-xs text-gray-400">({emp.role})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Role (Auto)</label>
                <input disabled className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-500" value={formData.role} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-400">Dept (Auto)</label>
                <input disabled className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-500" value={formData.department} />
            </div>
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