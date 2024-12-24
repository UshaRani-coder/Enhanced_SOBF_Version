import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {updateNewsPostsApi, deleteNewsPosts, fetchNewsPosts, createNewsPosts } from '../api/api';

// ! Get posts
export const getBulletine = createAsyncThunk('bulletines/getBulletine', async () => {
  const response = await fetchNewsPosts();
  return response.data.posts;
});

// ! Add new post
export const addBulletine = createAsyncThunk('bulletines/addBulletine', async (postData) => {
  const response = await createNewsPosts(postData);
  return response.data;
});

// ! Update post
export const updateBulletine = createAsyncThunk('bulletines/updatePost', async ({ id, updatedData }) => {
    try {
      const response = await updateNewsPostsApi(id, updatedData);
      return response.data; 
    } catch (error) {
      throw error; 
    }
  }
);

// ! Remove post
export const removeBulletine = createAsyncThunk('bulletines/removeBulletine', async (id) => {
  await deleteNewsPosts(id);
  return id;
});

const bulletinSlice = createSlice({
  name: 'bulletines',
  initialState: { bulletines: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get posts
      .addCase(getBulletine.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBulletine.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bulletines = action.payload;
      })
      .addCase(getBulletine.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add post
      .addCase(addBulletine.fulfilled, (state, action) => {
        state.bulletines.push(action.payload);
      })
      // Remove post
      .addCase(removeBulletine.fulfilled, (state, action) => {
        state.bulletines = state.bulletines.filter((post) => post._id !== action.payload);
      });
  },
});

export default bulletinSlice.reducer;
