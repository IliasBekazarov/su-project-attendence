import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from "../assets/logo.jpeg";


const Navbar = ({ onLogout }) => {
  
  return (
    <nav className="navbar">
       <div className="navbar-logo">
           <img src={logo} alt="Logo" className="logo" />
       </div>
      <ul className="navbar-list">
        <li><Link to="/monday" className="navbar-link">Monday</Link></li>
        <li><Link to="/monday" className="navbar-link">Tuesday</Link></li>
        <li><Link to="/monday" className="navbar-link">Wednesday </Link></li>
        <li><Link to="/monday" className="navbar-link">Thursday </Link></li>
        <li><Link to="/monday" className="navbar-link">Friday </Link></li>
        <li><Link to="/timetables" className="navbar-link">Time Tables</Link></li>
        <li><button onClick={onLogout} className="navbar-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;