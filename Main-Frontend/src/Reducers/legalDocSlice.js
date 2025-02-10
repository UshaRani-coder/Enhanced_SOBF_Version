// Updated Slice for Legal Documents
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLegalDocs } from '../api/api';
import fallbackLegalDocs from "../defaultData/legal-doc.json"


// Async Thunk: Fetch Legal Documents
export const getLegalDocuments = createAsyncThunk(
  'legalDocs/fetchLegalDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLegalDocs();
      if (!response || response.status !== 200 || !response.data?.docs) {
        return fallbackLegalDocs
      }
      return response?.data?.docs || fallbackLegalDocs; // Use API data or fallback
    } catch (error) {
      return rejectWithValue(fallbackLegalDocs); // Use fallback data if API fails
    }
  }
);

// Legal Documents Slice
const legalDocSlice = createSlice({
  name: 'legalDocs',
  initialState: {
    legalDocs: fallbackLegalDocs, // Show fallback data initially
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLegalDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLegalDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.legalDocs = action.payload; // Replace fallback data with API data
      })
      .addCase(getLegalDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.legalDocs = fallbackLegalDocs // Use fallback data if API fails
      });
  }
});

export default legalDocSlice.reducer;