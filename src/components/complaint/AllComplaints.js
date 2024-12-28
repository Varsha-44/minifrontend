import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllComplaints.css';

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assuming token-based auth
        const response = await axios.get('https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/complaints', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to load complaints. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDeleteComplaint = async (id) => {
    const token = localStorage.getItem('authToken'); // Assuming token-based auth

    try {
      // Send delete request to the backend
      const response = await axios.delete(`https://mini-backend-varshas-projects-f7a4cec5.vercel.app/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.message); // Logging success message
      // Remove the complaint from the state (UI)
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (err) {
      console.error('Error deleting complaint:', err);
      setError('Failed to delete complaint. Please try again.');
    }
  };

  return (
    <div className="all-complaints-dashboard">
      <h2>All Complaints</h2>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading complaints...</p>
      ) : (
        <div className="complaints-list">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <div className="complaint-card" key={complaint._id}>
                <h4>{complaint.category}</h4>
                <p>{complaint.description}</p>
                <p>
                  <strong>Submitted By:</strong>{' '}
                  {complaint.anonymous ? 'Anonymous' : `${complaint.studentName} (${complaint.rollNumber})`}
                </p>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteComplaint(complaint._id)} // Pass the complaint ID for deletion
                >
                  Delete Complaint
                </button>
              </div>
            ))
          ) : (
            <p>No complaints found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllComplaints;
