import React, { useState, useEffect } from 'react';
import './StudentRegister.css';

const StudentRegister = ({ onBack, onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [progress, setProgress] = useState(0);

  const fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];

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
    <div className="register-page">
      <div className="progress-header">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="header-content">
          <button className="back-btn" onClick={onBack} aria-label="Back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="progress-text">{progress}% Completed</span>
        </div>
      </div>

      <div className="register-container">
        <div className="register-header-text">
          <h1 className="register-title">Create Student Account</h1>
          <p className="register-subtitle">Join the elite martial arts community</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="profile-upload-section">
            <div className="profile-preview" onClick={() => document.getElementById('profile-upload').click()}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <div className="placeholder-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
              <div className="upload-overlay">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
            </div>
            <input 
              type="file" 
              id="profile-upload" 
              hidden 
              accept="image/*" 
              onChange={handleImageChange}
            />
            <p className="upload-hint">Add Profile Photo (Optional)</p>
          </div>

          <div className="input-grid">
            <div className="input-group">
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

            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="example@gmail.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <div className="phone-input-wrapper">
                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="country-select">
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+971">+971</option>
                </select>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="00000 00000" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  className="phone-field"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Create Password</label>
              <div className="password-input-wrapper">
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
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
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
                  className="toggle-password" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="register-submit-btn">
            Register Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
