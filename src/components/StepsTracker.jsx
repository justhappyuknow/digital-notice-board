import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StepsTracker = ({ onClose }) => {
    const [steps, setSteps] = useState([]);
    const [dailySteps, setDailySteps] = useState('');
    const [goal, setGoal] = useState(5000); // Default step goal

    useEffect(() => {
        const savedSteps = JSON.parse(localStorage.getItem('stepsData')) || [];
        setSteps(savedSteps);
    }, []);

    useEffect(() => {
        localStorage.setItem('stepsData', JSON.stringify(steps));
    }, [steps]);

    const handleAddSteps = () => {
        if (dailySteps.trim()) {
            const today = new Date().toLocaleDateString();
            setSteps([...steps, { date: today, steps: parseInt(dailySteps) }]);
            setDailySteps('');
        }
    };

    const totalSteps = steps.reduce((total, entry) => total + entry.steps, 0);
    const percentage = Math.min((totalSteps / goal) * 100, 100);

    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-20 border-gray-100 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="../public/step-tracker.png" // Path to your Steps Tracker logo
                    alt="Steps Tracker"
                    className="absolute top-4 right-9 w-12 h-12"
                />
                <h2 className="text-xl font-semibold mb-4 text-white">Steps Tracker</h2>
                <div className="flex mb-4">
                    <input
                        type="number"
                        value={dailySteps}
                        onChange={(e) => setDailySteps(e.target.value)}
                        placeholder="Enter daily steps"
                        className="border text-black border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddSteps}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2">
                    {steps.map((entry, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-white bg-opacity-50 border border-gray-200 rounded-lg">
                            <span className="text-white">{entry.date}</span>
                            <span className="text-white">{entry.steps} steps</span>
                        </li>
                    ))}
                </ul>
                {steps.length > 0 && (
                    <div className="mt-4">
                        <p className="text-white">Total Steps: {totalSteps}</p>
                    </div>
                )}
                <div className="mt-4">
                    <CircularProgressbar
                        value={percentage}
                        text={`${Math.round(percentage)}%`}
                        styles={buildStyles({
                            textColor: "white",
                            pathColor: "blue",
                            trailColor: "gray"
                        })}
                    />
                </div>
            </div>
        </Draggable>
    );
};

export default StepsTracker;
