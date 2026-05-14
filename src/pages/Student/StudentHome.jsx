import React, { useState, useEffect } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import StudentProfile from './StudentProfile';
import TournamentPage from '../Common/TournamentPage';
import ExploreMasters from './ExploreMasters';
import Notifications from '../Common/Notifications';
import CommunityFeed from '../Community/CommunityFeed';
import './StudentHome.css';

const StudentHome = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const skills = [
    { name: 'Front Kick', level: 3, xp: 340, totalXp: 500, color: '#ff4d00' },
    { name: 'Kata Forms', level: 4, xp: 780, totalXp: 1000, color: '#a855f7' },
    { name: 'Sparring', level: 2, xp: 120, totalXp: 300, color: '#3b82f6' },
    { name: 'Flexibility', level: 3, xp: 420, totalXp: 500, color: '#22c55e' }
  ];

  const weeklyActivity = [
    { day: 'M', value: 40 },
    { day: 'T', value: 20 },
    { day: 'W', value: 60 },
    { day: 'T', value: 30 },
    { day: 'F', value: 10 },
    { day: 'TODAY', value: 80, active: true },
    { day: 'S', value: 0 }
  ];

  const renderHomeContent = () => (
    <div className="sparout-home-content">
      {/* 1. Greeting Section */}
      <section className="sh-greeting-section">
        <h1 className="sh-greeting-text">GOOD EVENING, {user?.fullName?.split(' ')[0] || 'KUMBA'}</h1>
        <div className="sh-greeting-sub">
          <div className="sh-greeting-info">
            <span className="sh-greeting-verified">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </span>
            <span>Training under Master Yashwanth</span>
          </div>
          <div className="sh-greeting-xp">2,450 XP</div>
        </div>
      </section>

      {/* 2. Weekly Mission Card */}
      <div className="sh-mission-card">
        <div className="sh-mission-header">
          <div>
            <span className="sh-mission-label">Weekly Mission</span>
            <h2 className="sh-mission-title">Train 5 Days This Week</h2>
          </div>
          <div className="sh-mission-progress-circle">
            4/5
          </div>
        </div>
        <div className="sh-mission-bar-bg">
          <div className="sh-mission-bar-fill" style={{ width: '80%' }}></div>
        </div>
        <div className="sh-mission-footer">+250 XP • 1 MORE TO GO!</div>
      </div>

      {/* 3. Streak Card */}
      <div className="sh-streak-card">
        <div className="sh-streak-main-row">
          <div className="sh-streak-flame-box">
            <img src="/streak_flame.png" alt="Streak" />
          </div>
          <div className="sh-streak-count-box">
            <span className="sh-streak-number">12</span>
            <div className="sh-streak-text-stack">
              <span className="sh-streak-day-label">DAY</span>
              <span className="sh-streak-streak-label">STREAK</span>
            </div>
          </div>
          <div className="sh-streak-weekly-tracker">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="sh-streak-day-col">
                <span className={`sh-streak-day-name ${i < 5 ? 'active' : ''}`}>{day}</span>
                <div className={`sh-streak-dot ${i < 5 ? 'active' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className="sh-streak-footer-stats">
          <div className="sh-streak-stat-item">
            <span className="sh-streak-stat-dot"></span>
            0 HRS TODAY
          </div>
          <div className="sh-streak-stat-item">
            <span className="sh-streak-stat-dot"></span>
            0 KCAL TODAY
          </div>
        </div>
      </div>

      {/* 4. Next Class Card */}
      <div className="sh-class-card">
        <div className="sh-class-content">
          <div className="sh-class-left">
            <div className="sh-class-header">
              <span className="sh-class-time">NEXT CLASS - 2026-02-25 4:00 PM</span>
            </div>
            <h2 className="sh-class-title">Kung Fu - Beginner Class</h2>
            <p className="sh-class-info">Master Chen Wei • Dragon Martial Arts Studio</p>
          </div>
          <div className="sh-class-right">
            <span className="sh-class-status">CONFIRMED</span>
            <button className="sh-class-join-btn">
              Join 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Start Training Button */}
      <button className="sh-start-btn">
        <span className="sh-start-text">Start Training</span>
        <span className="sh-start-subtext">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="m7 4 12 8-12 8V4z"/>
          </svg>
          TAP TO BEGIN CLASS
        </span>
      </button>

      {/* 6. Belt Journey Section */}
      <section className="sh-belt-section">
        <div className="sh-belt-header">
          <h3 className="sh-belt-title">BELT JOURNEY</h3>
          <span className="sh-belt-view-link">VIEW JOURNEY <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
        <div className="sh-belt-card">
          <div className="sh-belt-flex">
            <div className="sh-belt-item">
              <span className="sh-belt-rank-label">CURRENT RANK</span>
              <div className="sh-belt-name">
                <div className="sh-belt-dot" style={{ background: '#f59e0b' }}></div>
                Yellow Belt
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <div className="sh-belt-item" style={{ textAlign: 'right' }}>
              <span className="sh-belt-rank-label">NEXT BELT</span>
              <div className="sh-belt-name">
                Orange Belt
                <div className="sh-belt-dot" style={{ background: '#c2410c' }}></div>
              </div>
            </div>
          </div>
          
          <div className="sh-belt-progress-bg">
            <div className="sh-belt-progress-fill" style={{ width: '60%' }}></div>
          </div>
          
          <div className="sh-belt-stats">
            <span className="sh-belt-complete-text">60% COMPLETE</span>
            <span className="sh-belt-remaining-text">12 CLASSES TO GO</span>
          </div>

          <div className="sh-belt-requirements">
            <h4 className="sh-belt-req-title">REQUIREMENTS PROGRESS</h4>
            <div className="sh-belt-req-grid">
              <div className="sh-belt-req-item">
                <div className="sh-belt-req-check done">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Front Kick Mastery
              </div>
              <div className="sh-belt-req-item">
                <div className="sh-belt-req-check done">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                Kata Performance
              </div>
              <div className="sh-belt-req-item">
                <div className="sh-belt-req-check"></div>
                Sparring (4/10)
              </div>
              <div className="sh-belt-req-item">
                <div className="sh-belt-req-check"></div>
                Board Break
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Skills Section */}
      <section className="sh-skills-section">
        <div className="sh-skills-header">
          <h3 className="sh-skills-title">YOUR SKILLS</h3>
          <span className="sh-skills-tree-link">SKILL TREE <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
        
        <div className="sh-skills-grid">
          {skills.map(skill => (
            <div key={skill.name} className="sh-skill-card">
              <h4 className="sh-skill-name">{skill.name}</h4>
              <span className="sh-skill-lvl-text">LEVEL {skill.level}</span>
              <div className="sh-skill-lvl-badge" style={{ backgroundColor: skill.color }}>{skill.level}</div>
              <div className="sh-skill-bar-bg">
                <div className="sh-skill-bar-fill" style={{ width: `${(skill.xp / skill.totalXp) * 100}%`, backgroundColor: skill.color }}></div>
              </div>
              <span className="sh-skill-xp-text">{skill.xp}/{skill.totalXp} XP</span>
            </div>
          ))}
        </div>

        <button className="sh-skills-full-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          VIEW FULL SKILL TREE
        </button>
      </section>

      {/* 8. Activity Chart Section */}
      <section className="sh-activity-section">
        <div className="sh-activity-header">
          <h3 className="sh-activity-title">THIS WEEK • 4.5 HRS</h3>
          <span className="sh-activity-growth">+ 30% WK / WK</span>
        </div>
        <div className="sh-activity-chart">
          {weeklyActivity.map(item => (
            <div key={item.day} className="sh-activity-bar-col">
              <div 
                className={`sh-activity-bar ${item.active ? 'active' : ''}`} 
              ></div>
              <span className={`sh-activity-label ${item.active ? 'active' : ''}`}>{item.day}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Achievement Card */}
      <div className="sh-achieve-card">
        <div className="sh-achieve-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
        </div>
        <div className="sh-achieve-info">
          <span className="sh-achieve-unlock-label">ACHIEVEMENT UNLOCKED</span>
          <h4 className="sh-achieve-title">First 10 Hours</h4>
          <span className="sh-achieve-meta-text">Earned 3 days ago • +50 XP</span>
        </div>
      </div>

      {/* 10. Discover Section */}
      <section className="sh-discover-section">
        <div className="sh-discover-header">
          <h3 className="sh-discover-title">DISCOVER</h3>
        </div>
        <div className="sh-discover-card">
          <div className="sh-discover-disc-header">
            <div className="sh-discover-logo">
              <span>RFFI</span>
              <span style={{ fontSize: '7px' }}>VERIFIED</span>
            </div>
            <span className="sh-discover-date">NOV 17</span>
          </div>
          <h4 className="sh-discover-disc-title">KARATE NATIONAL CUP</h4>
          <p className="sh-discover-meta">Hyderabad • U-60kg • Senior</p>
          <div className="sh-discover-tags">
            <div className="sh-discover-tag open">
              <div style={{ background: '#22c55e', width: '8px', height: '8px', borderRadius: '50%' }}></div>
              OPEN
            </div>
            <div className="sh-discover-tag spots">● 16 SPOTS</div>
            <div className="sh-discover-tag price">₹500</div>
          </div>
          <button className="sh-discover-reg-btn">
            REGISTER
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>
    </div>
  );

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
        return renderHomeContent();
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
