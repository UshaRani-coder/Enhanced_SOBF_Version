import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, createPost, deletePost, updatePostApi } from '../api/api'; // Ensure correct import for updatePostApi

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
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedData }) => {
  try {
    const response = await updatePostApi(id, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
}
);

// ! Remove post
export const removePost = createAsyncThunk('posts/removePost', async (id) => {
  await deletePost(id);
  return id;
});

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
      // Remove post
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
