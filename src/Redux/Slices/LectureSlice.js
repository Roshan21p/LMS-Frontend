import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  lectures: []
};

export const getCourseLectures = createAsyncThunk('/course/lecture/get', async (courseId) => {
  try {
    const response = axiosInstance.get(`/courses/${courseId}`);
    toast.promise(response, {
      loading: 'Fetching the lectures...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to load the lectures'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const addLectureToCourse = createAsyncThunk('/course/lecture/add', async (lectDetails) => {
  try {
    const formData = new FormData();
    formData.append('lecture', lectDetails.lecture);
    formData.append('title', lectDetails.title);
    formData.append('description', lectDetails.description);

    const response = axiosInstance.post(`/courses/${lectDetails.id}`, formData);
    toast.promise(response, {
      loading: 'Adding the lecture...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to add the lecture'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const deleteCourseLecture = createAsyncThunk('/course/lecture/delete', async (data) => {
  try {
    const response = axiosInstance.delete(
      `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
    );
    toast.promise(response, {
      loading: 'Deleting the lecture...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to delete the lectures'
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
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      })
      .addCase(addLectureToCourse.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  }
});

export default lectureSlice.reducer;
