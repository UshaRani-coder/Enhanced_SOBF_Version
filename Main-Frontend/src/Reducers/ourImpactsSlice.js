import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOurImpacts } from '../api/api';
import hardcodedImpacts from "../defaultData/our-impacts.json"


export const getOurImpact = createAsyncThunk(
  'ourImpacts/getOurImpacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOurImpacts();
      if (!response || response.status !== 200 || !response.data?.posts) {
        return hardcodedImpacts
      }
      return response?.data?.posts || hardcodedImpacts;
    } catch (error) {
      return rejectWithValue(hardcodedImpacts);
    }
  }
);

const ourImpactSlice = createSlice({
  // name: 'ourImpacts',
  name: hardcodedImpacts,
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
        state.ourImpacts = hardcodedImpacts; // Assign hardcoded data on rejection
      });
  }
});

export default ourImpactSlice.reducer;