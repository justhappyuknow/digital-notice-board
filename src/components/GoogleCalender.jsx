import React from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const GoogleCalendar = ({ onClose }) => {
    const calendarUrl = 'https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata'; // Replace with your calendar embed URL

    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/google-calendar.png" // Path to your Google Calendar logo
                    alt="Google Calendar"
                    className="absolute top-4 right-12 w-12 h-12"
                />
                <h2 className="text-xl font-semibold mb-4 text-white">Google Calendar</h2>
                <iframe
                    src={calendarUrl}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                    className="rounded-lg shadow-md"
                    title="Google Calendar"
                ></iframe>
            </div>
        </Draggable>
    );
};

export default GoogleCalendar;
