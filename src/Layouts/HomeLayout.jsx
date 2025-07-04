// Library imports
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Component imports
import Footer from '../Components/Footer';
import { getUserData, logout } from '../Redux/Slices/AuthSlice';

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking if user is logged in
  const { isLoggedIn } = useSelector((state) => state?.auth);
  // for displaying the options acc to role
  const role = useSelector((state) => state?.auth?.role);

  const fetchUserDetails = async () => {
    const response = await dispatch(getUserData());

    if (response?.payload?.isUnauthorized) {
      dispatch(logout());
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch user details immediately when logged in
      fetchUserDetails();
    }
  }, [isLoggedIn]); // This effect runs only when the login state changes

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = 'auto';
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = '0';
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await dispatch(logout());
    console.log(response);

    if (response?.payload?.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[90vh]">
      {/* Top Section with Hamburger and Title */}
      <div className="flex justify-between items-center p-3  text-white bg-gray-800">
        {/* Hamburger icon on the left */}
        <label htmlFor="my-drawer" className="cursor-pointer">
          <FiMenu onClick={changeWidth} size={32} className="font-bold text-white" />
        </label>

        {/* LearnHub Title (Centered) */}
        <Link
          to="/"
          className="mx-auto text-3xl md:text-5xl font-bold text-center text-white hover:text-yellow-500"
        >
          LearnHub
        </Link>
      </div>
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative">
            {/* close button for drawer */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to={'/'}>Home</Link>
            </li>

            {isLoggedIn && role === 'ADMIN' && (
              <li>
                <Link to={'/admin/dashboard'}>Admin Dashboard</Link>
              </li>
            )}

            <li>
              <Link to={'/courses'}>All Courses</Link>
            </li>

            <li>
              <Link to={'/contact'}>Contact Us</Link>
            </li>

            <li>
              <Link to={'/about'}>About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute top-40 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-active btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/auth/login">Login</Link>
                  </button>
                  <button className="btn-active btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/auth/signup">Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-0 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-active btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-active btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
