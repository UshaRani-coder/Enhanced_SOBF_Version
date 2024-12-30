// Updated Slice for Legal Documents
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  getLegalDocs, createLegalDocs, updateLegalDocs, deleteLegalDocs, } from '../api/api';

// Async Thunks
export const getLegalDocuments = createAsyncThunk(
  'legalDocs/fetchLegalDocuments',
  async () => {
    const response = await getLegalDocs();
    return response.data.posts;
  }
);

export const addLegalDocument = createAsyncThunk(
  'legalDocs/addLegalDocument',
  async (postData) => {
    const response = await createLegalDocs(postData);
    return response.data.post;
  }
);

export const updateLegalDocumentById = createAsyncThunk(
  'legalDocs/updateLegalDocument',
  async ({ id, updatedData }) => {
    const response = await updateLegalDocs(id, updatedData);
    return response.data.updatedPost;
  }
);

export const removeLegalDocument = createAsyncThunk(
  'legalDocs/removeLegalDocument',
  async (id) => {
    await deleteLegalDocs(id);
    return id;
  }
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
      .addCase(addLegalDocument.fulfilled, (state, action) => {
        state.legalDocs.push(action.payload);
      })
      .addCase(updateLegalDocumentById.fulfilled, (state, action) => {
        const index = state.legalDocs.findIndex((doc) => doc._id === action.payload._id);
        if (index !== -1) state.legalDocs[index] = action.payload;
      })
      .addCase(removeLegalDocument.fulfilled, (state, action) => {
        state.legalDocs = state.legalDocs.filter((doc) => doc._id !== action.payload);
      });
  },
});

export default legalDocSlice.reducer;



