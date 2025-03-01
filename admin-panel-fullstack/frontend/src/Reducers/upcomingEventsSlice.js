import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../api/api';

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

// Add Event
export const createEventPost = createAsyncThunk(
  'events/addEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await createEvent(eventData);
      if (response?.data?.event) {
        return response.data.event;
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create event'
      );
    }
  }
);

// Update Event
export const updateEventPost = createAsyncThunk(
  'events/editEvent',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateEvent(id, updatedData);
      if (response?.data?.updatedEvent) {
        return response.data.updatedEvent;
      } else {
        throw new Error("No updated event returned from API");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update event'
      );
    }
  }
);

// Remove Event
export const removeEvent = createAsyncThunk(
  'events/removeEvent',
  async (id, { rejectWithValue }) => {
    try {
      await deleteEvent(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete event'
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
      // Get Events
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
      // Add Event
      .addCase(createEventPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.events.push(action.payload);
        }
      })
      .addCase(createEventPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update Event
      .addCase(updateEventPost.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.events.findIndex(
            (event) => event._id === action.payload._id
          );
          if (index !== -1) {
            state.events[index] = action.payload;
          }
        }
      })
      .addCase(updateEventPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Remove Event
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default upcomingEventsSlice.reducer;
