import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Draggable from 'react-draggable';
import { FaTimes } from 'react-icons/fa';

const socket = io('http://localhost:4000');

const Poll = ({ onClose }) => {
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        socket.on('pollData', (data) => {
            setPoll(data);
        });

        return () => {
            socket.off('pollData');
        };
    }, []);

    const handleVote = () => {
        if (selectedOption !== null) {
            socket.emit('vote', selectedOption);
        }
    };

    if (!poll) return <p>Loading...</p>;

    const totalVotes = poll.options ? poll.options.reduce((total, option) => total + option.votes, 0) : 0;

    return (
        <Draggable>
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-40 border-gray-300 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <button onClick={onClose} className="absolute top-4 right-4">
                    <FaTimes className="text-white" />
                </button>
                <h2 className="text-2xl font-semibold mb-4">{poll.question}</h2>
                {poll.options && poll.options.map((option, index) => (
                    <div key={index} className="mb-2">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="poll-option"
                            value={index}
                            onChange={(e) => setSelectedOption(Number(e.target.value))}
                        />
                        <label htmlFor={`option-${index}`} className="ml-2">{option.option}</label>
                    </div>
                ))}
                <button
                    onClick={handleVote}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={selectedOption === null}
                >
                    Vote
                </button>
                <div className="mt-4">
                    {poll.options && poll.options.map((option, index) => (
                        <div key={index}>
                            {option.option}: {(option.votes / totalVotes * 100).toFixed(2)}% ({option.votes} votes)
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-2 right-2 w-24 h-24">
                    <iframe
                        src="https://giphy.com/embed/UWWF08t1MEvrOpWqWL"
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute' }}
                        frameBorder="0"
                        className="giphy-embed"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </Draggable>
    );
};

export default Poll;
