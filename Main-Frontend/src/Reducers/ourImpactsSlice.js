import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOurImpacts, updateOurImpacts, deleteOurImpacts, getOurImpacts } from '../api/api';




export const getOurImpact = createAsyncThunk('ourImpacts/getOurImpacts', async () => {
  const response = await getOurImpacts();
  return response.data.posts;
});

export const addOurImpact = createAsyncThunk('ourImpacts/addOurImpacts', async (postData) => {
  const response = await createOurImpacts(postData);
  return response.data;
});

export const updateOurImpact = createAsyncThunk(
  'ourImpacts/updateOurImpact',
  async ({ id, updatedData }) => {
    const response = await updateOurImpacts(id, updatedData);
    return response.data;
  }
);

export const removeOurImpact = createAsyncThunk('ourImpacts/removeOurImpacts', async (id) => {
  await deleteOurImpacts(id);
  return id;
});

const ourImpactSlice = createSlice({
  name: 'ourImpacts',
  initialState: { ourImpacts: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOurImpact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOurImpact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ourImpacts = action.payload;
      })
      .addCase(getOurImpact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addOurImpact.fulfilled, (state, action) => {
        state.ourImpacts.push(action.payload);
      })
      .addCase(updateOurImpact.fulfilled, (state, action) => {
        const index = state.ourImpacts.findIndex((impact) => impact._id === action.payload._id);
        if (index !== -1) state.ourImpacts[index] = action.payload;
      })
      .addCase(removeOurImpact.fulfilled, (state, action) => {
        state.ourImpacts = state.ourImpacts.filter((impact) => impact._id !== action.payload);
      });
  },
});

export default ourImpactSlice.reducer;
