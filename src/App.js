import React, { useState} from 'react';
import Header from './Header';
import InteractiveBackground from './InteractiveBackground';
import CustomCursor from './CustomCursor';
import Loader from './Loader';
import Home from './Home'; 
import About from './About';
import Register from './Register';
import Schedule from './Schedule';
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
      case 'register':
        return <Register />;
      case 'schedule':
        return <Schedule />;
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
         
          <Header activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
          <main className="App-body">
            {renderScreen()}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
