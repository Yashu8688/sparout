import React from 'react';
import './RoleSelection.css';

const RoleSelection = ({ onSelect }) => {
  return (
    <div className="role-select-wrapper">
      <header className="role-select-header">
        <h1 className="role-select-title">Choose <span>Path</span></h1>
        <p className="role-select-subtitle">Identify your status</p>
      </header>

      <main className="role-select-container">
        {/* Student Card */}
        <article className="role-select-card" onClick={() => onSelect('student')}>
          <div className="role-select-icon-wrapper">
            <span role="img" aria-label="student">🥋</span>
          </div>
          <h2 className="role-select-role-name">Student</h2>
          <p className="role-select-description">
            I want to learn martial arts and find a professional master.
          </p>
          <button className="role-select-button">Select Student</button>
        </article>

        {/* Master Card */}
        <article className="role-select-card" onClick={() => onSelect('master')}>
          <div className="role-select-icon-wrapper">
            <span role="img" aria-label="master">⛩️</span>
          </div>
          <h2 className="role-select-role-name">Master</h2>
          <p className="role-select-description">
            I am a professional trainer looking to manage students.
          </p>
          <button className="role-select-button">Select Master</button>
        </article>
      </main>
    </div>
  );
};

export default RoleSelection;
