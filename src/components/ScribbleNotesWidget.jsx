import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';

const ScribbleNotesWidget = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000');
    const [lineWidth, setLineWidth] = useState(5);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <Draggable>
            <div
                className="bg-white rounded-lg shadow-lg p-4 relative"
                style={{ width: '300px', height: '400px' }} // Fixed dimensions
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 p-1 text-red-600"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-2 text-center">Scribble Notes</h2>
                <div className="flex mb-4 justify-between">
                    <button 
                        onClick={clearCanvas} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Clear
                    </button>
                    <input 
                        type="color" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                        className="ml-2"
                    />
                    <input 
                        type="number" 
                        min="1" 
                        max="50" 
                        value={lineWidth} 
                        onChange={(e) => setLineWidth(Number(e.target.value))} 
                        className="ml-2"
                    />
                </div>
                <canvas
                    ref={canvasRef}
                    width={300}
                    height={400}
                    className="border border-gray-300 bg-gray-100"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                ></canvas>
            </div>
        </Draggable>
    );
};

export default ScribbleNotesWidget;