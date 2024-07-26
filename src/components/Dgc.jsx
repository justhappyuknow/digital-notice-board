import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const Dgc = ({ onClose }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [cardColor, setCardColor] = useState('bg-white');

    const colors = [
        'bg-red-300', 'bg-blue-300', 'bg-green-300', 'bg-yellow-300',
        'bg-purple-300', 'bg-pink-300', 'bg-indigo-300', 'bg-teal-300'
    ];

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('dgcItems')) || [];
        setItems(savedItems);
    }, []);

    useEffect(() => {
        localStorage.setItem('dgcItems', JSON.stringify(items));
    }, [items]);

    const handleAddItem = () => {
        if (newItem.trim()) {
            setItems([...items, { text: newItem, completed: false }]);
            setNewItem('');
            const newColor = colors[Math.floor(Math.random() * colors.length)];
            setCardColor(newColor);
        }
    };

    const handleToggleItem = (index) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
    };

    const handleRemoveItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    return (
        <Draggable>
            <div className={`relative ${cardColor} bg-opacity-60 backdrop-filter backdrop-blur-sm border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto`}>
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <h2 className="text-xl font-semibold mb-4 text-red-500">Daily Growth Checklist</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add new item"
                        className="border text-black border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddItem}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-white bg-opacity-50 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleToggleItem(index)}
                                    className="h-5 w-5 text-blue-500 focus:ring-blue-400"
                                />
                                <span className={item.completed ? 'line-through text-white-500' : 'text-white-700'}>
                                    {item.text}
                                </span>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                {items.length > 0 && (
                    <div className="mt-4">
                        <p className="text-white-700">
                            Progress: {Math.round((items.filter((item) => item.completed).length / items.length) * 100)}%
                        </p>
                    </div>
                )}
            </div>
        </Draggable>
    );
};

export default Dgc;
