
import './App.css';
// import { } from 'react-dom';
// import { Routes } from "react-router"
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';


function App() {

  return (
    <div
    className="bg-[url('./assets/bgImage.svg')] bg-contain
    bg-no-repeatbg-coverbg-center
    "
    >
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>

    </div>
  )
}

export default App
