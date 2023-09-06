import React, { useState, useEffect } from 'react';
import Main from '../Main/Main';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFound';
import './App.css';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [succes, setSucces] = useState(false);

  function closeInfoTooltip() {
    setInfoTooltip(false);
  }

  function handleRegistration({ name, email, password }) {
    
    mainApi
      .register(name, email, password)
      .then(() => {
        setSucces(true);
        setInfoTooltip(true);
        handleAuthorization({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setSucces(false);
        setInfoTooltip(true);
      });
  }

  function handleAuthorization({ email, password }) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          navigate('/movies', { replace: true });          
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSucces(false);
        setInfoTooltip(true);
      })
  }

  function handlePatchProfile(newProfileInfo) {
    mainApi
      .patchProfileInfo(newProfileInfo)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleAuthorizationError(err) {
    if (err === 'Error: 401') {
      handleLogOut();
    }
  }

  function handleLikeMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  function handleRemoveMovie(movie) {
    mainApi
      .removeMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => 
          state.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);    
    localStorage.clear();
    localStorage.removeItem('jwt');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('movieSearch');
    localStorage.removeItem('movies');
    localStorage.removeItem('shortMovies');
    navigate('/');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUsersContent(jwt)
        .then((res) => {
          localStorage.removeItem('allMovies');
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(122, err);
        });
    }
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn && jwt) {
      Promise.all([mainApi.getProfileInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser({ name: user.name, email: user.email });
          setSavedMovies(movies.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route exact path={'/'} element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path={'*'} element={<NotFoundPage />} />
          <Route
            path={'/signup'}
            element={
              isLoggedIn ? (
                <Navigate to='/movies' replace />
              ) : (
                <Registration onRegister={handleRegistration} />
              )
            }
          />
          <Route
            path={'/signin'}
            element={
              isLoggedIn ? (
                <Navigate to='/movies' replace />
              ) : (
                <Login onAuthorization={handleAuthorization} />
              )
            }
          />
          <Route
            path={'/movies'}
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                handleLikeMovie={handleLikeMovie}
                onRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path={'/saved-movies'}
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                handleLikeMovie={handleLikeMovie}
                onRemoveMovie={handleRemoveMovie}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path={'/profile'}
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Profile}
                logOut={handleLogOut}
                onUpdateProfile={handlePatchProfile}
              />
            }
          />
        </Routes>
        <InfoTooltip onClickClose={closeInfoTooltip} succes={succes} isOpen={infoTooltip} />
      </div>
    </CurrentUserContext.Provider>
  );
}
