import React, { useState } from 'react';
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
import ChatGPTWidget from '../components/ChatGPTWidget';
import Typewriter from '../components/Typewriter';
import NotionWidget from '../components/NotionWidget';

const Home = () => {
    const [visibleWidgets, setVisibleWidgets] = useState({
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
        chatGPTWidget: true
    });

    const handleClose = (widgetName) => {
        setVisibleWidgets(prev => ({ ...prev, [widgetName]: false }));
    };

    return (
        <div>
            <h1 className="text-5xl font-bold mb-6 text-white text-center">
                <Typewriter text="Digital Notice Board" delay={80} />
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

// Import other components

const Home = () => {
    const [widgets, setWidgets] = useState({
        googleSlides: true,
        pomodoroTimer: true,
        // Add other widgets here
    });

    const handleRemove = (widget) => {
        setWidgets(prevState => ({
            ...prevState,
            [widget]: false,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6">Digital Notice Board</h1>
            <div className="w-full max-w-8xl grid grid-cols-1 md:grid-cols-4 gap-6">
                {widgets.googleSlides && (
                    <GoogleSlides onRemove={() => handleRemove('googleSlides')} />
                )}
                {widgets.pomodoroTimer && (
                    <PomodoroTimer onRemove={() => handleRemove('pomodoroTimer')} />
                )}
                {/* Render other widgets based on the state */}

            </div>
        </div>
    );
};

export default Home;