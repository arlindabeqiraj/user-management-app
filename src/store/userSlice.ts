import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../types";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  searchTerm: "",
  sortBy: "name",
  sortOrder: "asc",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const savedUsers = localStorage.getItem("users");
  if (savedUsers) {
    return JSON.parse(savedUsers);
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const users = await response.json();

  localStorage.setItem("users", JSON.stringify(users));

  return users;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<"name" | "email" | "company">) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
    },
    addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newUser: User = {
        ...action.payload,
        id: Math.max(...state.users.map((u) => u.id), 0) + 1,
      };
      state.users.unshift(newUser);

      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;

        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);

      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const {
  setSearchTerm,
  setSortBy,
  setSortOrder,
  addUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
