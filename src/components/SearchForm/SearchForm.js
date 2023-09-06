import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import Switch from '../Switch/Switch';

export default function SearchForm({
  isShortMovies,
  searchAndFilterMovies,
  onFilterMovies,
}) {
  const [searchRequest, setSearchRequest] = useState('');
  const [searchError, setSearchError] = useState(false);

  function onSubmitForm(e) {
    e.preventDefault();
    if (searchRequest.trim().length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false);
      searchAndFilterMovies(searchRequest);
    }
  }

  function handleChangeInput(e) {
    setSearchRequest(e.target.value);
  }

  useEffect(() => {
    if (localStorage.getItem('movieSearch')) {
      const localSearchRequest = localStorage.getItem('movieSearch');
      setSearchRequest(localSearchRequest);
    }
  }, []);

  return (
    <section className='search'>
      <form
        className='search__form'
        name='search-saved-movie-form'
        onSubmit={onSubmitForm}
      >
        <input
          className='search__input'
          type='text'
          placeholder='Фильм'
          required
          name='searchRequest'
          value={searchRequest || ''}
          onChange={handleChangeInput}
        />
        <button className='search__button' type='submit' />
      </form>
      <Switch isShortMovies={isShortMovies} onFilterMovies={onFilterMovies} />
      <div className='search__underline' />
    </section>
  );
}
