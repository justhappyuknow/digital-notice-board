import React from 'react';

const GoogleCalendar = () => {
    const calendarUrl = 'https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com&ctz=Asia%2FKolkata'; // Replace with your calendar embed URL

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Google Calendar</h2>
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
    );
};

export default GoogleCalendar;
