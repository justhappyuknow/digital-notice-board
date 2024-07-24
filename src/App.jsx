import React from 'react';
import Home from './pages/Home';
import Music from './components/Music';
import StarsCanvas from './components/StarsCanvas';

const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center p-4">
    <StarsCanvas />
    <div className="relative z-10 w-full max-w-8xl">
      <Home />
      <Music />
    
    </div>
    </div>
  );
};

export default App;
