// LandingPage.js
import React from 'react';
import { HomeIcon, UsersIcon, DocumentIcon } from '@heroicons/react/24/outline';
import './LandingPage.css'; // Import the CSS file
import LoginNavbar from './LoginNavbar';

const LandingPage = () => {
  return (
    <div>
    <LoginNavbar/>
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to Our Sports Booking App</h1>
        <p>Your one-stop solution for managing sports bookings!</p>
      </header>
      <main className="features">
        <h2>Features</h2>
        <div className="feature-container">
          <div className="feature">
            <HomeIcon className="icon" />
            <h3>Easy Booking</h3>
            <p>Quickly book your sports facilities with just a few clicks.</p>
          </div>
          <div className="feature">
            <UsersIcon className="icon" />
            <h3>View Bookings</h3>
            <p>Effortlessly view booked slots.</p>
          </div>
          <div className="feature">
            <DocumentIcon className="icon" />
            <h3>Booking History</h3>
            <p>Keep track of all your previous bookings and transactions.</p>
          </div>
          {/* <div className="feature">
            <SupportIcon className="icon" />
            <h3>24/7 Support</h3>
            <p>We're here to help you anytime, day or night.</p>
          </div> */}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Sports Booking App. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default LandingPage;
