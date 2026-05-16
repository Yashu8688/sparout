import React, { useState, useEffect } from 'react';
import './ExploreMasters.css';

const ExploreMasters = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('masters');
  const [bookedMasters, setBookedMasters] = useState([]);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [profileTab, setProfileTab] = useState('about');

  const [mastersData, setMastersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState(25);

  // Filter Modal Overlay
  const getRangeBackground = (val) => {
    const percentage = (val / 50) * 100;
    return `linear-gradient(to right, #ff4a17 ${percentage}%, #334155 ${percentage}%)`;
  };

  // Fetch real masters from Firestore
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const { db } = await import('../../firebase');

        const querySnapshot = await getDocs(collection(db, "masters"));
        const mastersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMastersData(mastersList);
      } catch (error) {
        console.error("Error fetching masters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMasters();
  }, []);

  const filters = ['All', 'Karate', 'Taekwondo', 'Kung Fu', 'BJJ', 'Muay Thai', 'Judo'];

  const handleConnect = async (master) => {
    // Navigate to profile view
    setSelectedMaster(master);
  };

  const filteredMasters = mastersData.filter(master => {
    const matchesSearch = master.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      master.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || master.specialty === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (selectedMaster) {
    return (
      <div className="em-profile-view">
        <button className="em-profile-back-btn" onClick={() => setSelectedMaster(null)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <div className="em-profile-header">
          <div 
            className="em-profile-avatar" 
            style={{ backgroundImage: `url(${selectedMaster.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'})` }}
          ></div>
          <div className="em-profile-info">
            <h1 className="em-profile-name">{selectedMaster.name}</h1>
            <p className="em-profile-specialty">{Array.isArray(selectedMaster.teachingArts) ? selectedMaster.teachingArts.join(', ') : selectedMaster.specialty}</p>
            <div className="em-profile-rating">
              <span style={{ color: '#ffb800' }}>★</span> {selectedMaster.rating || '4.9'} 
              <span>({selectedMaster.reviews || '127'} reviews)</span>
            </div>
            <div className="em-profile-badges">
              <span className="em-p-badge verified">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
                Verified
              </span>
              <span className="em-p-badge background">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                Background Checked
              </span>
            </div>
          </div>
          <div style={{ position: 'absolute', right: 0, top: 0, color: '#2563eb' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        </div>

        <div className="em-profile-stats-grid">
          <div className="em-stat-box">
            <div className="em-stat-box-icon">📍</div>
            <div className="em-stat-box-label">Location</div>
            <div className="em-stat-box-value">{selectedMaster.distance || '2.3 mi away'}</div>
          </div>
          <div className="em-stat-box">
            <div className="em-stat-box-icon">💰</div>
            <div className="em-stat-box-label">Pricing</div>
            <div className="em-stat-box-value">{selectedMaster.price || '$60-80/session'}</div>
          </div>
        </div>

        <div className="em-profile-tabs">
          {['about', 'schedule', 'reviews'].map(tab => (
            <button 
              key={tab} 
              className={`em-p-tab ${profileTab === tab ? 'active' : ''}`}
              onClick={() => setProfileTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="em-profile-content-section">
          {profileTab === 'about' && (
            <div className="em-about-tab">
              <div className="em-profile-info-card">
                <h3 className="em-info-card-title">About</h3>
                <p className="em-info-card-text">
                  {selectedMaster.description || `${selectedMaster.name} is a highly experienced martial arts master with over 15 years of teaching experience. Specializing in ${selectedMaster.specialty}, they have helped hundreds of students reach their full potential.`}
                </p>
              </div>

              <div className="em-profile-info-card">
                <h3 className="em-info-card-title">Credentials</h3>
                <div className="em-credentials-list">
                  <div className="em-credential-item">
                    <span className="em-cred-icon">🎖️</span>
                    <span className="em-cred-text">USMA Certified Instructor</span>
                  </div>
                  <div className="em-credential-item">
                    <span className="em-cred-icon">🎖️</span>
                    <span className="em-cred-text">Shaolin Temple Certification</span>
                  </div>
                  <div className="em-credential-item">
                    <span className="em-cred-icon">🎖️</span>
                    <span className="em-cred-text">5th Degree Black Belt</span>
                  </div>
                </div>
              </div>

              <div className="em-profile-info-card">
                <h3 className="em-info-card-title">Experience</h3>
                <p className="em-info-card-text">{selectedMaster.experience || '15+ years teaching experience'}</p>
              </div>

              <div className="em-profile-info-card">
                <h3 className="em-info-card-title">Age Groups</h3>
                <div className="em-age-groups-tags">
                  <div className="em-age-tag">
                    <span className="em-age-icon">👥</span>
                    <span className="em-age-text">6-12 years</span>
                  </div>
                  <div className="em-age-tag">
                    <span className="em-age-icon">👥</span>
                    <span className="em-age-text">13-17 years</span>
                  </div>
                  <div className="em-age-tag">
                    <span className="em-age-icon">👥</span>
                    <span className="em-age-text">18-21 years</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {profileTab === 'schedule' && (
            <div className="em-schedule-tab">
              <div className="em-profile-info-card" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ color: '#ff4a17', fontSize: '20px' }}>📅</span>
                  <h3 className="em-info-card-title" style={{ margin: 0 }}>Availability</h3>
                </div>
                <p className="em-info-card-text" style={{ margin: 0 }}>
                  Mon, Wed, Fri: 4-8pm | Sat: 9am-3pm
                </p>
              </div>
            </div>
          )}
          {profileTab === 'reviews' && (
            <div className="em-reviews-tab">
              {/* Review 1 */}
              <div className="em-profile-info-card">
                <div className="em-review-header">
                  <div>
                    <h3 className="em-review-user">Sarah M.</h3>
                    <p className="em-review-date">2 weeks ago</p>
                  </div>
                  <div className="em-review-stars">★★★★★</div>
                </div>
                <p className="em-review-text">Excellent instructor! My daughter has learned so much and loves every class.</p>
              </div>

              {/* Review 2 */}
              <div className="em-profile-info-card">
                <div className="em-review-header">
                  <div>
                    <h3 className="em-review-user">John D.</h3>
                    <p className="em-review-date">1 month ago</p>
                  </div>
                  <div className="em-review-stars">★★★★★</div>
                </div>
                <p className="em-review-text">Patient, knowledgeable, and great with kids. Highly recommend!</p>
              </div>
            </div>
          )}
        </div>

        <div className="em-profile-footer">
          <button className="em-book-btn">Book Trial Class</button>
        </div>
      </div>
    );
  }

  return (
    <div className="em-page-container">
      {/* Filter Modal Overlay */}
      {showFilters && (
        <div className="em-filter-modal-overlay">
          <div className="em-filter-modal">
            <div className="em-filter-modal-header">
              <h2>Filters</h2>
              <button className="em-close-modal" onClick={() => setShowFilters(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="em-filter-scroll-area">
              {/* Distance Section */}
              <div className="em-filter-section">
                <h3 className="em-filter-title">Distance</h3>
                <div className="em-range-container">
                  <input 
                    type="range" 
                    className="em-filter-range" 
                    min="0" 
                    max="50" 
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    style={{ backgroundImage: getRangeBackground(distance) }}
                  />
                  <div className="em-range-labels">
                    <span>Within {distance} miles</span>
                    <span className="em-range-val-highlight">{distance} mi</span>
                  </div>
                </div>
              </div>

              {/* Price Range Section */}
              <div className="em-filter-section">
                <h3 className="em-filter-title">Price Range</h3>
                <div className="em-checkbox-group">
                  <label className="em-checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span className="em-checkbox-custom"></span>
                    All Prices
                  </label>
                  <label className="em-checkbox-label">
                    <input type="checkbox" />
                    <span className="em-checkbox-custom"></span>
                    $0-40/Session
                  </label>
                  <label className="em-checkbox-label">
                    <input type="checkbox" />
                    <span className="em-checkbox-custom"></span>
                    $40-80/Session
                  </label>
                  <label className="em-checkbox-label">
                    <input type="checkbox" />
                    <span className="em-checkbox-custom"></span>
                    $80+/Session
                  </label>
                </div>
              </div>

              {/* Martial Arts Style Section */}
              <div className="em-filter-section">
                <h3 className="em-filter-title">Martial Arts Style</h3>
                <div className="em-checkbox-group">
                  {['Karate', 'Taekwondo', 'Kung Fu', 'Brazilian Jiu-Jitsu', 'Judo', 'Muay Thai', 'Kickboxing'].map(style => (
                    <label key={style} className="em-checkbox-label">
                      <input type="checkbox" />
                      <span className="em-checkbox-custom"></span>
                      {style}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="em-filter-modal-footer">
              <button className="em-clear-filters-btn">Clear All Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Search Section */}
      <div className="em-search-header">
        <h1 className="em-page-title">Discover</h1>
        <div className="em-search-row">
          <div className="em-search-box-wrapper">
            <svg className="em-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or martial art..."
              className="em-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="em-filter-button" onClick={() => setShowFilters(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="2" y1="14" x2="6" y2="14" /><line x1="10" y1="8" x2="14" y2="8" /><line x1="18" y1="16" x2="22" y2="16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="em-filters-bar">
        {filters.map(filter => (
          <button
            key={filter}
            className={`em-filter-chip ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="em-tab-switcher">
        <button
          className={`em-tab ${activeTab === 'masters' ? 'active' : ''}`}
          onClick={() => setActiveTab('masters')}
        >
          Find Masters
        </button>
        <button
          className={`em-tab ${activeTab === 'academies' ? 'active' : ''}`}
          onClick={() => setActiveTab('academies')}
        >
          Find Academies
        </button>
      </div>

      <div className="em-content-area">
        {activeTab === 'masters' ? (
          <div className="em-masters-grid">
            {filteredMasters.length > 0 ? (
              filteredMasters.map(master => (
                <div key={master.id} className="em-master-card">
                  {/* Video/Cover Area */}
                  <div className="em-card-video-area">
                    <div 
                      className="em-video-bg" 
                      style={{ backgroundImage: `url(${master.coverImage || 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800'})` }}
                    ></div>
                    <div className="em-badges-row">
                      <span className="em-badge verified">🛡️ VERIFIED</span>
                      <span className="em-badge background">✅ BACKGROUND</span>
                      <span className="em-badge child-safe">👶 CHILD SAFE</span>
                    </div>
                    <div className="em-play-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="m7 4 12 8-12 8V4z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Profile Header Info */}
                  <div className="em-card-header-info">
                    <div 
                      className="em-master-avatar" 
                      style={{ backgroundImage: `url(${master.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'})` }}
                    ></div>
                    <div className="em-master-main-details">
                      <div className="em-master-name-row">
                        <h3 className="em-master-name">{master.name}</h3>
                      </div>
                      <div className="em-rating-exp-row">
                        <span className="em-rating-val">
                          <span className="em-rating-star">★</span> {master.rating || '4.9'}
                        </span>
                        <span className="em-review-count">({master.reviews || '127'})</span>
                        <span className="em-dot">•</span>
                        <span className="em-exp-text">{master.experience || '15+ yrs exp'}</span>
                      </div>
                      <div className="em-specialty-text">
                        {Array.isArray(master.teachingArts) ? master.teachingArts.join(', ') : master.specialty}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="em-details-grid">
                    <div className="em-detail-item">
                      <div className="em-detail-icon">📍</div>
                      <div className="em-detail-content">
                        <span className="em-detail-label">LOCATION</span>
                        <span className="em-detail-value">{master.distance || '2.3 mi away'}</span>
                      </div>
                    </div>
                    <div className="em-detail-item">
                      <div className="em-detail-icon">💰</div>
                      <div className="em-detail-content">
                        <span className="em-detail-label">PRICING</span>
                        <span className="em-detail-value">{master.price || '$60-80/session'}</span>
                      </div>
                    </div>
                    <div className="em-detail-item">
                      <div className="em-detail-icon">🌐</div>
                      <div className="em-detail-content">
                        <span className="em-detail-label">LANGUAGES</span>
                        <span className="em-detail-value">{master.languages || 'English, Hindi'}</span>
                      </div>
                    </div>
                    <div className="em-detail-item">
                      <div className="em-detail-icon">🎯</div>
                      <div className="em-detail-content">
                        <span className="em-detail-label">SPECIALITY</span>
                        <span className="em-detail-value">{master.targetAudience || 'Beginners'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Pills */}
                  <div className="em-status-pills">
                    <div className="em-status-pill in-person">In-Person</div>
                    <div className="em-status-pill online">📶 Online</div>
                    <div className="em-status-pill available">🟢 Available Now</div>
                  </div>

                  {/* Footer Button */}
                  <button 
                    className="em-view-profile-btn"
                    onClick={() => handleConnect(master)}
                  >
                    View Profile & Book
                  </button>
                </div>
              ))
            ) : (
              /* Sample Containers as fallback for now */
              <>
                {/* Sample 1: Master Chen Wei */}
                <div className="em-master-card">
                  <div className="em-card-video-area">
                    <div 
                      className="em-video-bg" 
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800')` }}
                    ></div>
                    <div className="em-badges-row">
                      <span className="em-badge verified">🛡️ VERIFIED</span>
                      <span className="em-badge background">✅ BACKGROUND</span>
                      <span className="em-badge child-safe">👶 CHILD SAFE</span>
                    </div>
                    <div className="em-play-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
                    </div>
                  </div>
                  <div className="em-card-header-info">
                    <div className="em-master-avatar" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200')` }}></div>
                    <div className="em-master-main-details" style={{ textAlign: 'left' }}>
                      <h3 className="em-master-name">Master Chen Wei</h3>
                      <div className="em-rating-exp-row">
                        <span className="em-rating-val"><span className="em-rating-star">★</span> 4.9</span>
                        <span className="em-review-count">(127)</span>
                        <span className="em-dot">•</span>
                        <span className="em-exp-text">15+ yrs exp</span>
                      </div>
                      <div className="em-specialty-text">Kung Fu, Tai Chi</div>
                    </div>
                  </div>
                  <div className="em-details-grid">
                    <div className="em-detail-item"><div className="em-detail-icon">📍</div><div className="em-detail-content"><span className="em-detail-label">LOCATION</span><span className="em-detail-value">2.3 mi away</span></div></div>
                    <div className="em-detail-item"><div className="em-detail-icon">💰</div><div className="em-detail-content"><span className="em-detail-label">PRICING</span><span className="em-detail-value">$60-80/session</span></div></div>
                    <div className="em-detail-item"><div className="em-detail-icon">🌐</div><div className="em-detail-content"><span className="em-detail-label">LANGUAGES</span><span className="em-detail-value">English, Hindi</span></div></div>
                    <div className="em-detail-item"><div className="em-detail-icon">🎯</div><div className="em-detail-content"><span className="em-detail-label">SPECIALITY</span><span className="em-detail-value">Beginners</span></div></div>
                  </div>
                  <div className="em-status-pills">
                    <div className="em-status-pill in-person">In-Person</div>
                    <div className="em-status-pill online">📶 Online</div>
                    <div className="em-status-pill available">🟢 Available Now</div>
                  </div>
                  <button 
                    className="em-view-profile-btn"
                    onClick={() => setSelectedMaster({
                      id: 'chen-wei',
                      name: 'Master Chen Wei',
                      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
                      specialty: 'Kung Fu, Tai Chi',
                      rating: '4.9',
                      reviews: '127',
                      experience: '15+ yrs exp',
                      distance: '2.3 mi away',
                      price: '$60-80/session',
                      languages: 'English, Hindi',
                      targetAudience: 'Beginners',
                      description: 'Master Chen Wei is a legendary Kung Fu instructor with a focus on traditional forms and internal power. With over 15 years of experience, he helps students find balance and strength.'
                    })}
                  >
                    View Profile & Book
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="em-academies-list">
            {/* Academy 1 */}
            <div className="em-academy-card">
              <div className="em-academy-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=300')` }}></div>
              <div className="em-academy-content">
                <div className="em-academy-header">
                  <span className="em-academy-icon">🏢</span>
                  <h3 className="em-academy-name">Elite Martial Arts Academy</h3>
                  <span className="em-academy-shield">🛡️</span>
                </div>
                <p className="em-academy-arts">Karate, Taekwondo, Brazilian Jiu-Jitsu</p>
                <div className="em-academy-stats">
                  <div className="em-stat-item"><span className="em-stat-icon">⭐</span> 4.9 (234)</div>
                  <div className="em-stat-item"><span className="em-stat-icon">📍</span> 1.5 mi</div>
                </div>
                <div className="em-academy-counts">
                  <div className="em-stat-item"><span className="em-stat-icon">🥋</span> 8 Masters</div>
                  <div className="em-stat-item"><span className="em-stat-icon">👥</span> 150 Students</div>
                </div>
                <div className="em-academy-price">$150-200/month</div>
              </div>
            </div>

            {/* Academy 2 */}
            <div className="em-academy-card">
              <div className="em-academy-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300')` }}></div>
              <div className="em-academy-content">
                <div className="em-academy-header">
                  <span className="em-academy-icon">🏢</span>
                  <h3 className="em-academy-name">Warrior Path Dojo</h3>
                  <span className="em-academy-shield">🛡️</span>
                </div>
                <p className="em-academy-arts">Kung Fu, Tai Chi, Wing Chun</p>
                <div className="em-academy-stats">
                  <div className="em-stat-item"><span className="em-stat-icon">⭐</span> 4.8 (187)</div>
                  <div className="em-stat-item"><span className="em-stat-icon">📍</span> 3.2 mi</div>
                </div>
                <div className="em-academy-counts">
                  <div className="em-stat-item"><span className="em-stat-icon">🥋</span> 5 Masters</div>
                  <div className="em-stat-item"><span className="em-stat-icon">👥</span> 95 Students</div>
                </div>
                <div className="em-academy-price">$120-160/month</div>
              </div>
            </div>

            {/* Academy 3 */}
            <div className="em-academy-card">
              <div className="em-academy-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=300')` }}></div>
              <div className="em-academy-content">
                <div className="em-academy-header">
                  <span className="em-academy-icon">🏢</span>
                  <h3 className="em-academy-name">Iron Fist Combat Academy</h3>
                  <span className="em-academy-shield">🛡️</span>
                </div>
                <p className="em-academy-arts">Muay Thai, Kickboxing, Boxing, MMA</p>
                <div className="em-academy-stats">
                  <div className="em-stat-item"><span className="em-stat-icon">⭐</span> 4.7 (156)</div>
                  <div className="em-stat-item"><span className="em-stat-icon">📍</span> 2.8 mi</div>
                </div>
                <div className="em-academy-counts">
                  <div className="em-stat-item"><span className="em-stat-icon">🥋</span> 6 Masters</div>
                  <div className="em-stat-item"><span className="em-stat-icon">👥</span> 120 Students</div>
                </div>
                <div className="em-academy-price">$140-180/month</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreMasters;
