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
      const res = await AuthService.register(userData);
      return res.data;
    } catch (error) {
      // const message = error.response?.data?.message || error.message;
      // return thunkAPI.rejectWithValue(message);

      let message = "Error occured at user registration";
      if (error.response && error.response.data) {
        message = error.response.data.message;
      }
      throw new Error(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      // console.log(await AuthService.login(userData));
      // const res = await AuthService.login(userData);
      const res = await AuthService.login(userData);
      console.log(res);

      return res.data;
    } catch (error) {
      // const message = error.response?.data?.message || error.message;
      // console.log(message);
      // return thunkAPI.rejectWithValue(message);

      console.log(error);
      let message = "Error occured when login";
      if (error.response && error.response.data) {
        message = error.response.data.message;
      }

      throw new Error(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // return await AuthService.logout();
    const res = await AuthService.logout();
    return res.data;
  } catch (error) {
    // const message = error.response?.data?.message || error.message;
    // return thunkAPI.rejectWithValue(message);
    let message = "Error occured when logout";
    if (error.response && error.response.data) {
      message = error.response.data.message;
    }
    throw new Error(message);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const res = await AuthService.refreshToken();
      return res.data;
    } catch (error) {
      // const message = error.response?.data?.message || error.message;
      // return thunkAPI.rejectWithValue(message);
      let message = "Error occured when refreshing access token";
      if (error.response && error.response.data) {
        message = error.response.data.message;
      }
      throw new Error(message);
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
        state.message = action.error.message || "";
      })
      // login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // if (action.payload.status === "Error") {
        //   state.isLoading = false;
        //   state.message = action.payload.message;
        //   state.isSuccess = false;
        //   state.isError = true;
        //   state.user = null;
        // } else {
        // }
        console.log("fulfilled");
        console.log(state.user);

        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        console.log(state.user);

        // return {
        //   ...state,
        //   isLoading: false,
        //   isSuccess: true,
        //   isError: false,
        //   isAuthenticated: true,
        //   user: action.payload.user,
        // };
      })
      .addCase(login.rejected, (state, action) => {
        console.log("rejected");
        state.isLoading = false;
        state.message = action.error.message || "";
        state.isSuccess = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      // logout cases
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message || "";
        state.isError = true;
        state.isSuccess = false;
      })
      // refresh token cases
      .addCase(refreshToken.fulfilled, (state, action) => {
        // if (action.payload.status === "Error") {
        //   state.isSuccess = false;
        //   state.isAuthenticated = false;
        //   state.user = null;
        //   localStorage.removeItem("user");
        // } else {
        // }
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isSuccess = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
