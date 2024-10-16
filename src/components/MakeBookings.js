// components/MakeBookings.js

import React, { useState, useEffect } from 'react';
import BookingList from './BookingList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MakeBookings.css'; // Optional: Create a separate CSS file for MakeBookings styling
import Navbar from './Navbar';

const MakeBookings = () => {
  const [centres, setCentres] = useState([]);
  const [sports, setSports] = useState([]);
  const [courts, setCourts] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [selectedCentreId, setSelectedCentreId] = useState(null);
  const [selectedCourtId, setSelectedCourtId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/centres', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
      },
    })
      .then((res) => res.json())
      .then(setCentres);
  }, []);

  const handleCentreChange = (centreId) => {
    setSelectedCentreId(centreId);
    fetch(`http://localhost:5000/api/centres/sports?centreId=${centreId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
      },
    })
      .then((res) => res.json())
      .then(setSports);
  };

  const handleSportChange = (sportId) => {
    setSelectedSportId(sportId);
    fetch(`http://localhost:5000/api/centres/courts?sportId=${sportId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
      },
    })
      .then((res) => res.json())
      .then(setCourts);
  };

  const handleCourtChange = (courtId) => {
    setSelectedCourtId(courtId);
  };

  const handleViewSlots = (date) => {
    if (selectedSportId && selectedCentreId && selectedCourtId) {
      fetch(
        `http://localhost:5000/api/bookings?sportId=${selectedSportId}&centreId=${selectedCentreId}&courtId=${selectedCourtId}&date=${date}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
          },
        }
      )
        .then((res) => res.json())
        .then(setAvailableSlots);
    }
  };

  const handleCreateBooking = () => {
    if (selectedSlot) {
      const { courtId, startTime, endTime } = selectedSlot;
      fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
        },
        body: JSON.stringify({
          centreId: selectedCentreId,
          courtId: selectedCourtId,
          sportId: selectedSportId,
          date: selectedDate,
          startTime,
          endTime,
        }),
      }).then(() => {
        setSelectedSlot(null);
        setAvailableSlots([]);
        setSelectedCentreId(null);
        setSelectedSportId(null);
        setSelectedCourtId(null);
        setSelectedDate(null);

        // Show toast notification
        toast.success('Booking was successful!', {
          position: 'top-right',
          autoClose: 3000, // Close the notification after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="app-container" style={{ marginTop: '40px' }}>
      <h1>Make Bookings</h1>

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
          onChange={(e) => handleSportChange(e.target.value)}
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

      {/* Court selection */}
      <div className="form-group">
        <label htmlFor="courtSelect">Select a Court</label>
        <select
          id="courtSelect"
          onChange={(e) => handleCourtChange(e.target.value)}
          value={selectedCourtId || ''}
          className="dropdown"
        >
          <option value="">-- Choose Court --</option>
          {courts.map((court) => (
            <option key={court._id} value={court._id}>
              {court.name}
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
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            const date = new Date(e.target.value);
            setSelectedDate(date);
            handleViewSlots(date.toISOString().split('T')[0]);
          }}
        />
      </div>

      {/* Available Time Slots */}
      <div className="slots-container">
        <h3>Available Time Slots</h3>
        <ul className="slots-list">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <li
                key={slot.startTime}
                onClick={() => setSelectedSlot(slot)}
                className={`slot-item ${selectedSlot === slot ? 'selected-slot' : ''}`}
              >
                {new Date(slot.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                -{' '}
                {new Date(slot.endTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </li>
            ))
          ) : (
            <li>No slots available for this date.</li>
          )}
        </ul>
      </div>

      {/* Book Button */}
      {selectedSlot && (
        <button className="book-btn" onClick={handleCreateBooking}>
          Book{' '}
          {new Date(selectedSlot.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          -{' '}
          {new Date(selectedSlot.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </button>
      )}

      {/* Booking List */}
      <BookingList bookings={bookings} />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
    </div>
  );
};

export default MakeBookings;
