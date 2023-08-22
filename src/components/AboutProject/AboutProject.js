import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about__title'>О проекте</h2>
      <div className='about-project-blocks'>
        <div className='about-project-block'>
          <h3>Дипломный проект включал 5 этапов</h3>
          <p>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project-block'>
          <h3>На выполнение диплома ушло 5 недель</h3>
          <p>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div>
        <div className='about-project-bar'>
          <div className='about-project__backend'>1 неделя</div>
          <div className='about-project__frontend'>4 недели</div>
        </div>
        <div className='about-project-text'>
          <div className='about-project__backend-text'>Back-end</div>
          <div className='about-project__frontend-text'>Front-end</div>
        </div>
      </div>
    </section>
  );
}
