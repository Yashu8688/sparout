import React, { useState } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import TournamentForm from './TournamentForm';
import EducationForm from '../Common/EducationForm';
import SkillsForm from '../Common/SkillsForm';
import './StudentProfile.css';

const StudentProfile = ({ user, onBack, isTab = false, onEditChange, onLogout }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Notify parent of edit state change
  React.useEffect(() => {
    if (onEditChange) onEditChange(isEditing);
  }, [isEditing, onEditChange]);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState('');

  const [studentData, setStudentData] = useState({
    name: user?.fullName?.split(' ')[0] || 'User',
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    countryCode: user?.countryCode || '+91',
    gender: user?.gender || 'Male',
    dob: user?.dob || '',
    age: user?.age || '',
    area: user?.area || '',
    city: user?.city || '',
    state: user?.state || '',
    country: user?.country || '',
    interests: user?.interests || [],
    height: user?.height || '',
    weight: user?.weight || '',
    experience: user?.experience || 'Beginner',
    goals: user?.goals || [],
    learningModes: user?.learningModes || [],
    headline: user?.headline || 'Martial Arts Enthusiast',
    specialty: user?.specialty || 'New Member',
    location: user?.city ? `${user.city}, ${user.state || ''}` : 'Location not set',
    bio: user?.bio || 'No bio added yet.',
    stats: {
      posts: 0,
      followers: '0',
      following: 0
    },
    posts: [],
    tournaments: user?.tournaments || [],
    education: Array.isArray(user?.education) ? user.education : (user?.education ? [{ id: 'edu-1', school: user.institution || user.education, degree: user.education, duration: 'Current' }] : []),
    skills: Array.isArray(user?.skills) ? user.skills : []
  });

  // Sync with user prop updates (e.g. after onboarding)
  React.useEffect(() => {
    if (user) {
      setStudentData(prev => ({
        ...prev,
        ...user,
        name: user.fullName?.split(' ')[0] || prev.name,
        location: user.city ? `${user.city}, ${user.state || ''}` : prev.location,
        education: Array.isArray(user.education) ? user.education : (user.education ? [{ id: 'edu-1', school: user.institution || user.education, degree: user.education, duration: 'Current' }] : prev.education),
        tournaments: Array.isArray(user.tournaments) ? user.tournaments : prev.tournaments,
        skills: Array.isArray(user.skills) ? user.skills : prev.skills,
        interests: Array.isArray(user.interests) ? user.interests : prev.interests,
        goals: Array.isArray(user.goals) ? user.goals : prev.goals,
        posts: Array.isArray(user.posts) ? user.posts : prev.posts
      }));
    }
  }, [user]);

  const [editForm, setEditForm] = useState({ ...studentData });
  const [showExpModal, setShowExpModal] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [expFormData, setExpFormData] = useState({
    title: '',
    type: '',
    date: '',
    description: ''
  });

  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setExpFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveExp = () => {
    if (editingExp) {
      setStudentData(prev => ({
        ...prev,
        tournaments: prev.tournaments.map(t => t.id === editingExp ? { ...expFormData, id: editingExp } : t)
      }));
    } else {
      setStudentData(prev => ({
        ...prev,
        tournaments: [...prev.tournaments, { ...expFormData, id: Date.now() }]
      }));
    }
    setShowExpModal(false);
    setEditingExp(null);
    setExpFormData({ title: '', type: '', date: '', description: '' });
  };

  const startEditExp = (exp) => {
    setEditingExp(exp.id);
    setExpFormData({ ...exp });
    setShowExpModal(true);
  };

  const startAddExp = () => {
    setEditingExp(null);
    setExpFormData({ title: '', type: '', date: '', description: '' });
    setShowExpModal(true);
  };

  // Education Handlers
  const [showEduModal, setShowEduModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);

  const handleSaveEdu = (data) => {
    if (editingEdu) {
      setStudentData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === editingEdu ? { ...data, id: editingEdu } : e)
      }));
    } else {
      setStudentData(prev => ({
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
    setStudentData(prev => ({ ...prev, skills: newSkills }));
    setShowSkillsModal(false);
  };

  const games = [
    "Karate", "Taekwondo", "Kung Fu", "Brazilian Jiu-Jitsu", 
    "Judo", "Muay Thai", "Kickboxing", "Wrestling", 
    "Tai Chi", "Aikido"
  ];

  const goalsList = [
    "Learn Self-Defense", "Build Confidence", "Get Fit", 
    "Compete in Tournaments", "Make Friends", "Improve Discipline"
  ];

  const experienceOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];

  const modesList = [
    { id: 'in-person', title: 'In-Person' },
    { id: 'online', title: 'Online' }
  ];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => {
      const updated = { ...prev, [name]: value };
      
      // Calculate age if DOB changes
      if (name === 'dob' && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        updated.age = calculatedAge > 0 ? calculatedAge : '';
      }
      
      return updated;
    });
  };

  const toggleList = (field, item) => {
    setEditForm(prev => {
      const list = prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item];
      return { ...prev, [field]: list };
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setStudentData({ ...editForm });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="StudentProfile-EditWrapper">
        <div className="StudentProfile-EditHeader">
          <button className="StudentProfile-BackBtn" onClick={() => setIsEditing(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1>EDIT PROFILE</h1>
          <div style={{ width: 40 }}></div>
        </div>

        <div className="StudentProfile-EditAvatarSection">
          <div className="StudentProfile-EditAvatarPreview">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" 
              alt="Profile" 
            />
            <div className="StudentProfile-EditOverlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
          </div>
          <p>Update Dojo Photo</p>
        </div>

        <form className="StudentProfile-EditForm" onSubmit={handleSaveProfile}>
          <div className="StudentProfile-SectionHeader">Identity & Bio</div>
          <div className="StudentProfile-EditGrid">
            <div className="StudentProfile-EditGroup">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={editForm.fullName} 
                onChange={handleEditChange} 
                placeholder="Full Name"
              />
            </div>

            <div className="StudentProfile-EditGroup">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={editForm.email} 
                onChange={handleEditChange} 
              />
            </div>

            <div className="StudentProfile-EditGroup full-width">
              <label>Headline (Profile Heading)</label>
              <input 
                type="text" 
                name="headline" 
                value={editForm.headline} 
                onChange={handleEditChange} 
                placeholder="e.g. Aspiring MMA Artist"
              />
            </div>

            <div className="StudentProfile-EditGroup full-width">
              <label>Detailed Bio</label>
              <textarea 
                name="bio" 
                value={editForm.bio} 
                onChange={handleEditChange} 
                rows="4"
                placeholder="Tell your story..."
              />
            </div>
          </div>

          <div className="StudentProfile-SectionHeader">Physical Stats & Contact</div>
          <div className="StudentProfile-EditGrid">
            <div className="StudentProfile-EditGroup">
              <label>Phone Number</label>
              <div className="StudentProfile-PhoneInput">
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

            <div className="StudentProfile-EditGroup">
              <label>Gender</label>
              <select name="gender" value={editForm.gender} onChange={handleEditChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="StudentProfile-EditGroup">
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                value={editForm.dob} 
                onChange={handleEditChange} 
              />
            </div>

            <div className="StudentProfile-EditGroup">
              <label>Height (cm)</label>
              <input 
                type="number" 
                name="height" 
                value={editForm.height} 
                onChange={handleEditChange} 
                placeholder="Height"
              />
            </div>

            <div className="StudentProfile-EditGroup">
              <label>Weight (kg)</label>
              <input 
                type="number" 
                name="weight" 
                value={editForm.weight} 
                onChange={handleEditChange} 
                placeholder="Weight"
              />
            </div>

            <div className="StudentProfile-EditGroup">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                value={editForm.city} 
                onChange={handleEditChange} 
                placeholder="City"
              />
            </div>
          </div>

          <div className="StudentProfile-SectionHeader">Dojo Preferences</div>
          <div className="StudentProfile-EditGrid">
            <div className="StudentProfile-EditGroup full-width">
              <label>Interests / Games</label>
              <div className="StudentProfile-PillGrid">
                {games.map(game => (
                  <div 
                    key={game} 
                    className={`StudentProfile-EditPill ${editForm.interests.includes(game) ? 'active' : ''}`}
                    onClick={() => toggleList('interests', game)}
                  >
                    {game}
                  </div>
                ))}
              </div>
            </div>

            <div className="StudentProfile-EditGroup full-width">
              <label>Goals</label>
              <div className="StudentProfile-PillGrid">
                {goalsList.map(goal => (
                  <div 
                    key={goal} 
                    className={`StudentProfile-EditPill ${editForm.goals.includes(goal) ? 'active' : ''}`}
                    onClick={() => toggleList('goals', goal)}
                  >
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className="StudentProfile-SaveBtn">Sync Mastery Data</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`StudentProfile-Root ${isTab ? 'is-tab' : ''}`}>
      {!isTab && <Header />}
      
      <main className="StudentProfile-Content">
        {/* Profile Header Card */}
        <section className="StudentProfile-HeaderCard">
          <div className="StudentProfile-BannerBox">
            <img 
              src="https://images.unsplash.com/photo-1552072805-2a9039d00e57?auto=format&fit=crop&q=80&w=1200" 
              alt="Banner" 
              className="StudentProfile-Banner"
            />
            <button className="StudentProfile-BannerEdit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </button>
          </div>

          <div className="StudentProfile-IdentityBox">
            <div className="StudentProfile-AvatarWrapper">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" 
                alt="Student Avatar" 
                className="StudentProfile-AvatarImage"
              />
            </div>
            
            <div className="StudentProfile-MainInfo">
              <div className="StudentProfile-NameRow">
                <h1 className="StudentProfile-NameText">{(studentData.fullName || studentData.name).toLowerCase()}</h1>
                <span className="StudentProfile-VerificationBadge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#00a3ff"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 15.1l-3.5-3.5 1.4-1.4 2.1 2.1 5.3-5.3 1.4 1.4-6.7 6.7z"/></svg>
                </span>
              </div>
              <div className="StudentProfile-BioDetails">
                <p className="StudentProfile-Headline">{studentData.headline}</p>
                <p className="StudentProfile-Specialty">{studentData.specialty}</p>
              </div>
            </div>
          </div>

          <div className="StudentProfile-ActionRow">
            <button className="StudentProfile-PrimaryBtn" onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button className="StudentProfile-SecondaryBtn">Share</button>
            <button className="StudentProfile-LogoutBtn" onClick={onLogout}>Logout</button>
          </div>

          <div className="StudentProfile-ActivityGrid">
            <div className="StudentProfile-ActivityBlock">
              <span className="StudentProfile-ActivityNum">42</span>
              <span className="StudentProfile-ActivityLabel">CLASSES</span>
            </div>
            <div className="StudentProfile-ActivityBlock">
              <span className="StudentProfile-ActivityNum">67</span>
              <span className="StudentProfile-ActivityLabel">HOURS</span>
            </div>
            <div className="StudentProfile-ActivityBlock">
              <span className="StudentProfile-ActivityNum">2</span>
              <span className="StudentProfile-ActivityLabel">EVENTS</span>
            </div>
            <div className="StudentProfile-ActivityBlock">
              <span className="StudentProfile-ActivityNum">3</span>
              <span className="StudentProfile-ActivityLabel">WINS</span>
            </div>
            <div className="StudentProfile-ActivityBlock">
              <span className="StudentProfile-ActivityNum">12</span>
              <span className="StudentProfile-ActivityLabel">STREAK</span>
            </div>
          </div>

          <div className="StudentProfile-StatsGrid">
            <div className="StudentProfile-StatBlock">
              <span className="StudentProfile-StatNum">{studentData.stats.posts}</span>
              <span className="StudentProfile-StatLabel">posts</span>
            </div>
            <div className="StudentProfile-StatBlock">
              <span className="StudentProfile-StatNum">{studentData.stats.followers}</span>
              <span className="StudentProfile-StatLabel">followers</span>
            </div>
            <div className="StudentProfile-StatBlock">
              <span className="StudentProfile-StatNum">{studentData.stats.following}</span>
              <span className="StudentProfile-StatLabel">following</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav className="StudentProfile-Nav">
          <button 
            className={`StudentProfile-NavItem ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>POSTS</span>
          </button>
          <button 
            className={`StudentProfile-NavItem ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>ABOUT</span>
          </button>
        </nav>

        {/* Content Area */}
        <div className="StudentProfile-TabContent">
          {activeTab === 'posts' ? (
            <div className="StudentProfile-PostGrid">
              {Array.isArray(studentData.posts) && studentData.posts.map(post => (
                <div key={post.id} className="StudentProfile-PostItem">
                  <img src={post.image} alt="Post" />
                </div>
              ))}
            </div>
          ) : (
            <div className="StudentProfile-AboutView">
              {/* About Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <h3>About</h3>
                  {!isEditingAbout && (
                    <button 
                      className="StudentProfile-EditSmall" 
                      onClick={() => {
                        setAboutText(studentData.bio);
                        setIsEditingAbout(true);
                      }}
                    >
                      ✎
                    </button>
                  )}
                </div>
                
                {isEditingAbout ? (
                  <div className="StudentProfile-AboutEdit">
                    <textarea 
                      className="StudentProfile-AboutTextarea"
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      rows="5"
                      autoFocus
                    />
                    <div className="StudentProfile-AboutActions">
                      <button 
                        className="StudentProfile-AboutCancel" 
                        onClick={() => setIsEditingAbout(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="StudentProfile-AboutSave" 
                        onClick={() => {
                          setStudentData(prev => ({ ...prev, bio: aboutText }));
                          setIsEditingAbout(false);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="StudentProfile-BioText">
                    {studentData.bio}
                  </p>
                )}
              </div>

              {/* Experience/Participation Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <h3>Tournament History</h3>
                  <div className="StudentProfile-CardActions">
                    <button className="StudentProfile-AddSmall" onClick={startAddExp}>+</button>
                  </div>
                </div>
                <div className="StudentProfile-ExpList">
                  {Array.isArray(studentData.tournaments) && studentData.tournaments.map(exp => (
                    <div key={exp.id} className="StudentProfile-ExpEntry">
                      <div className="StudentProfile-OrgLogo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
                      </div>
                      <div className="StudentProfile-ExpInfo">
                        <div className="StudentProfile-ExpHead">
                          <h4>{exp.title}</h4>
                          <button className="StudentProfile-EditEntryBtn" onClick={() => startEditExp(exp)}>✎</button>
                        </div>
                        <p>{exp.type}</p>
                        <span>{exp.date}</span>
                        <p className="StudentProfile-ExpDesc">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                  {studentData.tournaments.length === 0 && (
                    <p className="StudentProfile-EmptyMsg">No tournament history added yet.</p>
                  )}
                </div>
              </div>

              {/* Education Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <h3>Education</h3>
                  <button className="StudentProfile-AddSmall" onClick={() => { setEditingEdu(null); setShowEduModal(true); }}>+</button>
                </div>
                <div className="StudentProfile-EduList">
                  {Array.isArray(studentData.education) && studentData.education.map(edu => (
                    <div key={edu.id} className="StudentProfile-EduEntry">
                      <div className="StudentProfile-OrgLogo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      </div>
                      <div className="StudentProfile-EduInfo">
                        <div className="StudentProfile-EduHead">
                          <h4>{edu.school}</h4>
                          <button className="StudentProfile-EditEntryBtn" onClick={() => { setEditingEdu(edu.id); setShowEduModal(true); }}>✎</button>
                        </div>
                        <p>{edu.degree}</p>
                        <span>{edu.duration}</span>
                        {edu.description && <p className="StudentProfile-EduDesc">{edu.description}</p>}
                      </div>
                    </div>
                  ))}
                  {(!studentData.education || studentData.education.length === 0) && <p className="StudentProfile-EmptyMsg">Add your education history.</p>}
                </div>
              </div>

              {/* Skills Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <h3>Skills</h3>
                  <button className="StudentProfile-EditSmall" onClick={() => setShowSkillsModal(true)}>✎</button>
                </div>
                <div className="StudentProfile-SkillsGrid">
                  {Array.isArray(studentData.skills) && studentData.skills.map(skill => (
                    <div key={skill} className="StudentProfile-SkillPill">{skill}</div>
                  ))}
                  {studentData.skills.length === 0 && <p className="StudentProfile-EmptyMsg">Add your skills to stand out.</p>}
                </div>
              </div>

              {/* Specializations Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <div className="StudentProfile-SpecTitle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    <h3 style={{ margin: 0, marginLeft: '8px' }}>Specializations</h3>
                  </div>
                </div>
                <div className="StudentProfile-SpecGrid">
                  <div className="StudentProfile-SpecTag">Traditional Karate (Shotokan)</div>
                  <div className="StudentProfile-SpecTag">Sport Kumite</div>
                  <div className="StudentProfile-SpecTag">Kata Performance</div>
                  <div className="StudentProfile-SpecTag">Self-Defense</div>
                </div>
              </div>

              {/* Licenses & Certifications Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <div className="StudentProfile-CertTitle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                    <h3 style={{ margin: 0, marginLeft: '8px' }}>Licenses & Certifications</h3>
                  </div>
                </div>
                <div className="StudentProfile-CertList">
                  <div className="StudentProfile-CertItem">
                    <div className="StudentProfile-CertIcon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6"/>
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                      </svg>
                    </div>
                    <div className="StudentProfile-CertInfo">
                      <h4>RFFI Certified Karate Practitioner</h4>
                      <p>RFFI</p>
                      <span>Issued Dec 2025</span>
                    </div>
                  </div>
                  <div className="StudentProfile-CertItem">
                    <div className="StudentProfile-CertIcon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="6"/>
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                      </svg>
                    </div>
                    <div className="StudentProfile-CertInfo">
                      <h4>First Aid & CPR</h4>
                      <p>Red Cross</p>
                      <span>Issued Jan 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Training History Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <div className="StudentProfile-TrainingTitle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.5 2.1a5 5 0 0 1 0 9.8v3a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3"/>
                      <path d="M14.5 2.1a5 5 0 0 0 0 9.8v3a1 1 0 0 0 1 1h3.5a3 3 0 0 0 3-3V11a3 3 0 0 0-3-3"/>
                    </svg>
                    <h3 style={{ margin: 0, marginLeft: '8px' }}>Training History</h3>
                  </div>
                </div>
                <div className="StudentProfile-TrainingList">
                  <div className="StudentProfile-TrainingItem">
                    <div className="StudentProfile-TrainingIcon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="StudentProfile-TrainingInfo">
                      <h4>Elite Martial Arts Academy</h4>
                      <p>Under Master Yashwanth Kumar</p>
                      <span>6 months</span>
                    </div>
                  </div>
                  <div className="StudentProfile-TrainingItem">
                    <div className="StudentProfile-TrainingIcon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="StudentProfile-TrainingInfo">
                      <h4>Phoenix Dojo</h4>
                      <p>Under Sensei Maria Rodriguez</p>
                      <span>1 year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <div className="StudentProfile-AchTitle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 20l4-2 4 2V5c0-1.1-.9-2-2-2h-4a2 2 0 0 0-2 2v15z"/>
                    </svg>
                    <h3 style={{ margin: 0, marginLeft: '8px' }}>Achievements</h3>
                  </div>
                </div>
                <div className="StudentProfile-AchGrid">
                  <div className="StudentProfile-AchCard">
                    <span className="StudentProfile-AchIcon">🔥</span>
                    <h4>10-Day Streak Master</h4>
                    <span>May 2026</span>
                  </div>
                  <div className="StudentProfile-AchCard">
                    <span className="StudentProfile-AchIcon">🏆</span>
                    <h4>First Tournament</h4>
                    <span>Apr 2026</span>
                  </div>
                  <div className="StudentProfile-AchCard">
                    <span className="StudentProfile-AchIcon">⏱️</span>
                    <h4>50 Hours Trained</h4>
                    <span>Mar 2026</span>
                  </div>
                  <div className="StudentProfile-AchCard">
                    <span className="StudentProfile-AchIcon">🥋</span>
                    <h4>Belt Promotion</h4>
                    <span>Feb 2026</span>
                  </div>
                </div>
              </div>

              {/* Belt Journey Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <div className="StudentProfile-BeltTitle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M12 4.1a5 5 0 0 0-5 5V12a5 5 0 0 0 10 0V9.1a5 5 0 0 0-5-5z"/>
                    </svg>
                    <h3 style={{ margin: 0, marginLeft: '8px' }}>Belt Journey</h3>
                  </div>
                </div>
                <div className="StudentProfile-BeltList">
                  <div className="StudentProfile-BeltItem completed">
                    <div className="StudentProfile-BeltStatus">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#00c853"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                    </div>
                    <div className="StudentProfile-BeltInfo">
                      <h4>White Belt</h4>
                    </div>
                  </div>
                  <div className="StudentProfile-BeltItem completed">
                    <div className="StudentProfile-BeltStatus">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#00c853"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                    </div>
                    <div className="StudentProfile-BeltInfo">
                      <h4>Yellow Belt</h4>
                    </div>
                  </div>
                  <div className="StudentProfile-BeltItem current">
                    <div className="StudentProfile-BeltStatus">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6d00"><circle cx="12" cy="12" r="10"/><path d="M12 7l1.5 3.5h3.5l-2.8 2.2 1.1 3.5-3.3-2.1-3.3 2.1 1.1-3.5-2.8-2.2h3.5z" fill="#fff"/></svg>
                    </div>
                    <div className="StudentProfile-BeltInfo">
                      <h4>Orange Belt</h4>
                      <span>Current level • 60% to next</span>
                    </div>
                  </div>
                  {['Green Belt', 'Blue Belt', 'Purple Belt', 'Brown Belt', 'Black Belt'].map(belt => (
                    <div key={belt} className="StudentProfile-BeltItem locked">
                      <div className="StudentProfile-BeltStatus">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#2c2c2e"><circle cx="12" cy="12" r="10"/></svg>
                      </div>
                      <div className="StudentProfile-BeltInfo">
                        <h4>{belt}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Student Section */}
              <div className="StudentProfile-LinkedInCard StudentProfile-VerifiedCard">
                <div className="StudentProfile-VerifiedContent">
                  <div className="StudentProfile-ShieldIcon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div className="StudentProfile-VerifiedInfo">
                    <div className="StudentProfile-VerifiedTitle">
                      <h3 style={{ margin: 0 }}>Verified Student</h3>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                      Parent-supervised account • Background-checked instructors only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="StudentProfile-Modal">
          <div className="StudentProfile-ModalInner">
            <div className="StudentProfile-ModalHead">
              <h2>New Post</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="StudentProfile-ModalBody">
              <div className="StudentProfile-UploadArea">
                <span>Upload Media</span>
              </div>
              <textarea placeholder="Write something..." className="StudentProfile-Input"></textarea>
              <button className="StudentProfile-Submit">Post</button>
            </div>
          </div>
        </div>
      )}

      <TournamentForm 
        isOpen={showExpModal}
        onClose={() => setShowExpModal(false)}
        onSave={handleSaveExp}
        editingData={editingExp ? studentData.tournaments.find(t => t.id === editingExp) : null}
      />

      <EducationForm 
        isOpen={showEduModal}
        onClose={() => setShowEduModal(false)}
        onSave={handleSaveEdu}
        editingData={editingEdu ? studentData.education.find(e => e.id === editingEdu) : null}
      />

      <SkillsForm 
        isOpen={showSkillsModal}
        onClose={() => setShowSkillsModal(false)}
        onSave={handleSaveSkills}
        existingSkills={studentData.skills}
      />

      {!isTab && !showModal && !showExpModal && !showEduModal && !showSkillsModal && <Footer activeTab="profile" userRole="student" />}
    </div>
  );
};

export default StudentProfile;
