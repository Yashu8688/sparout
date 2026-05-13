import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './ExploreStudents.css';

const ExploreStudents = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState('explore'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for real-time connection requests
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "connections"),
      where("masterId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const { getDoc, doc } = await import('firebase/firestore');
      
      const connectionsList = await Promise.all(querySnapshot.docs.map(async (connectionDoc) => {
        const data = connectionDoc.data();
        let studentPhone = data.studentPhone;

        // Fallback: If phone is missing in connection, fetch from student's user profile
        if (!studentPhone && data.studentId) {
          try {
            const userRef = doc(db, "users", data.studentId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              studentPhone = userSnap.data().phone || userSnap.data().phoneNumber;
            }
          } catch (err) {
            console.error("Error fetching student phone fallback:", err);
          }
        }

        return {
          id: connectionDoc.id,
          name: data.studentName,
          interest: data.interest,
          experience: data.experience,
          image: data.studentImage,
          phone: studentPhone,
          status: data.status
        };
      }));
      
      setStudents(connectionsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const handleAccept = async (connectionId) => {
    try {
      const connectionRef = doc(db, "connections", connectionId);
      await updateDoc(connectionRef, {
        status: 'accepted'
      });
      alert('Student accepted! They are now in your "Our Students" list.');
    } catch (error) {
      console.error("Accept Error:", error);
      alert("Failed to accept student.");
    }
  };

  const handleReject = async (connectionId) => {
    try {
      const connectionRef = doc(db, "connections", connectionId);
      await updateDoc(connectionRef, {
        status: 'none'
      });
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("This student hasn't provided a phone number.");
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.interest.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeSubTab === 'explore') return matchesSearch && s.status === 'none';
    if (activeSubTab === 'request') return matchesSearch && s.status === 'pending';
    if (activeSubTab === 'our-students') return matchesSearch && s.status === 'accepted';
    return false;
  });

  return (
    <div className="es-main-container">
      {/* Header Section */}
      <div className="es-top-section">
        <h1 className="es-page-title">Student Hub</h1>
        <div className="es-search-wrapper">
          <svg className="es-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search students..." 
            className="es-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="es-tabs-bar">
        <button 
          className={`es-tab-btn ${activeSubTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('explore')}
        >
          Explore
        </button>
        <button 
          className={`es-tab-btn ${activeSubTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('request')}
        >
          Requests
          {students.filter(s => s.status === 'pending').length > 0 && (
            <span className="es-notif-dot"></span>
          )}
        </button>
        <button 
          className={`es-tab-btn ${activeSubTab === 'our-students' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('our-students')}
        >
          Our Students
        </button>
      </div>

      {/* Content List */}
      <div className="es-list-content">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <div key={student.id} className="es-student-card">
              <div className="es-card-left">
                <img src={student.image} alt={student.name} className="es-student-avatar" />
                <div className="es-student-info">
                  <h3 className="es-student-name">{student.name}</h3>
                  <div className="es-student-meta">
                    <span className="es-interest-tag">{student.interest}</span>
                    <span className="es-exp-label">• {student.experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="es-card-actions">
                {activeSubTab === 'explore' && (
                  <button className="es-view-profile-btn">View Profile</button>
                )}
                {activeSubTab === 'request' && (
                  <>
                    <button className="es-accept-btn" onClick={() => handleAccept(student.id)}>Accept</button>
                    <button className="es-reject-btn" onClick={() => handleReject(student.id)}>✕</button>
                  </>
                )}
                {activeSubTab === 'our-students' && (
                  <button className="es-call-btn" onClick={() => handleCall(student.phone)}>Call</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="es-empty-state">
            <p>No students found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreStudents;
