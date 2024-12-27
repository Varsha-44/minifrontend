import React, { useState } from 'react';
import axios from 'axios';
import './AddOpportunity.css';

const AddOpportunity = () => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState(''); // New state for URL
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/opportunity/add', {
        role,
        company,
        deadline,
        description,
        url,  // Sending the URL field as well
      });

      setSuccess(true);
      setError('');
      // Reset form fields after successful submission
      setRole('');
      setCompany('');
      setDeadline('');
      setDescription('');
      setUrl('');  // Reset URL field

      console.log('Opportunity Added:', response.data);
    } catch (err) {
      setError('Error adding opportunity');
      setSuccess(false);
    }
  };

  return (
    <div className="add-opportunity">
      <h1>Add Opportunity</h1>
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
          type="url"  // Input type is URL to ensure proper validation
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Add Opportunity</button>
      </form>
    </div>
  );
};

export default AddOpportunity;  




 