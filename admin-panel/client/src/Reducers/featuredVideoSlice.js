import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createFeaturedVideo, updateFeaturedVideo, deleteFeaturedVideo, getFeaturedVideo } from '../api/api';

// ! Get posts
export const getfeaturedVideo = createAsyncThunk('featuredVideo/getFeaturedVideo', async () => {
  const response = await getFeaturedVideo();
  return response.data.posts;
});

// ! Add new video
export const addfeaturedVideo = createAsyncThunk('featuredVideo/addFeaturedVideo', async (URL) => {
  const response = await createFeaturedVideo(URL);
  return response.data;
});

// ! Update video
export const updatefeaturedVideo = createAsyncThunk('featuredVideo/updateFeaturedVideo', async ({ id, URL }) => {
  const response = await updateFeaturedVideo(id, { URL });
  return response.data;
});

// ! Remove video
export const removefeaturedVideo = createAsyncThunk('featuredVideo/removeFeaturedVideo', async (id) => {
  await deleteFeaturedVideo(id);
  return id;
});

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
      // Add video
      .addCase(addfeaturedVideo.fulfilled, (state, action) => {
        state.featuredVideo.push(action.payload);
      })
      // Update video
      .addCase(updatefeaturedVideo.fulfilled, (state, action) => {
        const index = state.featuredVideo.findIndex((video) => video._id === action.payload._id);
        if (index !== -1) {
          state.featuredVideo[index] = action.payload;
        }
      })
      // Remove video
      .addCase(removefeaturedVideo.fulfilled, (state, action) => {
        state.featuredVideo = state.featuredVideo.filter((video) => video._id !== action.payload);
      });
  },
});

export default featuredVideoSlice.reducer;
