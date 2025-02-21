import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedVideo } from '../api/api';

// ! Get posts
export const getfeaturedVideo = createAsyncThunk(
  'featuredVideo/getFeaturedVideo',
  async () => {
    const response = await getFeaturedVideo();
    return response?.data?.posts;
  },
);

const featuredVideoSlice = createSlice({
  name: 'featuredVideo',
  initialState: { featuredVideo: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get posts
      .addCase(getfeaturedVideo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getfeaturedVideo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.featuredVideo = action.payload;
      })
      .addCase(getfeaturedVideo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default featuredVideoSlice.reducer;
