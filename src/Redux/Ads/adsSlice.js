// src/slices/adSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BK_URI, token } from '../../constant';

const host = `${BK_URI}/advertise`
// Define the initial state for ads
const initialState = {
  ads: [],
  adstatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  aderror: null,
};

// Define async thunks for API interactions
export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const response = await axios.get(`${host}/ad/fetch`,{withCredentials:true});
  console.log(response.data.data)
  return response.data.data; // Adjust based on your API response structure
});

export const addAd = createAsyncThunk('ads/addAd', async (adData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${host}/ad/add`, adData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer${token}`,
      }, // Use withCredentials for secure requests
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (adId, { rejectWithValue }) => {
  try {
    // eslint-disable-next-line
    const response = await axios.delete(`${host}/ad/delete/${adId}`, {
      withCredentials: true, // Use withCredentials for secure requests
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    return adId; // Return adId to remove from the store
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create the slice
const adSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.adstatus = 'loading';
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.adstatus = 'succeeded';
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.adstatus = 'failed';
        state.aderror = action.error.message;
      })
      .addCase(addAd.pending, (state) => {
        state.adstatus = 'loading';
      })
      .addCase(addAd.fulfilled, (state, action) => {
        state.adstatus = 'succeeded';
        state.ads.push(action.payload);
      })
      .addCase(addAd.rejected, (state, action) => {
        state.adstatus = 'failed';
        state.aderror = action.payload?.message || action.error.message;
      })
      .addCase(deleteAd.pending, (state) => {
        state.adstatus = 'loading';
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.adstatus = 'succeeded';
        state.ads = state.ads.filter(ad => ad._id !== action.payload);
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.adstatus = 'failed';
        state.aderror = action.payload?.message || action.error.message;
      });
  },
});

// Export actions and reducer
export default adSlice.reducer;
