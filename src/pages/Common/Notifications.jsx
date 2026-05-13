import React, { useState } from 'react';
import './Notifications.css';

const Notifications = ({ user, userRole }) => {
  // Mock notifications based on role
  const [notifications, setNotifications] = useState(
    userRole === 'master' ? [
      {
        id: 'n1',
        type: 'request',
        title: 'New Booking Request',
        message: 'Rohan Sharma has requested to connect with you for Karate training.',
        time: '2 mins ago',
        isRead: false,
        studentId: 's1'
      },
      {
        id: 'n2',
        type: 'info',
        title: 'Profile Verified',
        message: 'Your Master profile has been successfully verified by the Sparout team.',
        time: '1 hour ago',
        isRead: true
      }
    ] : [
      {
        id: 'n3',
        type: 'acceptance',
        title: 'Connection Accepted',
        message: 'Master Ken Tanaka has accepted your connection request. You can now start training!',
        time: '5 mins ago',
        isRead: false,
        masterId: 'm1'
      },
      {
        id: 'n4',
        type: 'info',
        title: 'Welcome to Sparout!',
        message: 'Start your journey by exploring and connecting with the best Masters near you.',
        time: '2 hours ago',
        isRead: true
      }
    ]
  );

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'request': return '🥋';
      case 'acceptance': return '🤝';
      case 'info': return '💡';
      default: return '🔔';
    }
  };

  return (
    <div className="nt-notifications-page">
      <div className="nt-header">
        <h1 className="nt-title">Notifications</h1>
        <button className="nt-clear-btn" onClick={() => setNotifications([])}>Clear All</button>
      </div>

      <div className="nt-list">
        {notifications.length > 0 ? (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`nt-item ${notif.isRead ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="nt-icon-box">
                {getIcon(notif.type)}
              </div>
              <div className="nt-content">
                <div className="nt-item-header">
                  <h3 className="nt-item-title">{notif.title}</h3>
                  <span className="nt-time">{notif.time}</span>
                </div>
                <p className="nt-message">{notif.message}</p>
              </div>
              {!notif.isRead && <div className="nt-unread-indicator"></div>}
            </div>
          ))
        ) : (
          <div className="nt-empty">
            <div className="nt-empty-icon">🔔</div>
            <p>Your inbox is quiet today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
