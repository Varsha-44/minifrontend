import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddFeedback.css';

const AddFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [company, setCompany] = useState('');
  const [trainingSession, setTrainingSession] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/pts');
        setFeedbackList(response.data);
      } catch (err) {
        console.error('Error fetching feedback:', err.message);
      }
    };
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback || !company || !trainingSession) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/pts', { feedback, company, trainingSession });
      setMessage('Feedback submitted successfully');
      setFeedback('');
      setCompany('');
      setTrainingSession('');
      setError('');
      const updatedFeedback = await axios.get('https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/pts');
      setFeedbackList(updatedFeedback.data);
      setTimeout(() => setShowForm(false), 2000);
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
    }
  };

  const handleCancel = () => {
    setFeedback('');
    setCompany('');
    setTrainingSession('');
    setError('');
    setMessage('');
    setShowForm(false);
  };

  const groupedFeedback = feedbackList.reduce((groups, item) => {
    const key = `${item.company}-${item.trainingSession}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  const toggleGroup = (key) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="add-feedback">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn">
          Add Feedback
        </button>
      )}

      {showForm && (
        <>
          <h2>Add Feedback</h2>
          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Training Session"
              value={trainingSession}
              onChange={(e) => setTrainingSession(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter your feedback here"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
            <div className="form-buttons">
              <button type="submit" className="btn">
                Submit Feedback
              </button>
              <button type="button" className="btn cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </>
      )}

      <div className="feedback-list">
        <h2>All Feedback</h2>
        {Object.keys(groupedFeedback).length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          Object.entries(groupedFeedback).map(([key, items]) => {
            const [companyName, sessionName] = key.split('-');
            return (
              <div key={key} className="feedback-group">
                <h3
                  className="feedback-header"
                  onClick={() => toggleGroup(key)}
                >
                  {companyName} - {sessionName}
                </h3>
                {expandedGroups[key] && (
                  <div className="feedback-items">
                    {items.map((item) => (
                      <div key={item._id} className="feedback-item">
                        <p>{item.feedback}</p>
                        <small>{new Date(item.createdAt).toLocaleDateString()}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AddFeedback;
