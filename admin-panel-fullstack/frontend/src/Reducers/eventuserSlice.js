import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEventUsers } from "../api/api"

export const getEventsUsersFromDB = createAsyncThunk(
  'eventUser/getEventsUserData', // Unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEventUsers();
      return response?.data?.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const eventUserSlice = createSlice({
  name: 'eventUser',
  initialState: { eventUser: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsUsersFromDB.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEventsUsersFromDB.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventUser = action.payload;
      })
      .addCase(getEventsUsersFromDB.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
});

export default eventUserSlice.reducer;
