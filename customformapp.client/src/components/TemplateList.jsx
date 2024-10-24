import React, { useEffect, useState } from 'react';
import { fetchTemplates } from '../services/templateService';
import { Link } from 'react-router-dom';

const TemplateList = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const getTemplates = async () => {
            try {
                const fetchedTemplates = await fetchTemplates();
                setTemplates(fetchedTemplates);
            } catch (error) {
                console.error('Failed to fetch templates:', error);
            }
        };

        getTemplates();
    }, []);

    return (
        <div>
            <h2>Templates</h2>
            {templates.length === 0 ? (
                <p>No templates available.</p>
            ) : (
                    <ul>
                        {templates.map((template) => (
                            <li key={template.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                                <h3>{template.title}</h3>
                                <p><strong>Description:</strong> {template.description}</p>
                                <p><strong>Topic:</strong> {template.topic}</p>
                                {template.imageUrl && (
                                    <div>
                                        <strong>Image:</strong>
                                        <img src={template.imageUrl} alt={template.title} style={{ maxWidth: '200px', height: 'auto' }} />
                                    </div>
                                )}
                                <p><strong>Tags:</strong> {template.tags.join(', ')}</p>
                                <p><strong>Visibility:</strong> {template.visibility}</p>
                                <div>
                                    <strong>Questions:</strong>
                                    <ul>
                                        {template.questions.map((q, index) => (
                                            <li key={index}>{q.title} ({q.type})</li>
                                        ))}
                                    </ul>
                                </div>
                                <Link to={`/fill-form/${template.id}`}>Fill Form</Link>
                            </li>
                        ))}
                    </ul>

            )}
        </div>
    );
};

export default TemplateList;
