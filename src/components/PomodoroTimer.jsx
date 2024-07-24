import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable'; // Import Draggable
import { FaTimes } from 'react-icons/fa'; // Import the close icon

const PomodoroTimer = ({ onRemove }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [initialMinutes, setInitialMinutes] = useState(25);

    useEffect(() => {
        let timer;
        if (isActive) {
            timer = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    setIsActive(false);
                    alert("Pomodoro session complete!");
                }
            }, 1000);
        } else if (!isActive && (seconds !== 0 || minutes !== 0)) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isActive, seconds, minutes]);

    const startTimer = () => {
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(initialMinutes);
        setSeconds(0);
    };

    const handleDurationChange = (event) => {
        const newDuration = parseInt(event.target.value, 10);
        setInitialMinutes(newDuration);
        setMinutes(newDuration);
        setSeconds(0);
    };

    return (
        <Draggable>
            <div className="bg-white shadow-md rounded-lg p-4 relative">
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Pomodoro Timer</h2>
                <div className="text-center mb-4">
                    <label htmlFor="duration" className="block text-lg mb-2">Set Duration (minutes):</label>
                    <input
                        id="duration"
                        type="number"
                        value={initialMinutes}
                        onChange={handleDurationChange}
                        min="1"
                        className="border p-2 rounded"
                    />
                </div>
                <div className="text-center mb-4">
                    <p className="text-4xl mb-4">
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                    <button
                        onClick={startTimer}
                        disabled={isActive}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                    >
                        Start
                    </button>
                    <button
                        onClick={resetTimer}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </Draggable>
    );
};

export default PomodoroTimer;
