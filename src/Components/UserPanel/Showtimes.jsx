import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShowtimesByTheatreAndMovie } from '../../Redux/Showtime/showtimeSlice';

function Showtimes({ movieId, theaterId }) {
  const dispatch = useDispatch();
  const { showtimes, loading } = useSelector((state) => state.showtime);

  useEffect(() => {
    if (movieId && theaterId) {
      dispatch(getAllShowtimesByTheatreAndMovie({ theatreId: theaterId, movieId })); // Fetch showtimes by theater and movie ID
    }
  }, [dispatch, movieId, theaterId]);

  return (
    <div className="showtimes">
      {loading === 'loading' ? (
        <p>Loading showtimes...</p>
      ) : (
        showtimes.map((showtime) => (
          showtime.theatreId === theaterId && (  // Ensure we only show showtimes for the current theater
            <div key={showtime._id} className="showtime-item">
              {showtime.showtime} - ₹{showtime.ticketPrice}
            </div>
          )
        ))
      )}
    </div>
  );
}

export default Showtimes;
