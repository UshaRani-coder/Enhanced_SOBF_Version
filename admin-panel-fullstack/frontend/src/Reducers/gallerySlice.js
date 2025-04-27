import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createGallery,
  deleteGallery,
  getGallery,
  updateGallery,
} from '../api/api';

// Fetch all gallery images
export const getGalleryImages = createAsyncThunk(
  'gallery/getGalleryImage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getGallery();
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch gallery images',
      );
    }
  },
);

// Add a new gallery image
export const addGallery = createAsyncThunk(
  'gallery/addGalleryImage',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createGallery(postData);
      console.log('response', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add gallery image',
      );
    }
  },
);

// Update a gallery image
export const updateGalleryImage = createAsyncThunk(
  'gallery/updateGalleryImages',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateGallery(id, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update gallery image',
      );
    }
  },
);

// Remove a gallery image
export const removeGallery = createAsyncThunk(
  'gallery/removeGalleryImage',
  async (id, { rejectWithValue }) => {
    try {
      await deleteGallery(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove gallery image',
      );
    }
  },
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: { gallery: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGalleryImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gallery = action.payload || []; // Ensure state is always an array
      })
      .addCase(getGalleryImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addGallery.fulfilled, (state, action) => {
        state.gallery.push(action.payload);
      })
      .addCase(addGallery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateGalleryImage.fulfilled, (state, action) => {
        const index = state.gallery.findIndex(
          (post) => post._id === action.payload._id,
        );
        if (index !== -1) {
          state.gallery[index] = action.payload;
        }
      })
      .addCase(updateGalleryImage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeGallery.fulfilled, (state, action) => {
        state.gallery = state.gallery.filter(
          (post) => post._id !== action.payload,
        );
      })
      .addCase(removeGallery.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;
