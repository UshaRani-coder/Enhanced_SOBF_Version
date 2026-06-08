import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../api/api';

// Fetch Events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEvents();

      if (!response?.data?.posts) {
        throw new Error('No data received from API');
      }

      return response.data.posts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch events'
      );
    }
  }
);

// Create Event
export const createEventPost = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await createEvent(eventData);

      return response.data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to create event'
      );
    }
  }
);

// Update Event
export const updateEventPost = createAsyncThunk(
  'events/updateEvent',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateEvent(id, updatedData);

      return response.data.updatedPost;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to update event'
      );
    }
  }
);

// Delete Event
export const removeEvent = createAsyncThunk(
  'events/removeEvent',
  async (id, { rejectWithValue }) => {
    try {
      await deleteEvent(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete event'
      );
    }
  }
);

const upcomingEventsSlice = createSlice({
  name: 'events',

  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH EVENTS
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

      // CREATE EVENT
      .addCase(createEventPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEventPost.fulfilled, (state, action) => {
        state.status = 'succeeded';

        if (action.payload) {
          state.events.push(action.payload);
        }
      })
      .addCase(createEventPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // UPDATE EVENT
      .addCase(updateEventPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEventPost.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );

        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEventPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // DELETE EVENT
      .addCase(removeEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default upcomingEventsSlice.reducer;