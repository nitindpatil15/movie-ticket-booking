import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../Redux/Movie/movieSlice"; // Adjust import as needed
import { AssignMovie } from "../../Redux/Theatre/theatreSlice"; // Adjust import as needed

const AssignMoviePopup = ({ theaterId, onClose }) => {
  const dispatch = useDispatch();
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const { movies } = useSelector((state) => state.movies); // Adjust selector as needed

  useEffect(() => {
    dispatch(fetchAllMovies()); // Fetch movies when component mounts
  }, [dispatch]);

  const handleMovieChange = (e) => {
    setSelectedMovieId(e.target.value);
  };

  const handleAssignMovie = () => {
    if (selectedMovieId) {
      dispatch(AssignMovie({ theaterId, movieId: selectedMovieId }))
        .then(() => {
          onClose(); // Close the popup after assignment
        })
        .catch((error) => {
          console.error("Error assigning movie:", error);
        });
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Assign Movie</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="movieSelect">Select Movie</label>
                <select
                  id="movieSelect"
                  className="form-control"
                  value={selectedMovieId}
                  onChange={handleMovieChange}
                >
                  <option value="">Select a movie</option>
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAssignMovie}
            >
              Assign Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignMoviePopup;
