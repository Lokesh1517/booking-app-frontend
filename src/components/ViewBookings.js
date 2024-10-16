// components/ViewBookings.js

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewBookings.css'; // Import the CSS file for custom styles
import Navbar from './Navbar';

const ViewBookings = () => {
  const [centres, setCentres] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedCentreId, setSelectedCentreId] = useState(null);
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch centres
    fetch('http://localhost:5000/api/centres', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
      },
    })
      .then((res) => res.json())
      .then(setCentres)
      .catch((error) => {
        toast.error('Failed to fetch centres');
        console.error(error);
      });
  }, []);

  const handleCentreChange = (centreId) => {
    setSelectedCentreId(centreId);
    // Fetch sports based on selected centre
    fetch(`http://localhost:5000/api/centres/sports?centreId=${centreId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
      },
    })
      .then((res) => res.json())
      .then(setSports)
      .catch((error) => {
        toast.error('Failed to fetch sports');
        console.error(error);
      });
  };

  const handleViewBookings = () => {
    if (selectedCentreId && selectedSportId && selectedDate) {
      fetch(
        `http://localhost:5000/api/bookings/view?centreId=${selectedCentreId}&sportId=${selectedSportId}&date=${selectedDate}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch bookings');
          }
          return res.json();
        })
        .then(setBookings)
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error('Please select a centre, sport, and date');
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="app-container" style={{ marginTop: '40px' }}>
      <h1>View Bookings</h1>

      {/* Centre selection */}
      <div className="form-group">
        <label htmlFor="centreSelect">Select a Centre</label>
        <select
          id="centreSelect"
          onChange={(e) => handleCentreChange(e.target.value)}
          value={selectedCentreId || ''}
          className="dropdown"
        >
          <option value="">-- Choose Centre --</option>
          {centres.map((centre) => (
            <option key={centre._id} value={centre._id}>
              {centre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sport selection */}
      <div className="form-group">
        <label htmlFor="sportSelect">Select a Sport</label>
        <select
          id="sportSelect"
          onChange={(e) => setSelectedSportId(e.target.value)}
          value={selectedSportId || ''}
          className="dropdown"
        >
          <option value="">-- Choose Sport --</option>
          {sports.map((sport) => (
            <option key={sport._id} value={sport._id}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date selection */}
      <div className="form-group">
        <label htmlFor="dateSelect">Select a Date</label>
        <input
          type="date"
          id="dateSelect"
          className="date-picker"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <button className="view-btn" onClick={handleViewBookings}>
        View Bookings
      </button>

      {/* Bookings List */}
      <div className="bookings-list">
        <h3>Bookings:</h3>
        <div className="bookings-container">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h4>{booking.courtName}</h4>
                <p>User: <strong>{booking.userName}</strong></p>
                <p>
                  Time: {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
    </div>
  );
};

export default ViewBookings;
