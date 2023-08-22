import React, { useState } from 'react';
import './MoviesCard.css';
import moviePhoto from '../../images/pic__COLOR_pic.png';
import { useLocation } from 'react-router-dom';

export default function MoviesCard() {
  const [isSaved, setIsSaved] = useState(false);
  const saveMovie = () => setIsSaved(!isSaved);
  const savedMovies = useLocation();
  return (
    <div className='movie'>
      {savedMovies.pathname === '/saved-movies' ? (
        <button className='movie__favorite_cross' />
      ) : isSaved ? (
        <button
          className='movie__favorite_red'
          onClick={saveMovie}
          type='checkbox'
        />
      ) : (
        <button
          className='movie__favorite_gray'
          onClick={saveMovie}
          type='checkbox'
        >
          Сохранить
        </button>
      )}
      <img className='movie__photo' src={moviePhoto} alt='movie' />
      <div className='movie__description'>
        <h2 className='movie__name'>Баския: Взрыв реальности</h2>
        <p className='movie__duration'>1ч 17м</p>
      </div>
    </div>
  );
}
