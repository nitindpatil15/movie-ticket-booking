import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../Redux/Movie/movieSlice";
import {
  addShowtime,
  deleteShowtime,
  getAllShowtimesByTheatre,
  updateShowtime,
} from "../../Redux/Showtime/showtimeSlice";
import { fetchAlltheater } from "../../Redux/Theatre/theatreSlice";
import ManageSeats from "./ManageSeats";
import "./Manageshow.css"

const ShowtimeManagement = () => {
  const dispatch = useDispatch();
  const { showtimes, loading, error } = useSelector((state) => state.showtime);
  const { theaters } = useSelector((state) => state.theater);
  const { movies } = useSelector((state) => state.movies);

  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showtimeData, setShowtimeData] = useState({
    ticketPrice: "",
    showtime: "",
    date: "",
    theatreId: "",
  });
  const [editingShowtimeId, setEditingShowtimeId] = useState(null);
  const [manageSeatsShowtimeId, setManageSeatsShowtimeId] = useState(null); // State to track the selected showtime for seat management
  const [manageSeatsShowtime, setManageSeatsShowtime] = useState(null); // State to track the selected showtime for seat management

  useEffect(() => {
    dispatch(fetchAlltheater());
    dispatch(fetchAllMovies());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTheater) {
      dispatch(getAllShowtimesByTheatre({ theatreId: selectedTheater }));
    }
  }, [dispatch, selectedTheater]);

  useEffect(() => {
    setShowtimeData((prevData) => ({
      ...prevData,
      theatreId: selectedTheater,
    }));
  }, [selectedTheater]);

  const handleAddShowtime = () => {
    if (
      !selectedTheater ||
      !selectedMovie ||
      !showtimeData.ticketPrice ||
      !showtimeData.showtime ||
      !showtimeData.date
    ) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      addShowtime({
        theatreId: showtimeData.theatreId,
        showtimeData: {
          ...showtimeData,
          movieId: selectedMovie,
        },
      })
    )
      .unwrap()
      .then(() => {
        setShowtimeData({
          ticketPrice: "",
          showtime: "",
          date: "",
          theatreId: "",
        });
        setSelectedTheater("");
        setSelectedMovie("");
      })
      .catch((error) => {
        console.error("Failed to add showtime:", error);
      });
  };

  const handleUpdateShowtime = (showtimeId) => {
    if (
      !showtimeData.ticketPrice ||
      !showtimeData.showtime ||
      !showtimeData.date
    ) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      updateShowtime({
        showtimeId,
        showtimeData: {
          ...showtimeData,
          movieId: selectedMovie,
        },
      })
    )
      .unwrap()
      .then(() => {
        setEditingShowtimeId(null);
        setShowtimeData({
          ticketPrice: "",
          showtime: "",
          date: "",
          theatreId: "",
        });
      })
      .catch((error) => {
        console.error("Failed to update showtime:", error);
      });
  };

  const handleDeleteShowtime = (showtimeId) => {
    if (window.confirm("Are you sure you want to delete this showtime?")) {
      dispatch(deleteShowtime(showtimeId))
        .unwrap()
        .catch((error) => {
          console.error("Failed to delete showtime:", error);
        });
    }
  };

  const handleEditClick = (showtime) => {
    setEditingShowtimeId(showtime._id);
    setShowtimeData({
      ticketPrice: showtime.ticketPrice,
      showtime: showtime.showtime,
      date: showtime.date,
      theatreId: showtime.theatreId,
    });
    setSelectedTheater(showtime.theatreId);
    setSelectedMovie(showtime.movieId);
  };

  const handleManageSeatsClick = (showtimeId, showtime) => {
    setManageSeatsShowtimeId(showtimeId);
    setManageSeatsShowtime(showtime);
  };

  return (
    <div id="MST-container" style={{backgroundColor:"white",padding:"2rem"}}>
      <h1 id="heading-1">Showtime Management</h1>

      <div className="row">
        <h2 id="a-s">
          {editingShowtimeId ? "Update Showtime" : "Add Showtime"}
        </h2>
        <select
          id="s-t-m"
          onChange={(e) => setSelectedTheater(e.target.value)}
          value={selectedTheater}
        >
          <option value="">Select Theater</option>
          {theaters.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>

        <select
          id="s-t-m"
          onChange={(e) => setSelectedMovie(e.target.value)}
          value={selectedMovie}
        >
          <option value="">Select Movie</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>
      <div className="row" id="input-row">
        <input
        id="input-new"
          type="text"
          placeholder="Ticket Price"
          value={showtimeData.ticketPrice}
          onChange={(e) =>
            setShowtimeData({ ...showtimeData, ticketPrice: e.target.value })
          }
        />
        <input
        id="input-new"
          type="text"
          placeholder="Showtime"
          value={showtimeData.showtime}
          onChange={(e) =>
            setShowtimeData({ ...showtimeData, showtime: e.target.value })
          }
        />
        <input
        id="input-new"
          type="date"
          placeholder="Date"
          value={showtimeData.date}
          onChange={(e) =>
            setShowtimeData({ ...showtimeData, date: e.target.value })
          }
        />
        <button id="button-new"
          onClick={
            editingShowtimeId
              ? () => handleUpdateShowtime(editingShowtimeId)
              : handleAddShowtime
          }
        >
          {editingShowtimeId ? "Update Showtime" : "Add Showtime"}
        </button>
      </div>

      <div className="my-5" style={{marginLeft:"2.5rem"}}>
        <h1 className="">
          Showtimes for {theaters.find((t) => t._id === selectedTheater)?.name}
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <table id="table-M-S-T">
          <thead>
            <tr style={{textAlign:"center"}}>
              <th id="th-1">Showtime ID</th>
              <th id="th-1">Movie</th>
              <th id="th-1">Ticket Price</th>
              <th id="th-1">Showtime</th>
              <th id="th-1">Date</th>
              <th id="th-1">Manage Seats</th>
              <th id="th-1">Actions</th>
            </tr>
          </thead>
          <tbody style={{textAlign:"center"}}>
            {showtimes.length > 0 ? (
              showtimes.map((showtime) => (
                <tr key={showtime._id}>
                  <td>{showtime._id}</td>
                  <td>
                    {
                      movies.find((movie) => movie._id === showtime.movieId)
                        ?.title
                    }
                  </td>
                  <td>{showtime.ticketPrice}</td>
                  <td>{showtime.showtime}</td>
                  <td>{showtime.date}</td>
                  <td>
                    <button className="btn-2"
                      onClick={() =>
                        handleManageSeatsClick(showtime._id, showtime.showtime)
                      }
                    >
                      Manage Seats
                    </button>
                  </td>
                  <td>
                    <button className="btn-2" onClick={() => handleEditClick(showtime)}>
                      Edit
                    </button>
                    <button className="btn-2" onClick={() => handleDeleteShowtime(showtime._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No showtimes available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {manageSeatsShowtimeId && (
        <ManageSeats
          showtimeId={manageSeatsShowtimeId}
          showtime={manageSeatsShowtime}
        />
      )}
    </div>
  );
};

export default ShowtimeManagement;
