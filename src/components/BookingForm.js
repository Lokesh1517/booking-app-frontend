import React, { useState, useEffect } from 'react';

const BookingForm = ({ courts, onBookingCreate }) => {
  const [selectedCourt, setSelectedCourt] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    if (selectedCourt) {
      fetch(`/api/bookings?sportId=${selectedCourt}&date=${date}`)
        .then(res => res.json())
        .then(slots => setAvailableSlots(slots));
    }
  }, [selectedCourt, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [startTime, endTime] = selectedSlot.split(' - ');
    onBookingCreate(selectedCourt, startTime, endTime);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedCourt} onChange={(e) => setSelectedCourt(e.target.value)}>
        {courts.map(court => <option key={court._id} value={court._id}>{court.name}</option>)}
      </select>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
        <option value="">Select a time slot</option>
        {availableSlots.map((slot, index) => {
          const start = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const end = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return <option key={index} value={`${start} - ${end}`}>{start} - {end}</option>;
        })}
      </select>
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default BookingForm;
