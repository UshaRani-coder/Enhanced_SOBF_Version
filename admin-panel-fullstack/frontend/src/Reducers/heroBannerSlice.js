import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHeroBanner, createHeroBanner, updateHeroBanner } from "../api/api";
import axios from "axios";

const apiClient = axios.create({ baseURL: "https://backend.sobf.in" });
// const apiClient = axios.create({ baseURL: 'http://localhost:5000' })

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Get Hero Banners
export const getHeroBanners = createAsyncThunk(
  "heroBanner/getHeroBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHeroBanner();
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch hero banners");
    }
  }
);

// Add Hero Banner
export const addHeroBanner = createAsyncThunk(
  "heroBanner/addHeroBanner",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createHeroBanner(postData);
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create hero banner");
    }
  }
);

// Update Hero Banner
export const updateHeroBanners = createAsyncThunk(
  "heroBanner/updateHeroBanners",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateHeroBanner(id, updatedData);
      return response.data.updatedPost;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update hero banner");
    }
  }
);

// Remove Hero Banner
export const removeHeroBanner = createAsyncThunk(
  "heroBanner/removeHeroBanner",
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/api/post/delete-hero-banner/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete hero banner");
    }
  }
);

// Slice Definition
const heroBannerSlice = createSlice({
  name: "heroBanner",
  initialState: { heroBanner: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHeroBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHeroBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroBanner = action.payload;
      })
      .addCase(getHeroBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // add
      .addCase(addHeroBanner.fulfilled, (state, action) => {
        state.heroBanner.push(action.payload);
      })
      .addCase(addHeroBanner.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateHeroBanners.fulfilled, (state, action) => {
        const index = state.heroBanner.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.heroBanner[index] = action.payload;
        }
      })
      .addCase(updateHeroBanners.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeHeroBanner.fulfilled, (state, action) => {
        state.heroBanner = state.heroBanner.filter((post) => post._id !== action.payload);
      })
      .addCase(removeHeroBanner.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default heroBannerSlice.reducer;
