import React from 'react';

const BookingList = ({ bookings }) => (
  <ul>
    {bookings.map(booking => (
      <li key={booking._id}>
        Court: {booking.courtId}, Time: {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
      </li>
    ))}
  </ul>
);

export default BookingList;
