import React from 'react';
import './Header.css';

const Header = ({ onNotificationClick }) => {
  return (
    <header className="sparout-main-header">
      <div className="sparout-header-content">
        <button className="sparout-menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="sparout-logo-container">
          <div className="sparout-logo-text">
            <span className="spa">SPA</span><span className="rout">ROUT</span>
          </div>
        </div>

        <button className="sparout-notif-btn" onClick={onNotificationClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="sparout-notif-badge">1</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
