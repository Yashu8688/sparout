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
    education: user?.education || [],
    skills: user?.skills || []
  });

  // Sync with user prop updates (e.g. after onboarding)
  React.useEffect(() => {
    if (user) {
      setStudentData(prev => ({
        ...prev,
        ...user,
        name: user.fullName?.split(' ')[0] || prev.name,
        location: user.city ? `${user.city}, ${user.state || ''}` : prev.location
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
                <h1 className="StudentProfile-NameText">{studentData.name}</h1>
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
              {studentData.posts.map(post => (
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
                  {studentData.tournaments.map(exp => (
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
                  {studentData.education.map(edu => (
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
                  {studentData.education.length === 0 && <p className="StudentProfile-EmptyMsg">Add your education history.</p>}
                </div>
              </div>

              {/* Skills Section */}
              <div className="StudentProfile-LinkedInCard">
                <div className="StudentProfile-CardHeader">
                  <h3>Skills</h3>
                  <button className="StudentProfile-EditSmall" onClick={() => setShowSkillsModal(true)}>✎</button>
                </div>
                <div className="StudentProfile-SkillsGrid">
                  {studentData.skills.map(skill => (
                    <div key={skill} className="StudentProfile-SkillPill">{skill}</div>
                  ))}
                  {studentData.skills.length === 0 && <p className="StudentProfile-EmptyMsg">Add your skills to stand out.</p>}
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
