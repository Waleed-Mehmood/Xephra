import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND;

// Async thunk for submitting ranking approval
export const postRankingApproval = createAsyncThunk(
  "ranking/postRankingApproval",
  async (games, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("eventId", games.eventId);
      formData.append("userId", games.userId);
      formData.append("rank", games.rank);
      formData.append("score", games.score);
      formData.append("screenshot", games.screenshot); 

      const response = await axios.post(`${apiUrl}/rank/approval`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


// Fetch user submissions (GET request) by userId
export const fetchUserSubmissions = createAsyncThunk(
  "ranking/fetchUserSubmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/rank/submissions/${userId}`);
      return response.data.data; // Extract only the data array
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    loading: false,
    data: null,
    submissions: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRankingApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRankingApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postRankingApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchUserSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rankingSlice.reducer;
