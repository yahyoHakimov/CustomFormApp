import axios from 'axios';

const API_URL = 'https://localhost:7128/api/admin'; // Adjust to your backend

export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const blockUser = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/block`, { userId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const unblockUser = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/unblock`, { userId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        const response = await axios.put(`${API_URL}/role`, { userId, role });
        return response.data;
    } catch (error) {
        throw error;
    }
};
