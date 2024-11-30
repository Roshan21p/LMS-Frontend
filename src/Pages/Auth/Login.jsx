import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { isEmail, isValidPassword } from '../../Helpers/regexMatcher';
import { login } from '../../Redux/Slices/AuthSlice';
import LoginPresentation from './LoginPresentation';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for user input
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // function to set the signup data
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // function to login 
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error('Please fill all the fields');
      return;
    }
    // email validation using regex
    if (!isEmail(loginData.email)) {
      toast.error('Invalid email id');
      return;
    }

    // password validation using regex
    if (!isValidPassword(loginData.password)) {
      toast.error(
        'Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol'
      );
      return;
    }
    // dispatch login action
    const apiResponse = await dispatch(login(loginData));
    console.log('API Response is ', apiResponse);
    if (apiResponse?.payload?.success) {
      navigate('/');
    }

    setLoginData({
      email: '',
      password: '',
    });
  };
  return (
    <LoginPresentation
      handleLogin={handleLogin}
      handleUserInput={handleUserInput}
      loginData={loginData}
    />
  );
};

export default Login;
