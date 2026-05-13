import React from 'react';
import './Footer.css';

const Footer = ({ activeTab = 'home', onTabChange, userRole = 'student' }) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 22V12h6v10"/>
        </svg>
      )
    },
    {
      id: 'tournaments',
      label: 'Tournaments',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M12 15c-3.3 0-6-2.7-6-6V2h12v7c0 3.3-2.7 6-6 6z"/>
          <path d="M12 15v4m-4 3h8"/>
        </svg>
      )
    },
    {
      id: 'feed',
      label: 'Feed',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="6" strokeWidth="2.5"/>
          <path d="M12 8v8m-4-4h8"/>
        </svg>
      )
    },
    {
      id: 'search',
      label: userRole === 'master' ? 'Students' : 'Explore',
      icon: userRole === 'master' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="sparout-main-footer">
      <div className="sparout-footer-content">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`sparout-footer-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange && onTabChange(tab.id)}
          >
            <div className="sparout-tab-icon">{tab.icon}</div>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
