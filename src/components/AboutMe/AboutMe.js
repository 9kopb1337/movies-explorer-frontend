import React from 'react';
import './AboutMe.css';
import photo from '../../images/Vitalya.png';

export default function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__content'>
        <div className='about-me__info'>
          <span className='about-me__name'>Виталий</span>
          <span className='about-me__job'>Фронтенд-разработчик, 30 лет</span>
          <span className='about-me__bio'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
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
