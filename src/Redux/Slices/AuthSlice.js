import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || '',
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
};

// function to handle signup
export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  try {
    const response = axiosInstance.post('/users/register', data);
    toast.promise(response, {
      loading: 'Wait! creating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to create account'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to handle login
export const login = createAsyncThunk('/auth/login', async (data) => {
  try {
    const response = axiosInstance.post('/auth/login', data);
    toast.promise(response, {
      loading: 'Wait! authentication in progess...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to log in'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to handle logout
export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    const response = axiosInstance.get('/auth/logout');
    toast.promise(response, {
      loading: 'Wait! logout in progess...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to log out'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to update user profile
export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {
  try {
    const response = axiosInstance.put('/users/updateProfile', data);
    toast.promise(response, {
      loading: 'Wait! Profile update in progress...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to update profile'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.message);
  }
});

// function to fetch user data
export const getUserData = createAsyncThunk('/user/details', async () => {
  try {
    const response = await axiosInstance.get('/users/getProfile');
    return response.data;
  } catch (error) {
    toast.error(error?.message);
  }
});

//function to change user password
export const changePassword = createAsyncThunk('/auth/changePaswword', async (userPassword) => {
  try {
    const response = axiosInstance.post('/users/changePassword', userPassword);
    toast.promise(response, {
      loading: "Hold on! We're updating your password...",
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to change password'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

//Function to handle forgot password
export const forgotPassword = createAsyncThunk('/auth/forgotPassword', async (email) => {
  try {
    const response = axiosInstance.post('/users/forgotPassword', { email });
    toast.promise(response, {
      loading: 'Wait! We are verifying your email...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to send verification email. Please try again.'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for user login
    builder.addCase(login.fulfilled, (state, action) => {
      // reducer which will execute when the login thunk is fulfilled
      if (!action?.payload?.data?.user) return;
      state.isLoggedIn = action?.payload?.success;
      state.role = action?.payload?.data?.user.role;
      state.data = action?.payload?.data?.user;

      localStorage.setItem('isLoggedIn', action?.payload?.success);
      localStorage.setItem('role', action?.payload?.data?.user.role);
      localStorage.setItem('data', JSON.stringify(action?.payload?.data?.user));
    });

    // for user logout
    builder.addCase(logout.fulfilled, (state, action) => {
      // reducer which will execute when the logout thunk is fulfilled
      state.isLoggedIn = false;
      state.role = {};
      state.data = '';

      localStorage.clear();
    });

    // for user details
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // reducer which will execute when the login thunk is fulfilled
      if (!action?.payload?.data) return;
      state.isLoggedIn = action?.payload?.success;
      state.role = action?.payload?.data?.role;
      state.data = action?.payload?.data;

      localStorage.setItem('isLoggedIn', action?.payload?.success);
      localStorage.setItem('role', action?.payload?.data?.role);
      localStorage.setItem('data', JSON.stringify(action?.payload?.data));
    });
  }
});

//export const {} = authSlice.actions;
export default authSlice.reducer;
