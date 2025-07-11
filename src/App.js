import React, { useState, useEffect } from 'react';
import Header from './Header';
import InteractiveBackground from './InteractiveBackground';
import CustomCursor from './CustomCursor';
import Loader from './Loader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // This function will be passed to the Loader component
  // and called when its exit animation is finished.
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading ? (
        // The Loader now controls its own duration and tells App when it's done.
        <Loader onLoaded={handleLoadingComplete} />
      ) : (
        // Show the main site content
        <>
          <CustomCursor />
          <InteractiveBackground />
          <Header />
          <main className="App-body">
            <h2>Coming Soon</h2>
            <p>Our team is working hard to bring you an amazing hackathon experience. Stay tuned!</p>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
