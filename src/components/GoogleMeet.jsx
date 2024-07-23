import React, { useState, useEffect } from 'react';

const GoogleMeet = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch('http://localhost:4000/calendar/events'); // Ensure the URL is correct
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMeetings(data);
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
        <div className="google-meet-widget bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Google Meet Schedule</h2>
            <ul>
                {meetings.length > 0 ? (
                    meetings.map((meeting) => (
                        <li key={meeting.id} className="p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
                            <h3 className="text-lg font-semibold">{meeting.summary}</h3>
                            <p className="text-gray-700 mt-2">
                                {meeting.start.dateTime ?
                                    `${new Date(meeting.start.dateTime).toLocaleString()} - ${new Date(meeting.end.dateTime).toLocaleString()}` :
                                    `${new Date(meeting.start.date).toLocaleDateString()} - ${new Date(meeting.end.date).toLocaleDateString()}`}
                            </p>
                            {meeting.hangoutLink && (
                                <a href={meeting.hangoutLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                                    Join Google Meet
                                </a>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No meetings scheduled.</p>
                )}
            </ul>
        </div>
    );
};

export default GoogleMeet;
