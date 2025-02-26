import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById } from '../api/api';
import hardcodedPosts from '../defaultData/recent-activities.json';

// Get all posts
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPosts();
      if (
        !response ||
        response.status !== 200 ||
        !response.data?.posts?.length
      ) {
        return hardcodedPosts;
      }
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(hardcodedPosts);
    }
  },
);

// Get a single post by ID with fallback
export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPostById(id);
      if (!response || response.status !== 200 || !response.data?.post) {
        throw new Error('Post not found');
      }
      return response?.data?.post;
    } catch (error) {
      // If API fails, find the post in dummy data
      const fallbackPost = hardcodedPosts.find(
        (item) => String(item._id) === String(id),
      );
      if (fallbackPost) {
        return fallbackPost; // Return dummy data if available
      }
      return rejectWithValue('Post not found in both API and fallback data');
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: hardcodedPosts, // Initial fallback data
    post: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all posts
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.posts = hardcodedPosts; // Assign fallback data on rejection
      })

      // Get post by ID
      .addCase(getPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.post = null; // Ensure post is null if it doesn't exist
      });
  },
});

export default postSlice.reducer;
