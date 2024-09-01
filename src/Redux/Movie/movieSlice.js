import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BK_URI } from "../../constant";
import Cookies from "js-cookie";

const host = `${BK_URI}/movie`;
const token = Cookies.get("accessToken");
// Async Thunks for API Calls
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${host}/createmovie`, movieData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the header is set correctly for file uploads
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async ({ movieId, movieData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${host}/movies/up/${movieId}`,
        movieData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the header is set correctly for file uploads
            Authorization: `Bearer${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${host}/movies/d/${movieId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/movies/${movieId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAllMovies = createAsyncThunk(
  "movie/fetchAllMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial State
const initialState = {
  movies: [],
  currentMovie: null,
  status: "idle",
  error: null,
};

// Movie Slice
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload._id
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
