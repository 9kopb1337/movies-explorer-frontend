import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__projects'>
        <li>
          <a className='portfolio__link' href='github.com'>
            Статичный сайт
          </a>
          <a className='portfolio__link' href='github.com'>
            ↗
          </a>
        </li>
        <li>
          <a className='portfolio__link' href='github.com'>
            Адаптивный сайт
          </a>
          <a className='portfolio__link' href='github.com'>
            ↗
          </a>
        </li>
        <li>
          <a className='portfolio__link' href='github.com'>
            Одностраничное приложение
          </a>
          <a className='portfolio__link' href='github.com'>
            ↗
          </a>
        </li>
      </ul>
    </div>
  );
}
