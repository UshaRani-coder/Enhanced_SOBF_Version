import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents, fetchEventPostById } from '../api/api';

// Get Events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEvents();
      if (!response || !response.data?.posts) {
        throw new Error("No data received from API");
      }
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch events'
      );
    }
  }
);

// Get a specific event by ID
export const getSpecificEvent = createAsyncThunk(
  'events/getSpecificEvent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchEventPostById(id);
      // console.log("response?.data?.post", response?.data?.post);
      
      if (!response || response.status !== 200 || !response?.data?.post) {
        throw new Error('Event not found');
      }
      return response?.data?.post;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch event');
    }
  }
);

// Slice Definition
const upcomingEventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    post: null,
    status: 'idle',
    error: null
  },
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
      .addCase(getSpecificEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSpecificEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload;
      })
      .addCase(getSpecificEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.post = null;
      });
  },
});

export default upcomingEventsSlice.reducer;