import React, { useState, useEffect } from 'react';
import './MasterTournamentForm.css';

const MasterTournamentForm = ({ isOpen, onClose, onSave, editingData }) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    location: '',
    price: '',
    status: 'Upcoming',
    image: '',
    description: '',
    type: 'upcoming'
  });

  useEffect(() => {
    if (editingData) {
      setFormData({ ...editingData });
    } else {
      setFormData({
        title: '',
        startDate: '',
        endDate: '',
        startTime: '',
        location: '',
        price: '',
        status: 'Upcoming',
        image: '',
        description: '',
        type: 'upcoming'
      });
    }
  }, [editingData, isOpen]);

  const removeImage = (e) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="mtf-overlay">
      <div className="mtf-container ani-slide-up">
        <header className="mtf-header">
          <button className="mtf-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <h1>{editingData ? 'Edit Tournament' : 'Create Tournament'}</h1>
          <button className="mtf-publish-btn" onClick={handleSubmit}>
            {editingData ? 'Save' : 'Publish'}
          </button>
        </header>

        <div className="mtf-content">
          <div className="mtf-field">
            <label>Tournament Banner</label>
            <div className="mtf-upload-area" onClick={() => document.getElementById('mtf-file-input').click()}>
              {formData.image ? (
                <div className="mtf-preview-banner" style={{ backgroundImage: `url(${formData.image})` }}>
                  <button type="button" className="mtf-remove-img-btn" onClick={removeImage}>✕</button>
                  <div className="mtf-change-hint">Change Photo</div>
                </div>
              ) : (
                <div className="mtf-placeholder-box">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Upload from Device</span>
                </div>
              )}
            </div>
            <input 
              id="mtf-file-input"
              type="file" 
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>

          <div className="mtf-field">
            <label>Tournament Name</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g. MMA World Series 2024"
              required
            />
          </div>

          <div className="mtf-row">
            <div className="mtf-field">
              <label>Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange} 
                required
              />
            </div>
            <div className="mtf-field">
              <label>End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange} 
                required
              />
            </div>
          </div>

          <div className="mtf-field">
            <label>Start Time</label>
            <input 
              type="time" 
              name="startTime" 
              value={formData.startTime} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="mtf-field">
            <label>Entry Fee (₹)</label>
            <input 
              type="text" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="e.g. 500"
              required
            />
          </div>

          <div className="mtf-field">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="e.g. Mumbai, Maharashtra"
              required
            />
          </div>

          <div className="mtf-field">
            <label>Current Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing (Live)</option>
              <option value="Finished">Finished</option>
              <option value="Open for Registration">Open for Registration</option>
            </select>
          </div>

          <div className="mtf-field">
            <label>About Tournament</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe the event details..."
              rows="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTournamentForm;
