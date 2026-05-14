import React from 'react';
import './Footer.css';

const Footer = ({ activeTab = 'home', onTabChange, userRole = 'student' }) => {
  const tabs = [
    {
      id: 'home',
      label: 'HOME',
      icon: (
        <svg viewBox="0 0 24 24" fill={activeTab === 'home' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      id: 'tournaments',
      label: 'TOURNAMENTS',
      icon: (
        <svg viewBox="0 0 24 24" fill={activeTab === 'tournaments' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M12 15c-3.3 0-6-2.7-6-6V2h12v7c0 3.3-2.7 6-6 6z"/>
          <path d="M12 15v4m-4 3h8"/>
        </svg>
      )
    },
    {
      id: 'feed',
      label: 'POST',
      icon: (
        <svg viewBox="0 0 24 24" fill={activeTab === 'feed' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      )
    },
    {
      id: 'search',
      label: 'DISCOVER',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'PROFILE',
      icon: (
        <svg viewBox="0 0 24 24" fill={activeTab === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
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
            <span className="sparout-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
