import './App.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from './Pages/AboutUs';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ContactUs from './Pages/ContactUs';
import CourseDescription from './Pages/Courses/CourseDescription';
import CourseList from './Pages/Courses/CourseList';
import CreateCourse from './Pages/Courses/CreateCourse';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import NotFound from './Pages/NotFound';
import ChangePassword from './Pages/Password/ChangePassword';
import ForgotPassword from './Pages/Password/ForgotPassword';
import ResetPassword from './Pages/Password/ResetPassword';
import Checkout from './Pages/Payments/Checkout';
import CheckoutFailure from './Pages/Payments/CheckoutFailure';
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess';
import EditProfile from './Pages/User/EditProfile';
import Profile from './Pages/User/Profile';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>

        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/course/description" element={<CourseDescription />}></Route>

        <Route path="/denied" element={<Denied />}></Route>

        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />}></Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/editprofile" element={<EditProfile />}></Route>
          <Route path="/user/changepassword" element={<ChangePassword />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
        </Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
