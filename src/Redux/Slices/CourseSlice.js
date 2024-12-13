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

export const createNewCourse = createAsyncThunk('/course/create', async (data) => {
  try {
    const formData = new FormData();

    formData.append('title', data?.title);
    formData.append('description', data?.description);
    formData.append('category', data?.category);
    formData.append('createdBy', data?.createdBy);
    formData.append('thumbnail', data?.thumbnail);

    const response = axiosInstance.post('/courses', formData);
    toast.promise(response, {
      loading: 'Creating new course...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to create course'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
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
