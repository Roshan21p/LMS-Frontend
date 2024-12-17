import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { isValidPassword } from '../../Helpers/regexMatcher';
import HomeLayout from '../../Layouts/HomeLayout';
import { resetPassword } from '../../Redux/Slices/AuthSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: '',
    cnfPassword: '',
    resetToken: useParams().resetToken
  });

  // function to handle user input
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  //function to handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // check the empty field
    if (!data.password || !data.cnfPassword || !data.resetToken) {
      toast.error('All fields are mandatory');
      return;
    }

    // password validation using regex
    if (!isValidPassword(data.password)) {
      toast.error(
        'Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol'
      );
      return;
    }

    // matching the password
    if (data.password !== data.cnfPassword) {
      toast.error('Both password should be same');
      return;
    }

    // dispatch the reset password action
    const apiResponse = await dispatch(resetPassword(data));
    setData({
      password: '',
      cnfPassword: '',
      resetToken: ''
    });

    // redirecting to the login page
    if (apiResponse?.payload?.success) {
      navigate('/auth/login');
    }
  };
  return (
    <HomeLayout>
      {/* forget password container */}
      <div onSubmit={handleFormSubmit} className="flex items-center justify-center h-[100vh]">
        {/* forget password card */}
        <form className="flex flex-col justify-center gap-6 rounded-lg p-4 text-white w-[20rem] sm:w-[24rem] h-[24rem] shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold text-yellow-500">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="email">
              New Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="cnfPassword">
              Confirm New Password
            </label>
            <input
              required
              type="password"
              name="cnfPassword"
              id="cnfPassword"
              placeholder="Confirm your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.cnfPassword}
              onChange={handleUserInput}
            />
          </div>

          <button
            className="w-full border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
