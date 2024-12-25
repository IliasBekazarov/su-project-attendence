import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";

const Navbar = ({ onLogout }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <h2>Salymbekov University</h2>
      </div>
      <ul className="navbar-list">
        <li><Link to="/home" className="navbar-link">Home</Link></li>
        <li><Link to="/monday" className="navbar-link">Monday</Link></li>
        <li><Link to="/tuesday" className="navbar-link">Tuesday</Link></li>
        <li><Link to="/wednesday" className="navbar-link">Wednesday</Link></li>
        <li><Link to="/thursday" className="navbar-link">Thursday</Link></li>
        <li><Link to="/friday" className="navbar-link">Friday</Link></li>
        <li><Link to="/timetables" className="navbar-link">Time Tables</Link></li>
        
        <li><button onClick={onLogout} className="navbar-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
