import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents } from '../api/api';




// Get Events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEvents();
      if (!response || !response.data?.posts) {
        throw new Error("No data received from API");
      }
      return response.data.posts; // Ensure correct data structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch events'
      );
    }
  }
);





// Slice Definition
const upcomingEventsSlice = createSlice({
  name: 'events',
  initialState: { events: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default upcomingEventsSlice.reducer;
