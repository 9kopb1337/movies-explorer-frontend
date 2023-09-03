import React from 'react';
import './Switch.css';

export default function Switch({ onFilterMovies, isShortMovies }) {
  return (
    <div className='switch'>
      <input type='checkbox' id='checkbox' className='switch__checkbox' required onChange={onFilterMovies} checked={isShortMovies}/>
      <label className='switch__label'>Короткометражки</label>
    </div>
  );
}
