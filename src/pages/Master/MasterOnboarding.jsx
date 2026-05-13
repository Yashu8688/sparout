import React, { useState } from 'react';
import './MasterOnboarding.css';

const MasterOnboarding = ({ user, onFinish, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: '',
    yearsExperience: '',
    teachingArts: [],
    teachingMode: 'In-Person',
    location: '',
    pricing: '',
    idUploaded: false,
    certsUploaded: false
  });

  const handleFinish = () => {
    if (onFinish) {
      // Save to localStorage to simulate "Posting" to the Explore page
      const masterRecord = {
        id: `m-${Date.now()}`,
        name: user?.fullName || 'New Master',
        specialty: formData.teachingArts[0] || 'Martial Arts',
        experience: `${formData.yearsExperience} Years`,
        rating: 5.0,
        students: formData.studentCount || 0,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        description: formData.bio,
        price: `₹${formData.pricing}/mo`
      };

      const existingMasters = JSON.parse(localStorage.getItem('sparout_masters_list') || '[]');
      localStorage.setItem('sparout_masters_list', JSON.stringify([...existingMasters, masterRecord]));
      
      onFinish(formData);
    }
  };

  const martialArtsList = [
    'Karate', 'Taekwondo', 'Kung Fu', 'Brazilian Jiu-Jitsu', 
    'Judo', 'Muay Thai', 'Kickboxing', 'Wrestling', 'Tai Chi', 'Aikido'
  ];

  const handleToggleArt = (art) => {
    setFormData(prev => ({
      ...prev,
      teachingArts: prev.teachingArts.includes(art)
        ? prev.teachingArts.filter(a => a !== art)
        : [...prev.teachingArts, art]
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const renderProgress = () => (
    <div className="MasterOnboarding-Progress">
      <div className={`MasterOnboarding-Dot ${step >= 1 ? 'active' : ''}`}></div>
      <div className={`MasterOnboarding-Line ${step >= 2 ? 'active' : ''}`}></div>
      <div className={`MasterOnboarding-Dot ${step >= 2 ? 'active' : ''}`}></div>
      <div className={`MasterOnboarding-Line ${step >= 3 ? 'active' : ''}`}></div>
      <div className={`MasterOnboarding-Dot ${step >= 3 ? 'active' : ''}`}></div>
    </div>
  );

  return (
    <div className="MasterOnboarding-Root">
      <div className="MasterOnboarding-Container">
        {renderProgress()}

        {step === 1 && (
          <div className="MasterOnboarding-Step ani-slide-in">
            <button className="MasterOnboarding-Exit" onClick={onBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back to Login</span>
            </button>
            <h1>Identity & Legacy</h1>
            <p>Tell us about your martial arts journey and expertise.</p>
            
            <div className="MasterOnboarding-Field">
              <label>Bio</label>
              <textarea 
                placeholder="Share your experience, teaching philosophy, and what makes your instruction unique..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <div className="MasterOnboarding-Field">
              <label>Years of Experience</label>
              <input 
                type="number" 
                placeholder="e.g., 15"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
              />
            </div>

            <div className="MasterOnboarding-Field">
              <label>Current Student Count</label>
              <input 
                type="number" 
                placeholder="e.g., 120"
                value={formData.studentCount || ''}
                onChange={(e) => setFormData({...formData, studentCount: e.target.value})}
              />
            </div>

            <div className="MasterOnboarding-Field">
              <label>Monthly Training Fee (₹)</label>
              <div className="MasterOnboarding-InputWithIcon">
                <span className="MasterOnboarding-Prefix">₹</span>
                <input 
                  type="number" 
                  placeholder="e.g., 1200"
                  value={formData.pricing}
                  onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                />
              </div>
            </div>

            <div className="MasterOnboarding-Field">
              <label>Martial Arts You Teach</label>
              <div className="MasterOnboarding-Pills">
                {martialArtsList.map(art => (
                  <button 
                    key={art}
                    className={`MasterOnboarding-Pill ${formData.teachingArts.includes(art) ? 'active' : ''}`}
                    onClick={() => handleToggleArt(art)}
                  >
                    {art}
                  </button>
                ))}
              </div>
            </div>

            <button className="MasterOnboarding-Next" onClick={nextStep}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="MasterOnboarding-Step ani-slide-in">
            <h1>Location & Pricing</h1>
            <p>Where do you teach and what are your rates?</p>

            <div className="MasterOnboarding-Field">
              <label>Teaching Mode</label>
              <div className="MasterOnboarding-Toggle">
                <button 
                  className={formData.teachingMode === 'In-Person' ? 'active' : ''}
                  onClick={() => setFormData({...formData, teachingMode: 'In-Person'})}
                >
                  In-Person
                </button>
                <button 
                  className={formData.teachingMode === 'Online' ? 'active' : ''}
                  onClick={() => setFormData({...formData, teachingMode: 'Online'})}
                >
                  Online
                </button>
              </div>
            </div>

            <div className="MasterOnboarding-Field">
              <label>Studio/Teaching Location</label>
              <div className="MasterOnboarding-InputIcon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <input 
                  type="text" 
                  placeholder="Enter address or city"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="MasterOnboarding-Actions">
              <button className="MasterOnboarding-Back" onClick={prevStep}>Back</button>
              <button className="MasterOnboarding-Next" onClick={nextStep}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="MasterOnboarding-Step ani-slide-in">
            <h1>Verification</h1>
            <p>Upload credentials to get verified and build trust.</p>

            <div className="MasterOnboarding-UploadCard">
              <div className="MasterOnboarding-UploadIcon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff4a17" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <h3>Upload ID or License</h3>
              <p>Government-issued ID required</p>
              <input type="file" className="MasterOnboarding-FileHidden" onChange={() => setFormData({...formData, idUploaded: true})} />
              {formData.idUploaded && <span className="MasterOnboarding-Success">✓ Uploaded</span>}
            </div>

            <div className="MasterOnboarding-UploadCard secondary">
              <div className="MasterOnboarding-UploadIcon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              </div>
              <h3>Upload Certifications</h3>
              <p>Belt ranks, teaching credentials, etc.</p>
              <input type="file" className="MasterOnboarding-FileHidden" onChange={() => setFormData({...formData, certsUploaded: true})} />
              {formData.certsUploaded && <span className="MasterOnboarding-Success">✓ Uploaded</span>}
            </div>

            <div className="MasterOnboarding-Actions">
              <button className="MasterOnboarding-Back" onClick={prevStep}>Back</button>
              <button className="MasterOnboarding-Finish" onClick={handleFinish}>Complete Setup</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterOnboarding;
