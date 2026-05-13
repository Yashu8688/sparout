import React from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import './Profile.css';

const Profile = ({ user, role, onBack }) => {
  // Mock data for profile
  const profileData = {
    name: role === 'master' ? 'Master Chen' : 'Yashwanth Raj',
    headline: role === 'master' ? 'Senior MMA Instructor | 15+ Years Experience' : 'Aspiring Mixed Martial Artist | Blue Belt in BJJ',
    location: 'Mumbai, Maharashtra, India',
    connections: '500+',
    about: role === 'master' 
      ? 'Dedicated martial arts master with a passion for teaching and developing the next generation of fighters. Specialized in Muay Thai and Brazilian Jiu-Jitsu.'
      : 'Passionate martial artist looking to compete at the national level. Currently training at elite clubs and improving my striking and grappling skills.',
    experience: [
      {
        role: role === 'master' ? 'Head Coach' : 'Junior Athlete',
        company: 'Elite MMA Academy',
        duration: '2018 - Present',
        description: role === 'master' ? 'Overseeing all training programs and student development.' : 'Training under Master Chen and competing in regional tournaments.'
      }
    ],
    education: [
      {
        school: 'Martial Arts Federation of India',
        degree: 'Black Belt 4th Dan',
        duration: '2010 - 2014'
      }
    ],
    posts: [
      {
        id: 1,
        content: 'Great session today at the academy! Everyone is showing massive improvement.',
        likes: 124,
        comments: 18,
        time: '2h ago',
        image: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 2,
        content: 'Excited to announce our upcoming tournament in December. Stay tuned!',
        likes: 256,
        comments: 42,
        time: '1d ago'
      }
    ]
  };

  return (
    <div className="sparout-profile-page">
      <Header />
      
      <main className="profile-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-banner">
            <img src="https://images.unsplash.com/photo-1599058917233-3580e6d23132?auto=format&fit=crop&q=80&w=800" alt="Banner" />
          </div>
          <div className="profile-info-section">
            <div className="profile-photo">
              <img src={role === 'master' 
                ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
                : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
              } alt="Profile" />
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{profileData.name}</h1>
              <p className="profile-headline">{profileData.headline}</p>
              <p className="profile-meta">{profileData.location} • <span className="connection-link">{profileData.connections} connections</span></p>
              <div className="profile-actions">
                <button className="btn-primary">Open to</button>
                <button className="btn-secondary">Add profile section</button>
                <button className="btn-outline">More</button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">About</h2>
            <button className="edit-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
          </div>
          <p className="section-text">{profileData.about}</p>
        </div>

        {/* Experience Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Experience</h2>
            <div className="section-actions">
              <button className="add-btn">+</button>
              <button className="edit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
          </div>
          {profileData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="company-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div className="item-details">
                <h3 className="item-title">{exp.role}</h3>
                <p className="item-subtitle">{exp.company}</p>
                <p className="item-date">{exp.duration}</p>
                <p className="item-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Section */}
        <div className="profile-section activity-section">
          <div className="section-header">
            <div className="title-group">
              <h2 className="section-title">Activity</h2>
              <p className="follower-count">1,234 followers</p>
            </div>
            <button className="btn-outline-sm">Create a post</button>
          </div>
          <div className="activity-tabs">
            <button className="act-tab active">Posts</button>
            <button className="act-tab">Videos</button>
            <button className="act-tab">Images</button>
          </div>
          <div className="posts-list">
            {profileData.posts.map(post => (
              <div key={post.id} className="profile-post">
                <p className="post-time">{post.time}</p>
                <p className="post-content">{post.content}</p>
                {post.image && <img src={post.image} alt="Post content" className="post-img" />}
                <div className="post-stats">
                  <span>👍 {post.likes}</span>
                  <span>•</span>
                  <span>{post.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn">Show all activity →</button>
        </div>
      </main>

      <Footer activeTab="profile" />
    </div>
  );
};

export default Profile;
