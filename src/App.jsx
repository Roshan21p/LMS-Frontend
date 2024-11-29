// CSS imports
import './App.css';

// Library imports
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';

// Component imports

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
      </Routes>
    </>
  );
}

export default App;
