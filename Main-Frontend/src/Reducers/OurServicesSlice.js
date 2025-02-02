import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createOurServices, deleteOurServices, getOurServices, updateOurServices } from '../api/api';


// Axios Instance
const apiClient = axios.create({ baseURL: "https://backend.sobf.in" });
// const apiClient = axios.create({ baseURL: 'http://localhost:5000' });


// Get Services
export const getServices = createAsyncThunk(
  'services/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurServices();
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch services',
      );
    }
  },
);


// Slice Definition
const servicesSlice = createSlice({
  name: 'services',
  initialState: { services: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Services
      .addCase(getServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
});

export default servicesSlice.reducer;
