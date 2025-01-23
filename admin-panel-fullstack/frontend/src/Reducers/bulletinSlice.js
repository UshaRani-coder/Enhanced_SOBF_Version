import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateNewsPostsApi, deleteNewsPosts, fetchNewsPosts, createNewsPosts } from '../api/api';

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
    return rejectWithValue(error.response?.data?.message || "Failed to update bulletin");
  }
});

// ! Remove post
export const removeBulletine = createAsyncThunk('bulletines/removeBulletine', async (id, { rejectWithValue }) => {
  try {
    await deleteNewsPosts(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete bulletin");
  }
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
      .addCase(addBulletine.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update post
      .addCase(updateBulletine.fulfilled, (state, action) => {
        const index = state.bulletines.findIndex((bulletin) => bulletin._id === action.payload._id);
        if (index !== -1) {
          state.bulletines[index] = action.payload;
        }
      })
      .addCase(updateBulletine.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Remove post
      .addCase(removeBulletine.fulfilled, (state, action) => {
        state.bulletines = state.bulletines.filter((bulletin) => bulletin._id !== action.payload);
      })
      .addCase(removeBulletine.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default bulletinSlice.reducer;
