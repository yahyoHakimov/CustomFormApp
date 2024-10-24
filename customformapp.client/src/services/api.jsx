import axios from 'axios';

const API_URL = 'https://localhost:7128/api/auth';

export const register = (userData) => {
    console.log(API_URL);
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (userData) => {
    return axios.post(`${API_URL}/login`, userData);
};

export const logout = () => {
    return axios.post(`${API_URL}/logout`);
};
