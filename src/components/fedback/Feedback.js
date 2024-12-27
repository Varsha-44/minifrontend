import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './feedback.css';

const FeedBack = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear user session (if using localStorage or sessionStorage)
    localStorage.removeItem('user'); // or sessionStorage.clear()

    // Redirect to login page after logout
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="dashboard">
      <div className="logout-container">
        <button className="btn logout-btn" onClick={handleLogout}>Back</button>
      </div>

      <h2>Dashboard</h2>

      <div className="feedback-category">
        <h3>
          “Your future begins with the right training!” <span>📚</span>
        </h3>
        <Link to="/addfeedback">
          <button className="btn">Go to Placement Feedback Dashboard</button>
        </Link>
      </div>

      <div className="feedback-category">
        <h3>
          “Exams are not just tests, they’re opportunities to show growth!” <span>✏️</span>
        </h3>
        <Link to="/examfeedback">
          <button className="btn">Go to Exam Feedback Dashboard</button>
        </Link>
      </div>

      <div className="feedback-category">
        <h3>
          “Interviews are the gateways to your dreams!” <span>💼</span>
        </h3>
        <Link to="/interview-feedback">
          <button className="btn">Go to Interview Feedback Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default FeedBack;
