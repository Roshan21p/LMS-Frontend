import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { isValidPassword } from '../../Helpers/regexMatcher';
import HomeLayout from '../../Layouts/HomeLayout';
import { changePassword } from '../../Redux/Slices/AuthSlice';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [userPassword, setUserPassword] = useState({
    oldPassword: '',
    newPassword: ''
  });

  // function to handle Password Change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value
    });
  };

  // function handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // checking the fields are empty or not
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error('All fields are mandatory');
      return;
    }

    // password validation using regex
    if (!isValidPassword(userPassword.newPassword)) {
      toast.error(
        'Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol'
      );
      return;
    }

    setLoading(true);

    // dispatch change password action
    const apiResponse = await dispatch(changePassword(userPassword));

    // redirecting to profile page if password changed
    if (apiResponse?.payload?.success) {
      navigate('/user/profile');
      // clearing the input fields
      setUserPassword({
        oldPassword: '',
        newPassword: ''
      });
    }

    setLoading(false);
  };

  return (
    <HomeLayout>
      {/* forget password container */}
      <div className="flex items-center justify-center h-[90vh]">
        {/* forget password card */}
        <form
          noValidate
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-6 rounded-lg p-4 text-white w-[20rem] sm:w-[24rem] h-[24rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-500">Change Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              required
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter your old password"
              className="bg-transparent px-2 py-1 border"
              value={userPassword.oldPassword}
              onChange={handlePasswordChange}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="newPassword">
              New Password
            </label>
            <input
              required
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={userPassword.newPassword}
              onChange={handlePasswordChange}
              disabled={loading}
            />
          </div>

          <Link to={loading ? '#' : '/user/profile'}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
            disabled={loading}
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
