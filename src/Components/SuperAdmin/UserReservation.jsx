import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReservations,
  cancelReservationbyAdmin,
} from "../../Redux/Reservation/bookingSlice";
import { fetchCurrentUser } from "../../Redux/User/userSlice"; // Adjust this import as necessary
import "./UserReservation.css";

export const UserReservation = () => {
  const dispatch = useDispatch();

  // Fetch current user data
  const { currentUser } = useSelector((state) => state.user); // Adjust based on your state structure

  // Select reservations from the Redux store
  const {
    reservations = [],
    loading,
    error,
  } = useSelector((state) => state.booking);

  // Fetch reservations when the component mounts
  useEffect(() => {
    dispatch(getAllReservations());
    dispatch(fetchCurrentUser()); // Fetch current user data
  }, [dispatch]);

  // Handle cancel button click
  const handleCancel = (reservationId) => {
    dispatch(cancelReservationbyAdmin(reservationId));
  };

  // Conditionally render based on user role
  const isSuperAdmin = currentUser?.role === "SuperAdmin";

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          {isSuperAdmin ? "Manage Ticket Reservation" : "My Reservations"}
        </div>
      </div>
      {loading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p>Error fetching reservations: {error.message}</p>
      ) : reservations.length === 0 ? (
        <div className="no-reservations">
          <h2>No reservations found.</h2>
        </div>
      ) : isSuperAdmin ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Order ID</th>
              <th>Ticket Price</th>
              <th>Total Price</th>
              <th>Contact No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.name}</td>
                <td>{reservation.orderId}</td>
                <td>{reservation.ticketPrice}</td>
                <td>{reservation.total}</td>
                <td>{reservation.phone}</td>
                <td>
                  <button
                    className="btn-2"
                    onClick={() => handleCancel(reservation._id)}
                  >
                    <i className="fa fa-home"></i> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="cart-view">
          {reservations.map((reservation) => (
            <div className="cart-item" key={reservation._id}>
              <div className="cart-item-details">
                <h5 className="user">{reservation.name}</h5>
                <p>Order ID: {reservation.orderId}</p>
                <p>Ticket Price: {reservation.ticketPrice}</p>
                <p>Seats: {reservation.seats}</p>
                <p>Total Price: {reservation.total}</p>
                <p>Contact No.: {reservation.phone}</p>
                <p>Paymentwith: Cart</p>
              <button
                className="btn-2"
                onClick={() => handleCancel(reservation._id)}
              >
                <i className="fa fa-home"></i> Cancel
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReservation;
