import React from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const GoogleSpreadsheet = ({ onClose }) => {
    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <img
                    src="/google-sheet.png" // Path to your Google Spreadsheet logo
                    alt="Google Spreadsheet"
                    className="absolute top-4 right-16 w-12 h-12"
                />
                <h2 className="text-2xl font-semibold mb-4">Google Spreadsheet</h2>
                <iframe
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSp5X38JL0Qy0oQC3BAEFAwbi86KsDFeeFd3Eoqs1a_kX3E1O_D0_PygotcJ3cl-_SVQIw_IjFiaxCC/pubhtml"
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

export default GoogleSpreadsheet;
