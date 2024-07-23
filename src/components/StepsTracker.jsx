import React, { useState, useEffect } from 'react';

const StepsTracker = () => {
    const [steps, setSteps] = useState([]);
    const [dailySteps, setDailySteps] = useState('');

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

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Steps Tracker</h2>
            <div className="flex mb-4">
                <input
                    type="number"
                    value={dailySteps}
                    onChange={(e) => setDailySteps(e.target.value)}
                    placeholder="Enter daily steps"
                    className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <li key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                        <span className="text-gray-700">{entry.date}</span>
                        <span className="text-gray-700">{entry.steps} steps</span>
                    </li>
                ))}
            </ul>
            {steps.length > 0 && (
                <div className="mt-4">
                    <p className="text-gray-600">
                        Total Steps: {totalSteps}
                    </p>
                </div>
            )}
        </div>
    );
};

export default StepsTracker;
