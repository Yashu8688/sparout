import React from 'react';
import './Header.css';

const Header = ({ onNotificationClick }) => {
  return (
    <header className="sparout-main-header">
      <div className="sparout-header-content">
        <button className="sparout-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="sparout-logo">
          <span className="sparout-logo-white">SPA</span>
          <span className="sparout-logo-orange">ROUT</span>
        </div>

        <button className="sparout-notif-btn" onClick={onNotificationClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="sparout-notif-dot"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
