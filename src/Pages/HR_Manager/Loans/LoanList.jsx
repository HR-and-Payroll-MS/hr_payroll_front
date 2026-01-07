
import React, { useState, useEffect } from 'react';
import useAuth from '../../../Context/AuthContext';
import { useLoans } from "../../../api/loans";
import { toast } from "react-hot-toast";
import {
    FaMoneyBillWave,
    FaCheck,
    FaTimes,
    FaPlus,
    FaSpinner,
} from 'react-icons/fa';
import LoanRequestForm from './LoanRequestForm';

const LoanList = () => {
    const { user, axiosPrivate } = useAuth();
    const loansApi = useLoans(axiosPrivate); // Initialize hook
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const isManager = user?.role === 'Manager' || user?.role === 'Admin' || user?.is_staff;

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const data = await loansApi.getAll();
            setLoans(data);
        } catch (error) {
            toast.error('Failed to load loans');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const handleApprove = async (id) => {
        try {
            setIsProcessing(true);
            await loansApi.approve(id);
            toast.success('Loan approved successfully');
            fetchLoans();
        } catch (error) {
            toast.error('Failed to approve loan');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        try {
            setIsProcessing(true);
            await loansApi.reject(id, reason);
            toast.success('Loan rejected');
            fetchLoans();
        } catch (error) {
            toast.error('Failed to reject loan');
        } finally {
            setIsProcessing(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'active': return 'bg-blue-100 text-blue-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    if (loading) return <div className="p-8 text-center"><FaSpinner className="animate-spin mx-auto text-3xl text-blue-600" /></div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaMoneyBillWave className="text-blue-600" />
                    Loan Management
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <FaPlus /> Request Loan
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Employee</th>
                            <th className="p-4 font-semibold text-gray-600">Amount</th>
                            <th className="p-4 font-semibold text-gray-600">Term (Months)</th>
                            <th className="p-4 font-semibold text-gray-600">Installment</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            {isManager && <th className="p-4 font-semibold text-gray-600">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loans.length === 0 ? (
                            <tr><td colSpan="7" className="p-8 text-center text-gray-500">No loan requests found.</td></tr>
                        ) : loans.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{loan.employee_name || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{loan.reason}</div>
                                </td>
                                <td className="p-4 font-medium">${Number(loan.amount).toLocaleString()}</td>
                                <td className="p-4">{loan.term_months}</td>
                                <td className="p-4 text-gray-600">${Number(loan.monthly_installment || 0).toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px - 2 py - 1 rounded - full text - xs font - medium ${getStatusColor(loan.status)} `}>
                                        {loan.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {new Date(loan.created_at).toLocaleDateString()}
                                </td>
                                {isManager && (
                                    <td className="p-4">
                                        {loan.status === 'submitted' || loan.status === 'draft' ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApprove(loan.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition"
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() => handleReject(loan.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                                                    title="Reject"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400">-</span>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <LoanRequestForm
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        fetchLoans();
                    }}
                />
            )}
        </div>
    );
};

export default LoanList;
