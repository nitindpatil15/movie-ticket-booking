import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableSeats, setSelectedSeats } from "../../Redux/Reservation/seatSlice";
import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm"; // Import the new payment form component
import "./SeatSelection.css";
import { fetchCurrentUser } from "../../Redux/User/userSlice";

function SeatSelection() {
  const { movieId, theatreId, showtimeId } = useParams();
  const dispatch = useDispatch();
  const { seats = [], selectedSeats = [], occupiedSeats = [] } = useSelector((state) => state.seats);
  const { currentUser } = useSelector((state) => state.user);

  const [showPaymentForm, setShowPaymentForm] = useState(false); // Manage payment form visibility

  useEffect(() => {
    dispatch(fetchCurrentUser())
    dispatch(getAvailableSeats(showtimeId));
  }, [dispatch, showtimeId]);

  const handleSeatClick = (seatId) => {
    if (!occupiedSeats.includes(seatId)) {
      const newSelectedSeats = selectedSeats.includes(seatId)
        ? selectedSeats.filter((id) => id !== seatId)
        : [...selectedSeats, seatId];

      dispatch(setSelectedSeats(newSelectedSeats));
    }
  };

  const handleConfirmClick = () => {
    setShowPaymentForm(true);
  };

  const renderSeat = (seat) => {
    const isOccupied = occupiedSeats.includes(seat._id) || seat.isBooked;
    const isSelected = selectedSeats.includes(seat._id);
    const seatClass = `seat ${
      isOccupied ? "occupied" : isSelected ? "selected" : "notoccupied"
    }`;

    return (
      <div
        key={seat._id}
        className={seatClass}
        onClick={() => handleSeatClick(seat._id)}
        style={{
          cursor: isOccupied ? "not-allowed" : "pointer",
          border: isOccupied
            ? "2px solid red"
            : isSelected
            ? "2px solid green"
            : "",
        }}
      >
        {seat.number}
      </div>
    );
  };

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  return (
    <div className="container">
      <h2 className="my-4 text-center">Select Your Seats</h2>
      <div className="screen">Screen</div>
      <div className="row justify-content-center">
        {Object.keys(groupedSeats).map((row) => (
          <div key={row} className="col-md-8 d-flex flex-wrap justify-content-center">
            <div className="rown" data-seat-number={row}>
              {row}
            </div>
            {groupedSeats[row].map((seat) => renderSeat(seat))}
          </div>
        ))}
      </div>

      <div className="text-center my-4">
        <button onClick={handleConfirmClick} className="btn-confirm" id="seat-confirm">
          Confirm
        </button>
      </div>

      <div id="selectedSeats" className="text-center">
        {selectedSeats.length > 0 && (
          <p>You have selected: {selectedSeats.join(", ")}</p>
        )}
      </div>

      {showPaymentForm && (
        <PaymentForm
          selectedSeats={selectedSeats}
          showtimeId={showtimeId}
          theatreId={theatreId}
          movieId={movieId}
          userId={currentUser}
          onClose={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
}

export default SeatSelection;
