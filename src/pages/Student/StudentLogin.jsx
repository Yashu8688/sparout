import React, { useState } from 'react';
import './StudentLogin.css';

const StudentLogin = ({ onLogin, onBack, onToggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const StudentLogin_HandleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  };

  return (
    <div className="StudentLogin-PageWrapper">
      <div className="StudentLogin-Card">
        <header className="StudentLogin-Header">
          <h2 className="StudentLogin-Title">Student <span className="StudentLogin-TitleHighlight">Login</span></h2>
          <p className="StudentLogin-Subtitle">Welcome back, warrior!</p>
        </header>

        <form className="StudentLogin-Form" onSubmit={StudentLogin_HandleSubmit}>
          <div className="StudentLogin-InputGroup">
            <label className="StudentLogin-Label">EMAIL ADDRESS</label>
            <input 
              className="StudentLogin-Input"
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="StudentLogin-InputGroup">
            <label className="StudentLogin-Label">PASSWORD</label>
            <input 
              className="StudentLogin-Input"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <a href="#" className="StudentLogin-ForgotLink">Forgot Password?</a>

          <button type="submit" className="StudentLogin-SubmitBtn">Sign In</button>
        </form>

        <div className="StudentLogin-Footer">
          <p className="StudentLogin-RegisterText">Don't have an account? <a href="#" className="StudentLogin-RegisterLink" onClick={(e) => { e.preventDefault(); onToggleRegister(); }}>Create Account</a></p>
          <button 
            className="StudentLogin-BackBtn"
            onClick={onBack} 
          >
            ← Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
