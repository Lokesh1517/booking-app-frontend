// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you are importing the CSS file

const LoginNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title" ><Link to="/">GT Booking Management</Link></div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/login">Customer Login</Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/view-bookings">Admin Login</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default LoginNavbar;
