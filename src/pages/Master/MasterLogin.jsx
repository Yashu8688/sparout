import React, { useState } from 'react';
import './MasterLogin.css';

const MasterLogin = ({ onLogin, onBack, onToggleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const MasterLogin_HandleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(email, password);
  };

  return (
    <div className="MasterLogin-PageWrapper">
      <div className="MasterLogin-Card">
        <header className="MasterLogin-Header">
          <h2 className="MasterLogin-Title">Master <span className="MasterLogin-TitleHighlight">Portal</span></h2>
          <p className="MasterLogin-Subtitle">Share your wisdom, Sensei.</p>
        </header>

        <form className="MasterLogin-Form" onSubmit={MasterLogin_HandleSubmit}>
          <div className="MasterLogin-InputGroup">
            <label className="MasterLogin-Label">MASTER EMAIL</label>
            <input 
              className="MasterLogin-Input"
              type="email" 
              placeholder="name@master.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="MasterLogin-InputGroup">
            <label className="MasterLogin-Label">SECRET PASSWORD</label>
            <input 
              className="MasterLogin-Input"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <a href="#" className="MasterLogin-ForgotLink">Forgot Credentials?</a>

          <button type="submit" className="MasterLogin-SubmitBtn">Master Sign In</button>
        </form>

        <div className="MasterLogin-Footer">
          <p className="MasterLogin-RegisterText">
            New Sensei? 
            <button 
              className="MasterLogin-RegisterLinkBtn" 
              onClick={(e) => {
                e.preventDefault();
                onToggleRegister();
              }}
            >
              Register as Master
            </button>
          </p>
          <button 
            className="MasterLogin-BackBtn"
            onClick={onBack} 
          >
            ← Back to Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterLogin;
