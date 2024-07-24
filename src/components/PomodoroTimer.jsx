import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const PomodoroTimer = ({ onClose }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

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
                    if (isBreak) {
                        alert("Break session complete!");
                        setIsBreak(false);
                        setMinutes(25); // Reset to Pomodoro session
                    } else {
                        alert("Pomodoro session complete!");
                        setIsBreak(true);
                        setMinutes(5); // Start Short Break
                    }
                    setSeconds(0);
                }
            }, 1000);
        } else if (!isActive && (seconds !== 0 || minutes !== 0)) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isActive, seconds, minutes, isBreak]);

    const startTimer = () => {
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);

        setIsBreak(false);
        setMinutes(25);

        setMinutes(initialMinutes);
        setSeconds(0);
    };

    const handleDurationChange = (event) => {
        const newDuration = parseInt(event.target.value, 10);
        setInitialMinutes(newDuration);
        setMinutes(newDuration);

        setSeconds(0);
    };

    const startShortBreak = () => {
        setIsActive(true);
        setIsBreak(true);
        setMinutes(5);
        setSeconds(0);
    };

    const startLongBreak = () => {
        setIsActive(true);
        setIsBreak(true);
        setMinutes(10);
        setSeconds(0);
    };

    return (
        <Draggable>

            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-10 border-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/timer.png" // Path to your timer logo
                    alt="Timer"
                    className="absolute top-4 left-5 w-15 h-12"
                />
                <h2 className="text-2xl text-cyan-400 font-semibold mb-6 text-center">
                    {isBreak ? 'Break Time' : 'Pomodoro Timer'}
                </h2>
                <div className="text-center mb-4">
                    <p className="text-5xl font-bold mb-4">

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

                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200"

                        disabled={isActive}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"

                    >
                        Start
                    </button>
                    <button
                        onClick={resetTimer}

                        className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200 ml-4"

                        className="bg-red-500 text-white px-4 py-2 rounded"

                    >
                        Reset
                    </button>
                </div>

                <div className="text-center">
                    <button
                        onClick={startShortBreak}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 mr-4"
                    >
                        Short Break
                    </button>
                    <button
                        onClick={startLongBreak}
                        className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
                    >
                        Long Break
                    </button>
                </div>

            </div>
        </Draggable>
    );
};

export default PomodoroTimer;
