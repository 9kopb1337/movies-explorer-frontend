import React from 'react';
import Header from '../Header/Header';
import './Profile.css';

export default function Profile() {
  return (
    <section>
      <Header />
      <div className='profile'>
        <h2 className='profile__title'>Привет, Виталий!</h2>
        <form className='profile__form'>
          <div className='profile__value'>
            <label className='profile__label'>Имя</label>
            <input type='text' className='profile__input' required />
          </div>
          <div className='profile__line'></div>
          <div className='profile__value'>
            <label className='profile__label'>E-mail</label>
            <input type='text' className='profile__input' required />
          </div>
        </form>
        <div className='profile__footer'>
          <button className='profile__edit'>Редактировать</button>
          <button className='profile__logout'>Выйти из аккаунта</button>
        </div>
      </div>
    </section>
  );
}
