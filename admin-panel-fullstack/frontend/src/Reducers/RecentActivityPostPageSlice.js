import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, createPost, deletePost, updatePostApi } from '../api/api';

// ! Get posts
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetchPosts();
  return response.data.posts;
});

// ! Add new post
export const addPost = createAsyncThunk('posts/addPost', async (postData) => {
  const response = await createPost(postData);
  return response.data;
});

// ! Update post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, updatedData }) => {
    try {
      const response = await updatePostApi(id, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

// ! Remove post
export const removePost = createAsyncThunk(
  'posts/removePost',
  async (id, { rejectWithValue }) => {
    try {
      await deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete hero banner',
      );
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
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
      })
      // Add post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // update
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id,
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Remove post
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
