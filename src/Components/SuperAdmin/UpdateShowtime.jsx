import React, { useState } from 'react';

const UpdateShowtimePopup = ({ showtime, onClose, onUpdate }) => {
  const [ticketPrice, setTicketPrice] = useState(showtime.ticketPrice);
  const [Showtime, setShowtime] = useState(showtime.showtime);
  const [date, setDate] = useState(showtime.date);

  const handleSubmit = () => {
    onUpdate(showtime._id, { ticketPrice, showtime, date });
  };

  return (
    <div className="popup">
      <h2>Update Showtime</h2>
      <label>
        Showtime:
        <input type="text" value={showtime} onChange={(e) => setShowtime(e.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        Ticket Price:
        <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Update</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateShowtimePopup;
