// src/components/No.js
import React, { useState } from 'react';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');

    const handleAddNote = () => {
        if (note.trim()) {
            setNotes([...notes, { text: note, isExpanded: false }]);
            setNote('');
        }
    };

    const handleToggleNote = (index) => {
        const newNotes = [...notes];
        newNotes[index].isExpanded = !newNotes[index].isExpanded;
        setNotes(newNotes);
    };

    const handleDeleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    return (
        <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <div className="mb-4">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your note here..."
                    className="border rounded-lg p-2 w-full h-32 resize-none"
                />
                <button
                    onClick={handleAddNote}
                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg"
                >
                    Add Note
                </button>
            </div>
            <ul>
                {notes.map((note, index) => (
                    <li
                        key={index}
                        className="flex flex-col items-start p-2 mb-2 border-b"
                    >
                        <div className="mb-2">
                            <span>
                                {note.isExpanded ? note.text : note.text.substring(0, 100) + (note.text.length > 100 ? '...' : '')}
                            </span>
                            {note.text.length > 100 && (
                                <button
                                    onClick={() => handleToggleNote(index)}
                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                >
                                    {note.isExpanded ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => handleDeleteNote(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
