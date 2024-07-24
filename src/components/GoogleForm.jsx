import React from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const GoogleForm = ({ onClose }) => {
    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/google-form.png" // Path to your Google Forms logo
                    alt="Google Forms"
                    className="absolute top-4 right-16 w-12 h-12"
                />
                <h2 className="text-2xl font-semibold mb-4">Google Form</h2>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdBpIRHFCRan09-Iit6twz56nqPr1QxineUj-Urx_18PkV4cA/viewform?embedded=true"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                >
                    Loading…
                </iframe>
            </div>
        </Draggable>
    );
};

export default GoogleForm;
