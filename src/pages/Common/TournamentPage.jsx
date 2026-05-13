import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import MasterTournamentForm from '../Master/MasterTournamentForm';
import './TournamentPage.css';

const TournamentPage = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState('upcoming'); // 'all', 'my', 'upcoming', 'live', 'completed', 'booked'
  const [bookedTournaments, setBookedTournaments] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);

  const isMaster = user?.role === 'master';

  // Listen for real-time tournaments
  useEffect(() => {
    const q = collection(db, "tournaments");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTournaments(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveTournament = async (formData) => {
    try {
      if (editingTournament) {
        // Update existing
        const tourRef = doc(db, "tournaments", editingTournament.id);
        await updateDoc(tourRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
        alert("Tournament updated successfully!");
      } else {
        // Create new
        await addDoc(collection(db, "tournaments"), {
          ...formData,
          masterId: user.uid || user.id,
          masterName: user.fullName || user.name,
          createdAt: serverTimestamp()
        });
        alert("Tournament published successfully!");
      }
      setIsFormOpen(false);
      setEditingTournament(null);
    } catch (error) {
      console.error("Save Tournament Error:", error);
      alert("Failed to save tournament.");
    }
  };

  const handleBookNow = (tournament) => {
    if (!bookedTournaments.find(t => t.id === tournament.id)) {
      setBookedTournaments([...bookedTournaments, tournament]);
      alert(`Successfully booked: ${tournament.title}`);
    } else {
      alert('You have already booked this tournament.');
    }
  };

  const handleEditClick = (tournament) => {
    setEditingTournament(tournament);
    setIsFormOpen(true);
  };

  // Filter Logic
  // Filter Logic
  const filteredTournaments = tournaments.filter(t => {
    const currentUserId = user?.uid || user?.id;
    
    if (activeSubTab === 'booked') return bookedTournaments.find(bt => bt.id === t.id);
    if (activeSubTab === 'my') return t.masterId === currentUserId;
    if (activeSubTab === 'upcoming') return t.status === 'Upcoming' || t.status === 'Open for Registration';
    if (activeSubTab === 'live') return t.status === 'Ongoing';
    if (activeSubTab === 'completed') return t.status === 'Finished';
    return true; // 'all'
  });

  return (
    <div className="tp-main-container">
      {/* Top Section */}
      <div className="tp-top-header">
        <h1 className="tp-page-title">Tournaments</h1>
        <div className="tp-header-actions">
          {isMaster && (
            <button className="tp-create-btn" onClick={() => { setEditingTournament(null); setIsFormOpen(true); }}>
              <span>+</span> Create
            </button>
          )}
          <button 
            className={`tp-booked-badge ${activeSubTab === 'booked' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('booked')}
          >
            Booked: {bookedTournaments.length}
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tp-tabs-container">
        <button 
          className={`tp-tab-item ${activeSubTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`tp-tab-item ${activeSubTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('live')}
        >
          Live
        </button>
        <button 
          className={`tp-tab-item ${activeSubTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('completed')}
        >
          Completed
        </button>
        {isMaster && (
          <button 
            className={`tp-tab-item ${activeSubTab === 'my' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('my')}
          >
            Our Tournaments
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="tp-content-list">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map(tournament => (
            <div key={tournament.id} className="tp-tournament-card">
              <div 
                className="tp-card-image" 
                style={{ backgroundImage: `url(${tournament.image || 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800'})` }}
              >
                <div className="tp-card-status-badge">{tournament.status}</div>
              </div>
              <div className="tp-card-details">
                <div className="tp-card-title-row">
                  <h3 className="tp-tournament-name">{tournament.title}</h3>
                  {isMaster && tournament.masterId === user?.uid && (
                    <button className="tp-edit-link" onClick={() => handleEditClick(tournament)}>Edit</button>
                  )}
                </div>
                <div className="tp-tournament-info">
                  <span className="tp-info-item">
                    📅 {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''} 
                    {tournament.endDate && ` – ${new Date(tournament.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                    {tournament.startTime && ` • 🕒 ${tournament.startTime}`}
                  </span>
                  <span className="tp-info-item">📍 {tournament.location}</span>
                  <span className="tp-info-item tp-price">🎫 ₹{tournament.price}</span>
                </div>
                
                {(!isMaster || tournament.masterId !== user?.uid) && !bookedTournaments.find(t => t.id === tournament.id) && (
                  <button 
                    className="tp-book-now-btn"
                    onClick={() => handleBookNow(tournament)}
                  >
                    Book Now
                  </button>
                )}
                
                {bookedTournaments.find(t => t.id === tournament.id) && (
                  <div className="tp-booked-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Booked
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="tp-empty-state">
            <p>{loading ? 'Loading tournaments...' : 'No tournaments found for this category.'}</p>
          </div>
        )}
      </div>

      <MasterTournamentForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTournament}
        editingData={editingTournament}
      />
    </div>
  );
};

export default TournamentPage;
