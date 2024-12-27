import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Welcome.css'; // Importing CSS for styling

const Welcome = () => {
  const navigate = useNavigate();

  // Navigation Handlers
  const handleLoginRedirect = () => {
    console.log('Navigating to login page...');
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    console.log('Navigating to register page...');
    navigate('/register');
  };

  return (
    <div className="hero">
      <div id="heading">
        <h3>Welcome to Campus Harmony</h3>
      </div>
      <p id="p">
        Your one-stop digital platform to address student grievances, gather feedback, 
        and explore academic and professional opportunities. Stay connected, stay updated, 
        and work together to create a harmonious campus environment.
      </p>
      <div className="hero-buttons">
        <button className="primary-btn" onClick={handleLoginRedirect}>Login</button>
        <button className="primary-btn" onClick={handleRegisterRedirect}>Register</button>
      </div>
    </div>
  );
};

export default Welcome;
