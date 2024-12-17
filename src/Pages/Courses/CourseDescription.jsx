import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      {/* wrapper for course description */}
      <div className="min-h-[90vh] sm:pt-12 px-5 sm:px-20 flex flex-col items-center justify-center text-white">
        {/* displaying the course details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-10 relative">
          {/* creating the left side of description box */}
          <div className="space-y-5">
            <img
              className="w-full mt-4 h-56 sm:h-72 rounded-lg shadow-[0_0_10px_black]"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />
          </div>
          {/* Right side :course details */}
          <div className="space-y-2">
            {/* Course Title */}
            <h1 className="text-3xl font-bold text-yellow-500 text-center mt-3 sm:text-left mb-5">
              {state.title}
            </h1>

            {/* Course Description */}
            <div className="space-x-2">
              <div>
                <p className="text-yellow-500 font-bold text-xl mb-1">Course Description:</p>
                <p className="leading-relaxed">{state.description}</p>
              </div>
            </div>
            {/* Course Details: Total Lectures & Instructor */}
            <div className="space-y-4 text-xl">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">Total Lectures: </span>
                  {state?.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">Instructor: </span>
                  {state?.createdBy}
                </p>
              </div>

              {/* Subscribe / Watch button */}
              {role === 'ADMIN' || data?.subscription?.status === 'active' ? (
                <button
                  onClick={() => navigate('/course/displayLectures', { state: { ...state } })}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
