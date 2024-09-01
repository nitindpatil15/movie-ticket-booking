import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BK_URI, token } from "../../constant";

// Base URL for the API
const host = `${BK_URI}/reservation`;

// Async thunk to book seats
export const bookSeats = createAsyncThunk(
  "booking/bookSeats",
  async (
    { movieId, theatreId, showtimeId, bookingData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${host}/movies/${movieId}/theatres/${theatreId}/showtimes/${showtimeId}/reserv`,
        bookingData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer${token}`,
          },
        } // Include credentials for authentication
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get user reservations
export const getUserReservations = createAsyncThunk(
  "booking/getUserReservations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/getreservations`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      console.log("Reservation", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to cancel a reservation
export const cancelReservation = createAsyncThunk(
  "booking/cancelReservation",
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${host}/cancelreservation/${reservationId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer${token}`,
          },
        } // Include credentials for authentication
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelReservationbyAdmin = createAsyncThunk(
  "booking/cancelReservationbyAdmin",
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${host}/cancelreservationbyAdmin/${reservationId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer${token}`,
          },
        } // Include credentials for authentication
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllReservations = createAsyncThunk(
  "booking/getAllReservations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/admin/getallreservations`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Book Seats
      .addCase(bookSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(bookSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Reservations
      .addCase(getUserReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel Reservation
      .addCase(cancelReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = state.reservations.filter(
          (reservation) => reservation._id !== action.payload._id
        );
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelReservationbyAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelReservationbyAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = state.reservations.filter(
          (reservation) => reservation._id !== action.payload._id
        );
      })
      .addCase(cancelReservationbyAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
