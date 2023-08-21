import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__not-found'>Страница не найдена</span>
      </div>
      <Link to='/' className='page__link'>
        Назад
      </Link>
    </div>
  );
}
