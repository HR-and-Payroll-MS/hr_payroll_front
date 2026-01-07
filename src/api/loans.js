import useAuth from '../Context/AuthContext';

const endpoints = {
    loans: '/loans/loans/',
};

export const useLoans = () => {
    const { axiosPrivate } = useAuth();

    return {
        // List all loans (scoped by user role on backend)
        getAll: async () => {
            const response = await axiosPrivate.get(endpoints.loans);
            return response.data;
        },

        // Get single loan details
        getById: async (id) => {
            const response = await axiosPrivate.get(`${endpoints.loans}${id}/`);
            return response.data;
        },

        // Create a new loan request
        create: async (data) => {
            const response = await axiosPrivate.post(endpoints.loans, data);
            return response.data;
        },

        // Approve a loan (Admin/Manager only)
        approve: async (id) => {
            const response = await axiosPrivate.post(`${endpoints.loans}${id}/approve/`);
            return response.data;
        },

        // Reject a loan (Admin/Manager only)
        reject: async (id, reason) => {
            const response = await axiosPrivate.post(`${endpoints.loans}${id}/reject/`, { reason });
            return response.data;
        },
    };
};
