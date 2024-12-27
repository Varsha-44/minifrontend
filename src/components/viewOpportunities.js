import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewOpportunities.css';  // CSS for card styling

const ViewOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch opportunities within the deadline
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/opportunity');
        
        // Filter opportunities within the deadline
        const filteredOpportunities = response.data.filter((opportunity) => {
          const deadline = new Date(opportunity.deadline);
          const today = new Date();
          return deadline >= today; // Only show opportunities with a deadline in the future
        });

        setOpportunities(filteredOpportunities);
      } catch (error) {
        setError('Error fetching opportunities');
      }
    };

    fetchOpportunities();
  }, []);

  return (
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
  );
};
export default ViewOpportunities;