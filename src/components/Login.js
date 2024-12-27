import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For showing a loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setLoading(true); // Start loading

    try {
      // Make API call to the backend for login
      const response = await axios.post('http://localhost:5000/api/login', { email, password });

      // Store the token in localStorage for authentication
      localStorage.setItem('authToken', response.data.token);

      // Navigate to the Dashboard or any other page after login
      navigate('/dashboard');
    } catch (err) {
      // Handle errors and set appropriate error messages
      if (err.response && err.response.status === 400) {
        setError(err.response.data.msg || 'Invalid credentials');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Campus Harmony</h1>
      </header>
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error messages */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Redirect to Registration */}
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
