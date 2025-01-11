import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import CourseCard from '../../Components/CourseCard';
import HomeLayout from '../../Layouts/HomeLayout';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  console.log("category",category);
  

  const [selectedCategory, setSelectedCategory] = useState(category || 'All');

  const { coursesData } = useSelector((state) => state.course);

  const loadCourses = async () => {
    await dispatch(getAllCourses());
  };

  // List of categories for dynamic button generation
  const categories = ['All', 'Software Development', 'Programming', 'Data Science & Analytics'];

  const handleCategoryClick = (selected) => {
    setSelectedCategory(selected);
    if (selected === 'All') navigate('/courses');
    else{
      const useableUrl = selected.replace(/\s+/g, '-');
      navigate(`/courses/${useableUrl}`);
    } 
  };

  const filteredCourses =
    selectedCategory === 'All'
      ? coursesData
      : coursesData?.filter((course) => course.category === selectedCategory);

  useEffect(() => {
    loadCourses();
    setSelectedCategory(category || 'All');
  }, [category]);

  return (
    <HomeLayout>
      {/* courses container for displaying the cards */}
      <div className="min-h-[90vh] pt-12 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-10 text-white ">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Explore the courses made by{' '}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>

        <div className="flex flex-wrap gap-4  items-center justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn font-bold ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* wrapper for courses card */}
        <div
          className={`mb-10 grid gap-8 ${
            filteredCourses?.length === 1 || filteredCourses?.length === 0
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
          } justify-items-center w-full`}
        >
          {filteredCourses?.length > 0 ? (
            filteredCourses?.map((element) => {
              return <CourseCard key={element._id} data={element} />;
            })
          ) : (
            <p className="text-center mt-28 text-2xl font-medium text-white">
              No courses available for this category
            </p>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
