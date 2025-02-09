import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOurServices } from "../api/api";
import hardcodedServices from "../defaultData/ourServices.json"


// Async thunk to fetch services
export const getServices = createAsyncThunk(
  'services/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurServices();
      return response?.data || hardcodedServices;
    } catch (error) {
      return rejectWithValue(hardcodedServices);
    }
  }
);

const servicesSlice = createSlice({
  // name: 'services',
  name: hardcodedServices,
  initialState: { services: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.services = hardcodedServices; // Set hardcoded data on failure
      });
  },
});

export default servicesSlice.reducer;