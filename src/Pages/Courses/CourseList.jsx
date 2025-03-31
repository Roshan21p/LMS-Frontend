import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import CourseCard from '../../Components/CourseCard';
import HomeLayout from '../../Layouts/HomeLayout';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams(); // Get category from URL

  // Format category (replace hyphens with spaces)
  const formattedCategory = category ? category.replace(/-/g, ' ') : 'All';

  const [selectedCategory, setSelectedCategory] = useState(formattedCategory);

  const { coursesData } = useSelector((state) => state.course);

  // Fetch courses from Redux
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(formattedCategory);
  }, [category]);

  // List of categories for buttons
  const categories = ['All', 'Software Development', 'Programming', 'Data Science & Analytics'];

  // Handle category selection
  const handleCategoryClick = (selected) => {
    setSelectedCategory(selected);

    if (selected === 'All') {
      navigate('/courses'); // Default URL when 'All' is selected
    } else {
      const useableUrl = selected.replace(/\s+/g, '-'); // Convert spaces to hyphens
      navigate(`/courses/${useableUrl}`);
    }
  };

  // Filter courses based on selected category
  const filteredCourses =
    selectedCategory === 'All'
      ? coursesData
      : coursesData?.filter((course) => course.category === selectedCategory);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-10 text-white">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Explore the courses made by{' '}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
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

        {/* Courses Display */}
        <div
          className={`mb-10 grid gap-8 ${
            filteredCourses?.length === 1 || filteredCourses?.length === 0
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
          } justify-items-center w-full`}
        >
          {filteredCourses?.length > 0 ? (
            filteredCourses?.map((course) => <CourseCard key={course._id} data={course} />)
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
