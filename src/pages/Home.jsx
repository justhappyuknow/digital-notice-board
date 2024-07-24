import React, { useState } from 'react';
import GoogleSlides from '../components/GoogleSlides';
import PomodoroTimer from '../components/PomodoroTimer';
// Import other components

const Home = () => {
    const [widgets, setWidgets] = useState({
        googleSlides: true,
        pomodoroTimer: true,
        // Add other widgets here
    });

    const handleRemove = (widget) => {
        setWidgets(prevState => ({
            ...prevState,
            [widget]: false,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6">Digital Notice Board</h1>
            <div className="w-full max-w-8xl grid grid-cols-1 md:grid-cols-4 gap-6">
                {widgets.googleSlides && (
                    <GoogleSlides onRemove={() => handleRemove('googleSlides')} />
                )}
                {widgets.pomodoroTimer && (
                    <PomodoroTimer onRemove={() => handleRemove('pomodoroTimer')} />
                )}
                {/* Render other widgets based on the state */}
            </div>
        </div>
    );
};

export default Home;
