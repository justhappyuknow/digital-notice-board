import React from 'react';
import GoogleSlides from '../components/GoogleSlides';
import PomodoroTimer from '../components/PomodoroTimer';
import GoogleSpreadsheet from '../components/GoogleSpreadsheet';
import GoogleForm from '../components/GoogleForm.jsx';
import Poll from '../components/Poll';
import BookQuoteWidget from '../components/BookQuoteWidget';
import IssueTracker from '../components/IssueTracker';
import Dgc from '../components/Dgc';
import StepsTracker from '../components/StepsTracker';
import OpportunityBoard from '../components/OpportunityBoard';
import TILCorner from '../components/TILCorner';
import GoogleCalendar from '../components/GoogleCalender';
import GoogleMeet from '../components/GoogleMeet';
import Notes from '../components/Notes';


const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-6">Digital Notice Board</h1>
            <div className="w-full max-w-8xl grid grid-cols-1 md:grid-cols-4 gap-6">
                <GoogleSlides />
                <PomodoroTimer />
                <GoogleSpreadsheet />
                <GoogleForm />
                <Poll />
                <BookQuoteWidget />
                <IssueTracker />
                <Dgc />
                <StepsTracker />
                <OpportunityBoard />
                <TILCorner />
                <GoogleCalendar />
                <GoogleMeet />
                <Notes />
            </div>
        </div>
    );
};

export default Home;
