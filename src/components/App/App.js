import React from 'react';
import Main from '../Main/Main';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFound';
import './App.css';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}
