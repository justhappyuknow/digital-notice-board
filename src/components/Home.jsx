import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import GoogleSlides from '../components/GoogleSlides';
import PomodoroTimer from '../components/PomodoroTimer';
import GoogleSpreadsheet from '../components/GoogleSpreadsheet';
import GoogleForm from '../components/GoogleForm';
import Poll from '../components/Poll';
import BookQuoteWidget from '../components/BookQuoteWidget';
import IssueTracker from '../components/IssueTracker';
import Dgc from '../components/Dgc';
import StepsTracker from '../components/StepsTracker';
import OpportunityBoard from '../components/OpportunityBoard';
import TILCorner from '../components/TILCorner';
import GoogleCalendar from '../components/GoogleCalender';
import GoogleMeet from '../components/GoogleMeet';
import NotionWidget from '../components/NotionWidget';
import ChatGPTWidget from '../components/ChatGPTWidget';
import Typewriter from '../components/Typewriter';
import AnnouncementWidget from '../components/AnnouncementWidget';
import WidgetAdder from '../components/WidgetAdder';
import ScribbleNotesWidget from '../components/ScribbleNotesWidget';
import AdminLogin from '../components/admin/AdminLogin';
import Admin from '../components/admin/Admin';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Home = () => {
    const [visibleWidgets, setVisibleWidgets] = useState(() => {
        const saved = localStorage.getItem('visibleWidgets');
        return saved ? JSON.parse(saved) : {
            googleSlides: true,
            pomodoroTimer: true,
            googleSpreadsheet: true,
            googleForm: true,
            poll: true,
            bookQuote: true,
            issueTracker: true,
            dgc: true,
            stepsTracker: true,
            opportunityBoard: true,
            tilCorner: true,
            googleCalendar: true,
            googleMeet: true,
            notionWidget: true,
            chatGPTWidget: true,
            announcementWidget: true,
            scribbleNotesWidget: true // Include Scribble Notes widget
        };
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('visibleWidgets', JSON.stringify(visibleWidgets));
    }, [visibleWidgets]);

    useEffect(() => {
        socket.on('announcement', (announcement) => {
            console.log('New announcement:', announcement.text);
        });

        return () => {
            socket.off('announcement');
        };
    }, []);

    const handleClose = (widgetName) => {
        setVisibleWidgets(prev => ({ ...prev, [widgetName]: false }));
    };

    const handleAdd = (widgetName) => {
        setVisibleWidgets(prev => ({ ...prev, [widgetName]: true }));
    };

    return (
        <Router>
            <div>
                <nav className="flex justify-between items-center p-6 bg-gray-900 text-white shadow-lg">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition-colors duration-300">Home</Link>
                        <Link to="/admin" className="text-2xl font-bold hover:text-gray-300 transition-colors duration-300">Admin</Link>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1 className="text-5xl font-bold mb-6 text-white text-center">
                                <Typewriter text="Apun ka Notice Board" delay={80} />
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-white">
                                {visibleWidgets.googleSlides && <GoogleSlides onClose={() => handleClose('googleSlides')} />}
                                {visibleWidgets.pomodoroTimer && <PomodoroTimer onClose={() => handleClose('pomodoroTimer')} />}
                                {visibleWidgets.googleSpreadsheet && <GoogleSpreadsheet onClose={() => handleClose('googleSpreadsheet')} />}
                                {visibleWidgets.googleForm && <GoogleForm onClose={() => handleClose('googleForm')} />}
                                {visibleWidgets.poll && <Poll onClose={() => handleClose('poll')} />}
                                {visibleWidgets.bookQuote && <BookQuoteWidget onClose={() => handleClose('bookQuote')} />}
                                {visibleWidgets.issueTracker && <IssueTracker onClose={() => handleClose('issueTracker')} />}
                                {visibleWidgets.dgc && <Dgc onClose={() => handleClose('dgc')} />}
                                {visibleWidgets.stepsTracker && <StepsTracker onClose={() => handleClose('stepsTracker')} />}
                                {visibleWidgets.opportunityBoard && <OpportunityBoard onClose={() => handleClose('opportunityBoard')} />}
                                {visibleWidgets.tilCorner && <TILCorner onClose={() => handleClose('tilCorner')} />}
                                {visibleWidgets.googleCalendar && <GoogleCalendar onClose={() => handleClose('googleCalendar')} />}
                                {visibleWidgets.googleMeet && <GoogleMeet onClose={() => handleClose('googleMeet')} />}
                                {visibleWidgets.notionWidget && <NotionWidget onClose={() => handleClose('notionWidget')} />}
                                {visibleWidgets.chatGPTWidget && <ChatGPTWidget onClose={() => handleClose('chatGPTWidget')} />}
                                {visibleWidgets.announcementWidget && <AnnouncementWidget onClose={() => handleClose('announcementWidget')} />}
                                {visibleWidgets.scribbleNotesWidget && <ScribbleNotesWidget onClose={() => handleClose('scribbleNotesWidget')} />} {/* Add Scribble Notes widget */}
                            </div>
                            <WidgetAdder visibleWidgets={visibleWidgets} onAdd={handleAdd} />
                        </div>
                    } />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Home;