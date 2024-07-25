import React, { useState } from 'react';

const WidgetAdder = ({ visibleWidgets, onAdd }) => {
    const [showModal, setShowModal] = useState(false);
    const hiddenWidgets = Object.keys(visibleWidgets).filter(key => !visibleWidgets[key]);

    return (
        <div className="fixed bottom-10 right-10">
            <button className="p-4 bg-blue-500 text-white rounded-full" onClick={() => setShowModal(true)}>
                +
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-2xl mb-4">Add Widgets</h2>
                        <ul>
                            {hiddenWidgets.map(widget => (
                                <li key={widget}>
                                    <button className="p-2 bg-green-500 text-white rounded mb-2" onClick={() => {
                                        onAdd(widget);
                                        setShowModal(false);
                                    }}>
                                        {widget.replace(/([A-Z])/g, ' $1').trim()}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WidgetAdder;
