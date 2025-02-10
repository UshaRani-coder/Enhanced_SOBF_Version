import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../api/api';
import hardcodedPosts from "../defaultData/recent-activities.json"


export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPosts();
      if (!response || response.status !== 200 || !response.data?.posts) {
        return hardcodedPosts
      }
      return response?.data?.posts || hardcodedPosts;
    } catch (error) {
      return rejectWithValue(hardcodedPosts);
    }
  }
);

const postSlice = createSlice({
  // name: 'posts',
  name: hardcodedPosts,
  initialState: { posts: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get posts
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.posts = hardcodedPosts; // Assign fallback data on rejection
      });
  },
});

export default postSlice.reducer;