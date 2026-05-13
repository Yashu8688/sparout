import React, { useState, useEffect } from 'react';
import './MasterRegister.css';

const MasterRegister = ({ onBack, onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [progress, setProgress] = useState(0);

  const fields = ['fullName', 'email', 'password', 'confirmPassword'];

  useEffect(() => {
    const filledFields = fields.filter(field => formData[field].length > 0).length;
    const percentage = Math.round((filledFields / fields.length) * 100);
    setProgress(percentage);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onRegister(formData);
  };

  return (
    <div className="master-register-page">
      <div className="m-progress-header">
        <div className="m-progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="m-header-content">
          <button className="m-back-btn" onClick={onBack} aria-label="Back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="m-progress-text">{progress}% Mastery</span>
        </div>
      </div>

      <div className="master-register-container">
        <div className="master-register-header-text">
          <h1 className="master-register-title">Register as <span className="m-orange">Master</span></h1>
          <p className="master-register-subtitle">Begin your legacy and mentor the next generation</p>
        </div>

        <form onSubmit={handleSubmit} className="master-register-form">
          <div className="m-profile-upload-section">
            <div className="m-profile-preview" onClick={() => document.getElementById('m-profile-upload').click()}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <div className="m-placeholder-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
              <div className="m-upload-overlay">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </div>
            <input 
              type="file" 
              id="m-profile-upload" 
              hidden 
              accept="image/*" 
              onChange={handleImageChange}
            />
            <p className="m-upload-hint">Upload Dojo Avatar (Optional)</p>
          </div>

          <div className="m-input-grid">
            <div className="m-input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Enter your full name" 
                required 
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="m-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="email@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="m-input-group">
              <label>Create Password</label>
              <div className="m-password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="m-toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="m-input-group">
              <label>Confirm Password</label>
              <div className="m-password-input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder="••••••••" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="m-toggle-password" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="m-register-submit-btn">
            Create Master Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default MasterRegister;
