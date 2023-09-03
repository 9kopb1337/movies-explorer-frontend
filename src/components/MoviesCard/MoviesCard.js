import React from 'react';
import './MoviesCard.css';
import { durationMovieConverter } from '../../utils/utils';

export default function MoviesCard({
  movie,
  isSavedMovies,
  savedMovies,
  saved,
  handleLikeMovie,
  onRemoveMovie,
}) {

  function onRemove() {
    onRemoveMovie(movie);
  }

  function onMovieClick() {
    if (saved) {
      onRemoveMovie(savedMovies.filter((item) => item.movieId === movie.id)[0]);
    } else {
      handleLikeMovie(movie);
    }
  }
  
  return (
    <div className='movie'>
      {isSavedMovies ? (
        <button className='movie__favorite_cross' onClick={onRemove} />
      ) : (saved ?
        (<button className='movie__favorite_red' onClick={onMovieClick}/>) : (<button
          className='movie__favorite_gray'
          onClick={onMovieClick}
          type='checkbox'
        >
          Сохранить
        </button>)
      )}
      <img
        onClick={(e) => window.open(`${movie.trailerLink}`, '_blank')}
        className='movie__photo'
        src={
          isSavedMovies
            ? movie.image
            : `https://api.nomoreparties.co/${movie.image.url}`
        }
        alt={`Обложка фильма: ${movie.nameRU}`}
      />
      <div className='movie__description'>
        <h2 className='movie__name'>{movie.nameRU}</h2>
        <p className='movie__duration'>
          {durationMovieConverter(movie.duration)}
        </p>
      </div>
    </div>
  );
}
