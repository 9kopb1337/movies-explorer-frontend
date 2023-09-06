import React, { useState, useEffect } from 'react';
import './MovieCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import {
  NEXT_MOBILE_SCREEN_MOVIES,
  NEXT_PC_SCREEN_MOVIES,
  NEXT_TABLET_SCREEN_MOVIES,
} from '../../utils/constants';

export default function MovieCardList({
  movies,
  isSavedMovies,
  savedMovies,
  handleLikeMovie,
  onRemoveMovie,
}) {
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const { pathname } = useLocation();

  function getMovieFromSaved(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  function setDisplayedMoviesCount() {
    const display = window.innerWidth;
    if (display > 1279) {
      setDisplayedMovies(12);
    } else if (display > 768) {
      setDisplayedMovies(8);
    } else {
      setDisplayedMovies(5);
    }
  }

  function expandMoviesDisplay() {
    const display = window.innerWidth;
    if (display >= 1280) {
      setDisplayedMovies(displayedMovies + NEXT_PC_SCREEN_MOVIES);
    } else if (display >= 768) {
      setDisplayedMovies(displayedMovies + NEXT_TABLET_SCREEN_MOVIES);
    } else {
      setDisplayedMovies(displayedMovies + NEXT_MOBILE_SCREEN_MOVIES);
    }
  }

  useEffect(() => {
    let resizeTimeout;

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDisplayedMoviesCount();
      }, 100);
    }
    setDisplayedMoviesCount();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className='movie-cardlist'>
      {pathname === '/saved-movies' ? (
        <ul className='movie__list'>
          {movies.map((movie) => {
            return (
              <MoviesCard
                key={isSavedMovies ? movie._id : movie.id}
                saved={getMovieFromSaved(savedMovies, movie)}
                movies={movies}
                movie={movie}
                handleLikeMovie={handleLikeMovie}
                isSavedMovies={isSavedMovies}
                onRemoveMovie={onRemoveMovie}
                savedMovies={savedMovies}
              />
            );
          })}
        </ul>
      ) : (
        <>
          <ul className='movie__list'>
            {movies.slice(0, displayedMovies).map((movie) => {
              return (
                <MoviesCard
                  key={isSavedMovies ? movie._id : movie.id}
                  saved={getMovieFromSaved(savedMovies, movie)}
                  movies={movies}
                  movie={movie}
                  handleLikeMovie={handleLikeMovie}
                  isSavedMovies={isSavedMovies}
                  onRemoveMovie={onRemoveMovie}
                  savedMovies={savedMovies}
                />
              );
            })}
          </ul>
          {movies.length > displayedMovies ? (
            <button
              onClick={expandMoviesDisplay}
              className={`movies__button${
                pathname === '/saved-movies' ? '_hidden' : ''
              }`}
              type='button'
            >
              Ещё
            </button>
          ) : (
            ''
          )}
        </>
      )}
    </section>
  );
}
