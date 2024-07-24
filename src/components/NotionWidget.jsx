import React, { useState } from 'react';
import Draggable from 'react-draggable';

const NotionWidget = ({ onClose }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e, ui) => {
        const { x, y } = ui;
        setPosition({ x, y });
    };

    return (
        <Draggable position={position} onDrag={handleDrag} handle=".handle">
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl">
                <div className="handle cursor-move absolute top-0 left-0 right-0 h-8 bg-gray-200 rounded-t-lg"></div>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <img
                    src="/notion-seeklogo.svg"
                    alt="Notion"
                    className="absolute top-10 right-4 w-12 h-12"
                />
                <h2 className="text-2xl font-semibold mb-4 mt-4">Notion Page</h2>
                <iframe
                    src="https://www.notion.so/Pariyashi-s-Dashboard-45fe522b8e084634b6c004d2e1da0898?pvs=4"
                    frameBorder="0"
                    width="100%"
                    height="300"
                    className="rounded-lg"
                    allowFullScreen
                ></iframe>
            </div>
        </Draggable>
    );
};

export default NotionWidget;