import React, { useState, useEffect } from 'react';
import FAQItem from './FAQItem';
import FAQModal from './FAQModal';
import { getLocalData } from '../../../../Hooks/useLocalStorage';

const INITIAL_FAQS = [
  { id: 1, category: 'Payroll', question: 'When is payday?', answer: 'Payday is the 25th of every month.', status: 'published' },
  { id: 2, category: 'Leave', question: 'How do I request sick leave?', answer: 'Log it in the portal by 9 AM.', status: 'published' },
  { id: 3, category: 'Policy', question: 'Draft: New Remote Work Policy', answer: 'To be announced.', status: 'draft' },
];

const FAQPage = () => {
  const role = getLocalData('role');
  const [userRole] = useState(role || 'HR_ADMIN'); 
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (item) => {
    setCurrentEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter((faq) => faq.id !== id));
    }
  };

  const handleAddNew = () => {
    setCurrentEditItem(null);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (currentEditItem) {
      setFaqs(faqs.map((f) => (f.id === currentEditItem.id ? { ...f, ...formData } : f)));
    } else {
      setFaqs([...faqs, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase());
    const isVisible = userRole === 'Manager' || userRole === 'HR_ADMIN' ? true : faq.status === 'published';
    return matchesSearch && isVisible;
  });

  return (
    <div className="flex flex-col w-full h-full p-8 gap-6 bg-white dark:bg-slate-800 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Help Center</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Find answers to payroll and HR questions.</p>
        </div>
        
        {/* Action Button - Styled like your "Save" button */}
        {(userRole === 'Manager' || userRole === 'HR_ADMIN') && (
          <div 
            onClick={handleAddNew}
            className="flex bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 items-center cursor-pointer px-5 py-2.5 rounded-md active:scale-95 transition-all shadow-lg"
          >
            <span className="text-xs font-bold uppercase tracking-wider">+ Add Question</span>
          </div>
        )}
      </div>

      <hr className="opacity-10 dark:opacity-5 border-slate-500" />

      {/* Search Bar Container */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          type="text"
          placeholder="Search questions..."
          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-800/60 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 p-1 overflow-y-auto hover-bar lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-2">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <FAQItem 
              key={faq.id} 
              faq={faq} 
              userRole={userRole} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-slate-500 dark:text-slate-500 font-medium">No questions found matching your search.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <FAQModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
          initialData={currentEditItem} 
        />
      )}
    </div>
  );
};

export default FAQPage;