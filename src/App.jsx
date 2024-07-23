import React from 'react';
import Home from './pages/Home';
import Music from './components/Music';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Home />
      <Music />
    </div>
  );
};

export default App;
