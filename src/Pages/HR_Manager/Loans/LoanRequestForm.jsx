import React, { useState } from 'react';
import { useLoans } from '../../../api/loans';
import { toast } from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const LoanRequestForm = ({ onClose, onSuccess }) => {
    const loansApi = useLoans(); // Initialize hook
    const [formData, setFormData] = useState({
        amount: '',
        term_months: '',
        reason: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loansApi.create({
                ...formData,
                status: 'submitted' // Auto-submit
            });
            toast.success('Loan request submitted successfully');
            onSuccess();
        } catch (error) {
            const msg = error.response?.data?.non_field_errors?.[0] ||
                error.response?.data?.detail ||
                'Failed to submit request';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800">New Loan Request</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input
                            type="number"
                            required
                            min="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Repayment Term (Months)</label>
                        <input
                            type="number"
                            required
                            min="1"
                            max="60"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={formData.term_months}
                            onChange={(e) => setFormData({ ...formData, term_months: e.target.value })}
                            placeholder="e.g. 12"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                        <textarea
                            required
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            placeholder="Why do you need this loan?"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanRequestForm;
