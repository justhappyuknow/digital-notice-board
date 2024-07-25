import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your backend URL

const Admin = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [announcementText, setAnnouncementText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [pollData, setPollData] = useState(null);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        // Listen for poll updates
        socket.on('pollData', (data) => {
            setPollData(data);
            setSuccess('Poll data updated');
        });

        // Listen for announcements
        socket.on('announcement', (announcement) => {
            setAnnouncements((prev) => [...prev, announcement]);
            setSuccess('New announcement posted');
        });

        // Cleanup on component unmount
        return () => {
            socket.off('pollData');
            socket.off('announcement');
        };
    }, []);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handlePollSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/polls/update', {
                question,
                options
            });
            setSuccess('Poll updated successfully');
            setError('');
        } catch (error) {
            console.error('Error updating poll:', error.response ? error.response.data : error.message);
            setError('Error updating poll. Please try again.');
            setSuccess('');
        }
    };

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/announce', {
                text: announcementText
            });
            setAnnouncementText(''); // Clear the form
            setSuccess('Announcement posted successfully');
            setError('');
        } catch (error) {
            console.error('Error posting announcement:', error.response ? error.response.data : error.message);
            setError('Error posting announcement. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Page</h1>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {success && <div className="text-green-600 mb-4">{success}</div>}

            <form onSubmit={handlePollSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Update Poll</h2>
                <div className="mb-4">
                    <label htmlFor="question" className="block text-gray-300">Poll Question</label>
                    <input
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded"
                        required
                    />
                </div>
                {options.map((option, index) => (
                    <div key={index} className="mb-4 flex items-center">
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-700 rounded"
                            placeholder={`Option ${index + 1}`}
                            required
                        />
                        {options.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                                className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddOption}
                    className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                    Add Option
                </button>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Update Poll
                </button>
            </form>

            <form onSubmit={handleAnnouncementSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Post Announcement</h2>
                <div className="mb-4">
                    <label htmlFor="announcement" className="block text-gray-300">Announcement Text</label>
                    <textarea
                        id="announcement"
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded"
                        rows="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Post Announcement
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
                {announcements.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {announcements.map((announcement) => (
                            <li key={announcement.id} className="mb-2 text-gray-300">
                                {announcement.text} <span className="text-gray-500">({new Date(announcement.timestamp).toLocaleString()})</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No announcements yet.</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
