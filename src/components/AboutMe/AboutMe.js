import React from 'react';
import './AboutMe.css';
import photo from '../../images/maphoto.jpg';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__content'>
        <div className='about-me__info'>
          <span className='about-me__name'>Никита</span>
          <span className='about-me__job'>Фронтенд-разработчик, 28 лет</span>
          <span className='about-me__bio'>
            Я родился и живу в Москве, закончил факультет АВТИ (НИУ МЭИ). Я люблю слушать музыку и играть на басу, а ещё увлекаюсь
            занятиями спортом. Ранее работал тестировщиком. После того, как прошёл курс по веб-разработке, начал
            заниматься пет-проектами и активно искать новое место работы.
          </span>
          <a className='about-me__link' href='none'>
            GitHub
          </a>
        </div>
        <img className='about-me__photo' src={photo} alt='Фото' />
      </div>
    </section>
  );
}
