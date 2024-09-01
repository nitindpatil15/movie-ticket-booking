import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BK_URI, token } from "../../constant";

// Base URL for showtime-related API calls
const host = `${BK_URI}/showtimes`;

// Add a new Showtime
export const addShowtime = createAsyncThunk(
  "showtimes/addShowtime",
  async ({ theatreId,showtimeData}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${host}/add/theatre`,
        showtimeData,
        { withCredentials: true ,
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update an existing Showtime
export const updateShowtime = createAsyncThunk(
  "showtimes/updateShowtime",
  async ({ showtimeId, showtimeData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${host}/update/${showtimeId}`,
        showtimeData,
        { withCredentials: true ,
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a Showtime
export const deleteShowtime = createAsyncThunk(
  "showtimes/deleteShowtime",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${host}/delete/${showtimeId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all Showtimes by Theatre
export const getAllShowtimesByTheatre = createAsyncThunk(
  "showtimes/getAllShowtimesByTheatre",
  async ({ theatreId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/showtime/${theatreId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all Showtimes by Theatre and Movie
export const getAllShowtimesByTheatreAndMovie = createAsyncThunk(
  "showtimes/getAllShowtimesByTheatreAndMovie",
  async ({ movieId, theatreId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${host}/showtime/${movieId}/${theatreId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const showtimeSlice = createSlice({
  name: "showtimes",
  initialState: {
    showtimes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Showtime
      .addCase(addShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes=action.payload;
      })
      .addCase(addShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Update Showtime
      .addCase(updateShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShowtime.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.showtimes.findIndex(
          (showtime) => showtime._id === action.payload.data._id
        );
        if (index !== -1) {
          state.showtimes[index] = action.payload.data;
        }
      })
      .addCase(updateShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Delete Showtime
      .addCase(deleteShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = state.showtimes.filter(
          (showtime) => showtime._id !== action.meta.arg
        );
      })
      .addCase(deleteShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Get All Showtimes by Theatre
      .addCase(getAllShowtimesByTheatre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShowtimesByTheatre.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = action.payload.data;
      })
      .addCase(getAllShowtimesByTheatre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All Showtimes by Theatre and Movie
      .addCase(getAllShowtimesByTheatreAndMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShowtimesByTheatreAndMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = action.payload.data; // Correct assignment
      })
      .addCase(getAllShowtimesByTheatreAndMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default showtimeSlice.reducer;
