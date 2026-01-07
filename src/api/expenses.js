import useAuth from '../Context/AuthContext';

const endpoints = {
    expenses: '/expenses/expenses/',
};

export const useExpenses = () => {
    const { axiosPrivate } = useAuth();

    return {
        // List all expenses (scoped by user role on backend)
        getAll: async () => {
            const response = await axiosPrivate.get(endpoints.expenses);
            return response.data;
        },

        // Get single expense details
        getById: async (id) => {
            const response = await axiosPrivate.get(`${endpoints.expenses}${id}/`);
            return response.data;
        },

        // Create a new expense request
        create: async (data) => {
            // Handle file upload for receipt
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    formData.append(key, data[key]);
                }
            });

            const response = await axiosPrivate.post(endpoints.expenses, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },

        // Approve an expense (Admin/Manager only)
        approve: async (id) => {
            const response = await axiosPrivate.post(`${endpoints.expenses}${id}/approve/`);
            return response.data;
        },

        // Reject an expense (Admin/Manager only)
        reject: async (id, reason) => {
            const response = await axiosPrivate.post(`${endpoints.expenses}${id}/reject/`, { reason });
            return response.data;
        },

        // Reimburse an expense (Admin/Manager only)
        reimburse: async (id) => {
            const response = await axiosPrivate.post(`${endpoints.expenses}${id}/reimburse/`);
            return response.data;
        },
    };
};
