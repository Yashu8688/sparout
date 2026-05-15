import React, { useState, useEffect } from 'react';
import './StudentOnboarding.css';

const StudentOnboarding = ({ user, onFinish }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    dob: '',
    age: '',
    area: '',
    city: '',
    state: '',
    country: '',
    education: '',
    institution: '',
    experience: 'Beginner',
    interests: [],
    height: '',
    weight: '',
    goals: [],
    learningModes: [],
  });
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  const totalSteps = 6;

  const genderOptions = ["Male", "Female", "Other"];
  const educationOptions = ["School", "High School", "Undergraduate", "Postgraduate", "Other"];
  const experienceOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];

  const games = [
    "Karate", "Taekwondo", "Kung Fu", "Brazilian Jiu-Jitsu", 
    "Judo", "Muay Thai", "Kickboxing", "Wrestling", 
    "Tai Chi", "Aikido"
  ];

  const goalsList = [
    "Learn Self-Defense", "Build Confidence", "Get Fit", 
    "Compete in Tournaments", "Make Friends", "Improve Discipline"
  ];

  const modesList = [
    {
      id: 'in-person',
      title: 'In-Person Classes',
      desc: 'Train at local studios with direct instruction',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      id: 'online',
      title: 'Online Classes',
      desc: 'Learn remotely from anywhere with video sessions',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    }
  ];

  // Calculate age from DOB
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setFormData(prev => ({ ...prev, age: calculatedAge > 0 ? calculatedAge : '' }));
    }
  }, [formData.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleList = (field, item) => {
    setFormData(prev => {
      const list = prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item];
      return { ...prev, [field]: list };
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    onFinish(formData);
  };

  return (
    <div className="sparout-on-page">
      <div className="sparout-on-header">
        <div className="sparout-on-progress-container">
          <div className="sparout-on-progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
        <span className="sparout-on-step-indicator">Step {step} of {totalSteps}</span>
      </div>

      <div className="sparout-on-container">
        {step === 1 && (
          <div className="sparout-on-step sparout-on-step-1 sparout-on-animate">
            <div className="sparout-on-title-section">
              <h2 className="sparout-on-title">Personal Details</h2>
              <p className="sparout-on-subtitle">Tell us more about yourself</p>
            </div>
            
            <div className="sparout-on-form">
              <div className="sparout-on-input-group">
                <label className="sparout-on-label">Gender</label>
                <div className={`sparout-on-custom-select ${isGenderOpen ? 'open' : ''}`} onClick={() => setIsGenderOpen(!isGenderOpen)}>
                  <div className="sparout-on-select-trigger">
                    <span>{formData.gender || "Select Gender"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {isGenderOpen && (
                    <div className="sparout-on-options">
                      {genderOptions.map(opt => (
                        <div 
                          key={opt} 
                          className="sparout-on-option" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, gender: opt }));
                            setIsGenderOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sparout-on-row">
                <div className="sparout-on-input-group">
                  <label className="sparout-on-label">Date of Birth</label>
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    required 
                    className="sparout-on-input" 
                  />
                </div>
                <div className="sparout-on-input-group">
                  <label className="sparout-on-label">Age</label>
                  <input type="text" name="age" value={formData.age} readOnly placeholder="Auto" className="sparout-on-input sparout-on-input-age" />
                </div>
              </div>

              <div className="sparout-on-input-group">
                <label className="sparout-on-label">Area / Street</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Enter your area" className="sparout-on-input" />
              </div>

              <div className="sparout-on-row">
                <div className="sparout-on-input-group">
                  <label className="sparout-on-label">City / Village</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="sparout-on-input" />
                </div>
                <div className="sparout-on-input-group">
                  <label className="sparout-on-label">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="sparout-on-input" />
                </div>
              </div>

              <div className="sparout-on-input-group">
                <label className="sparout-on-label">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="sparout-on-input" />
              </div>

              <button className="sparout-on-next-btn" onClick={nextStep} disabled={!formData.gender || !formData.dob}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="sparout-on-step sparout-on-step-2 sparout-on-animate">
            <div className="sparout-on-title-section">
              <h2 className="sparout-on-title">Education & Experience</h2>
              <p className="sparout-on-subtitle">Your academic and martial arts background</p>
            </div>
            
            <div className="sparout-on-form">
              <div className="sparout-on-input-group">
                <label className="sparout-on-label">Current Education</label>
                <div className={`sparout-on-custom-select ${isEducationOpen ? 'open' : ''}`} onClick={() => setIsEducationOpen(!isEducationOpen)}>
                  <div className="sparout-on-select-trigger">
                    <span>{formData.education || "Select Education"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {isEducationOpen && (
                    <div className="sparout-on-options">
                      {educationOptions.map(opt => (
                        <div 
                          key={opt} 
                          className="sparout-on-option" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, education: opt }));
                            setIsEducationOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sparout-on-input-group">
                <label className="sparout-on-label">School / College Name</label>
                <input 
                  type="text" 
                  name="institution" 
                  value={formData.institution} 
                  onChange={handleChange} 
                  placeholder="Enter your institution" 
                  className="sparout-on-input" 
                />
              </div>

              <div className="sparout-on-input-group">
                <label className="sparout-on-label">Martial Arts Experience</label>
                <div className={`sparout-on-custom-select ${isExperienceOpen ? 'open' : ''}`} onClick={() => setIsExperienceOpen(!isExperienceOpen)}>
                  <div className="sparout-on-select-trigger">
                    <span>{formData.experience}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {isExperienceOpen && (
                    <div className="sparout-on-options">
                      {experienceOptions.map(opt => (
                        <div 
                          key={opt} 
                          className="sparout-on-option" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, experience: opt }));
                            setIsExperienceOpen(false);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sparout-on-btn-group">
                <button className="sparout-on-back-btn" onClick={prevStep}>Back</button>
                <button className="sparout-on-next-btn" onClick={nextStep} disabled={!formData.education || !formData.institution}>
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="sparout-on-step sparout-on-step-3 sparout-on-animate">
            <div className="sparout-on-title-section">
              <h2 className="sparout-on-title">Interest of Games</h2>
              <p className="sparout-on-subtitle">Select the martial arts you're interested in</p>
            </div>
            
            <div className="sparout-on-games-grid">
              {games.map(game => (
                <div 
                  key={game} 
                  className={`sparout-on-game-pill ${formData.interests.includes(game) ? 'sparout-on-pill-active' : ''}`}
                  onClick={() => toggleList('interests', game)}
                >
                  {game}
                </div>
              ))}
            </div>

            <div className="sparout-on-btn-group">
              <button className="sparout-on-back-btn" onClick={prevStep}>Back</button>
              <button className="sparout-on-next-btn" onClick={nextStep} disabled={formData.interests.length === 0}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="sparout-on-step sparout-on-step-4 sparout-on-animate">
            <div className="sparout-on-title-section">
              <h2 className="sparout-on-title">Physical Stats</h2>
              <p className="sparout-on-subtitle">Help us tailor your training</p>
            </div>
            
            <div className="sparout-on-physical-layout">
              <div className="sparout-on-silhouette-container">
                {formData.gender === 'Female' ? (
                  <svg className="sparout-on-silhouette" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="4" r="2" />
                    <path d="M12 6c-2 0-3 1.5-3 4v4l-1.5 5h9L15 14v-4c0-2.5-1-4-3-4z" fill="rgba(255, 74, 23, 0.1)" />
                    <path d="M10 19l-0.5 4h1.5l1-4" />
                    <path d="M14 19l0.5 4h-1.5l-1-4" />
                  </svg>
                ) : (
                  <svg className="sparout-on-silhouette" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="4" r="2" />
                    <path d="M9 6h6c1 0 2 1 2 2v6h-2v7h-4v-7h-4v-7h-2v-6c0-1 1-2 2-2z" fill="rgba(255, 74, 23, 0.1)" />
                    <path d="M10 14v9" />
                    <path d="M14 14v9" />
                  </svg>
                )}
                <div className="sparout-on-scan-line"></div>
              </div>

              <div className="sparout-on-physical-inputs">
                <div className="sparout-on-input-group">
                  <label className="sparout-on-label">Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="e.g. 175" className="sparout-on-input" />
                </div>
                <div className="sparout-on-input-group">
                  <label className="sparout-on-label">Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 70" className="sparout-on-input" />
                </div>
              </div>
            </div>

            <div className="sparout-on-btn-group">
              <button className="sparout-on-back-btn" onClick={prevStep}>Back</button>
              <button className="sparout-on-next-btn" onClick={nextStep} disabled={!formData.height || !formData.weight}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="sparout-on-step sparout-on-step-5 sparout-on-animate">
            <div className="sparout-on-title-section">
              <h2 className="sparout-on-title">Your Goals</h2>
              <p className="sparout-on-subtitle">What do you want to achieve?</p>
            </div>
            
            <div className="sparout-on-goals-grid">
              {goalsList.map(goal => (
                <div 
                  key={goal} 
                  className={`sparout-on-goal-card ${formData.goals.includes(goal) ? 'sparout-on-goal-active' : ''}`}
                  onClick={() => toggleList('goals', goal)}
                >
                  <div className="sparout-on-goal-checkbox">
                    {formData.goals.includes(goal) && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="sparout-on-goal-text">{goal}</span>
                </div>
              ))}
            </div>

            <div className="sparout-on-btn-group">
              <button className="sparout-on-back-btn" onClick={prevStep}>Back</button>
              <button className="sparout-on-next-btn" onClick={nextStep} disabled={formData.goals.length === 0}>
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="sparout-on-step sparout-on-step-6 sparout-on-animate">
            <div className="sparout-on-title-section">
              <h2 className="sparout-on-title">Learning Mode</h2>
              <p className="sparout-on-subtitle">Choose your preferred training style</p>
            </div>
            
            <div className="sparout-on-modes-container">
              {modesList.map(mode => (
                <div 
                  key={mode.id} 
                  className={`sparout-on-mode-card ${formData.learningModes.includes(mode.id) ? 'sparout-on-mode-active' : ''}`}
                  onClick={() => toggleList('learningModes', mode.id)}
                >
                  <div className="sparout-on-mode-icon-wrapper">
                    {mode.icon}
                  </div>
                  <div className="sparout-on-mode-info">
                    <h3 className="sparout-on-mode-title">{mode.title}</h3>
                    <p className="sparout-on-mode-desc">{mode.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sparout-on-btn-group">
              <button className="sparout-on-back-btn" onClick={prevStep}>Back</button>
              <button className="sparout-on-finish-btn" onClick={handleSubmit} disabled={formData.learningModes.length === 0}>
                Complete Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOnboarding;
