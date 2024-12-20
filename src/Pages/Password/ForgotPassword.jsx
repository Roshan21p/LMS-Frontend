import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { isEmail } from '../../Helpers/regexMatcher';
import HomeLayout from '../../Layouts/HomeLayout';
import { forgotPassword } from '../../Redux/Slices/AuthSlice';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();

  // Function to handle form sumbit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Checking for the empty field
    if (!email) {
      toast.error('Email field is required');
    }

    // email validation using regex
    if (!isEmail(email)) {
      toast.error('Invalid email id');
    }

    // dispatch forgot password action
    await dispatch(forgotPassword(email));

    setEmail('');
  };

  return (
    <HomeLayout>
      {/* Forgot password container */}
      <div className="flex items-center justify-center h-[90vh]">
        {/* Forgot password card*/}
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="flex flex-col  justify-center gap-6 rounded-lg p-4 text-white w-[20rem] sm:w-[24rem] h-[24rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-500">Forgot Password</h1>

          <p>
            Enter your registered email, we will send you a verification link on your registered
            email from which you can reset your password
          </p>

          <div className="flex flex-col gap-1">
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your registered email"
              className="bg-transparent px-2 py-1 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="w-full border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Get Verification Link
          </button>

          <p className="text-center">
            Already have an account ?{' '}
            <Link to={'/auth/login'} className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;
