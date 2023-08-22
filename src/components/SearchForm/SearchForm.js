import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <input className='search__input' type='text' placeholder='Фильм' required/>
        <button className='search__button' />
      </form>
      <div className='switch'>
        <input className='switch__checkbox' id='checkbox' type='checkbox' />
        <label className='switch__label'>Короткометражки</label>
      </div>
      <div className='search__underline' />
    </section>
  );
}
