import React, { useState, useEffect } from 'react';
import './EducationForm.css';

const EducationForm = ({ isOpen, onClose, onSave, editingData }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    if (editingData) {
      setFormData({ ...editingData });
    } else {
      setFormData({ school: '', degree: '', duration: '', description: '' });
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
    <div className="EducationForm-Overlay">
      <div className="EducationForm-Container">
        <header className="EducationForm-Header">
          <button className="EducationForm-BackBtn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1>{editingData ? 'Edit Education' : 'Add Education'}</h1>
          <div style={{ width: 24 }}></div>
        </header>

        <form className="EducationForm-Content" onSubmit={handleSubmit}>
          <div className="EducationForm-Group">
            <label>School / University</label>
            <input 
              type="text" 
              name="school" 
              value={formData.school} 
              onChange={handleChange} 
              placeholder="e.g. Mumbai Sports Academy"
              required
            />
          </div>

          <div className="EducationForm-Group">
            <label>Degree / Field of Study</label>
            <input 
              type="text" 
              name="degree" 
              value={formData.degree} 
              onChange={handleChange} 
              placeholder="e.g. Bachelor of Physical Education"
              required
            />
          </div>

          <div className="EducationForm-Group">
            <label>Duration / Years</label>
            <input 
              type="text" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              placeholder="e.g. 2020 - 2024"
              required
            />
          </div>

          <div className="EducationForm-Group">
            <label>Description (Optional)</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Describe your studies, honors, etc."
              rows="5"
            />
          </div>

          <div className="EducationForm-Footer">
            <button type="submit" className="EducationForm-SubmitBtn">
              {editingData ? 'Save Changes' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
