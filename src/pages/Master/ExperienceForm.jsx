import React, { useState, useEffect } from 'react';
import './ExperienceForm.css';

const ExperienceForm = ({ isOpen, onClose, onSave, editingData }) => {
  const [formData, setFormData] = useState({
    title: '',
    org: '',
    role: '',
    duration: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    if (editingData) {
      setFormData({ ...editingData });
    } else {
      setFormData({ title: '', org: '', role: '', duration: '', location: '', description: '' });
    }
  }, [editingData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="ExperienceForm-Overlay">
      <div className="ExperienceForm-Container">
        <header className="ExperienceForm-Header">
          <button className="ExperienceForm-BackBtn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1>{editingData ? 'Edit Experience' : 'Add Experience'}</h1>
          <div style={{ width: 24 }}></div>
        </header>

        <form className="ExperienceForm-Content" onSubmit={handleSubmit}>
          <div className="ExperienceForm-Group">
            <label>Job Title / Role</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. Head Coach"
              required
            />
          </div>

          <div className="ExperienceForm-Group">
            <label>Organization / Academy</label>
            <input 
              type="text" 
              name="org" 
              value={formData.org} 
              onChange={handleChange} 
              placeholder="e.g. Elite MMA Academy"
              required
            />
          </div>

          <div className="ExperienceForm-Group">
            <label>Employment Type</label>
            <input 
              type="text" 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              placeholder="e.g. Full-time / Freelance"
            />
          </div>

          <div className="ExperienceForm-Group">
            <label>Duration</label>
            <input 
              type="text" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              placeholder="e.g. Jan 2018 - Present"
              required
            />
          </div>

          <div className="ExperienceForm-Group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="e.g. Mumbai, Maharashtra"
            />
          </div>

          <div className="ExperienceForm-Group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe your responsibilities..."
              rows="5"
            />
          </div>

          <div className="ExperienceForm-Footer">
            <button type="submit" className="ExperienceForm-SubmitBtn">
              {editingData ? 'Save Changes' : 'Add to Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
