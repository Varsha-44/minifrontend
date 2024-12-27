import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Opportunity.css';

const Opportunities = () => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Handle form submission for adding opportunity
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/opportunity/add', {
        role,
        company,
        deadline,
        description,
        url,
      });

      setSuccess(true);
      setError('');
      // Reset form fields after successful submission
      setRole('');
      setCompany('');
      setDeadline('');
      setDescription('');
      setUrl('');
      console.log('Opportunity Added:', response.data);
    } catch (err) {
      setError('Error adding opportunity');
      setSuccess(false);
    }
  };

  // Fetch and order opportunities by deadline (ascending)
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/opportunity');
        const sortedOpportunities = response.data
          .filter((opportunity) => new Date(opportunity.deadline) >= new Date()) 
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setOpportunities(sortedOpportunities);
      } catch (err) {
        setError('Error fetching opportunities');
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="opportunities">
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Opportunity'}
      </button>

      {showForm && (
        <div className="add-opportunity">
          <h1>Add Opportunity</h1>
          <p className="quote">"Opportunities don't happen. You create them." - Chris Grosser</p>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Opportunity added successfully!</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <input
              type="date"
              placeholder="Deadline for Applications"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button type="submit">Add Opportunity</button>
          </form>
        </div>
      )}

      <div className="view-opportunities">
        <h2>Opportunities</h2>
        {error && <p className="error">{error}</p>}
        <div className="opportunity-cards">
          {opportunities.length === 0 ? (
            <p>No opportunities available at the moment.</p>
          ) : (
            opportunities.map((opportunity) => (
              <div className="opportunity-card" key={opportunity._id}>
                <h3>{opportunity.role}</h3>
                <p><strong>Company:</strong> {opportunity.company}</p>
                <p><strong>Deadline:</strong> {new Date(opportunity.deadline).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {opportunity.description}</p>
                <a href={opportunity.url} target="_blank" rel="noopener noreferrer">View Opportunity</a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
