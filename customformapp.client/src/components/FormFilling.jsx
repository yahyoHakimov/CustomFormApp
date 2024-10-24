import React, { useState, useEffect } from 'react';
import { fetchTemplateById } from '../services/templateService';
import { useParams } from 'react-router-dom';

const FormFilling = () => {
    const { id } = useParams(); // Assumes the route includes the template ID
    const [template, setTemplate] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const fetchedTemplate = await fetchTemplateById(id);
                setTemplate(fetchedTemplate);

                // Initialize form data with empty values
                const initialData = {};
                fetchedTemplate.questions.forEach((question) => {
                    initialData[question.title] = '';
                });
                setFormData(initialData);
            } catch (error) {
                console.error('Error loading template:', error);
            }
        };
        loadTemplate();
    }, [id]);

    const handleChange = (e, question) => {
        const { type, value, checked } = e.target;
        setFormData({
            ...formData,
            [question.title]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitFormResponse(id, formData); // Submit the form data to the backend
            alert('Form submitted successfully!');
            setFormData({}); // Reset form after submission
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form');
        }
    };

    if (!template) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Fill out the form for: {template.title}</h2>
            <form onSubmit={handleSubmit}>
                {template.questions.map((question, index) => (
                    <div key={index}>
                        <label>{question.title}</label>
                        {question.type === 'text' && (
                            <input
                                type="text"
                                value={formData[question.title] || ''}
                                onChange={(e) => handleChange(e, question)}
                            />
                        )}
                        {question.type === 'textarea' && (
                            <textarea
                                value={formData[question.title] || ''}
                                onChange={(e) => handleChange(e, question)}
                            />
                        )}
                        {question.type === 'integer' && (
                            <input
                                type="number"
                                min="0"
                                value={formData[question.title] || ''}
                                onChange={(e) => handleChange(e, question)}
                            />
                        )}
                        {question.type === 'checkbox' && (
                            <input
                                type="checkbox"
                                checked={!!formData[question.title]}
                                onChange={(e) => handleChange(e, question)}
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Submit Form</button>
            </form>
        </div>
    );
};

export default FormFilling;
