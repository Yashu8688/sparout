import React, { useState } from 'react';
import './TournamentPage.css';

const TournamentPage = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('Regular Tournaments');

  const filters = [
    'Regular Tournaments',
    'Government Games',
    'Attended',
    'Booking'
  ];

  const tournaments = [
    {
      id: 1,
      name: "Bay Area Youth Karate Championship",
      type: "Regular Tournaments",
      date: "Mar 15, 2026",
      location: "Oakland Convention Center",
      category: "Karate",
      price: "45",
      currency: "$",
      mode: "IN-PERSON",
      organizer: "Northern California...",
      verified: true,
      isGovt: false,
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Spring Online Taekwondo Open",
      type: "Regular Tournaments",
      date: "Apr 2, 2026",
      location: "Virtual Event",
      category: "Taekwondo",
      price: "FREE",
      currency: "",
      mode: "ONLINE",
      organizer: "Global TKD...",
      verified: true,
      isGovt: false,
      image: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "God Games National Championship",
      type: "Government Games",
      date: "Jul 20, 2026",
      location: "New Delhi, India",
      category: "All Martial Arts",
      price: "2000",
      currency: "₹",
      mode: "IN-PERSON",
      organizer: "Government of India...",
      verified: true,
      isGovt: true,
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      name: "National Youth Sports Meet",
      type: "Government Games",
      date: "Aug 15, 2026",
      location: "Mumbai, India",
      category: "Judo & Karate",
      price: "500",
      currency: "₹",
      mode: "IN-PERSON",
      organizer: "Sports Authority...",
      verified: true,
      isGovt: true,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const isGovtView = activeFilter === 'Government Games';
  
  const filteredTournaments = tournaments.filter(t => {
    if (activeFilter === 'Regular Tournaments') return t.type === 'Regular Tournaments';
    if (activeFilter === 'Government Games') return t.type === 'Government Games';
    return true;
  });

  return (
    <div className="tp-container">
      {/* Segmented Filter */}
      <div className="tp-filter-section">
        <div className="tp-segmented-bar">
          {filters.map(filter => (
            <button 
              key={filter} 
              className={`tp-segment-item ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Government Info Banner */}
      {isGovtView && (
        <div className="tp-govt-banner">
          <div className="tp-govt-banner-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
          </div>
          <div className="tp-govt-banner-content">
            <h4 className="tp-govt-banner-title">Government-Sanctioned Events</h4>
            <p className="tp-govt-banner-text">
              Official tournaments organized by government sports authorities. Top performers may qualify for national and international competitions.
            </p>
          </div>
        </div>
      )}

      {/* Results Count Area */}
      <div className="tp-results-info">
        {filteredTournaments.length} {isGovtView ? 'government ' : ''}tournaments available
      </div>

      {/* Cards List */}
      <div className="tp-list">
        {filteredTournaments.map(t => (
          <div key={t.id} className="tp-card">
            <div className="tp-image-area">
              <img src={t.image} alt={t.name} className="tp-img" />
              <div className="tp-badges-top">
                {t.verified && (
                  <div className="tp-verified-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    VERIFIED
                  </div>
                )}
                {t.isGovt && (
                  <div className="tp-govt-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                    </svg>
                    GOVT
                  </div>
                )}
              </div>
              <div className="tp-mode-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {t.mode}
              </div>
            </div>

            <div className="tp-content">
              <h3 className="tp-title">{t.name}</h3>
              
              <div className="tp-meta-row">
                <div className="tp-meta-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {t.date}
                </div>
                <div className="tp-meta-item">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {t.location}
                </div>
              </div>

              <div className="tp-pill-wrapper">
                <span className="tp-category-pill">{t.category}</span>
              </div>

              <div className="tp-divider"></div>

              <div className="tp-footer">
                <div className="tp-price">
                  <span className="tp-dollar">{t.currency}</span> {t.price}
                </div>
                <div className="tp-organizer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {t.organizer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentPage;
