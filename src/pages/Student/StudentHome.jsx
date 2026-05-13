import React, { useState, useEffect } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import StudentProfile from './StudentProfile';
import TournamentPage from '../Common/TournamentPage';
import ExploreMasters from './ExploreMasters';
import Notifications from '../Common/Notifications';
import CommunityFeed from '../Community/CommunityFeed';
import SplashScreen from '../../components/SplashScreen/SplashScreen';
import './StudentHome.css';

const StudentHome = ({ user, onLogout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const featuredSlides = [
    {
      id: 1,
      title: 'MMA WORLD SERIES 2024',
      date: '15 – 17 Sep, 2024',
      location: 'Mumbai, Maharashtra',
      image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'KARATE NATIONAL CUP',
      date: '05 – 08 Oct, 2024',
      location: 'New Delhi, Delhi',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'JIU-JITSU OPEN 2024',
      date: '12 – 14 Nov, 2024',
      location: 'Bangalore, Karnataka',
      image: 'https://images.unsplash.com/photo-1599058917233-3580e6d23132?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const quickAccessItems = [
    { id: 'register', label: 'Register Player', color: '#b91c1c' },
    { id: 'tournaments', label: 'Tournaments', color: '#1d4ed8' },
    { id: 'matches', label: 'Matches', color: '#166534' },
    { id: 'results', label: 'Results', color: '#6d28d9' },
    { id: 'rankings', label: 'Rankings', color: '#c2410c' },
    { id: 'idcard', label: 'ID Card', color: '#065f46' },
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Selection Trials for National Championship',
      date: '20 Oct, 2024',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      title: 'MMA Training Seminar by Master Chen',
      date: '15 Oct, 2024',
      image: 'https://images.unsplash.com/photo-1599058917233-3580e6d23132?auto=format&fit=crop&q=80&w=400',
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
          <StudentProfile 
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
        return <ExploreMasters user={user} />;
      case 'notifications':
        return <Notifications user={user} userRole="student" />;
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

            {/* Quick Access Grid */}
            <section className="sparout-quick-access">
              <h3 className="sparout-section-title">Quick Access</h3>
              <div className="sparout-quick-grid">
                {quickAccessItems.map(item => (
                  <div 
                    key={item.id} 
                    className="sparout-quick-card"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="sparout-quick-content">
                      <div className="sparout-quick-icon-box">
                        {item.id === 'register' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                          </svg>
                        ) : item.id === 'tournaments' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                          </svg>
                        ) : item.id === 'matches' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 13l2 2"/>
                            <path d="M9.5 17.5L21 6V3h-3L6.5 14.5"/><path d="M11 19L5 13"/><path d="M8 16l-4 4"/><path d="M5 13l-2 2"/>
                          </svg>
                        ) : item.id === 'results' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                          </svg>
                        ) : item.id === 'rankings' ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 20h10"/><path d="M10 20V10"/><path d="M14 20V6"/><path d="M6 20V14"/>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M15 10h2"/><path d="M15 14h2"/>
                          </svg>
                        )}
                      </div>
                      <span className="sparout-quick-label">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section className="sparout-latest-news">
              <div className="sparout-section-header">
                <h3 className="sparout-section-title">Latest News</h3>
                <button className="sparout-view-all">View All</button>
              </div>
              <div className="sparout-news-list">
                {newsItems.map(news => (
                  <div key={news.id} className="sparout-news-card">
                    <div className="sparout-news-image" style={{ backgroundImage: `url(${news.image})` }}></div>
                    <div className="sparout-news-info">
                      <h4 className="sparout-news-title">{news.title}</h4>
                      <span className="sparout-news-date">{news.date}</span>
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
    <div className={`sparout-home-page ${isFullscreen ? 'is-editing' : ''} ${isProfileTab || isTournamentTab || isSearchTab || isNotificationTab ? 'force-black' : ''}`}>
      {!isFullscreen && !isTournamentTab && !isSearchTab && !isNotificationTab && (
        <Header onNotificationClick={() => setActiveTab('notifications')} />
      )}
      {renderContent()}
      {!isFullscreen && <Footer activeTab={activeTab === 'notifications' ? '' : activeTab} onTabChange={setActiveTab} userRole="student" />}
    </div>
  );
};

export default StudentHome;
