import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '../../Components/CourseCard';
import HomeLayout from '../../Layouts/HomeLayout';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';

const CourseList = () => {
  const dispatch = useDispatch();

  const { coursesData } = useSelector((state) => state.course);

  const loadCourses = async () => {
    await dispatch(getAllCourses());
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      {/* courses container for displaying the cards */}
      <div className="min-h-[90vh] pt-12  sm:px-4 md:px-6 lg:px-8 flex flex-col gap-10 text-white">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Explore the courses made by{' '}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>

        {/* wrapper for courses card */}
        <div className="mb-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center w-full">
          {coursesData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
