import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLegalDocs, createLegalDocs, updateLegalDocs, deleteLegalDocs } from '../api/api';

// Async Thunks
export const getLegalDocuments = createAsyncThunk(
  'legalDocs/fetchLegalDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLegalDocs();
      if (!response.data || !response.data.posts) {
        throw new Error('Invalid data received from server.');
      }
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addLegalDocument = createAsyncThunk(
  'legalDocs/addLegalDocument',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createLegalDocs(postData);
      return response.data.legalDoc;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateLegalDocumentById = createAsyncThunk(
  'legalDocs/updateLegalDocument',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateLegalDocs(id, updatedData);
      return response.data.updatedDoc;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update legal documents");
    }
  }
);

export const removeLegalDocument = createAsyncThunk(
  'legalDocs/removeLegalDocument',
  async (id, { rejectWithValue }) => {
    try {
      await deleteLegalDocs(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
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
        state.error = null;
      })
      .addCase(getLegalDocuments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.legalDocs = action.payload;
      })
      .addCase(getLegalDocuments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addLegalDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addLegalDocument.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.legalDocs.push(action.payload);
      })
      .addCase(addLegalDocument.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateLegalDocumentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateLegalDocumentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.legalDocs.findIndex((doc) => doc._id === action.payload._id);
        if (index !== -1) {
          state.legalDocs[index] = action.payload;
        }
      })
      .addCase(updateLegalDocumentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeLegalDocument.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeLegalDocument.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.legalDocs = state.legalDocs.filter((doc) => doc._id !== action.payload);
      })
      .addCase(removeLegalDocument.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default legalDocSlice.reducer;
