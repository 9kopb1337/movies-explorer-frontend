import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MovieCardList from '../MovieCardList/MovieCardList';

export default function SavedMovies() {
  return (
    <section>
      <Header />
      <SearchForm />
      <MovieCardList />
      <Footer />
    </section>
  );
}
