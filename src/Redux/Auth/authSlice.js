import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { BK_URI } from "../../constant";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};
const host = `${BK_URI}/auth`;

export const loginUser = createAsyncThunk(
  "/user/login",
  async ({ email, password }) => {
    const response = await axios.post(`${host}/user/login`, {
      email,
      password,
    });
    console.log("Response: ", response);
    Cookies.set("accessToken", response.data.data.token);
    Cookies.set("isLoggedIn", true);
    return response.data.data;
  }
);

export const registerUser = createAsyncThunk(
  "/user/register",
  async (formData) => {
    const response = await axios.post(`${host}/user/register`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data.data;
  }
);

export const createAdmin = createAsyncThunk(
  "auth/createAdmin", // Correct the name to match the state
  async ({ theatreId, adminData }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.post(
        `${host}/superAdmin/createAdmin/${theatreId}`,
        adminData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${token}`,
          },
        }
      );
      console.log("Admin Assigned", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error in Admin Creation:", error);
      return rejectWithValue(
        error.response.data.message || "Something went wrong"
      );
    }
  }
);

export const Logout = createAsyncThunk("/user/logout", async () => {
  const token = Cookies.get("accessToken");
  const response = await axios.post(
    `${host}/user/logout`,
    {},
    { withCredentials: true ,
      headers: {
        Authorization: `Bearer${token}`,
      },
    }
  );
  if (!response) {
    alert("Try again");
  }
  Cookies.remove("accessToken");
  Cookies.remove("isLoggedIn");

  return response.data;
});

export const Adminlogin = createAsyncThunk(
  "/admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${host}/admin/login`,
        { email, password },
      );

      Cookies.set("accessToken", response.data.data.token);
      Cookies.set("isLoggedIn", true);
      console.log("Logged In")
      return response.data.data; // Return the user data
    } catch (error) {
      console.error("Error in Admin Login:", error);
      return rejectWithValue(
        error.response.data.message || "Something went wrong"
      );
    }
  }
);

export const SuperAdminlogin = createAsyncThunk(
  "/superadmin/login",
  async ({ email, password }) => {
    const response = await axios.post(
      `${host}/superadmin/login`,
      {
        email,
        password,
      }
    );
    Cookies.set("accessToken", response.data.data.token);
    Cookies.set("isLoggedIn", true);
    console.log(response.data.data)
    return response.data.data;
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(Adminlogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Adminlogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(Adminlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(SuperAdminlogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SuperAdminlogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(SuperAdminlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(Logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
