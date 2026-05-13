import React, { useState, useEffect } from 'react';
import './ExploreMasters.css';

const ExploreMasters = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookedMasters, setBookedMasters] = useState([]);

  const [mastersData, setMastersData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        
        // Only show real data from Firestore
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
    if (!bookedMasters.includes(master.id)) {
      try {
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        const { db } = await import('../../firebase');

        // 1. Create a real connection request in Firestore
        await addDoc(collection(db, "connections"), {
          masterId: master.id,
          masterName: master.name,
          studentId: user.uid,
          studentName: user.fullName || 'Student',
          studentEmail: user.email,
          studentPhone: user.phone || '',
          studentImage: user.profileImage || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
          status: 'pending',
          interest: master.specialty,
          experience: 'Beginner', // Default for now
          createdAt: serverTimestamp()
        });

        // 2. Add to local booked list to update UI instantly
        setBookedMasters([...bookedMasters, master.id]);
        
        alert(`Request sent to ${master.name}! They will receive a notification and can accept your request from their Student Hub.`);
      } catch (error) {
        console.error("Connection Request Error:", error);
        alert("Failed to send request: " + error.message);
      }
    } else {
      alert(`You have already requested to connect with ${master.name}.`);
    }
  };

  const filteredMasters = mastersData.filter(master => {
    const matchesSearch = master.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          master.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || master.specialty === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="em-page-container">
      {/* Top Search Section */}
      <div className="em-search-header">
        <h1 className="em-page-title">Find Masters</h1>
        <div className="em-search-box-wrapper">
          <svg className="em-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search by name or style..." 
            className="em-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      <div className="em-masters-grid">
        {filteredMasters.length > 0 ? (
          filteredMasters.map(master => (
            <div key={master.id} className="em-master-card">
              <div className="em-card-top">
                <div 
                  className="em-master-image" 
                  style={{ 
                    backgroundImage: `url(${master.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'})`,
                    backgroundSize: master.image ? 'cover' : '60%'
                  }}
                >
                </div>
                <div className="em-master-basic-info">
                  <h3 className="em-master-name">{master.name}</h3>
                  <div className="em-specialty-tags-row">
                    {Array.isArray(master.teachingArts) ? master.teachingArts.map(art => (
                      <span key={art} className="em-specialty-tag">{art}</span>
                    )) : <span className="em-specialty-tag">{master.specialty}</span>}
                  </div>
                  <div className="em-stats-row">
                    <span className="em-stat-item">🥋 {master.experience}</span>
                    <span className="em-stat-item">👥 {master.students}+ Students</span>
                  </div>
                </div>
              </div>
              
              <div className="em-card-body">
                <p className="em-master-desc">{master.description}</p>
                <div className="em-price-row">
                  <span className="em-price-label">Starting from</span>
                  <span className="em-price-value">{master.price}</span>
                </div>
                <button 
                  className={`em-connect-btn ${bookedMasters.includes(master.id) ? 'connected' : ''}`}
                  onClick={() => handleConnect(master)}
                >
                  {bookedMasters.includes(master.id) ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Connected
                    </>
                  ) : 'Connect with Master'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="em-no-results">
            <p>No masters found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreMasters;
