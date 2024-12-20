import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { addLectureToCourse } from '../../Redux/Slices/LectureSlice';

const AddLecture = () => {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: '',
    description: '',
    videoSrc: ''
  });

  // function to handle the input box change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  // function to get video and its link from the input
  const handleVideo = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source
    });
  };

  // function to handle the form submit
  const onFormSumbit = async (e) => {
    e.preventDefault();

    if (!userInput.title || !userInput.description || !userInput.lecture) {
      toast.error('All fields are mandatory');
      return;
    }

    const apiResponse = await dispatch(addLectureToCourse(userInput));
    if (apiResponse?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: '',
        description: '',
        videoSrc: ''
      });
    }
  };

  // redirecting the user if no user details
  useEffect(() => {
    if (!courseDetails) {
      navigate('/courses');
    }
  }, []);
  return (
    <HomeLayout>
      <div className=" text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[90vh]">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-[20rem] sm:w-[24rem] rounded-lg">
          <header className="flex items-center justify-center relative">
            <button onClick={() => navigate(-1)} className="absolute left-2 text-xl text-green-500">
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">Add your new lecture</h1>
          </header>
          <form noValidate onSubmit={onFormSumbit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="text-xl font-semibold">
                Lecture title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter the title of the lecture"
                value={userInput.value}
                onChange={handleInputChange}
                className="bg-transparent px-2 py-1 border"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-xl font-semibold">
                Lecture Description
              </label>
              <textarea
                name="description"
                value={userInput.description}
                onChange={handleInputChange}
                placeholder="Enter the description for lecture"
                className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="file" className="text-xl font-semibold">
                {' '}
                Lecture Video
              </label>
              {userInput.videoSrc ? (
                <video
                  src={userInput.videoSrc}
                  muted
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                ></video>
              ) : (
                <div className="h-48 border flex items-center justify-center cursor-pointer">
                  <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">
                    Choose your video
                  </label>
                  <input
                    type="file"
                    name="lecture"
                    id="lecture"
                    onChange={handleVideo}
                    accept="video/mp4,video/x-m4v,video/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <button
              className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer border-2"
              type="submit"
            >
              Add New Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AddLecture;
