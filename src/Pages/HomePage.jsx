// Library imports
import { Link } from 'react-router-dom';

// Images imports
import homePageMainImage from '../assets/Images/homePageMainImage.png';
// Component imports
import HomeLayout from '../Layouts/HomeLayout';

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex flex-col-reverse md:flex-row items-center justify-center gap-10 mx-4 md:mx-16 h-auto md:h-[90vh]">
        {/* for platform details */}
        <div className=" w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Find out best <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We have a large library of courses taught by highly skilled and qualified faculities at
            a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <Link to={'/courses'}>
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to={'/contact'}>
              <button className="border border-yellow-500 px-5 py-3 mb-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img src={homePageMainImage} alt="home page image" className="w-3/4 md:w-full" />
        </div>
      </div>
    </HomeLayout>
  );
};
export default HomePage;
