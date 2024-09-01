import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BK_URI } from "../../constant";
import Cookies from "js-cookie";

const host = `${BK_URI}/theatres`;
const token = Cookies.get("accessToken");
// Async Thunks for API Calls
export const createtheater = createAsyncThunk(
  "theater/createtheater",
  async (theaterData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${host}/addtheatre`, theaterData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatetheater = createAsyncThunk(
  "theater/updatetheater",
  async ({ theaterId, theaterData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${host}/update/${theaterId}`,
        theaterData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
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

export const deletetheater = createAsyncThunk(
  "/deletetheater",
  async (theaterId, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line
      const response = await axios.delete(`${host}/delete/${theaterId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer${token}` },
      });
      return theaterId;
    } catch (error) {
      alert("UnAuthorize Error");
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchtheaterById = createAsyncThunk(
  "theater/getbyId",
  async (theaterId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/gettheatre/${theaterId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer${token}` },
      });
      return response.data.data; // Ensure this matches your API response
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchtheaterByMovie = createAsyncThunk(
  "theater/getbyMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/getalltheatre/${movieId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchAlltheater = createAsyncThunk(
  "theatrte/fetchAlltheater",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/getalltheatre`, {
        withCredentials: true,
        headers: { Authorization: `Bearer${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AssignMovie = createAsyncThunk(
  "theater/assignMovie",
  async ({ theaterId, movieId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${host}/assign-theatre/${theaterId}`,
        { movieId },
        { withCredentials: true, headers: { Authorization: `Bearer${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Initial State
const initialState = {
  theaters: [],
  currenttheater: [], // Changed from null to an empty array
  assignMovieStatus: "idle",
  assignMovieError: null,
  theaterstatus: "idle",
  theatererror: null,
};

// Movie Slice
const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createtheater.pending, (state) => {
        state.theaterstatus = "loading";
      })
      .addCase(createtheater.fulfilled, (state, action) => {
        state.theaterstatus = "succeeded";
        state.theaters.push(action.payload); // Add new theater to the list
      })
      .addCase(createtheater.rejected, (state, action) => {
        state.theaterstatus = "failed";
        state.theatererror = action.payload;
      })
      .addCase(updatetheater.pending, (state) => {
        state.theaterstatus = "loading";
      })
      .addCase(updatetheater.fulfilled, (state, action) => {
        state.theaterstatus = "succeeded";
        state.theaters = state.theaters.map((theater) =>
          theater._id === action.payload._id ? action.payload : theater
        );
      })
      .addCase(updatetheater.rejected, (state, action) => {
        state.theaterstatus = "failed";
        state.theatererror = action.payload;
      })
      .addCase(deletetheater.pending, (state) => {
        state.theaterstatus = "loading";
      })
      .addCase(deletetheater.fulfilled, (state, action) => {
        state.theaterstatus = "succeeded";
        state.theaters = state.theaters.filter(
          (theater) => theater._id !== action.payload
        );
      })
      .addCase(deletetheater.rejected, (state, action) => {
        state.theaterstatus = "failed";
        state.theatererror = action.payload;
      })
      .addCase(fetchAlltheater.pending, (state) => {
        state.theaterstatus = "loading";
      })
      .addCase(fetchAlltheater.fulfilled, (state, action) => {
        state.theaterstatus = "succeeded";
        state.theaters = action.payload;
      })
      .addCase(fetchAlltheater.rejected, (state, action) => {
        state.theaterstatus = "failed";
        state.theatererror = action.error.message;
      })
      .addCase(fetchtheaterByMovie.pending, (state) => {
        state.theaterstatus = "loading";
      })
      .addCase(fetchtheaterByMovie.fulfilled, (state, action) => {
        state.theaterstatus = "succeeded";
        state.theaters = action.payload;
      })
      .addCase(fetchtheaterByMovie.rejected, (state, action) => {
        state.theaterstatus = "failed";
        state.theatererror = action.payload;
      })
      .addCase(fetchtheaterById.pending, (state) => {
        state.theaterstatus = "loading";
      })
      .addCase(fetchtheaterById.fulfilled, (state, action) => {
        state.theaterstatus = "succeeded";
        state.currenttheater = action.payload;
      })
      .addCase(fetchtheaterById.rejected, (state, action) => {
        state.theaterstatus = "failed";
        state.theatererror = action.payload;
      })
      .addCase(AssignMovie.pending, (state) => {
        state.assignMovieStatus = "loading";
      })
      .addCase(AssignMovie.fulfilled, (state, action) => {
        state.assignMovieStatus = "succeeded";
        state.currenttheater = action.payload; // Update the current theater with assigned movies
      })
      .addCase(AssignMovie.rejected, (state, action) => {
        state.assignMovieStatus = "failed";
        state.assignMovieError = action.payload;
      });
  },
});

export default theaterSlice.reducer;
