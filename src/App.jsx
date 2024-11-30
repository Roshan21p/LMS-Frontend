import './App.css';

import { Route, Routes } from 'react-router-dom';

import AboutUs from './Pages/AboutUs';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import ContactUs from './Pages/ContactUs';
import HomePage from './Pages/HomePage';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>

        <Route path="/auth/signup" element={<Signup />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>

        <Route path="/contact" element={<ContactUs />}></Route>

        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
