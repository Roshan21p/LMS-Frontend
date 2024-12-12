import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice';

const DisplayLectures = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  // function to handle lecture delete
  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLectures(courseDetails._id));
  };

  useEffect(() => {
    if (!courseDetails) navigate('/courses');
    (async () => {
      dispatch(getCourseLectures(courseDetails._id));
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        {/* displaying the course name */}
        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {courseDetails?.title}
        </h1>

        {lectures && lectures.length > 0 && (
          <div className="flex flex-wrap justify-center gap-10 w-full">
            {/* left section for playing the video and displaying course details to admin */}
            <div className="space-y-5 w-full lg:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] self-start">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill  rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>

              <div>
                <h1>
                  <span className="text-yellow-500">Title : </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  {' '}
                  <span className="text-yellow-500 line-clamp-4">Description : </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* right section for displaying all the lectures of the course */}
            <ul className="w-full lg:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 overflow-y-auto max-h-[30rem]">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === 'ADMIN' && (
                  <button
                    onClick={() =>
                      navigate('/course/addlecture', { courseDetails: { ...courseDetails } })
                    }
                    className="btn btn-secondary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-1" key={lecture._id}>
                      <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                        <span className="text-yellow-500"> Lecture {idx + 1} : </span>
                        {lecture?.title}
                      </p>
                      {role === 'ADMIN' && (
                        <button
                          onClick={() => handleLectureDelete(courseDetails?._id, lecture?._id)}
                          className="bg-cyan-500 py-1 px-2 rounded-sm hover:bg-cyan-600 text-black font-semibold text-sm"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
