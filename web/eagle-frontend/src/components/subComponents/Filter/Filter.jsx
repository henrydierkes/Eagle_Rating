import React, { useState, useEffect } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    // Example predefined tags for suggestions
    const predefinedTags = [
        'buddy', 'singing-wind', 'guards', 'soul', 'bender',
        'burger', 'zoidberg', 'wizards', 'morbo', 'god', 'robot', 'minion'
    ];

    useEffect(() => {
        if (inputTag) {
            const filteredSuggestions = predefinedTags.filter(tag =>
                tag.toLowerCase().includes(inputTag.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [inputTag]);

    const handleAddTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags(prevTags => [...prevTags, tag]);
            setInputTag(''); // Clear input after adding tag
            setShowSuggestions(false);
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="sidebar">
            <h2>Filter by tags</h2>
            <div className="tags-container">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                        <button onClick={() => removeTag(tag)}>x</button>
                    </span>
                ))}
            </div>
            <input 
                className='textinput'
                type="text"
                placeholder="Add tag"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(inputTag);
                    }
                }}
            />
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleAddTag(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            <button className='add-tag-button' onClick={() => handleAddTag(inputTag)}>Add Tag</button>
        </div>
    );
};

export default Filter;
