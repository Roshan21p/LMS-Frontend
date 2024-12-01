import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  coursesData: []
};

export const getAllCourses = createAsyncThunk('/course/get', async () => {
  try {
    const response = axiosInstance.get('/courses');
    toast.promise(response, {
      loading: 'loading course data...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to get courses'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: 'Courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action?.payload) {
        state.coursesData = [...action.payload.data];
      }
    });
  }
});

export default courseSlice.reducer;
