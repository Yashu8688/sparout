import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import logo from '../../assets/logo.jpeg';

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Percentage counter logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500); // Small delay after 100%
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Total duration ~3 seconds

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        {/* Shockwave/Ripple Effects */}
        <div className="ripple"></div>
        <div className="ripple"></div>
        
        {/* Rotating Energy Ring */}
        <div className="loading-ring"></div>
        
        {/* Centered Logo */}
        <img src={logo} alt="Sparout Logo" className="splash-logo" />
        
        {/* Dynamic Percentage */}
        <div className="percentage-text">{progress}%</div>
        <div className="loading-label">Gathering Focus</div>
      </div>
    </div>
  );
};

export default SplashScreen;
