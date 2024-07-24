import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const GoogleMeet = ({ onClose }) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events'); // Replace with your actual API endpoint
                const data = await response.json();
                if (Array.isArray(data.items)) {
                    setMeetings(data.items);
                } else {
                    console.error('Expected an array, but got:', data);
                    setMeetings([]); // Set to an empty array or handle as needed
                }
            } catch (error) {
                console.error('Error fetching meetings:', error);
                setMeetings([]); // Set to an empty array or handle as needed
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
                        meetings.map((meeting, index) => (
                            <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm mb-4 bg-white bg-opacity-60">
                                <h3 className="text-lg font-semibold">{meeting.summary}</h3>
                                <p className="text-gray-700 mt-2">{meeting.startTime} - {meeting.endTime}</p>
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
