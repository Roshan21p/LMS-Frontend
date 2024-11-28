// CSS imports
import './App.css';

// Library imports
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';

// Component imports

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
