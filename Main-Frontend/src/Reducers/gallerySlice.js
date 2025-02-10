import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGallery } from '../api/api';
import fallbackGallery from "../defaultData/gallery.json"


// ! Fetch Gallery Images
export const getGalleryImages = createAsyncThunk(
  'gallery/getGalleryImage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getGallery();
      if (!response || response.status !== 200 || !response.data?.posts) {
        return fallbackGallery
      }
      return response?.data?.posts || fallbackGallery; // Use API data or fallback
    } catch (error) {
      return rejectWithValue(fallbackGallery); // Use fallback data if API fails
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    gallery: fallbackGallery, // Show fallback data immediately
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryImages.pending, (state) => {
        state.status = 'loading'; // Keep existing data but show loading state
      })
      .addCase(getGalleryImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gallery = action.payload; // Replace fallback with actual data
      })
      .addCase(getGalleryImages.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = 'Failed to fetch gallery. Showing fallback images.';
        state.gallery = fallbackGallery; // Use fallback data if API fails
      });
  }
});

export default gallerySlice.reducer;
