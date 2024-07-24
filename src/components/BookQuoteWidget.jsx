// BookQuoteWidget.js
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

const BookQuoteWidget = ({ onClose }) => {
    const [book, setBook] = useState(null);
    const [quote, setQuote] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Mock data for demonstration purposes
    const bookData = {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        url: "https://archive.org/details/tokillmockingbir0000leeh/page/n3/mode/2up?view=theater"
    };

    const quoteData = "The one thing that doesn't abide by majority rule is a person's conscience.";

    useEffect(() => {
        // You can replace this with an API call to fetch book and quote data
        setBook(bookData);
        setQuote(quoteData);
    }, []);

    const handleDrag = (e, ui) => {
        const { x, y } = ui;
        setPosition({ x, y });
    };

    if (!book || !quote) return <p>Loading...</p>;

    return (
        <Draggable position={position} onDrag={handleDrag} handle=".handle">
            <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-opacity-30 border-gray-200 p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                <div className="handle cursor-move absolute top-0 left-0 right-0 h-8 bg-gray-200 rounded-t-lg"></div>
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="absolute top-10 right-2 w-24 h-24">
                    <iframe 
                        src="https://giphy.com/embed/xT77Y1T0zY1gR5qe5O" 
                        width="100%" 
                        height="100%" 
                        style={{ position: 'absolute' }} 
                        frameBorder="0" 
                        className="giphy-embed" 
                        allowFullScreen
                    ></iframe>
                </div>
                <h2 className="text-2xl font-semibold mb-4 mt-8">Book of the Day</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-md text-cyan-200">by {book.author}</p>
                    <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Read the book
                    </a>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Quote of the Day</h2>
                <blockquote className="italic text-lg font-mono justify-center text-yellow-300">"{quote}"</blockquote>
            </div>
        </Draggable>
    );
};

export default BookQuoteWidget;