import React, { useState, useEffect } from 'react';

const FeedbackDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    examName: '',
    examDate: '',
    year: '',
    branch: '',
    rating: '',
    comments: '',
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({}); // Track expanded groups
  const [showForm, setShowForm] = useState(false); // Control form visibility

  useEffect(() => {
    fetch('https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/exams')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching feedback: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setFeedbackList(data))
      .catch((error) => {
        console.error('Error fetching feedback:', error);
        setErrorMessage('Unable to fetch feedback at the moment. Please try again later.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    fetch('https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error submitting feedback: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert('Feedback submitted successfully!');
        setFeedbackList((prevList) => [...prevList, data]);
        setFormData({
          name: '',
          rollNumber: '',
          examName: '',
          examDate: '',
          year: '',
          branch: '',
          rating: '',
          comments: '',
        });
        setShowForm(false); // Hide form after submission
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        setErrorMessage('Unable to submit feedback. Please try again.');
      });
  };

  const groupedFeedback = feedbackList.reduce((groups, feedback) => {
    const key = `${feedback.examName}-${feedback.examDate}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(feedback);
    return groups;
  }, {});

  const toggleGroup = (key) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Placement Exam Feedback Dashboard</h1>

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      <button
        onClick={() => setShowForm((prev) => !prev)}
        style={{ marginBottom: '20px', padding: '10px 20px' }}
      >
        {showForm ? 'Cancel' : 'Add Feedback'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Roll Number:</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Year:</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Branch:</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Exam Name:</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Exam Date:</label>
            <input
              type="date"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Rating (1-5):</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>Comments:</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
            Submit Feedback
          </button>
        </form>
      )}

      <hr />

      <h2>Past Feedback</h2>
      {Object.keys(groupedFeedback).length > 0 ? (
        Object.entries(groupedFeedback).map(([key, items]) => {
          const [examName, examDate] = key.split('-');
          return (
            <div key={key} style={{ marginBottom: '20px' }}>
              <h3
                onClick={() => toggleGroup(key)}
                style={{
                  cursor: 'pointer',
                  background: '#f0f0f0',
                  padding: '10px',
                  border: '1px solid #ccc',
                }}
              >
                {examName} - {new Date(examDate).toLocaleDateString()}
              </h3>
              {expandedGroups[key] && (
                <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
                  {items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '10px 0',
                        background: '#fafafa',
                      }}
                    >
                      <p><strong>Name:</strong> {item.name}</p>
                      <p><strong>Roll Number:</strong> {item.rollNumber}</p>
                      <p><strong>Year:</strong> {item.year}</p>
                      <p><strong>Branch:</strong> {item.branch}</p>
                      <p><strong>Rating:</strong> {item.rating}/5</p>
                      <p><strong>Comments:</strong> {item.comments}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No feedback available yet.</p>
      )}
    </div>
  );
};

export default FeedbackDashboard;
