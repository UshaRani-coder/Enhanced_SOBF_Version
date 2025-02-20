import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsPosts } from '../api/api';
import hardcodedBulletins from "../defaultData/newsbulletine.json"


// ! Get bulletins
export const getBulletine = createAsyncThunk(
  'bulletines/getBulletine',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNewsPosts();
      if (!response || response.status !== 200 || !response.data?.posts) {
        return hardcodedBulletins
      }
     
      
      return response?.data?.posts || hardcodedBulletins;
    } catch (error) {
      return rejectWithValue(hardcodedBulletins);
    }
  }
);

const bulletinSlice = createSlice({
  name: hardcodedBulletins, // Show fallback data immediately
  // name: 'bulletines',
  initialState: { bulletines: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get bulletins
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
        state.bulletines = hardcodedBulletins; // Assign fallback data on failure
      });
  },
});

export default bulletinSlice.reducer;