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
    toast.error(error?.response?.statusText || error?.message);
  }
});

export const createNewCourse = createAsyncThunk('/course/create', async (data) => {
  try {
    const response = axiosInstance.post('/courses', data);
    toast.promise(response, {
      loading: 'Creating new course...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to create course'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const updateCourse = createAsyncThunk('/course/update', async ({ courseId, formData }) => {
  console.log('Update', formData, courseId);
  try {
    const response = axiosInstance.put(`/courses/${courseId}`, formData);
    toast.promise(response, {
      loading: 'Updating the course...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to update the course'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

export const deleteCourse = createAsyncThunk('/course/delete', async (courseId) => {
  try {
    const response = axiosInstance.delete(`/courses/${courseId}`);
    toast.promise(response, {
      loading: 'Deleting the course...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to delete the course'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
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
