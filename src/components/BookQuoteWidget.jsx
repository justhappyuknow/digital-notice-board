// BookQuoteWidget.js
import React, { useEffect, useState } from 'react';

const BookQuoteWidget = () => {
    const [book, setBook] = useState(null);
    const [quote, setQuote] = useState(null);

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

    if (!book || !quote) return <p>Loading...</p>;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-lg h-90 overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">Book of the Day</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-md text-gray-600">by {book.author}</p>
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
            <blockquote className="italic text-lg text-gray-700">"{quote}"</blockquote>
        </div>
    );
};

export default BookQuoteWidget;
