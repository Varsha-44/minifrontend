import React, { useState } from "react";
import axios from "axios";

const StudentComplaint = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = () => {
    if (errorMessage) setErrorMessage(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct complaint details
    const complaintDetails = {
      category,
      description,
      ...(isAnonymous ? { anonymous: true } : { studentName, rollNumber }),
    };

    // Get token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      setErrorMessage("Please log in to submit a complaint.");
      return;
    }

    try {
      // Make POST request
      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        complaintDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Complaint Submitted:", response.data);
      alert("Complaint submitted successfully!");

      // Clear form fields
      setStudentName("");
      setRollNumber("");
      setCategory("");
      setDescription("");
      setIsAnonymous(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      const serverMessage = error.response?.data?.error || "An unexpected error occurred.";
      setErrorMessage(serverMessage);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Student Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Anonymous Toggle */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="anonymous">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              style={{ marginRight: "10px" }}
            />
            Submit as Anonymous
          </label>
        </div>

        {/* Student Name */}
        {!isAnonymous && (
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="studentName">Student Name:</label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                handleInputChange();
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              placeholder="Enter your name"
              required={!isAnonymous}
            />
          </div>
        )}

        {/* Roll Number */}
        {!isAnonymous && (
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="rollNumber">Email:</label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => {
                setRollNumber(e.target.value);
                handleInputChange();
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              placeholder="Enter your email"
              required={!isAnonymous}
            />
          </div>
        )}

        {/* Complaint Category */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="category">Complaint Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              handleInputChange();
            }}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Academic Issues">Academic Issues</option>
            <option value="Hostel Complaints">Hostel Complaints</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Library Issues">Library Issues</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Complaint Description */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="description">Complaint Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              handleInputChange();
            }}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              minHeight: "100px",
            }}
            placeholder="Describe your complaint in detail..."
            required
          ></textarea>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "15px" }}>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default StudentComplaint;
