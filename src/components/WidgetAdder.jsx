import React, { useState } from 'react';

const WidgetAdder = ({ visibleWidgets, onAdd }) => {
    const [showModal, setShowModal] = useState(false);
    const hiddenWidgets = Object.keys(visibleWidgets).filter(key => !visibleWidgets[key]);

    return (
        <div className="fixed bottom-10 right-10">
            <button 
                className="p-5 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 animate-bounce"
                onClick={() => setShowModal(true)}
            >
                <span className="text-3xl">+</span>
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                        <button 
                            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setShowModal(false)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <h2 className="text-3xl mb-6 text-center font-semibold text-gray-700">Add Widgets</h2>
                        <ul className="space-y-4">
                            {hiddenWidgets.map(widget => (
                                <li key={widget}>
                                    <button 
                                        className="w-full p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
                                        onClick={() => {
                                            onAdd(widget);
                                            setShowModal(false);
                                        }}
                                    >
                                        {widget.replace(/([A-Z])/g, ' $1').trim()}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button 
                            className="mt-6 w-full p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WidgetAdder;