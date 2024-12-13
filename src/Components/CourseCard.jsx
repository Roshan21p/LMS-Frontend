import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteCourse } from '../Redux/Slices/CourseSlice';

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state?.auth);

  const handleDelete = async (e, courseId) => {
    e.stopPropagation(); // Prevents the click event from triggering the navigate on parent div
    const apiResponse = await dispatch(deleteCourse(courseId));
    console.log(apiResponse);
    if (apiResponse?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <div
      onClick={() => navigate('/course/description', { state: { ...data } })}
      className="text-white w-[21rem] sm:w-[22rem] h-[450px] shadow-[0_0_10px_black] rounded-tl-lg rounded-tr-lg cursor-pointer group overflow-hidden bg-zinc-700"
    >
      {' '}
      <div className="overflow-hidden">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg  group-hover:scale-[1.2]  transition-all ease-in-out duration-300 "
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
      </div>
      {/* course details */}
      <div className="p-3 space-y-1 text-white">
        <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">{data?.title}</h2>
        <p className="line-clamp-2">{data?.description}</p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold">Category : </span>
          {data?.category}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold">Total Lectures : </span>
          {data?.numberOfLectures}
        </p>
        <p className="font-semibold">
          <span className="text-yellow-500 font-bold">Instructor : </span>
          {data?.createdBy}
        </p>
      </div>
      {role === 'ADMIN' && (
        <div className="mt-5 flex flex-col gap-1">
          <button className="w-full py-2 text-sm font-semibold rounded-sm bg-blue-500 hover:bg-blue-600 text-white">
            Edit Course
          </button>
          <button
            onClick={(e) => handleDelete(e, data?._id)}
            className="w-full py-2 text-sm font-semibold rounded-sm bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
