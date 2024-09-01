import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deletetheater,
  fetchAlltheater,
} from "../../Redux/Theatre/theatreSlice";
import "./AllTheater.css";
import { fetchCurrentUser } from "../../Redux/User/userSlice";
import AssignMoviePopup from "./AssignMovie";
import Popup from "./Popup";

const AllTheater = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theaters, status, error } = useSelector((state) => state.theater);
  const { currentUser } = useSelector((state) => state.user);

  const [selectedTheater, setSelectedTheater] = useState(null);
  const [showAssignMoviePopup, setShowAssignMoviePopup] = useState(false);
  const [showUpdateTheaterPopup, setShowUpdateTheaterPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchAlltheater()).then(() => dispatch(fetchCurrentUser()));
  }, [dispatch]);

  const filteredTheaters =
    currentUser?.role === "SuperAdmin"
      ? theaters
      : theaters.filter((theater) => theater.owner === currentUser._id);

  const handleAssignAdminClick = (theaterId) => {
    navigate(`/superadmin/createadmin/${theaterId}`);
  };

  const handleAssignMovieClick = (theaterId) => {
    setSelectedTheater(theaterId);
    setShowAssignMoviePopup(true);
  };

  const handleUpdateClick = (theater) => {
    setSelectedTheater(theater);
    setShowUpdateTheaterPopup(true); // Open update theater popup
  };

  const handleDeleteClick = (theaterId) => {
    dispatch(deletetheater(theaterId)).then(() => {
      dispatch(fetchAlltheater());
    });
  };

  const handleClosePopup = () => {
    setSelectedTheater(null);
    setShowAssignMoviePopup(false);
    setShowUpdateTheaterPopup(false); // Close update theater popup
    dispatch(fetchAlltheater());
  };

  return (
    <div className="mx-5 bg-white">
      <div className="header mx-auto">
        <div className="text">View All Theater
        {currentUser?.role === "SuperAdmin" && (
          <Link to="/superadmin/create-theater" className="btn-2">
            <i className="fa fa-add"></i>Add Theatre
          </Link>
        )}
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Theater Name</th>
            <th>City</th>
            <th>Seats</th>
            <th>Movies</th>
            {currentUser?.role === "SuperAdmin" ? <th>Owner</th> : <></>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading" ? (
            <tr>
              <td colSpan="7" className="text-center">
                Loading...
              </td>
            </tr>
          ) : status === "failed" ? (
            <tr>
              <td colSpan="7" className="text-center">
                Refresh to load theaters. {error}
              </td>
            </tr>
          ) : (
            filteredTheaters.map((theater) => (
              <tr key={theater._id}>
                <td>{theater.name}</td>
                <td>{theater.city}</td>
                <td>{theater.seats}</td>
                <td>
                  {theater.movies && theater.movies.length > 0 ? (
                    <>
                      <ul>
                        {theater.movies.map((movie, index) => (
                          <li key={index}>{movie}</li>
                        ))}
                      </ul>
                      <div
                        className="btn"
                        onClick={() => handleAssignMovieClick(theater._id)}
                      >
                        Assign Movie
                      </div>
                    </>
                  ) : (
                    <div
                      className="btn"
                      onClick={() => handleAssignMovieClick(theater._id)}
                    >
                      Assign Movie
                    </div>
                  )}
                </td>
                {currentUser.role === "SuperAdmin" ? (
                  <td>
                    {theater.owner ? (
                      theater.owner
                    ) : (
                      <div
                        className="btn"
                        onClick={() => handleAssignAdminClick(theater._id)}
                      >
                        Assign Owner
                      </div>
                    )}
                  </td>
                ) : (
                  <></>
                )}
                <td>
                  <button
                    className="btn-1"
                    onClick={() => handleUpdateClick(theater)}
                  >
                    <i className="fa fa-pencil-square-o"></i> Update
                  </button>
                  {currentUser?.role === "SuperAdmin" || currentUser?.role === "Admin" ? (
                    <button
                      className="btn-2"
                      onClick={() => handleDeleteClick(theater._id)}
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  ):(<></>)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showAssignMoviePopup && selectedTheater && (
        <AssignMoviePopup
          theaterId={selectedTheater}
          onClose={handleClosePopup}
        />
      )}
      {showUpdateTheaterPopup && selectedTheater && (
        <Popup
          theater={selectedTheater}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default AllTheater;
