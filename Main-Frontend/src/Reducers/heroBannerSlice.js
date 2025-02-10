import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeroBanner } from '../api/api';
import hardcodedHeroBanners from "../defaultData/hero-banner.json";

// ! Get Hero Banners
export const getHeroBanners = createAsyncThunk(
  'heroBanner/getHeroBanners',
  async () => {
    try {
      const response = await getHeroBanner();

      // If response is not valid or status is not 200, return hardcoded data
      if (!response || response.status !== 200 || !response.data?.banners) {
        return hardcodedHeroBanners;
      }

      return response.data.banners;
    } catch {
      return hardcodedHeroBanners; // Return fallback data on any error
    }
  }
);

const heroBannerSlice = createSlice({
  name: "heroBanner",
  initialState: { heroBanner: hardcodedHeroBanners, status: 'idle' },
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
        state.gallery = hardcodedHeroBanners; // Use fallback data if API fails
      });
  },
});

export default heroBannerSlice.reducer;
