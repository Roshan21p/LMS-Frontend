import { BsPencil, BsPersonCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  // function to handle the cancel subscription of course
  const handleCourseCancelSubscription = async () => {
    await dispatch(cancelCourseBundle());
    navigate('/');
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <div className="relative w-40 m-auto">
            {/* Profile Image or Default Icon */}
            {userData?.avatar?.secure_url ? (
              <img
                className="w-40 h-40 rounded-full border border-black"
                src={userData.avatar.secure_url}
                alt="User profile image"
              />
            ) : (
              <BsPersonCircle className="w-40 h-40 rounded-full border   border-black" />
            )}

            {/* Edit Icon */}
            <button className="absolute right-1 bottom-[-10px] p-2 rounded-full shadow-md  transition-all">
              <div className="w-10 h-10 flex items-center border-2 bg-yellow-500 justify-center rounded-full">
                <BsPencil size={20} color="black" />
              </div>
            </button>
          </div>

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData.firstName} {userData.lastName}
          </h3>

          <div className="grid grid-cols-2 font-semibold">
            <p>Email :</p>
            <p>{userData?.email}</p>
            <p>Role :</p>
            <p>{userData?.role}</p>
            <p>Subscription :</p>
            <p>{userData?.subscription?.status === 'active' ? 'Active' : 'Inactive'}</p>
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={'/user/changepassword'}
              className="w-1/2 border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button className="font-semibold">Change Password</button>
            </Link>

            <Link
              to={'/user/editprofile'}
              className="w-1/2 border-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button className="font-semibold">Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === 'active' && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full border-2 bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;
