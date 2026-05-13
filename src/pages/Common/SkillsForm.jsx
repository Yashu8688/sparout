import React, { useState, useEffect } from 'react';
import './SkillsForm.css';

const SkillsForm = ({ isOpen, onClose, onSave, existingSkills }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setSkills(existingSkills || []);
  }, [existingSkills, isOpen]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSave = () => {
    onSave(skills);
  };

  if (!isOpen) return null;

  return (
    <div className="SkillsForm-Overlay">
      <div className="SkillsForm-Container">
        <header className="SkillsForm-Header">
          <button className="SkillsForm-BackBtn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1>Manage Skills</h1>
          <div style={{ width: 24 }}></div>
        </header>

        <div className="SkillsForm-Content">
          <form className="SkillsForm-AddBox" onSubmit={handleAddSkill}>
            <input 
              type="text" 
              placeholder="Add a skill (e.g. Boxing, Leadership)" 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button type="submit" className="SkillsForm-AddBtn">Add</button>
          </form>

          <div className="SkillsForm-Label">Your Skills</div>
          <div className="SkillsForm-List">
            {skills.map(skill => (
              <div key={skill} className="SkillsForm-Pill">
                <span>{skill}</span>
                <button onClick={() => removeSkill(skill)}>✕</button>
              </div>
            ))}
            {skills.length === 0 && (
              <div className="SkillsForm-Empty">No skills added yet.</div>
            )}
          </div>

          <div className="SkillsForm-Footer">
            <button className="SkillsForm-SubmitBtn" onClick={handleSave}>
              Save Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
