import React from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const GoogleSlides = ({ onClose }) => {
    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/google-slide.png" // Path to your Google Slides logo
                    alt="Google Slides"
                    className="absolute top-4 right-16 w-12 h-12"
                />
                <h2 className="text-2xl font-semibold mb-4">Google Slides</h2>
                <iframe
                    src="https://docs.google.com/presentation/d/e/2PACX-1vT9n-dSeZ_Gv75NiRIoIDpScgCyJvCnyLMLaZ01aElfxXXamDsWa0YqpmfE4GSPWg_Dz7O-NrZ6Gglj/embed?start=false&loop=false&delayms=3000"
                    frameBorder="0"
                    width="100%"
                    height="300"
                    allowFullScreen
                ></iframe>
            </div>
        </Draggable>
    );
};

export default GoogleSlides;