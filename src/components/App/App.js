import React, { useState, useEffect } from 'react';
import Main from '../Main/Main';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFound';
import './App.css';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      console.log(jwt);
      mainApi
        .getUsersContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem('allMovies');
            setIsLoggedIn(true);
            console.log(jwt);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getProfileInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
          console.log(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleRegistration({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAuthorization({ email, password }) {
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePatchProfile(newProfileInfo) {
    mainApi
      .patchProfileInfo(newProfileInfo)
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        console.log(newProfileInfo);
        console.log(currentUser);
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

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('movieSearch');
    localStorage.removeItem('shortMovies');
    localStorage.removeItem('allMovies');
    localStorage.clear();
    navigate('/');
  };

  function handleLikeMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([ newMovie, ...savedMovies ]);
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
        setSavedMovies((movie) => {
          movie.filter((item) => item._id !== movie._id);
        });
      })
      .catch((err) => {
        console.log(err);
        handleAuthorizationError(err);
      });
  }

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
                handlePatchProfile={handlePatchProfile}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
