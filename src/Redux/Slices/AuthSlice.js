import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  role: localStorage.getItem('role') || '',
  data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
};

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
    toast.error(error?.response?.data?.message)
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // reducer which will execute when the login thunk is fulfilled
      state.isLoggedIn = true;
      state.role = action?.payload?.data?.userRole;
      state.data = action?.payload?.data?.userData;
      
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.data?.userRole);
      localStorage.setItem("data", JSON.stringify(action?.payload?.data?.userData));
    })
  }
});

//export const {} = authSlice.actions;
export default authSlice.reducer;
