import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching user data
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("https://randomuser.me/api/?results=10");
  return response.data.results; // Extract results array
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Reducer to manually update users (used for delete action)
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.login.uuid === action.payload.login.uuid
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Set users data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUsers, updateUser } = userSlice.actions; // Export setUsers action
export default userSlice.reducer;
