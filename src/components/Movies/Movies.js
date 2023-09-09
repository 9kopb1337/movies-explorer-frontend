import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MovieCardList from '../MovieCardList/MovieCardList';
import Preloader from '../Preloader/Preloader';
import { filterMovies, filterShortMovies } from '../../utils/utils';
import * as movies from '../../utils/MoviesApi';

export default function Movies({
  isLoggedIn,
  isLoading,
  handleLikeMovie,
  savedMovies,
  onRemoveMovie
}) {
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function handleShortMovieToggle() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (filterShortMovies(initialMovies).length === 0) {
        setFilteredMovies(filterShortMovies(initialMovies));
      } else {
        setFilteredMovies(filterShortMovies(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  function updateFilteredMoviesList(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short);
    setInitialMovies(moviesCardList);
    setFilteredMovies(
      short ? filterShortMovies(moviesCardList) : moviesCardList
    );
    localStorage.setItem('movies', JSON.stringify(moviesCardList));
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  function searchAndFilterMovies(query) {
    localStorage.setItem('movieSearch', query);
    localStorage.setItem('shortMovies', shortMovies);
    if (localStorage.getItem('allMovies')) {
      const movies = JSON.parse(localStorage.getItem('allMovies'));
      updateFilteredMoviesList(movies, query, shortMovies);
    } else {
      movies
        .getMovies()
        .then((moviesData) => {
          updateFilteredMoviesList(moviesData, query, shortMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      if (filteredMovies.length === 0) {
        console.log('Не найдено фильмов');
      } else {
        console.log(76, 'вот фильмы');
      }
    } else {
      console.log(79, 'вот фильмы');
    }
  }, [filteredMovies]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <section>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        searchAndFilterMovies={searchAndFilterMovies}
        shortMovies={shortMovies}
        onFilterMovies={handleShortMovieToggle}
        filteredMovies={filteredMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MovieCardList
          movies={filteredMovies}
          isSavedMovies={false}
          savedMovies={savedMovies}
          handleLikeMovie={handleLikeMovie}
          onRemoveMovie={onRemoveMovie}
        />
      )}
      <Footer />
    </section>
  );
}
