import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsPosts, fetchNewsPostById } from '../api/api';
import hardcodedBulletins from '../defaultData/newsbulletine.json';

// ! Get all bulletins
export const getBulletine = createAsyncThunk(
  'bulletines/getBulletine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNewsPosts();
      if (!response || response.status !== 200 || !response.data?.posts?.length) {
        return hardcodedBulletins; // Fallback when API fails
      }
      return response?.data?.posts;
    } catch (error) {
      return rejectWithValue(hardcodedBulletins); // Return fallback data on failure
    }
  }
);

// ! Get a specific bulletin by ID
export const getSpecificBulletine = createAsyncThunk(
  'bulletines/getSpecificBulletine',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchNewsPostById(id);
      if (!response || response.status !== 200 || !response.data) {
        throw new Error('Bulletin not found');
      }
      return response?.data?.post;
    } catch (error) {
      // If API fails, find the post in dummy data
      const fallbackPost = hardcodedBulletins.find((item) => String(item._id) === String(id));
      if (fallbackPost) {
        return fallbackPost; // Return dummy data if available
      }
      return rejectWithValue('Post not found in both API and fallback data');
    }
  }
);

const bulletinSlice = createSlice({
  name: 'bulletines',
  initialState: {
    bulletines: hardcodedBulletins, // ✅ Set fallback data initially
    specificBulletine: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBulletine.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBulletine.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bulletines = action.payload;
      })
      .addCase(getBulletine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.bulletines = hardcodedBulletins;
      })
      .addCase(getSpecificBulletine.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSpecificBulletine.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.specificBulletine = action.payload;
      })
      .addCase(getSpecificBulletine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default bulletinSlice.reducer;
