import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND;

// Async thunk to fetch chat groups the user is joined in
export const getUserChatGroups = createAsyncThunk(
  "chatGroups/getUserChatGroups",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/user/user-chat-groups`, {
        params: { userId }
      });
      return response.data.chatGroups;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ( chatGroupId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/user/messages/${chatGroupId}`, 
      );
      console.log("hel");
      return response.data.messages;
     
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const chatGroupsSlice = createSlice({
  name: "chatGroups",
  initialState: {
    chatGroups: [],
    loading: false,
    error: null,
    activeChat: null,
    messages: [],
    hasMore: false,
    
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserChatGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChatGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.chatGroups = action.payload;
      })
      .addCase(getUserChatGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload
       // state.hasMore = action.payload.length > 0; // Check if there are more messages
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setActiveChat } = chatGroupsSlice.actions;
export default chatGroupsSlice.reducer;