import React, { useState } from "react";

const AddShowtimePopup = ({ onClose, onAdd, movies, theaterId }) => {
  const [ticketPrice, setTicketPrice] = useState("");
  const [showtime, setShowtime] = useState("");
  const [date, setDate] = useState("");
  const [movieId, setMovieId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theaterId) {
      console.error("Theater ID is missing");
      return;
    }
    onAdd({ ticketPrice, showtime, date, movieId, theaterId }); // Include theaterId
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Showtime</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Showtime"
            value={showtime}
            onChange={(e) => setShowtime(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Ticket Price"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            required
          />
          <select
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            required
          >
            <option value="">Select Movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Showtime</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShowtimePopup;
