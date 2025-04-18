import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
  key: '',
  subscription_id: '',
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: []
};

// function to get the api key
export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
  try {
    const response = axiosInstance.get('/payments/razorpay-key');
    toast.promise(response, {
      loading: 'Wait! Fetching Razorpay key...',
      success: (data) => {
        return 'Razorpay key received successfully';
      },
      error: 'Failed to get Razorpay key'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

// function to purchase the course bundle
export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse', async () => {
  try {
    const response = await axiosInstance.post('/payments/subscribe');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

// function to verify the user payment
export const verifyUserPayment = createAsyncThunk('/verifyPayment', async (paymentData) => {
  try {
    const response = await axiosInstance.post('/payments/verify', {
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_subscription_id: paymentData.razorpay_subscription_id,
      razorpay_signature: paymentData.razorpay_signature
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

// function to get all the payment record
export const getPaymentRecord = createAsyncThunk('/payment/record', async () => {
  try {
    const response = axiosInstance.get('/payments?count=300');
    toast.promise(response, {
      loading: 'Getting the payments record...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to get payments record'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

// function to cancel the course bundle subscription
export const cancelCourseBundle = createAsyncThunk('/payment/cancel', async () => {
  try {
    const response = axiosInstance.post('/payments/unsubscribe');
    toast.promise(response, {
      loading: 'Unsubscribing the bundle...',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to unsubscibe the bundle'
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
  }
});

const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.data?.allPayments;
        state.finalMonths = action?.payload?.data?.finalMonths;
        state.monthlySalesRecord = action?.payload?.data?.monthlySalesRecord;
      });
  }
});

export default razorpaySlice.reducer;
