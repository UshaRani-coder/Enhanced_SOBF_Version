import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOurImpacts } from '../api/api';

export const getOurImpact = createAsyncThunk(
  'ourImpacts/getOurImpacts',
  async () => {
    const response = await getOurImpacts();
    return response.data.posts;
  },
);


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
  },
});

export default ourImpactSlice.reducer;
