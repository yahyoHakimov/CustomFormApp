import React, { useState } from 'react';
import { createTemplate } from '../services/templateService';

const TemplateForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [visibility, setVisibility] = useState('public');
    const [questions, setQuestions] = useState([]);

    const [newTag, setNewTag] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleTagAdd = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleTagRemove = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };


    const addQuestion = (type) => {
        setQuestions([...questions, { type, title: '', description: '', isVisible: true }]);
    };

    const handleQuestionChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionRemove = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const templateData = { title, description, topic, tags, visibility, questions };

        try {
            await createTemplate(templateData);
            alert('Template created successfully');
            setTitle('');
            setDescription('');
            setTopic('');
            setTags([]);
            setVisibility('public');
            setImage(null);
            setQuestions([]); // Reset questions
        } catch (error) {
            alert('Failed to create template');
        }
    };


    return (
        <div>
            <h2>Create a Template</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                >
                    <option value="" disabled>Select a topic</option>
                    <option value="topic1">Topic 1</option>
                    <option value="topic2">Topic 2</option>
                    <option value="topic3">Topic 3</option>
                </select>
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                <div>
                    <input
                        type="text"
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                    />
                    <button type="button" onClick={handleTagAdd}>Add Tag</button>
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag}>
                                {tag}
                                <button type="button" onClick={() => handleTagRemove(tag)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="public"
                            checked={visibility === 'public'}
                            onChange={() => setVisibility('public')}
                        />
                        Public
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="private"
                            checked={visibility === 'private'}
                            onChange={() => setVisibility('private')}
                        />
                        Private
                    </label>
                </div>
                <button type="submit">Create Template</button>
            </form>

            <div>
                <h3>Questions</h3>
                {questions.map((question, index) => (
                    <div key={index}>
                        <select
                            value={question.type}
                            onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                        >
                            <option value="text">Single-Line</option>
                            <option value="textarea">Multi-Line</option>
                            <option value="integer">Integer</option>
                            <option value="checkbox">Checkbox</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Question Title"
                            value={question.title}
                            onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                        />
                        <textarea
                            placeholder="Question Description"
                            value={question.description}
                            onChange={(e) => handleQuestionChange(index, 'description', e.target.value)}
                        />
                        <button type="button" onClick={() => handleQuestionRemove(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addQuestion('text')}>Add Question</button>
            </div>
        </div>

    );
};

export default TemplateForm;
