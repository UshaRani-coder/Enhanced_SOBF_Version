import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOurImpacts,
  updateOurImpacts,
  deleteOurImpacts,
  getOurImpacts,
} from '../api/api';

// Thunks

export const getOurImpact = createAsyncThunk(
  'ourImpacts/getOurImpacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurImpacts();
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch impacts',
      );
    }
  },
);

// Add Hero Banner
export const addOurImpact = createAsyncThunk(
  'ourImpacts/addOurImpact',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createOurImpacts(postData);
      return response.data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add impact',
      );
    }
  },
);

export const updateOurImpact = createAsyncThunk(
  'ourImpacts/updateOurImpact',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateOurImpacts(id, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update impact',
      );
    }
  },
);

export const removeOurImpact = createAsyncThunk(
  'ourImpacts/removeOurImpact',
  async (id, { rejectWithValue }) => {
    try {
      await deleteOurImpacts(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete impact',
      );
    }
  },
);

// Slice
const ourImpactSlice = createSlice({
  name: 'ourImpacts',
  initialState: {
    ourImpacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Our Impacts
      .addCase(getOurImpact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOurImpact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ourImpacts = action.payload;
      })
      .addCase(getOurImpact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add Impact
      .addCase(addOurImpact.fulfilled, (state, action) => {
        state.ourImpacts.push(action.payload);
      })
      .addCase(addOurImpact.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Impact
      .addCase(updateOurImpact.fulfilled, (state, action) => {
        const index = state.ourImpacts.findIndex(
          (impact) => impact._id === action.payload._id,
        );
        if (index !== -1) state.ourImpacts[index] = action.payload;
      })
      .addCase(updateOurImpact.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Impact
      .addCase(removeOurImpact.fulfilled, (state, action) => {
        state.ourImpacts = state.ourImpacts.filter(
          (impact) => impact._id !== action.payload,
        );
      })
      .addCase(removeOurImpact.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ourImpactSlice.reducer;
