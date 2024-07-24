import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Replace with your server URL

const AnnouncementWidget = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        // Listen for announcements from the server
        socket.on('announcement', (announcement) => {
            console.log('Received announcement:', announcement); // Log received announcements
            setAnnouncements((prevAnnouncements) => [announcement, ...prevAnnouncements]);
        });

        // Emit initial announcements
        socket.on('initialAnnouncements', (initialAnnouncements) => {
            console.log('Initial announcements:', initialAnnouncements); // Log initial announcements
            setAnnouncements(initialAnnouncements);
        });

        return () => {
            socket.off('announcement');
            socket.off('initialAnnouncements');
        };
    }, []);

    const handleClose = (id) => {
        console.log('Closing announcement with id:', id); // Log the id of the announcement being closed
        setAnnouncements((prevAnnouncements) => prevAnnouncements.filter((ann) => ann.id !== id));
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Announcements</h2>
            <div>
                {announcements.map((ann) => (
                    <div key={ann.id} className="mb-2 p-2 bg-gray-700 rounded relative">
                        <button
                            onClick={() => handleClose(ann.id)}
                            className="absolute top-1 right-1 text-red-500"
                        >
                            Close
                        </button>
                        <p>{ann.text}</p>
                        <span className="text-gray-400 text-sm">{new Date(ann.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementWidget;
