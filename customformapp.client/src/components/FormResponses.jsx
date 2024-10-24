import React, { useEffect, useState } from 'react';
import { fetchFormResponses } from '../services/templateService';
import { useParams } from 'react-router-dom';

const FormResponses = () => {
    const { templateId } = useParams();
    const [sortOrder, setSortOrder] = useState('asc');
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const loadResponses = async () => {
            try {
                const data = await fetchFormResponses(templateId);
                setResponses(data);
            } catch (error) {
                console.error('Failed to load responses:', error);
            }
        };

        loadResponses();
    }, [templateId]);

    const handleSort = () => {
        const sortedResponses = [...responses].sort((a, b) =>
            sortOrder === 'asc'
                ? new Date(a.submittedAt) - new Date(b.submittedAt)
                : new Date(b.submittedAt) - new Date(a.submittedAt)
        );
        setResponses(sortedResponses);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div>
            <button onClick={handleSort}>
                Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <h2>Form Responses</h2>
            {responses.length === 0 ? (
                <p>No responses available.</p>
            ) : (
                responses.map((response, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', margin: '10px' }}>
                        <h3>Submitted by: {response.userId}</h3>
                        <p><strong>Submitted at:</strong> {new Date(response.submittedAt).toLocaleString()}</p>
                        <ul>
                            {Object.entries(response.submittedData).map(([question, answer]) => (
                                <li key={question}>
                                    <strong>{question}:</strong> {answer}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default FormResponses;
