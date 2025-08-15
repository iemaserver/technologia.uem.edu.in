import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ThreeBackground from './ThreeBackground';
import InteractiveBackground from './InteractiveBackground';

import CustomCursor from './CustomCursor';
import Loader from './Loader';
import Home from './Home';
import About from './About';
import Timeline from './Timeline';
import Team from './Team';
import Partners from './Partners';
import FAQ from './FAQ';
import Guidance from './Guidance';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');
  
  // --- 1. Add state to detect mobile screen size ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // --- 2. Create the master animation controller prop ---
  // Animations are enabled UNLESS it's mobile AND we're on the home screen.
  const animationsEnabled = !isMobile || activeScreen !== 'home';

  const renderScreen = () => {
    switch (activeScreen) {
      // --- 3. Pass the prop to each component ---
      case 'about':
        return <About animationsEnabled={animationsEnabled} />;
      case 'timeline':
        return <Timeline animationsEnabled={animationsEnabled} />;
      case 'team':
        return <Team animationsEnabled={animationsEnabled} />;
      case 'guidance':
        return <Guidance animationsEnabled={animationsEnabled} />;
      case 'partners':
        return <Partners animationsEnabled={animationsEnabled} />;
      case 'faq':
        return <FAQ animationsEnabled={animationsEnabled} />;
      case 'home':
      default:
        // Also pass it to Home so it can pass it to its children
        return <Home animationsEnabled={animationsEnabled} />;
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <Loader onLoaded={handleLoadingComplete} />
      ) : (
        <>
          {window.innerWidth > 1024 && <CustomCursor />}
          <InteractiveBackground />
          <ThreeBackground />
          <Header setActiveScreen={setActiveScreen} />
          <main className="App-body">
            {renderScreen()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;