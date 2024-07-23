import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Poll = () => {
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

    // Ensure poll.options is defined before calculating totalVotes
    const totalVotes = poll.options ? poll.options.reduce((total, option) => total + option.votes, 0) : 0;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg h-100 overflow-hidden">
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
        </div>
    );
};

export default Poll;
