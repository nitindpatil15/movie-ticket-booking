import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BK_URI, token } from "../../constant";

// Base URL for the API
const host = `${BK_URI}/reservation`;

// Async thunk to add seats
export const addSeats = createAsyncThunk(
  "seats/addSeats",
  async ({ showtimeId, rows, numbers }, { rejectWithValue }) => {
    try {
      const seatData = { rows, numbers }; // Properly structure seatData
      const response = await axios.post(
        `${host}/showtimes/${showtimeId}/seats`,
        seatData,
        { withCredentials: true ,
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to get available seats
export const getAvailableSeats = createAsyncThunk(
  "seats/getAvailableSeats",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${host}/showtimes/${showtimeId}/seats`,
        { withCredentials: true ,
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

export const delteSeats = createAsyncThunk(
  "seats/DeleteSeats",
  async (seatId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${host}/seat/delted/${seatId}`,
        { withCredentials: true,
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

export const createCheckoutSession = createAsyncThunk(
  "seats/createCheckoutSession",
  async (
    { movieId, showtimeId, theatreId, selectedSeats },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${host}/movies/${movieId}/theatres/${theatreId}/showtimes/${showtimeId}/reserv`,
        {
          movieId,
          showtimeId,
          theatreId,
          selectedSeats,
          ticketPrice: 180, // Example ticket price
          total: selectedSeats.length * 180, // Example total
          // Add user details here
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const seatSlice = createSlice({
  name: "seats",
  initialState: {
    seats: [],
    selectedSeats: [],
    occupiedSeats: [],
    loading: false,
    error: null,
    sessionId: null,
  },
  reducers: {
    setSelectedSeats: (state, action) => {
      state.selectedSeats = Array.isArray(action.payload) ? action.payload : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Seats
      .addCase(addSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.seats.push(...action.payload);
      })
      .addCase(addSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Available Seats
      .addCase(getAvailableSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.seats = action.payload; // Assuming seats array is returned
        state.occupiedSeats = action.payload
          .filter((seat) => seat.isBooked) // Assuming 'isBooked' marks occupied seats
          .map((seat) => seat._id); // Extracting seat IDs
      })
      .addCase(getAvailableSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload.sessionId;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSeats } = seatSlice.actions;
export default seatSlice.reducer;
