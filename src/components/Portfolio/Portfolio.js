import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__projects'>
        <li>
          <a
            className='portfolio__link'
            href='https://github.com/9kopb1337/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
            <span className='arrow'/>
          </a>
        </li>
        <li>
          <a
            className='portfolio__link'
            href='https://github.com/9kopb1337/yet-another-travel'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
            <span className='arrow'/>
          </a>
        </li>
        <li>
          <a
            className='portfolio__link'
            href='https://github.com/9kopb1337/express-mesto-gha'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
            <span className='arrow'/>
          </a>
        </li>
      </ul>
    </div>
  );
}
