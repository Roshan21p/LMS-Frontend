import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';

const CourseDescription = () => {
  const { state } = useLocation();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      {/* wrapper for course description */}
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        {/* displaying the course details */}
        <div className="grid grid-cols-2 gap-10 py relative">
          {/* creating the left side of description box */}
          <div className="space-y-5">
            <img
              className="w-full h-64 rounded-lg shadow-[0_0_10px_black]"
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
            />

            {/* course details */}
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures :{' '}
                  </span>
                  {state.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Instructor :{' '}
                  </span>
                  {state.createdBy}
                </p>
              </div>

              {/* adding the subscribe button */}
              {role === 'ADMIN' || data?.subscription?.status === 'active' ? (
                <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                  Watch lectures
                </button>
              ) : (
                <button className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300">
                  Subscribe
                </button>
              )}
            </div>
          </div>

          {/* creating the right section of description box */}
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 text-center mb-5">
              {state.title}
            </h1>

            <p className="text-yellow-500 font-bold">Course Description :</p>

            <p>{state.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
