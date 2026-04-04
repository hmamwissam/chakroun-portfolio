import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import HeroEditor from './pages/HeroEditor';
import SkillsManager from './pages/SkillsManager';
import ExperienceManager from './pages/ExperienceManager';
import TrainingManager from './pages/TrainingManager';
import EducationManager from './pages/EducationManager';
import MessagesInbox from './pages/MessagesInbox';
import QuoteEditor from './pages/QuoteEditor';
import ContactEditor from './pages/ContactEditor';

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  return (
    <Router basename="/admin">
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login setToken={setToken} />} />
        
        <Route 
          path="/*" 
          element={
            token ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/hero" element={<HeroEditor />} />
                  <Route path="/skills" element={<SkillsManager />} />
                  <Route path="/experience" element={<ExperienceManager />} />
                  <Route path="/training" element={<TrainingManager />} />
                  <Route path="/education" element={<EducationManager />} />
                  <Route path="/messages" element={<MessagesInbox />} />
                  <Route path="/quote" element={<QuoteEditor />} />
                  <Route path="/contact" element={<ContactEditor />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
