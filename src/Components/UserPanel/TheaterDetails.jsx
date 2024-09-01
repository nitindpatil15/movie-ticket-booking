import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchtheaterByMovie } from "../../Redux/Theatre/theatreSlice"; // Adjust the import path as needed
import { useNavigate, useParams } from "react-router-dom";
import { getAllShowtimesByTheatreAndMovie } from "../../Redux/Showtime/showtimeSlice";

function TheaterShowtimes() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const dispatch = useDispatch();

  // Get theaters and status from Redux state
  const { theaters, theaterstatus, theatererror } = useSelector(
    (state) => state.theater
  );

  // Get showtimes and status from Redux state
  const { showtimes, loading, error } = useSelector((state) => state.showtime);
  const { currentMovie } = useSelector((state) => state.movies);

  // Fetch theaters by movie ID
  useEffect(() => {
    if (movieId) {
      dispatch(fetchtheaterByMovie(movieId));
    }
  }, [dispatch, movieId]);

  // Fetch showtimes by movie ID and theater ID
  useEffect(() => {
    if (theaters.length > 0) {
      theaters.forEach((theater) => {
        dispatch(
          getAllShowtimesByTheatreAndMovie({ movieId, theatreId: theater._id })
        );
      });
    }
  }, [dispatch, movieId, theaters]);

  // Handle selecting a showtime
  const handleSelectShowtime = (theatreId, showtimeId) => {
    navigate(
      `/seat-selection/movieId/${movieId}/theatreId/${theatreId}/showtimeId/${showtimeId}`
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">{currentMovie?.title} </h2>

      {/* Theaters List */}
      <div className="theaters-list">
        {theaterstatus === "loading" ? (
          <p>Loading theaters...</p>
        ) : theaterstatus === "failed" ? (
          <p>Failed to load theaters. Error: {theatererror}</p>
        ) : (
          theaters.map((theater) => (
            <div key={theater._id} className="theater">
              <div className="d-flex">
                <h5>
                  {theater.name}, {theater.city}
                </h5>
                <div className="amenities mx-4">
                  <span>M-Ticket</span>
                  <span>Food & Beverage</span>
                </div>
              </div>

              {/* Showtimes List */}
              {loading ? (
                <p>Loading showtimes...</p>
              ) : error ? (
                <p>Failed to load showtimes. Error: {error}</p>
              ) : showtimes.length === 0 ? ( // Check if showtimes is empty
                <p>No showtimes available</p>
              ) : (
                <div className="showtimes-list">
                  {showtimes
                    .filter((showtime) => showtime.theatreId === theater._id)
                    .map((showtime) => (
                      <div
                        key={showtime._id}
                        className="showtime"
                        style={{
                          border: "2px solid black",
                          cursor: "pointer",
                          width: "8rem",
                        }}
                        onClick={() =>
                          handleSelectShowtime(theater._id, showtime._id)
                        }
                      >
                        <p
                          className="px-1 mt-2 bold"
                          style={{ textAlign: "center" }}
                        >
                          {showtime.showtime}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TheaterShowtimes;
