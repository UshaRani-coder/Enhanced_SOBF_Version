import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createGallery, deleteGallery, getGallery, updateGallery } from '../api/api';


export const getGalleryImages = createAsyncThunk('gallery/getGalleryImage', async () => {
  const response = await getGallery();
  return response.data.posts;
});

export const addGallery = createAsyncThunk('gallery/addGalleryImage', async (postData) => {
  const response = await createGallery(postData);
  return response.data;
});

export const updateGalleryImage = createAsyncThunk('gallery/updateGalleryImages', async ({ id, updatedData }) => {
  const response = await updateGallery(id, updatedData);
  return response.data;
});

export const removeGallery = createAsyncThunk('gallery/removeGalleryImage', async (id) => {
  await deleteGallery(id);
  return id;
});

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
        state.gallery = action.payload;
      })
      .addCase(getGalleryImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addGallery.fulfilled, (state, action) => {
        state.gallery.push(action.payload);
      })
      .addCase(updateGalleryImage.fulfilled, (state, action) => {
        const index = state.gallery.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.gallery[index] = action.payload;
        }
      })
      .addCase(removeGallery.fulfilled, (state, action) => {
        state.gallery = state.gallery.filter((post) => post._id !== action.payload);
      });
  },
});

export default gallerySlice.reducer;
