import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeats,
  delteSeats,
  getAvailableSeats,
} from "../../Redux/Reservation/seatSlice";
import "./ManageSeats.css";

const ManageSeats = ({ showtimeId, showtime }) => {
  const dispatch = useDispatch();
  const { seats, loading, error } = useSelector((state) => state.seats);
  const [rows, setRows] = useState([]);
  const [numbers, setNumbers] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (showtimeId) {
      dispatch(getAvailableSeats(showtimeId));
    }
  }, [dispatch, showtimeId]);

  const handleAddSeats = () => {
    const parsedNumbers = parseInt(numbers, 10);

    if (rows.length > 0 && !isNaN(parsedNumbers)) {
      dispatch(addSeats({ rows, numbers: parsedNumbers, showtimeId }))
        .unwrap()
        .then(() => {
          setRows([]);
          setNumbers(""); // Reset numbers to an empty string
        })
        .catch((error) => {
          console.error("Failed to add seats:", error);
        });
    } else {
      console.error("Rows or numbers are not properly set");
    }
  };

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleDeleteSeats = () => {
    if (selectedSeats.length === 0) {
      alert("No seats selected for deletion");
      return;
    }

    if (window.confirm("Are you sure you want to delete the selected seats?")) {
      selectedSeats.forEach((seatId) => {
        dispatch(delteSeats(seatId))
          .unwrap()
          .then(() => dispatch(getAvailableSeats(showtimeId)))
          .catch((error) => {
            console.error("Failed to delete seat:", error);
          });
      });
      setSelectedSeats([]);
    }
  };

  const groupSeatsByRow = (seats) => {
    return seats.reduce((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});
  };

  const groupedSeats = groupSeatsByRow(seats);

  return (
    <div className="manageseats">
      <h1>Manage Seats for Showtime: {showtime}</h1>

      <div className="addseats">
        <h2>Add Seats</h2>
        <div className="seatsform">
          <input
            type="text"
            placeholder="Rows (e.g., A,B,C)"
            value={rows.join(",")}
            onChange={(e) => setRows(e.target.value.split(","))}
          />

          <input
            type="number"
            placeholder="Number of seats per row (e.g., 10)"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)} // Update as a string
          />
          <div id="add-btn" onClick={handleAddSeats}>
            Add Seats
          </div>
        </div>
      </div>

      <div>
        <h3>Existing Seats</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th className="th">Row</th>
              <th className="th">Seats</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedSeats).map((row) => (
              <tr className="tr" key={row}>
                <td className="td">{row}</td>
                <td id="seats">
                  {groupedSeats[row].map((seat) => (
                    <label key={seat._id} className="seat-label">
                      <input className="input"
                        type="checkbox"
                        checked={selectedSeats.includes(seat._id)}
                        onChange={() => handleSeatSelection(seat._id)}
                      />
                      <span className="seat-number">{seat.number}</span>
                    </label>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="add-btn" onClick={handleDeleteSeats}>
          Delete Selected Seats
        </button>
      </div>
    </div>
  );
};

export default ManageSeats;
