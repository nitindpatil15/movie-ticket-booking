import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BK_URI, token } from "../../constant";

// Async Thunks for API Calls
const host = `${BK_URI}/users`;

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/user/all`, {
        withCredentials: true,
        headers: { Authorization: `Bearer${token}` },
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${host}/user/current`, {
        withCredentials: true,
        headers: { Authorization: `Bearer${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${host}/user/update/${userId}`,
        userData, // Pass userData directly here
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Correct header for FormData
            Authorization: `Bearer${token}`,
          },
        }
      );
      console.log("Updated", response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${host}/user/delete/${userId}`, {
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
  users: [],
  currentUser: null,
  userstatus: "idle",
  updatestatus: "idle",
  usererror: null,
};

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.userstatus = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.userstatus = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.userstatus = "failed";
        state.usererror = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.userstatus = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userstatus = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.userstatus = "failed";
        state.usererror = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.userstatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatestatus = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatestatus = "failed";
        state.usererror = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.userstatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userstatus = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userstatus = "failed";
        state.usererror = action.payload;
      });
  },
});

export default userSlice.reducer;
