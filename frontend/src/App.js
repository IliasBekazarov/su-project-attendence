import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TimeTables from './components/TimeTables';
import Home from './components/Home';
import Navbar from './components/Navbar';

import MondayTimeTable from './components/MondayTimeTable';
import TuesdayTimeTable from './components/ TuesdayTimeTable';
import WednesdayTimeTable from './components/WednesdayTimeTable';
import ThursdayTimeTable from './components/ TuesdayTimeTable';
import FridayTimeTable from './components/FridayTimeTable';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'your-token');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
         <Navbar />
        <Routes>
          
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />} />
          
          <Route path="/navbar" element={isLoggedIn ? <Navbar /> : <Navigate to="/login" />} />
          <Route path="/monday" element={isLoggedIn ? <MondayTimeTable /> : <Navigate to="/login" />} />
          <Route path="/tuesday" element={isLoggedIn ? <TuesdayTimeTable /> : <Navigate to="/login" />} />
          <Route path="/wednesday" element={isLoggedIn ? <WednesdayTimeTable /> : <Navigate to="/login" />} />
          <Route path="/thursday" element={isLoggedIn ? <ThursdayTimeTable /> : <Navigate to="/login" />} />
          <Route path="/friday" element={isLoggedIn ? <FridayTimeTable /> : <Navigate to="/login" />} />
          

          <Route path="/timetables" element={isLoggedIn ? <TimeTables /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
