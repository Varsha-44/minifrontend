import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Interview.css";

function InterviewFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    studentName: "",
    companyName: "",
    interviewDate: "",
    experience: "",
    tips: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interviews");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/interviews", formData);
      setFeedbacks([...feedbacks, response.data.feedback]);
      setFormData({
        studentName: "",
        companyName: "",
        interviewDate: "",
        experience: "",
        tips: "",
      });
      alert("Feedback submitted successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {
    const { companyName } = feedback;
    if (!acc[companyName]) acc[companyName] = [];
    acc[companyName].push(feedback);
    return acc;
  }, {});

  const handleCompanyClick = (companyName) => {
    setSelectedCompany((prev) => (prev === companyName ? null : companyName));
  };

  return (
    <div className="container">
      <h1>Student Interview Feedback</h1>

      {/* Toggle Button */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#4c99af",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {showForm ? "View Feedback" : "Add Feedback"}
      </button>

      {/* Add Feedback Form */}
      {showForm ? (
        <div className="form-container">
          <h2>Add Feedback</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Interview Date:
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Experience:
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                placeholder="Describe your interview experience"
              ></textarea>
            </label>
            <label>
              Tips for Others:
              <textarea
                name="tips"
                value={formData.tips}
                onChange={handleInputChange}
                placeholder="Share any tips for future interviews"
              ></textarea>
            </label>
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      ) : (
        // Shared Feedback Section
        <div>
          <h2>Shared Feedback</h2>
          {Object.keys(groupedFeedbacks).length === 0 ? (
            <p>No feedback shared yet.</p>
          ) : (
            Object.keys(groupedFeedbacks).map((companyName) => (
              <div key={companyName} className="feedback-group">
                <h3
                  style={{ cursor: "pointer", color: "#4c99af" }}
                  onClick={() => handleCompanyClick(companyName)}
                >
                  {companyName}
                </h3>
                {selectedCompany === companyName && (
                  <ul className="feedback-list">
                    {groupedFeedbacks[companyName].map((feedback, index) => (
                      <li key={index}>
                        <strong>Name:</strong> {feedback.studentName}
                        <br />
                        <strong>Date:</strong>{" "}
                        {new Date(feedback.interviewDate).toLocaleDateString()}
                        <br />
                        <strong>Experience:</strong> {feedback.experience}
                        <br />
                        <strong>Tips:</strong> {feedback.tips}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default InterviewFeedbackPage;
