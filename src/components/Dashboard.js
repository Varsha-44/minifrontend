import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS for styling

const Dashboard = () => {
  const navigate = useNavigate();

  // Check authentication on component load
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login', { replace: true }); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token from localStorage (or sessionStorage, depending on your app)
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true }); // Replace history to prevent navigating back
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="dashboard-heading">Welcome to Campus Harmony Dashboard</h1>
        {/* Beautiful quotation with emoji */}
        <p className="quote">"Empowering students to create a brighter future 🌟💬"</p>
        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="cards-container">
        <div className="card" onClick={() => navigate('/complaint')}>
          <h2 className="card-title">Complaint Management System</h2>
          <p className="card-description">Manage student grievances effectively.</p>
          {/* Special quote above the button */}
          <p className="quote-special">"Your voice matters. Let it be heard 📢📝"</p>
          <button className="card-button">Go to System</button>
        </div>

        <div className="card" onClick={() => navigate('/feedback')}>
          <h2 className="card-title">Feedback Management System</h2>
          <p className="card-description">Provide a platform for feedback collection.</p>
          {/* Special quote above the button */}
          <p className="quote-special">"Every feedback is a step towards improvement 🚀💡"</p>
          <button className="card-button">Go to System</button>
        </div>

        <div className="card" onClick={() => navigate('/opportunity')}>
          <h2 className="card-title">Opportunity Board</h2>
          <p className="card-description">Explore job and internship opportunities.</p>
          {/* Special quote above the button */}
          <p className="quote-special">"Opportunities await. Take the first step 🔑💼"</p>
          <button className="card-button">Go to Board</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
