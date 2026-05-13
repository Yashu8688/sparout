import React, { useState, useEffect } from 'react';
import './TournamentForm.css';

const TournamentForm = ({ isOpen, onClose, onSave, editingData }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (editingData) {
      setFormData({ ...editingData });
    } else {
      setFormData({ title: '', type: '', date: '', description: '' });
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
    <div className="TournamentForm-Overlay">
      <div className="TournamentForm-Container">
        <header className="TournamentForm-Header">
          <button className="TournamentForm-BackBtn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1>{editingData ? 'Edit Tournament' : 'Add Tournament'}</h1>
          <div style={{ width: 24 }}></div>
        </header>

        <form className="TournamentForm-Content" onSubmit={handleSubmit}>
          <div className="TournamentForm-Group">
            <label>Tournament / Event Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. National Championship"
              required
            />
          </div>

          <div className="TournamentForm-Group">
            <label>Type / Role</label>
            <input 
              type="text" 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              placeholder="e.g. Participant • Gold Medalist"
              required
            />
          </div>

          <div className="TournamentForm-Group">
            <label>Date / Year</label>
            <input 
              type="text" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              placeholder="e.g. Dec 2023"
              required
            />
          </div>

          <div className="TournamentForm-Group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe your achievement..."
              rows="5"
            />
          </div>

          <div className="TournamentForm-Footer">
            <button type="submit" className="TournamentForm-SubmitBtn">
              {editingData ? 'Save Changes' : 'Add to Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentForm;
