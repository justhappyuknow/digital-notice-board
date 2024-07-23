import React, { useState } from 'react';

const TILCorner = () => {
    const [tilEntries, setTilEntries] = useState([
        { id: 1, title: 'Understanding React Hooks', summary: 'Learned about the basic principles of React Hooks from "React Hooks in Action".', domain: 'Technology' },
        { id: 2, title: 'Effective Leadership', summary: 'Summary of "The 7 Habits of Highly Effective People" on leadership principles.', domain: 'Business' },
        { id: 3, title: 'NodeJs Architecture', summary: 'Gained practical knowledge of "How NodeJs works"', domain: 'Technology' },
        { id: 4, title: 'Skills', summary: 'Techniques to communicate with clients', domain: 'Business' },
        // Add more entries as needed
    ]);

    const [filter, setFilter] = useState('');
    const [showAll, setShowAll] = useState(false);

    const filteredEntries = tilEntries.filter(entry =>
        entry.domain.toLowerCase().includes(filter.toLowerCase())
    );

    const displayedEntries = showAll ? filteredEntries : filteredEntries.slice(0, 1); // Show only the first 3 entries initially

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">TIL Corner</h2>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter by domain"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul className="space-y-4">
                {displayedEntries.length > 0 ? (
                    displayedEntries.map(entry => (
                        <li key={entry.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold">{entry.title}</h3>
                            <p className="text-gray-700 mt-2">{entry.summary}</p>
                            <span className="block mt-2 text-sm text-gray-500">{entry.domain}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No entries found.</p>
                )}
            </ul>
            {filteredEntries.length > 3 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-4 text-blue-500 hover:underline"
                >
                    {showAll ? 'Show Less' : 'Show More'}
                </button>
            )}
        </div>
    );
};

export default TILCorner;
