// src/features/events/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for creating a new event
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/admin/newevent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


// slice for getting all the events 
export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/admin/postedevents");
      return response.data.events;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// slice for delete an event
export const deleteEventById = createAsyncThunk(
  'events/deleteEventById',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axios.delete(`http://localhost:5000/admin/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    event: null,
    events: [],
    message: "",
    loading: false, 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload.event;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.events = state.events.filter((event) => event._id !== action.payload.event._id);
      })
      .addCase(deleteEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventsSlice.reducer;
