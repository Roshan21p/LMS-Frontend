import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { isEmail, isValidPassword } from '../../Helpers/regexMatcher';
import { createAccount } from '../../Redux/Slices/AuthSlice';
import SignupPresentation from './SignupPresentation';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState();

  // for user input
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avatar: ''
  });

  // function to set the signup data
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  // function to handle the image upload
  const getImage = (e) => {
    e.preventDefault();

    //getting the image
    const uploadedImage = e.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage
      });
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener('load', function () {
      setPreviewImage(this.result);
    });
  };

  // function to create account
  const createNewAccount = async (e) => {
    e.preventDefault();

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.password
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    // checking the firstName field length
    if (signupData.firstName.length < 5 || signupData.firstName.length > 15) {
      toast.error(
        'First Name should be atleast of 5 characters long and maximum 15 characters long'
      );
      return;
    }

    // checking the lastName field length
    if (signupData.lastName.length < 4 || signupData.lastName.length > 15) {
      toast.error(
        'Last Name should be atleast of 4 characters long and maximum 15 characters long'
      );
      return;
    }
    // email validation using regex
    if (!isEmail(signupData.email)) {
      toast.error('Invalid email id');
      return;
    }

    // password validation using regex
    if (!isValidPassword(signupData.password)) {
      toast.error(
        'Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol'
      );
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append('firstName', signupData.firstName);
    formData.append('lastName', signupData.lastName);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('avatar', signupData?.avatar);

    // dispatch create account action
    const apiResponse = await dispatch(createAccount(formData));
    console.log('API Response is ', apiResponse);
    if (apiResponse?.payload?.success) {
      navigate('/auth/login');
    }

    setSignupData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: ''
    });
    setPreviewImage('');
  };

  return (
    <SignupPresentation
      createNewAccount={createNewAccount}
      handleUserInput={handleUserInput}
      getImage={getImage}
      previewImage={previewImage}
      signupData={signupData}
    />
  );
};

export default Signup;
