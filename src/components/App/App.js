import React, { useState, useEffect } from 'react';
import Main from '../Main/Main';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFound';
import './App.css';
import Header from '../Header/Header';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import InfoTooltipEdit from '../InfoTooltipEdit/InfoTooltipEdit';
import InfoTooltipLogin from '../infoTooltipLogin/InfoTooltipLogin';
import Footer from '../Footer/Footer';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoToolTipLogin, setInfoToolTipLogin] = useState(false);
  const [infoToolTipEdit, setInfoToolTipEdit] = useState(false);
  const [succesReg, setSuccesReg] = useState(false);
  const [succesLogin, setSuccesLogin] = useState(false);
  const [succesEdit, setSuccessEdit] = useState(false);
  const [preLoader, setPreLoader] = useState(false);

  function closeInfoTooltip() {
    setInfoTooltip(false);
    setInfoToolTipLogin(false);
    setInfoToolTipEdit(false);
  }

  function handleRegistration({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then(() => {
        setSuccesReg(true);
        setInfoTooltip(true);
        handleAuthorization({ email, password });
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        setSuccesReg(false);
        setInfoTooltip(true);
      });
  }

  function handleAuthorization({ email, password }) {
    setPreLoader(true);
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          navigate('/movies', { replace: true });
          setIsLoggedIn(true);
          setSuccesLogin(true);
          setInfoToolTipLogin(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccesLogin(false);
        setInfoToolTipLogin(true);
      })
      .finally(() => {
        setPreLoader(false);
      });
  }

  function handlePatchProfile(newProfileInfo) {
    mainApi
      .patchProfileInfo(newProfileInfo)
      .then((data) => {
        setCurrentUser(data);
        setSuccessEdit(true);
        setInfoToolTipEdit(true);
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
          navigate(path);
        })
        .catch((err) => {
          console.log(122, err);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('shortMovies');
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
          <Route
            path={'/'}
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route path={'*'} element={<NotFoundPage />} />
          <Route
            path={'/signup'}
            element={
              isLoggedIn ? (
                <Navigate to='/movies' replace />
              ) : (
                <Registration
                  preLoader={preLoader}
                  onRegister={handleRegistration}
                />
              )
            }
          />
          <Route
            path={'/signin'}
            element={
              isLoggedIn ? (
                <Navigate to='/movies' replace />
              ) : (
                <Login
                  preLoader={preLoader}
                  onAuthorization={handleAuthorization}
                />
              )
            }
          />
          <Route
            path={'/movies'}
            element={
              <ProtectedRoute
                path='/movies'                
                isLoggedIn={isLoggedIn}
                element={Movies}
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
                path='/saved-movies'                
                isLoggedIn={isLoggedIn}
                element={SavedMovies}
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
                path='/profile'
                isLoggedIn={isLoggedIn}
                element={Profile}
                logOut={handleLogOut}
                onUpdateProfile={handlePatchProfile}
              />
            }
          />
        </Routes>
        <InfoTooltip
          onClickClose={closeInfoTooltip}
          succesReg={succesReg}
          isOpen={infoTooltip}
        />
        <InfoTooltipEdit
          succesEdit={succesEdit}
          isOpen={infoToolTipEdit}
          onClickClose={closeInfoTooltip}
        />
        <InfoTooltipLogin
          succesLogin={succesLogin}
          isOpen={infoToolTipLogin}
          onClickClose={closeInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
