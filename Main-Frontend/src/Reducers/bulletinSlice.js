import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsPosts } from '../api/api';
import hardcodedBulletins from '../defaultData/newsbulletine.json';

// ! Get bulletins
export const getBulletine = createAsyncThunk(
  'bulletines/getBulletine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNewsPosts();
      if (!response || response.status !== 200 || !response.data?.posts?.length) {
        return hardcodedBulletins; // Fallback when API fails
      }
      console.log('response?.data?.posts', response?.data?.posts);
      return response?.data?.posts;
    } catch (error) {
      return rejectWithValue(hardcodedBulletins); // Return fallback data on failure
    }
  }
);

const bulletinSlice = createSlice({
  name: 'bulletines', // ✅ Correct slice name
  initialState: {
    bulletines: hardcodedBulletins, // ✅ Set fallback data initially
    status: 'idle',
    error: null
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
        state.error = action.error?.message;
        state.bulletines = hardcodedBulletins; // ✅ Ensure fallback data is assigned
      });
  },
});

export default bulletinSlice.reducer;
