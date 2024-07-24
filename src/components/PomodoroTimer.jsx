import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const PomodoroTimer = ({ onClose }) => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

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
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                    <button
                        onClick={startTimer}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    >
                        Start
                    </button>
                    <button
                        onClick={resetTimer}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200 ml-4"
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
