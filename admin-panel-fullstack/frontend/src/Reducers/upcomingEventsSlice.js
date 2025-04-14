import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../api/api';
import axios from 'axios';

//! Get Events
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

//! Add Event
export const createEventPost = createAsyncThunk(
  'events/addEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await createEvent(eventData);
      return response?.data?.event;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create event'
      );
    }
  }
);

//! Update Event
export const updateEventPost = createAsyncThunk(
  'events/updateEvent',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateEvent(id, updatedData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update event'
      );
    }
  }
);

//! Update Event Status
export const updateEventStatus = createAsyncThunk(
  'events/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/post/update-event-status/${id}`,
        { status }
      );

      if (!response.data) {
        throw new Error("Invalid response from API");
      }

      return response.data;
    } catch (error) {
      console.error("Error updating event status:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update event status'
      );
    }
  }
);

//! Remove Event
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
      .addCase(createEventPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.events.push(action.payload);
        }
      })
      .addCase(createEventPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateEventPost.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.events.findIndex(
            (event) => event._id === action.payload._id
          );
          if (index !== -1) {
            state.events[index] = { ...state.events[index], ...action.payload };
          }
        }
      })
      .addCase(updateEventStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.events.findIndex(
            (event) => event._id === action.payload._id
          );
          if (index !== -1) {
            state.events[index].status = action.payload.status;
          }
        }
      })
      .addCase(updateEventStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default upcomingEventsSlice.reducer;