import { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { IoEyeSharp } from 'react-icons/io5';
import { PiEyeSlash } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

const SignupPresentation = ({
  createNewAccount,
  handleUserInput,
  getImage,
  previewImage,
  signupData
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96  shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold text-yellow-500">Registration</h1>

          {/* input for image file */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
            onChange={getImage}
          />

          {/* input for firstName */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="font-semibold">
              FirstName
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your firstName.."
              className="bg-transparent px-2 py-1 border"
              value={signupData.firstName}
              onChange={handleUserInput}
            />
          </div>

          {/* input for lastName */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="font-semibold">
              LastName
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your lastName.."
              className="bg-transparent px-2 py-1 border"
              value={signupData.lastName}
              onChange={handleUserInput}
            />
          </div>

          {/* input for email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-2 py-1 border"
              value={signupData.email}
              onChange={handleUserInput}
            />
          </div>

          {/* input for password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="relative ">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password.."
                className="bg-transparent px-2 py-1 border w-full"
                value={signupData.password}
                onChange={handleUserInput}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeSharp size={20} /> : <PiEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* registration button */}
          <button
            className="w-full border-2 mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Create Account
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

export default SignupPresentation;
