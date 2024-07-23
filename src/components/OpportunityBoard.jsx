// src/components/OpportunityBoard.jsx
import React, { useState, useEffect } from 'react';

const OpportunityBoard = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [newOpportunity, setNewOpportunity] = useState('');

    useEffect(() => {
        // Fetch saved opportunities from local storage or API
        const savedOpportunities = JSON.parse(localStorage.getItem('opportunityBoard')) || [];
        setOpportunities(savedOpportunities);
    }, []);

    useEffect(() => {
        // Save opportunities to local storage or API
        localStorage.setItem('opportunityBoard', JSON.stringify(opportunities));
    }, [opportunities]);

    const handleAddOpportunity = () => {
        if (newOpportunity.trim()) {
            setOpportunities([...opportunities, { text: newOpportunity }]);
            setNewOpportunity('');
        }
    };

    const handleRemoveOpportunity = (index) => {
        const updatedOpportunities = opportunities.filter((_, i) => i !== index);
        setOpportunities(updatedOpportunities);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Opportunity Board</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newOpportunity}
                    onChange={(e) => setNewOpportunity(e.target.value)}
                    placeholder="Describe the opportunity"
                    className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAddOpportunity}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                        <span className="text-gray-700">{opportunity.text}</span>
                        <button
                            onClick={() => handleRemoveOpportunity(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            {opportunities.length === 0 && (
                <p className="text-gray-500 mt-4">No opportunities posted yet.</p>
            )}
        </div>
    );
};

export default OpportunityBoard;
