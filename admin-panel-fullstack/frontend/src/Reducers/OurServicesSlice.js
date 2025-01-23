import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createOurServices, deleteOurServices, getOurServices, updateOurServices } from "../api/api";

// Axios Instance
const apiClient = axios.create({ baseURL: "https://backend.sobf.in" });
// const apiClient = axios.create({ baseURL: "http://localhost:5000" });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// Get Services
export const getServices = createAsyncThunk(
  "services/getServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurServices();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch services");
    }
  }
);

// Add Service
export const addService = createAsyncThunk(
  "services/addService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await createOurServices(serviceData);
      return response.data.service;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create service");
    }
  }
);

// Update Service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateOurServices(id , updatedData);
      return response.data.updatedService;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update service");
    }
  }
);

// Remove Service
export const removeService = createAsyncThunk(
  "services/removeService",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOurServices(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete service");
    }
  }
);

// Slice Definition
const servicesSlice = createSlice({
  name: "services",
  initialState: { services: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Services
      .addCase(getServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Service
      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update Service
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex((service) => service._id === action.payload._id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Remove Service
      .addCase(removeService.fulfilled, (state, action) => {
        state.services = state.services.filter((service) => service._id !== action.payload);
      })
      .addCase(removeService.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
