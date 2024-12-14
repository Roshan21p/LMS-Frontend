import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCourse, getAllCourses } from '../../Redux/Slices/CourseSlice';
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice';
import { getStatsData } from '../../Redux/Slices/StatSlice';
import AdminDashboardPresentation from './AdminDashboardPresentation';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { allUsersCount, subscribedUsersCount } = useSelector((state) => state?.stat);
  const { monthlySalesRecord } = useSelector((state) => state?.razorpay);

  const userData = {
    labels: ['Registered User', 'Enrolled User'],
    fontColor: 'white',
    datasets: [
      {
        label: 'User Details',
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ['yellow', 'green'],
        borderWidth: 2,
        borderColor: ['yellow', 'green']
      }
    ]
  };

  const salesData = {
    labels: [
      'January',
      'Febraury',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    fontColor: 'white',
    datasets: [
      {
        label: 'Sales / Month',
        data: monthlySalesRecord?.map((value) => (isNaN(value) || value === null ? 0 : value)),
        backgroundColor: ['rgb(255, 99, 132)'],
        borderColor: ['white'],
        borderWidth: 2
      }
    ]
  };

  // function to handle the course delete
  const handleCourseDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete the course?')) {
      const res = await dispatch(deleteCourse(id));

      // fetching the new updated data for the course
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);
  return (
    <AdminDashboardPresentation
      handleCourseDelete={handleCourseDelete}
      salesData={salesData}
      userData={userData}
    />
  );
};

export default AdminDashboard;
