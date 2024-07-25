import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const GoogleMeet = ({ onClose }) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch('http://localhost:4000/calendar/meetings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMeetings(data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
                setMeetings([]); // Handle as needed
            }
        };

        fetchMeetings();
    }, []);

    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/google-meet.png" // Path to your Google Meet logo
                    alt="Google Meet"
                    className="absolute top-4 right-12 w-12 h-12"
                />
                <h2 className="text-xl font-semibold mb-4 text-white">Google Meet Schedule</h2>
                <ul>
                    {meetings.length > 0 ? (
                        meetings.map((meeting) => (
                            <li key={meeting.id} className="p-4 border border-gray-200 rounded-lg shadow-sm mb-4 bg-white bg-opacity-60">
                                <h3 className="text-lg font-semibold">{meeting.summary}</h3>
                                <p className="text-gray-700 mt-2">
                                    {meeting.start ? new Date(meeting.start).toLocaleString() : 'No start time'} -
                                    {meeting.end ? new Date(meeting.end).toLocaleString() : 'No end time'}
                                </p>
                                {meeting.joinLink && meeting.joinLink !== 'No link available' ? (
                                    <a href={meeting.joinLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        Join Meeting
                                    </a>
                                ) : (
                                    <p className="text-gray-500">No link available</p>
                                )}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No meetings scheduled.</p>
                    )}
                </ul>
            </div>
        </Draggable>
    );
};

export default GoogleMeet;
