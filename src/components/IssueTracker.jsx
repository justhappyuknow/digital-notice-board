import React, { useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

const IssueTracker = ({ onClose }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [issue, setIssue] = useState('');
    const [message, setMessage] = useState('');

    const handleDrag = (e, ui) => {
        const { x, y } = ui;
        setPosition({ x, y });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/issues/submit', {
                name,
                email,
                issue
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to submit issue');
        }
    };

    return (
        <Draggable position={position} onDrag={handleDrag} handle=".handle">
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <div className="handle cursor-move absolute top-0 left-0 right-0 h-8 bg-gray-200 rounded-t-lg"></div>
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-4 mt-4">Issue Tracker</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-red-300 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-red-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-red-300 text-sm font-bold mb-2" htmlFor="issue">
                            Issue
                        </label>
                        <textarea
                            id="issue"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="mt-4 text-green-500">{message}</div>
                </form>
            </div>
        </Draggable>
    );
};

export default IssueTracker;