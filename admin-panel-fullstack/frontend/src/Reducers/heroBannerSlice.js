import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeroBanner, createHeroBanner, updateHeroBanner } from '../api/api';
import axios from "axios"


const apiClient = axios.create({ baseURL: 'https://backend.sobf.in' }); 

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});







export const getHeroBanners = createAsyncThunk('heroBanner/getHeroBanners', async () => {
  const response = await getHeroBanner();
  return response.data.posts;
});

export const addHeroBanner = createAsyncThunk('heroBanner/addHeroBanner', async (postData) => {
  const response = await createHeroBanner(postData);
  return response.data;
});

export const updateHeroBanners = createAsyncThunk('heroBanner/updateHeroBanners', async ({ id, updatedData }) => {
  const response = await updateHeroBanner(id, updatedData);
  console.log("resposen data: " + response);
  
  return response.data;
});

export const removeHeroBanner = createAsyncThunk(
  'heroBanner/removeHeroBanner',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/api/post/delete-hero-banner/${id}`);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to delete hero banner");
      }
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);


const heroBannerSlice = createSlice({
  name: 'heroBanner',
  initialState: { heroBanner: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHeroBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHeroBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heroBanner = action.payload;
      })
      .addCase(getHeroBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addHeroBanner.fulfilled, (state, action) => {
        state.heroBanner.push(action.payload);
      })
      .addCase(updateHeroBanners.fulfilled, (state, action) => {
        const index = state.heroBanner.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.heroBanner[index] = action.payload;
        }
      })
      .addCase(removeHeroBanner.fulfilled, (state, action) => {
        state.heroBanner = state.heroBanner.filter((post) => post._id !== action.payload);
      });
  },
});

export default heroBannerSlice.reducer;
