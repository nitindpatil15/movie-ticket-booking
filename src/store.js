import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Redux/Auth/authSlice';
import movieSlice from './Redux/Movie/movieSlice';
import theatreSlice from './Redux/Theatre/theatreSlice';
import userSlice from './Redux/User/userSlice';
import showtimeSlice from './Redux/Showtime/showtimeSlice';
import seatSlice from './Redux/Reservation/seatSlice';
import bookingSlice from './Redux/Reservation/bookingSlice';
import adsSlice from './Redux/Ads/adsSlice';

const store = configureStore({
  reducer: {
    auth:authSlice,
    movies:movieSlice,
    theater:theatreSlice,
    user:userSlice,
    showtime:showtimeSlice,
    seats:seatSlice,
    booking:bookingSlice,
    ads:adsSlice
  }
});

export default store;