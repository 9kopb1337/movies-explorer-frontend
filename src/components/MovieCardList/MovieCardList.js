import React from 'react';
import './MovieCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

export default function MovieCardList() {
  const page = useLocation();
  return (
    <div className='movie-cardlist'>
      <ul className='movie__list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button
        className={`movies__button${
          page.pathname === '/saved-movies' ? '_hidden' : ''
        }`}
        type='button'
      >
        Ещё
      </button>
    </div>
  );
}
