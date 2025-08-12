import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';
import ThreeBackground from './ThreeBackground';
import CustomCursor from './CustomCursor';
import Loader from './Loader';
import Home from './Home';
import About from './About';
// Import all the new placeholder pages
import Timeline from './Timeline';
import Team from './Team';
import Partners from './Partners';
import FAQ from './FAQ';
import Contact from './Contact';
import Register from './Register';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home');

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'about':
        return <About />;
      case 'timeline':
        return <Timeline />;
      case 'team':
        return <Team />;
      case 'partners':
        return <Partners />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'register':
        return <Register />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <Loader onLoaded={handleLoadingComplete} />
      ) : (
        <>
          <CustomCursor />
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
