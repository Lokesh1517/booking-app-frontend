// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you are importing the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title" ><Link to="/">GT Booking Management</Link></div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/make-bookings">Make Bookings</Link>
        </li>
        <li className="navbar-item">
          <Link to="/view-bookings">View Bookings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
