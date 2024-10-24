import axios from 'axios';

const API_URL = 'https://localhost:7128/api/templates'; // Adjust this URL to your API endpoint

// Helper function to add authorization headers
const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// Create a new template
export const createTemplate = async (templateData, token) => {
    try {
        const response = await axios.post(`${API_URL}/create`, templateData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error('Error creating template:', error);
        throw error;
    }
};

// Fetch all templates
export const fetchTemplates = async (token) => {
    try {
        const response = await axios.get(`${API_URL}`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
};

// Fetch a single template by ID
export const fetchTemplateById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error('Error fetching template:', error);
        throw error;
    }
};

// Update a template
export const updateTemplate = async (id, templateData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, templateData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error('Error updating template:', error);
        throw error;
    }
};

// Delete a template
export const deleteTemplate = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error('Error deleting template:', error);
        throw error;
    }
};

export const submitFormResponse = async (templateId, formData) => {
    return await axios.post(`/api/templates/${templateId}/submit`, {
        answers: formData,
    });
};
