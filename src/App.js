import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login'
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Opportunity from './components/Opportunity'
import AddOpportunity from './components/AddOpportunity';
import ViewOpportunities from './components/viewOpportunities';
import FeedBack from './components/fedback/Feedback';
import AddFeedback from './components/fedback/AddFeedback';
import Complaint from './components/complaint/Complaint';
import AddComplaint from './components/complaint/StudentComplaint';
import AllComplaints from './components/complaint/AllComplaints';
import InterviewFeedbackPage from './components/fedback/Interview';
import ExamFeedback from './components/fedback/ExamFeedback';
const App = () => {
  return (
    <Router>
      <div>
         
        <Routes>
          <Route path="/" element={<Welcome />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register/>}/>
           <Route path="/dashboard" element={<Dashboard />}/>
           <Route path="/opportunity" element={<Opportunity />}/>
           <Route path="/addOpportunity" element={<AddOpportunity />}/>
           <Route path="/viewOpportunities" element={<ViewOpportunities />}/>
           <Route path="/feedback" element={<FeedBack />}/>
           <Route path="/addfeedback" element={<AddFeedback />}/>
           <Route path="/interview-feedback" element={<InterviewFeedbackPage/>}/>
           <Route path="/examfeedback" element={<ExamFeedback/>}/>
           <Route path="/complaint" element={<Complaint />}/>
           <Route path="/add-complaint" element={<AddComplaint/>}/>
           <Route path="/all-complaints" element={<AllComplaints/>}/>
         </Routes>
      </div>
    </Router>
  );
};

export default App;
