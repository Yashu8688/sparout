import React, { useState } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import ExperienceForm from './ExperienceForm';
import EducationForm from '../Common/EducationForm';
import SkillsForm from '../Common/SkillsForm';
import './MasterProfile.css';

const MasterProfile = ({ user, onBack, isTab = false, onEditChange, onLogout }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Notify parent of edit state change
  React.useEffect(() => {
    if (onEditChange) onEditChange(isEditing);
  }, [isEditing, onEditChange]);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState('');

  const [masterData, setMasterData] = useState({
    name: user?.fullName?.split(' ')[0] || 'Master',
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    countryCode: user?.countryCode || '+91',
    gender: user?.gender || 'Male',
    dob: user?.dob || '',
    headline: user?.headline || 'Martial Arts Sensei',
    specialty: user?.specialty || 'Professional Trainer',
    location: user?.city ? `${user.city}, ${user.state || ''}` : 'Location not set',
    bio: user?.bio || 'Dedicated martial arts master with a passion for teaching and developing the next generation of fighters.',
    stats: {
      posts: 0,
      followers: '0',
      following: 0
    },
    posts: [],
    experiences: user?.experiences || [],
    education: user?.education || [],
    skills: user?.skills || []
  });

  // Sync with user prop updates
  React.useEffect(() => {
    if (user) {
      setMasterData(prev => ({
        ...prev,
        ...user,
        name: user.fullName?.split(' ')[0] || prev.name,
        location: user.city ? `${user.city}, ${user.state || ''}` : prev.location
      }));
    }
  }, [user]);

  const [editForm, setEditForm] = useState({ ...masterData });
  const [showExpModal, setShowExpModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [expFormData, setExpFormData] = useState({
    title: '',
    org: '',
    role: '',
    duration: '',
    location: '',
    description: ''
  });

  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setExpFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveExp = () => {
    if (editingExp) {
      setMasterData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => e.id === editingExp ? { ...expFormData, id: editingExp } : e)
      }));
    } else {
      setMasterData(prev => ({
        ...prev,
        experiences: [...prev.experiences, { ...expFormData, id: Date.now() }]
      }));
    }
    setShowExpModal(false);
    setEditingExp(null);
    setExpFormData({ title: '', org: '', role: '', duration: '', location: '', description: '' });
  };

  const startEditExp = (exp) => {
    setEditingExp(exp.id);
    setExpFormData({ ...exp });
    setShowExpModal(true);
  };

  const startAddExp = () => {
    setEditingExp(null);
    setExpFormData({ title: '', org: '', role: '', duration: '', location: '', description: '' });
    setShowExpModal(true);
  };

  // Education Handlers
  const [showEduModal, setShowEduModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);

  const handleSaveEdu = (data) => {
    if (editingEdu) {
      setMasterData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === editingEdu ? { ...data, id: editingEdu } : e)
      }));
    } else {
      setMasterData(prev => ({
        ...prev,
        education: [...prev.education, { ...data, id: Date.now() }]
      }));
    }
    setShowEduModal(false);
    setEditingEdu(null);
  };

  // Skills Handlers
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const handleSaveSkills = (newSkills) => {
    setMasterData(prev => ({ ...prev, skills: newSkills }));
    setShowSkillsModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setMasterData({ ...editForm });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="MasterProfile-EditWrapper">
        <div className="MasterProfile-EditHeader">
          <button className="MasterProfile-BackBtn" onClick={() => setIsEditing(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1>EDIT MASTER PORTAL</h1>
          <div style={{ width: 40 }}></div>
        </div>

        <div className="MasterProfile-EditAvatarSection">
          <div className="MasterProfile-EditAvatarPreview">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" 
              alt="Profile" 
            />
            <div className="MasterProfile-EditOverlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </div>
          <p>UPDATE MASTER PHOTO</p>
        </div>

        <form className="MasterProfile-EditForm" onSubmit={handleSaveProfile}>
          <div className="MasterProfile-SectionHeader">IDENTITY & LEGACY</div>
          <div className="MasterProfile-EditGrid">
            <div className="MasterProfile-EditGroup">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={editForm.fullName} 
                onChange={handleEditChange} 
                placeholder="Full Name"
              />
            </div>

            <div className="MasterProfile-EditGroup">
              <label>Professional Email</label>
              <input 
                type="email" 
                name="email" 
                value={editForm.email} 
                onChange={handleEditChange} 
              />
            </div>

            <div className="MasterProfile-EditGroup full-width">
              <label>Professional Headline</label>
              <input 
                type="text" 
                name="headline" 
                value={editForm.headline} 
                onChange={handleEditChange} 
                placeholder="e.g. Senior MMA Instructor"
              />
            </div>

            <div className="MasterProfile-EditGroup">
              <label>Specialty / Rank</label>
              <input 
                type="text" 
                name="specialty" 
                value={editForm.specialty} 
                onChange={handleEditChange} 
                placeholder="e.g. Black Belt 4th Dan"
              />
            </div>

            <div className="MasterProfile-EditGroup">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                value={editForm.city} 
                onChange={handleEditChange} 
                placeholder="City"
              />
            </div>

            <div className="MasterProfile-EditGroup full-width">
              <label>Master Bio</label>
              <textarea 
                name="bio" 
                value={editForm.bio} 
                onChange={handleEditChange} 
                rows="4"
                placeholder="Describe your legacy..."
              />
            </div>
          </div>

          <div className="MasterProfile-SectionHeader">PROFESSIONAL CONTACT</div>
          <div className="MasterProfile-EditGrid">
            <div className="MasterProfile-EditGroup">
              <label>Phone Number</label>
              <div className="MasterProfile-PhoneInput">
                <select name="countryCode" value={editForm.countryCode} onChange={handleEditChange}>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input 
                  type="tel" 
                  name="phone" 
                  value={editForm.phone} 
                  onChange={handleEditChange} 
                />
              </div>
            </div>

            <div className="MasterProfile-EditGroup">
              <label>Gender</label>
              <select name="gender" value={editForm.gender} onChange={handleEditChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button type="submit" className="MasterProfile-SaveBtn">Sync Professional Mastery</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`MasterProfile-Root ${isTab ? 'is-tab' : ''}`}>
      {!isTab && <Header />}
      
      <main className="MasterProfile-Content">
        {/* Profile Header Card */}
        <section className="MasterProfile-HeaderCard">
          <div className="MasterProfile-BannerBox">
            <img 
              src="https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=1200" 
              alt="Banner" 
              className="MasterProfile-Banner"
            />
            <button className="MasterProfile-BannerEdit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
          </div>

          <div className="MasterProfile-IdentityBox">
            <div className="MasterProfile-AvatarWrapper">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" 
                alt="Master Avatar" 
                className="MasterProfile-AvatarImage"
              />
            </div>
            
            <div className="MasterProfile-MainInfo">
              <div className="MasterProfile-NameRow">
                <h1 className="MasterProfile-NameText">{masterData.name}</h1>
                <span className="MasterProfile-VerificationBadge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#00a3ff"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 15.1l-3.5-3.5 1.4-1.4 2.1 2.1 5.3-5.3 1.4 1.4-6.7 6.7z"/></svg>
                </span>
              </div>
              <div className="MasterProfile-BioDetails">
                <p className="MasterProfile-Headline">{masterData.headline}</p>
                <p className="MasterProfile-Specialty">{masterData.specialty}</p>
              </div>
            </div>
          </div>

          <div className="MasterProfile-ActionRow">
            <button className="MasterProfile-PrimaryBtn" onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button className="MasterProfile-SecondaryBtn">Share</button>
            <button className="MasterProfile-LogoutBtn" onClick={onLogout}>Logout</button>
          </div>

          <div className="MasterProfile-StatsGrid">
            <div className="MasterProfile-StatBlock">
              <span className="MasterProfile-StatNum">{masterData.stats.posts}</span>
              <span className="MasterProfile-StatLabel">posts</span>
            </div>
            <div className="MasterProfile-StatBlock">
              <span className="MasterProfile-StatNum">{masterData.stats.followers}</span>
              <span className="MasterProfile-StatLabel">followers</span>
            </div>
            <div className="MasterProfile-StatBlock">
              <span className="MasterProfile-StatNum">{masterData.stats.following}</span>
              <span className="MasterProfile-StatLabel">following</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="MasterProfile-Nav">
          <button 
            className={`MasterProfile-NavItem ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>POSTS</span>
          </button>
          <button 
            className={`MasterProfile-NavItem ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>ABOUT</span>
          </button>
        </nav>

        {/* Content Area */}
        <div className="MasterProfile-TabContent">
          {activeTab === 'posts' ? (
            <div className="MasterProfile-PostGrid">
              {masterData.posts.map(post => (
                <div key={post.id} className="MasterProfile-PostItem">
                  <img src={post.image} alt="Post" />
                </div>
              ))}
            </div>
          ) : (
            <div className="MasterProfile-AboutView">
              {/* About Section */}
              <div className="MasterProfile-LinkedInCard">
                <div className="MasterProfile-CardHeader">
                   <h3>About</h3>
                   {!isEditingAbout && (
                     <button 
                       className="MasterProfile-EditSmall" 
                       onClick={() => {
                         setAboutText(masterData.bio);
                         setIsEditingAbout(true);
                       }}
                     >
                       ✎
                     </button>
                   )}
                </div>
                
                {isEditingAbout ? (
                  <div className="MasterProfile-AboutEdit">
                    <textarea 
                      className="MasterProfile-AboutTextarea"
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      rows="5"
                      autoFocus
                    />
                    <div className="MasterProfile-AboutActions">
                      <button 
                        className="MasterProfile-AboutCancel" 
                        onClick={() => setIsEditingAbout(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="MasterProfile-AboutSave" 
                        onClick={() => {
                          setMasterData(prev => ({ ...prev, bio: aboutText }));
                          setIsEditingAbout(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="MasterProfile-BioText">
                    {masterData.bio}
                  </p>
                )}
              </div>

              {/* Experience Section */}
              <div className="MasterProfile-LinkedInCard">
                <div className="MasterProfile-CardHeader">
                  <h3>Experience</h3>
                  <div className="MasterProfile-CardActions">
                    <button className="MasterProfile-AddSmall" onClick={startAddExp}>+</button>
                  </div>
                </div>
                <div className="MasterProfile-ExpList">
                  {masterData.experiences.map(exp => (
                    <div key={exp.id} className="MasterProfile-ExpEntry">
                      <div className="MasterProfile-OrgLogo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      </div>
                      <div className="MasterProfile-ExpInfo">
                        <div className="MasterProfile-ExpHead">
                          <h4>{exp.title}</h4>
                          <button className="MasterProfile-EditEntryBtn" onClick={() => startEditExp(exp)}>✎</button>
                        </div>
                        <p>{exp.org} • {exp.role}</p>
                        <span>{exp.duration}</span>
                        <p className="MasterProfile-ExpLoc">{exp.location}</p>
                        <p className="MasterProfile-ExpDesc">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                  {masterData.experiences.length === 0 && (
                    <p className="MasterProfile-EmptyMsg">No experience added yet.</p>
                  )}
                </div>
              </div>

              {/* Education Section */}
              <div className="MasterProfile-LinkedInCard">
                <div className="MasterProfile-CardHeader">
                  <h3>Education</h3>
                  <button className="MasterProfile-AddSmall" onClick={() => { setEditingEdu(null); setShowEduModal(true); }}>+</button>
                </div>
                <div className="MasterProfile-EduList">
                  {masterData.education.map(edu => (
                    <div key={edu.id} className="MasterProfile-EduEntry">
                      <div className="MasterProfile-OrgLogo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      </div>
                      <div className="MasterProfile-EduInfo">
                        <div className="MasterProfile-EduHead">
                          <h4>{edu.school}</h4>
                          <button className="MasterProfile-EditEntryBtn" onClick={() => { setEditingEdu(edu.id); setShowEduModal(true); }}>✎</button>
                        </div>
                        <p>{edu.degree}</p>
                        <span>{edu.duration}</span>
                        {edu.description && <p className="MasterProfile-EduDesc">{edu.description}</p>}
                      </div>
                    </div>
                  ))}
                  {masterData.education.length === 0 && <p className="MasterProfile-EmptyMsg">Add your education history.</p>}
                </div>
              </div>

              {/* Skills Section */}
              <div className="MasterProfile-LinkedInCard">
                <div className="MasterProfile-CardHeader">
                  <h3>Skills</h3>
                  <button className="MasterProfile-EditSmall" onClick={() => setShowSkillsModal(true)}>✎</button>
                </div>
                <div className="MasterProfile-SkillsGrid">
                  {masterData.skills.map(skill => (
                    <div key={skill} className="MasterProfile-SkillPill">{skill}</div>
                  ))}
                  {masterData.skills.length === 0 && <p className="MasterProfile-EmptyMsg">Add your skills to stand out.</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FAB removed */}
      {showModal && (
        <div className="MasterProfile-Modal">
          <div className="MasterProfile-ModalInner">
            <div className="MasterProfile-ModalHead">
              <h2>New Post</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="MasterProfile-ModalBody">
              <div className="MasterProfile-UploadArea">
                <span>Upload Media</span>
              </div>
              <textarea placeholder="Write something..." className="MasterProfile-Input"></textarea>
              <button className="MasterProfile-Submit">Post</button>
            </div>
          </div>
        </div>
      )}

      <ExperienceForm 
        isOpen={showExpModal}
        onClose={() => setShowExpModal(false)}
        onSave={handleSaveExp}
        editingData={editingExp ? masterData.experiences.find(e => e.id === editingExp) : null}
      />

      <EducationForm 
        isOpen={showEduModal}
        onClose={() => setShowEduModal(false)}
        onSave={handleSaveEdu}
        editingData={editingEdu ? masterData.education.find(e => e.id === editingEdu) : null}
      />

      <SkillsForm 
        isOpen={showSkillsModal}
        onClose={() => setShowSkillsModal(false)}
        onSave={handleSaveSkills}
        existingSkills={masterData.skills}
      />

      {!isTab && !showModal && !showExpModal && !showEduModal && !showSkillsModal && <Footer activeTab="profile" userRole="master" />}
    </div>
  );
};

export default MasterProfile;
