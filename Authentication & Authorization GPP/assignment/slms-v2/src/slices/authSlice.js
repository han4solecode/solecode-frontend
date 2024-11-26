import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: false,
  isError: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await AuthService.register(userData);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      console.log(await AuthService.login(userData));
      const res = await AuthService.login(userData);

      // return await AuthService.login(userData);
      return res;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await AuthService.logout();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      return await AuthService.refreshToken();
      // return res.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      // login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status === "Error") {
          state.isLoading = false;
          state.message = action.payload.message;
          state.isSuccess = false;
          state.isError = true;
          state.user = null;
        } else {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message || "";
        state.isSuccess = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      // logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // refresh token cases
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.status === "Error") {
          state.isSuccess = false;
          state.isAuthenticated = false;
          state.user = null;
          localStorage.removeItem("user");
        } else {
          state.isSuccess = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
