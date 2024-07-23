import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

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
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Pomodoro Timer</h2>
            <div className="text-center">
                <p className="text-4xl mb-4">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </p>
                <button
                    onClick={startTimer}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
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
    );
};

export default PomodoroTimer;
