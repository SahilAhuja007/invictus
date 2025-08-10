import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import About from './pages/About';
import UploadPaper from './pages/UploadPaper';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/login" 
            element={<LoginSignup onLogin={handleLogin} />} 
          />
          <Route 
            path="/profile" 
            element={<Profile user={user} isLoggedIn={isLoggedIn} />} 
          />
          <Route 
            path="/upload" 
            element={<UploadPaper user={user} isLoggedIn={isLoggedIn} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;