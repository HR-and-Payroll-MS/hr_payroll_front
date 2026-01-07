
import React, { useState, useEffect } from 'react';
import useAuth from '../../../Context/AuthContext';
import { useExpenses } from '../../../api/expenses';
import { toast } from 'react-hot-toast';
import {
    FaReceipt,
    FaCheck,
    FaTimes,
    FaPlus,
    FaSpinner,
    FaFileInvoiceDollar,
    FaPaperclip,
} from 'react-icons/fa';
import ExpenseRequestForm from './ExpenseRequestForm';

const ExpenseList = () => {
    const { user, axiosPrivate } = useAuth();
    const expensesApi = useExpenses(axiosPrivate); // Initialize hook
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const isManager = user?.role === 'Manager' || user?.role === 'Admin' || user?.is_staff;

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await expensesApi.getAll();
            setExpenses(data);
        } catch (error) {
            toast.error('Failed to load expenses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleApprove = async (id) => {
        try {
            setIsProcessing(true);
            await expensesApi.approve(id);
            toast.success('Expense approved');
            fetchExpenses();
        } catch (error) {
            toast.error('Failed to approve expense');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        try {
            setIsProcessing(true);
            await expensesApi.reject(id, reason);
            toast.success('Expense rejected');
            fetchExpenses();
        } catch (error) {
            toast.error('Failed to reject expense');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReimburse = async (id) => {
        try {
            setIsProcessing(true);
            await expensesApi.reimburse(id);
            toast.success('Expense marked as reimbursed');
            fetchExpenses();
        } catch (error) {
            toast.error('Failed to reimburse expense');
        } finally {
            setIsProcessing(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'reimbursed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div className="p-8 text-center"><FaSpinner className="animate-spin mx-auto text-3xl text-blue-600" /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaReceipt className="text-purple-600" />
                    Expense Claims
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
                >
                    <FaPlus /> New Claim
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Employee</th>
                            <th className="p-4 font-semibold text-gray-600">Category</th>
                            <th className="p-4 font-semibold text-gray-600">Amount</th>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            <th className="p-4 font-semibold text-gray-600">Receipt</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            {isManager && <th className="p-4 font-semibold text-gray-600">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {expenses.length === 0 ? (
                            <tr><td colSpan="7" className="p-8 text-center text-gray-500">No expense claims found.</td></tr>
                        ) : expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{expense.employee_name || 'N/A'}</div>
                                    <div className="text-xs text-gray-500 truncate w-40">{expense.description}</div>
                                </td>
                                <td className="p-4 capitalize">{expense.category}</td>
                                <td className="p-4 font-medium">${Number(expense.amount).toLocaleString()}</td>
                                <td className="p-4 text-sm text-gray-500">{expense.expense_date}</td>
                                <td className="p-4">
                                    {expense.receipt ? (
                                        <a
                                            href={expense.receipt}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                                        >
                                            <FaPaperclip /> View
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-sm">No Receipt</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`px - 2 py - 1 rounded - full text - xs font - medium ${getStatusColor(expense.status)} `}>
                                        {expense.status.toUpperCase()}
                                    </span>
                                </td>
                                {isManager && (
                                    <td className="p-4 flex gap-2">
                                        {expense.status === 'submitted' || expense.status === 'draft' ? (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(expense.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(expense.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                                    title="Reject"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </>
                                        ) : expense.status === 'approved' ? (
                                            <button
                                                onClick={() => handleReimburse(expense.id)}
                                                disabled={isProcessing}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                                title="Mark Reimbursed"
                                            >
                                                <FaFileInvoiceDollar />
                                            </button>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <ExpenseRequestForm
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        fetchExpenses();
                    }}
                />
            )}
        </div>
    );
};

export default ExpenseList;
