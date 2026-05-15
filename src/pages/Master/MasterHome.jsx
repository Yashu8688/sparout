import React, { useState, useEffect } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import SplashScreen from '../../components/SplashScreen/SplashScreen';
import MasterProfile from './MasterProfile';
import ExploreStudents from './ExploreStudents';
import TournamentPage from '../Common/TournamentPage';
import Notifications from '../Common/Notifications';
import CommunityFeed from '../Community/CommunityFeed';
import './MasterHome.css';

const MasterHome = ({ user, onLogout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const featuredSlides = [
    {
      id: 1,
      title: 'COACHING CERTIFICATION 2024',
      date: '20 – 22 Sep, 2024',
      location: 'Pune, Maharashtra',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'REFEREE SEMINAR',
      date: '10 – 12 Oct, 2024',
      location: 'Hyderabad, Telangana',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'CLUB MANAGEMENT WORKSHOP',
      date: '18 – 20 Nov, 2024',
      location: 'Chennai, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const quickAccessItems = [
    { id: 'create_tournament', label: 'Create Tournament', color: '#b91c1c' },
    { id: 'manage_matches', label: 'Manage Tournaments', color: '#1d4ed8' },
    { id: 'player_verification', label: 'Verification', color: '#166534' },
    { id: 'club_stats', label: 'Club Stats', color: '#6d28d9' },
    { id: 'financials', label: 'Financials', color: '#c2410c' },
    { id: 'support', label: 'Help Desk', color: '#065f46' },
  ];

  const updateItems = [
    {
      id: 1,
      title: 'New Player Applications (15)',
      date: 'Today',
      image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      title: 'Tournament Revenue Report',
      date: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <MasterProfile 
            user={user} 
            onBack={() => setActiveTab('home')} 
            isTab={true} 
            onEditChange={setIsEditingProfile}
            onLogout={onLogout}
          />
        );
      case 'feed':
        return <CommunityFeed isTab={true} />;
      case 'tournaments':
        return <TournamentPage user={user} />;
      case 'search':
        return <ExploreStudents user={user} />;
      case 'notifications':
        return <Notifications user={user} userRole="master" />;
      case 'home':
      default:
        return (
          <main className="sparout-home-content">
            {/* Featured Card Slider */}
            <section className="sparout-featured-section">
              <div 
                className="sparout-featured-card"
                style={{ backgroundImage: `url(${featuredSlides[currentSlide].image})` }}
              >
                <div className="sparout-featured-overlay">
                  <div className="sparout-featured-info">
                    <h2 className="sparout-featured-title">{featuredSlides[currentSlide].title}</h2>
                    <div className="sparout-featured-meta">
                      <span>📅 {featuredSlides[currentSlide].date}</span>
                      <span>📍 {featuredSlides[currentSlide].location}</span>
                    </div>
                  </div>
                  <div className="sparout-featured-pagination">
                    {featuredSlides.map((_, index) => (
                      <span 
                        key={index} 
                        className={`dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions Grid */}
            <section className="sparout-quick-access">
              <h3 className="sparout-section-title">Quick Actions</h3>
              <div className="sparout-quick-grid">
                {quickAccessItems.map(item => (
                  <div 
                    key={item.id} 
                    className="sparout-quick-card"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="sparout-quick-content">
                      <div className="sparout-quick-icon-box">
                        {item.id === 'create_tournament' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                          </svg>
                        ) : item.id === 'manage_matches' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                          </svg>
                        ) : item.id === 'player_verification' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        ) : item.id === 'club_stats' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                          </svg>
                        ) : item.id === 'financials' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                        )}
                      </div>
                      <span className="sparout-quick-label">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Master Updates */}
            <section className="sparout-latest-news">
              <div className="sparout-section-header">
                <h3 className="sparout-section-title">Recent Updates</h3>
                <button className="sparout-view-all">View All</button>
              </div>
              <div className="sparout-news-list">
                {updateItems.map(update => (
                  <div key={update.id} className="sparout-news-card">
                    <div className="sparout-news-image" style={{ backgroundImage: `url(${update.image})` }}></div>
                    <div className="sparout-news-info">
                      <h4 className="sparout-news-title">{update.title}</h4>
                      <span className="sparout-news-date">{update.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        );
    }
  };

  const isFullscreen = isEditingProfile;
  const isProfileTab = activeTab === 'profile';
  const isTournamentTab = activeTab === 'tournaments';
  const isSearchTab = activeTab === 'search';
  const isNotificationTab = activeTab === 'notifications';

  return (
    <div className={`sparout-master-home ${isFullscreen ? 'is-editing' : ''} ${isProfileTab || isTournamentTab || isSearchTab || isNotificationTab ? 'force-black' : ''}`}>
      {!isFullscreen && !isSearchTab && !isNotificationTab && (
        <Header 
          onNotificationClick={() => setActiveTab('notifications')} 
          title={isTournamentTab ? "TOURNAMENTS" : null}
        />
      )}
      {renderContent()}
      {!isFullscreen && <Footer activeTab={activeTab === 'notifications' ? '' : activeTab} onTabChange={setActiveTab} userRole="master" />}
    </div>
  );
};

export default MasterHome;
