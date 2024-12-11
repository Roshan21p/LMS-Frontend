import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment
} from '../../Redux/Slices/RazorpaySlice';
import CheckoutPresentation from './CheckoutPresentation';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);

  // for storing the payment details after successfull transaction
  const paymentDetails = {
    razorpay_payment_id: '',
    razorpay_subscription_id: '',
    razorpay_signature: ''
  };

  const handleSubscription = async (e) => {
    e.preventDefault();

    console.log(razorpayKey, subscription_id);

    // checking for empty payment credential
    if (!razorpayKey || !subscription_id) {
      toast.error('Something went wrong');
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: 'Coursify Pvt. Ltd.',
      theme: {
        color: '#F37254'
      },

      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success('Payment Successfull');

        // verifying the payment
        const res = await dispatch(verifyUserPayment(paymentDetails));

        // redirecting the user according to the verification status
        res?.payload?.success ? navigate('/checkout/success') : navigate('/checkout/fail');
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  async function load() {
    // Fetch Razorpay key
    if (!razorpayKey) {
      await dispatch(getRazorpayId());
    }

    // Create a subscription if not already created
    if (!subscription_id) {
      await dispatch(purchaseCourseBundle());
    }
  }

  useEffect(() => {
    load();
  }, []);

  return <CheckoutPresentation handleSubscription={handleSubscription} />;
};

export default Checkout;
