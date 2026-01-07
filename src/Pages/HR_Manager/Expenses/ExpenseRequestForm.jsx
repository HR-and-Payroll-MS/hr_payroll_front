
import React, { useState } from "react";
import { useExpenses } from "../../../api/expenses";
import { toast } from "react-hot-toast";
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

const ExpenseRequestForm = ({ onClose, onSuccess }) => {
    const expensesApi = useExpenses(); // Initialize hook

    const [formData, setFormData] = useState({
        category: 'other',
        amount: '',
        expense_date: '',
        description: '',
        receipt: null,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await expensesApi.create({
                ...formData,
                status: 'submitted' // Auto-submit
            });
            toast.success('Expense claim submitted successfully');
            onSuccess();
        } catch (error) {
            const msg = error.response?.data?.non_field_errors?.[0] ||
                error.response?.data?.detail ||
                'Failed to submit claim';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800">New Expense Claim</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="travel">Travel</option>
                            <option value="meals">Meals</option>
                            <option value="accommodation">Accommodation</option>
                            <option value="supplies">Office Supplies</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input
                                type="number"
                                required
                                min="0.01"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={formData.expense_date}
                                onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            rows="2"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What was this expense for?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Receipt (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition relative">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setFormData({ ...formData, receipt: e.target.files[0] })}
                                accept="image/*,.pdf"
                            />
                            <FaCloudUploadAlt className="mx-auto text-gray-400 text-2xl mb-1" />
                            <span className="text-sm text-gray-500">
                                {formData.receipt ? formData.receipt.name : 'Click to upload receipt'}
                            </span>
                        </div>
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
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? 'Submitting...' : 'Submit Claim'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseRequestForm;
