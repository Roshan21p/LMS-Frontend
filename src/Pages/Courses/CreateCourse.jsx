import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { createNewCourse, updateCourse } from '../../Redux/Slices/CourseSlice';

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
      console.log('Populating admin input for editing:', initialCourseData);

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
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen sm:min-h-[80vh]">
        {/* card for creating the new card */}
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col gap-5 rounded-lg p-4 text-white w-[20rem] sm:w-[43rem] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link
            to={'/admin/dashboard'}
            className="absolute top-5 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-yellow-500 font-bold text-2xl">
            {initialCourseData?.newCourse ? 'Create New Course' : 'Edit Course'}
          </h1>

          {/* for course basic details */}
          <main className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-10">
            {/* left section */}
            <div className="gap-y-6">
              <div>
                {/* input for image file */}
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {adminInput.previewImage ? (
                    <img src={adminInput.previewImage} className="w-full h-44 m-auto border" />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>

              {/* adding the title section */}
              <div className="flex flex-col gap-1 ">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course title
                </label>
                <input
                  required
                  type="name"
                  name="title"
                  id="title"
                  placeholder="Enter the course title"
                  className="bg-transparent px-2 py-1 border"
                  value={adminInput.title}
                  onChange={handleAdminInput}
                />
              </div>
            </div>

            {/* right section */}
            <div>
              {/* adding the instructor */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Instructor Name
                </label>
                <input
                  required
                  type="name"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter the instructure name"
                  className="bg-transparent px-2 py-1 border"
                  value={adminInput.createdBy}
                  onChange={handleAdminInput}
                />
              </div>
              {/* adding the category */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="name"
                  name="category"
                  id="category"
                  placeholder="Enter the category name"
                  className="bg-transparent px-2 py-1 border"
                  value={adminInput.category}
                  onChange={handleAdminInput}
                />
              </div>

              {/* adding the course description */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter the course description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={adminInput.description}
                  onChange={handleAdminInput}
                />
              </div>
            </div>
          </main>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer border-2"
            type="submit"
          >
            {initialCourseData?.newCourse ? 'Create Course' : 'Update Course'}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourse;
