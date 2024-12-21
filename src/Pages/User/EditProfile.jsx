import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';
import EditProfilePresentation from './EditProfilePresentation';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: '',
    firstName: '',
    lastName: '',
    avatar: '',
    userId: useSelector((state) => state?.auth?.data?._id)
  });

  const userData = useLocation().state;

  useEffect(() => {
    setData({
      previewImage: userData?.avatar?.secure_url,
      firstName: userData?.firstName,
      lastName: userData?.lastName
    });
  }, [userData]);
  // function to handle the image upload
  const handleImageUpload = (e) => {
    e.preventDefault();

    //getting the image
    const uploadImage = e.target.files[0];

    // if image exists then getting the url link of it
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener('load', function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadImage
        });
      });
    }
  };

  // function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const onFormSumbit = async (e) => {
    e.preventDefault();

    if (!data.firstName && !data.lastName && !data.avatar) {
      toast.error('Please fill atleast one of the fields');
      return;
    }

    // checking the firstName field length
    if (data.firstName && (data.firstName.length < 5 || data.firstName.length > 15)) {
      toast.error(
        'First Name should be atleast of 5 characters long and maximum 15 characters long'
      );
      return;
    }

    // checking the lastName field length
    if (data.lastName && (data.lastName.length < 4 || data.lastName.length > 15)) {
      toast.error(
        'Last Name should be atleast of 4 characters long and maximum 15 characters long'
      );
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append('firstName', data?.firstName);
    formData.append('lastName', data?.lastName);
    formData.append('avatar', data?.avatar);

    // dispatch update profile action
    await dispatch(updateProfile(formData));
    // fetching the data to update
    const apiResponse = await dispatch(getUserData());
    if (apiResponse?.payload?.success) {
      navigate('/user/profile');
    }
  };

  return (
    <EditProfilePresentation
      onFormSumbit={onFormSumbit}
      handleInputChange={handleInputChange}
      handleImageUpload={handleImageUpload}
      data={data}
    />
  );
};

export default EditProfile;
