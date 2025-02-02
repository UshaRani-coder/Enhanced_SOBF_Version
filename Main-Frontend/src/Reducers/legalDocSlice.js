// Updated Slice for Legal Documents
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLegalDocs } from '../api/api';

// Async Thunks
export const getLegalDocuments = createAsyncThunk(
  'legalDocs/fetchLegalDocuments',
  async () => {
    const response = await getLegalDocs();
    return response?.data?.docs;
  },
);


// Slice
const legalDocSlice = createSlice({
  name: 'legalDocs',
  initialState: { legalDocs: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLegalDocuments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLegalDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.legalDocs = action.payload;
      })
      .addCase(getLegalDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  },
});

export default legalDocSlice.reducer;
