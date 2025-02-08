import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeroBanner } from '../api/api';
import hardcodedHeroBanners from "../defaultData/hero-banner.json"

// ! Get Hero Banners
export const getHeroBanners = createAsyncThunk(
  'heroBanner/getHeroBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHeroBanner();
      return response?.data?.banners || hardcodedHeroBanners ;
    } catch (error) {
      return rejectWithValue(hardcodedHeroBanners); // Return fallback data on failure
    }
  }
);

const heroBannerSlice = createSlice({
  // name: 'heroBanner',
  name: hardcodedHeroBanners,
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
        state.error = action.error?.message;
        state.heroBanner = hardcodedHeroBanners;
      });
  },
});

export default heroBannerSlice.reducer;