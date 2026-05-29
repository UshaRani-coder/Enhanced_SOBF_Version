import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOurServices,
  deleteOurServices,
  getOurServices,
  updateOurServices,
} from '../api/api';

// GET SERVICES
export const getServices = createAsyncThunk(
  'services/getServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurServices();
      return response.data.services; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch services'
      );
    }
  }
);

// ADD SERVICE
export const addService = createAsyncThunk(
  'services/addService',
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await createOurServices(serviceData);
      return response.data.service;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create service'
      );
    }
  }
);

// UPDATE SERVICE
export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateOurServices(id, updatedData);
      return response.data.service; // ✅ FIX (backend usually returns "service")
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update service'
      );
    }
  }
);

// REMOVE SERVICE
export const removeService = createAsyncThunk(
  'services/removeService',
  async (id, { rejectWithValue }) => {
    try {
      await deleteOurServices(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete service'
      );
    }
  }
);

// SLICE
const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.services = [];
      })

      // ADD
      .addCase(addService.fulfilled, (state, action) => {
        if (action.payload) {
          state.services.push(action.payload);
        }
      })

      // UPDATE
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })

      // DELETE
      .addCase(removeService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (s) => s._id !== action.payload
        );
      });
  },
});

export default servicesSlice.reducer;