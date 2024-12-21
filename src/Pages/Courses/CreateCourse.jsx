import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { createNewCourse, updateCourse } from '../../Redux/Slices/CourseSlice';
import CreateCoursePresentation from './CreateCoursePresentation';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { initialCourseData } = useLocation().state;

  // for storing the Admin input
  const [adminInput, setAdminInput] = useState({
    title: '',
    category: '',
    createdBy: '',
    description: '',
    thumbnail: null,
    previewImage: ''
  });

  // Populate the form if initialCourseData exists (Edit Course scenario)
  useEffect(() => {
    if (initialCourseData && !initialCourseData?.newCourse) {
      setAdminInput({
        title: initialCourseData.title || '',
        category: initialCourseData.category || '',
        createdBy: initialCourseData.createdBy || '',
        description: initialCourseData.description || '',
        thumbnail: null,
        previewImage: initialCourseData.thumbnail?.secure_url || ''
      });
    }
  }, [initialCourseData]);

  // function to handle the image upload
  const handleImageUpload = (e) => {
    e.preventDefault();
    // getting the image
    const uploadImage = e.target.files[0];
    console.log('upload', uploadImage);

    // if image exists then getting the url link of it
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener('load', function () {
        setAdminInput({
          ...adminInput,
          previewImage: this.result,
          thumbnail: uploadImage
        });
      });
    }
  };

  // function to handle admin input
  const handleAdminInput = (e) => {
    const { name, value } = e.target;

    setAdminInput({
      ...adminInput,
      [name]: value
    });
  };

  // function to handle form submission
  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !adminInput.title ||
      !adminInput.category ||
      !adminInput.createdBy ||
      !adminInput.description ||
      (!adminInput.thumbnail && initialCourseData?.newCourse)
    ) {
      toast.error('All fields are mandatory');
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append('title', adminInput?.title);
    formData.append('description', adminInput?.description);
    formData.append('category', adminInput?.category);
    formData.append('createdBy', adminInput?.createdBy);
    console.log('null', adminInput?.thumbnail);

    if (adminInput?.thumbnail) {
      console.log('render');
      formData.append('thumbnail', adminInput?.thumbnail);
    }

    console.log('Entries', Array.from(formData.entries()));

    // dispatch Create Course action
    let apiResponse;
    if (initialCourseData?.newCourse) {
      apiResponse = await dispatch(createNewCourse(formData));
    } else {
      const courseId = initialCourseData?._id;
      apiResponse = await dispatch(updateCourse({ courseId, formData }));
    }
    if (apiResponse?.payload?.success) {
      // clearing the input fields
      setAdminInput({
        title: '',
        category: '',
        createdBy: '',
        description: '',
        thumbnail: undefined,
        previewImage: ''
      });

      navigate('/courses');
    }
  };

  return (
    <CreateCoursePresentation
      handleImageUpload={handleImageUpload}
      handleAdminInput={handleAdminInput}
      onFormSubmit={onFormSubmit}
      adminInput={adminInput}
    />
  );
};

export default CreateCourse;
