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
        const tourRef = doc(db, "tournaments", editingTournament.id);
        await updateDoc(tourRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
        alert("Tournament updated successfully!");
      } else {
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

  const filteredTournaments = tournaments.filter(t => {
    const currentUserId = user?.uid || user?.id;
    if (activeSubTab === 'booked') return bookedTournaments.find(bt => bt.id === t.id);
    if (activeSubTab === 'my') return t.masterId === currentUserId;
    if (activeSubTab === 'upcoming') return t.status === 'Upcoming' || t.status === 'Open for Registration';
    if (activeSubTab === 'live') return t.status === 'Ongoing';
    if (activeSubTab === 'completed') return t.status === 'Finished';
    return true; 
  });

  return (
    <div className="st-tour-container">
      {/* Top Section */}
      <div className="st-tour-header">
        <h1 className="st-tour-title">Tournaments</h1>
        <div className="st-tour-actions">
          {isMaster && (
            <button className="st-tour-create-btn" onClick={() => { setEditingTournament(null); setIsFormOpen(true); }}>
              <span>+</span> Create
            </button>
          )}
          <button 
            className={`st-tour-booked-badge ${activeSubTab === 'booked' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('booked')}
          >
            Booked: {bookedTournaments.length}
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="st-tour-tabs">
        <button 
          className={`st-tour-tab-item ${activeSubTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`st-tour-tab-item ${activeSubTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('live')}
        >
          Live
        </button>
        <button 
          className={`st-tour-tab-item ${activeSubTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('completed')}
        >
          Completed
        </button>
        {isMaster && (
          <button 
            className={`st-tour-tab-item ${activeSubTab === 'my' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('my')}
          >
            Our Tournaments
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="st-tour-list">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map(tournament => (
            <div key={tournament.id} className="st-tour-card">
              <div 
                className="st-tour-card-img" 
                style={{ backgroundImage: `url(${tournament.image || 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=800'})` }}
              >
                <div className="st-tour-status-badge">{tournament.status}</div>
              </div>
              <div className="st-tour-details">
                <div className="st-tour-title-row">
                  <h3 className="st-tour-card-name">{tournament.title}</h3>
                  {isMaster && tournament.masterId === user?.uid && (
                    <button className="st-tour-edit-btn" onClick={() => handleEditClick(tournament)}>Edit</button>
                  )}
                </div>
                <div className="st-tour-info-box">
                  <div className="st-tour-info-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>
                      {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''} 
                      {tournament.endDate && ` – ${new Date(tournament.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                    </span>
                  </div>
                  {tournament.startTime && (
                    <div className="st-tour-info-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>{tournament.startTime}</span>
                    </div>
                  )}
                  <div className="st-tour-info-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span>{tournament.location}</span>
                  </div>
                  <div className="st-tour-info-row st-tour-price-text">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                    <span>₹{tournament.price}</span>
                  </div>
                </div>
                
                {(!isMaster || tournament.masterId !== user?.uid) && !bookedTournaments.find(t => t.id === tournament.id) && (
                  <button 
                    className="st-tour-book-btn"
                    onClick={() => handleBookNow(tournament)}
                  >
                    Book Now
                  </button>
                )}
                
                {bookedTournaments.find(t => t.id === tournament.id) && (
                  <div className="st-tour-booked-label">
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
          <div className="st-tour-empty">
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
