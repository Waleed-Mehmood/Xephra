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
      formData.append("gameName", games.gameName);
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


// delete user ranking approval by userId and eventIt
  export const deleteUserSubmission = createAsyncThunk(
    "ranking/deleteUserSubmission", 
    async ({userId, eventId}, {rejectWithValue})=>{
      try {
        const response = await axios.delete(`${apiUrl}/rank/approvaldelete`, {
          data: { userId, eventId } 
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  )


  // thunk for event ranking approval and user stats updation
 export const assignEventRanking = createAsyncThunk(
    'ranking/assignRank',
    async (rankingData , {rejectWithValue})=>{
      try {
        const response = await axios.post(`${apiUrl}/rank/assign-rank`, rankingData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  )


  // Async Thunk for fetching event submissions
export const fetchEventSubmissions = createAsyncThunk(
  "ranking/fetchEventSubmissions",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/admin/geteventssubmission/${eventId}`
      );
      return response.data; // Assuming API returns an array
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load rankings");
    }
  }
);



const rankingSlice = createSlice({
  name: "ranking",
  initialState: {
    loading: false,
    data: null,
    message: null,
    rankings: { submissions: [], users: [] },
    submissions: [],
    userStats: null,
    error: null,
  },
  reducers: {
    clearRankings: (state) => {
      state.rankings = { submissions: [], users: [] }; // Clear previous rankings
    },
    resetMessage: (state) => {
      state.message = null;
    }
  },
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
      })
      .addCase(deleteUserSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = state.submissions.filter(
          (submission) => !(submission.userId === action.meta.arg.userId && submission.eventId === action.meta.arg.eventId)
        );
      })
      .addCase(deleteUserSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete submission.';
      })

      .addCase(assignEventRanking.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignEventRanking.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; 
        state.userStats = action.payload.userStats; 
        state.message = action.payload.message;
      })
         .addCase(assignEventRanking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchEventSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.rankings = action.payload;
      })
      .addCase(fetchEventSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRankings, resetMessage  } = rankingSlice.actions;
export default rankingSlice.reducer;
