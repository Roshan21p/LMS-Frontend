import { Link } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';



const LoginPresentation = ({ handleLogin, handleUserInput, loginData }) => {
  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96  shadow-[0_0_10px_black] "
        >
          <h1 className="text-center text-2xl font-bold hover:text-yellow-500">
            Login
          </h1>

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
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          {/* input for password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password.."
              className="bg-transparent px-2 py-1 border w-full"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>

          {/* Login button */}
          <button
            className="w-full mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Login
          </button>

          <p className="text-center">
            Don&apos;t have an account ?{' '}
            <Link
              to={'/auth/signup'}
              className="link text-accent cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default LoginPresentation;
