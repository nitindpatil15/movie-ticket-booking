import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./PaymentForm.css";
import { BK_URI, Book, token } from "../../constant";


const PaymentForm = ({
  selectedSeats,
  showtimeId,
  theatreId,
  movieId,
  userId,
  onClose,
}) => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  useEffect(() => {
    // Fetch the ticket price for the showtime
    const fetchShowtime = async () => {
      const token = Cookies.get("accessToken")
      try {
        const response = await axios.get(`${BK_URI}/showtimes/${showtimeId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer${token}` },
        });
        if (response.status === 200) {
          const { ticketPrice } = response.data.data;
          setTicketPrice(ticketPrice);
          setTotal(ticketPrice * selectedSeats.length);
        }
      } catch (error) {
        console.error("Error fetching showtime details:", error);
      }
    };

    fetchShowtime();
  }, [showtimeId, selectedSeats.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name,
      email,
      phone,
      selectedSeats,
      showtimeId,
      theatreId,
      movieId,
      userId,
      ticketPrice,
      total,
      cardNumber,
      cardExpiry,
      cardCvc,
    };

    try {
      const response = await axios.post(
        `${Book}/movie/book-tickets`,
        bookingData,
        {
          withCredentials:true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Booking confirmed. A confirmation email has been sent.");
        navigate("/")
        onClose();
      } else {
        alert("Failed to book tickets. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Payment Details</h2>
        <form onSubmit={handleSubmit}>
        <div className="text-red">Ticket Price: Rs. {ticketPrice}</div>
        <div className="text-red">No.of Ticket: {selectedSeats.length} Seats</div>
        <div className="text-red">Total Price: Rs.{total}</div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Card Expiry (MM/YY)"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Card CVC"
            value={cardCvc}
            onChange={(e) => setCardCvc(e.target.value)}
            required
          />
          <input type="hidden" value={ticketPrice} />
          <input type="hidden" value={total} />
          <button type="submit" id="c-b">Confirm Booking</button>
          <button type="button" id="c-b" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
