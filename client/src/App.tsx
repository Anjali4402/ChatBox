
import './App.css';
// import { } from 'react-dom';
// import { Routes } from "react-router"
import { Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/profile' element={<ProfilePage />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App
