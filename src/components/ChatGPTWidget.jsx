import React, { useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const ChatGPTWidget = ({ onClose }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: input,
                max_tokens: 150,
            }, {
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY`, // Replace YOUR_API_KEY with your actual API key
                    'Content-Type': 'application/json',
                },
            });

            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error('Error fetching response from ChatGPT:', error);
            setResponse('Sorry, something went wrong.');
        }
    };

    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/chatgpt-icon.png" // Path to your ChatGPT icon
                    alt="ChatGPT"
                    className="absolute top-4 right-12 w-12 h-12"
                />
                <h2 className="text-2xl font-semibold mb-4 text-white">ChatGPT</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="text-black w-full p-2 rounded-lg border border-gray-300 mb-2"
                        placeholder="Ask me anything..."
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Submit
                    </button>
                </form>
                <div className="bg-gray-100 text-black p-4 rounded-lg">
                    {response ? (
                        <p>{response}</p>
                    ) : (
                        <p className="text-gray-500">Your response will appear here...</p>
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default ChatGPTWidget;
