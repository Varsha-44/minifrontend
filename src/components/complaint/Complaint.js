import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Complaint.css';

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const adminPassword = 'Bvrith@CSE';

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const url = 'http://localhost:5000/api/complaints';
        const token = localStorage.getItem('authToken');

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filteredComplaints = response.data.filter(
          (complaint) => complaint.rollNumber === userEmail
        );
        setComplaints(filteredComplaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError('Error fetching complaints. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, [userEmail]);

  const handleViewAllComplaints = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      navigate('/all-complaints');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="complaint-dashboard">
      <h2>Complaint Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading complaints...</p>
      ) : (
        <div className="complaint-category">
          <h3>Your Complaints</h3>
          <div className="complaint-list">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div className="complaint-card" key={complaint._id}>
                  <h4>{complaint.category} 📋</h4>
                  <p>{complaint.description}</p>
                  {complaint.anonymous ? (
                    <p>
                      <em>Submitted Anonymously</em>
                    </p>
                  ) : (
                    <p>
                      <strong>Submitted By:</strong> {complaint.studentName} ({complaint.rollNumber})
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No complaints available.</p>
            )}
          </div>
        </div>
      )}

      <div className="complaint-buttons">
        <div className="button-card">
          <h4>Add New Complaint ✍️</h4>
          <p>"Speak up, your voice matters."</p>
          <Link to="/add-complaint">
            <button className="btn">Add Complaint</button>
          </Link>
        </div>
        <div className="button-card">
          <h4>View All Complaints 👀</h4>
          <p>"Transparency fosters trust."</p>
          <button className="btn view-all-btn" onClick={handleViewAllComplaints}>
            View All
          </button>
        </div>
      </div>

      {showPasswordPrompt && (
        <div className="password-prompt">
          <h4>Enter Password to View All Complaints</h4>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit" className="btn">Submit</button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => setShowPasswordPrompt(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Complaint;
