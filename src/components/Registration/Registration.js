import React from 'react';
import './Registration.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Registration() {
  return (
    <div className='registration'>
      <div className='registration__header'>
        <Link to='/'>
          <img className='registration__logo' src={logo} alt='лого' />
        </Link>
        <h2 className='registration__title'>Добро пожаловать!</h2>
      </div>
      <form className='registration__form'>
        <label className='registration__label'>Имя</label>
        <input
          className='registration__input'
          name='name'
          type='name'
          required
          autoComplete='on'
        />
        <span className='registration__error'></span>
        <label className='registration__label'>E-mail</label>
        <input
          className='registration__input'
          name='email'
          type='email'
          required
          autoComplete='on'
        />
        <span className='registration__error'>Что-то пошло не так...</span>
        <label className='registration__label'>Пароль</label>
        <input
          className='registration__input'
          name='password'
          type='password'
          required
          autoComplete='on'
        />
        <span className='registration__error'>Что-то пошло не так...</span>
        <button className='registration__button' type='submit'>
          Войти
        </button>
      </form>
      <div className='registration__footer'>
        <span>
          Уже зарегистрированы?
          <Link className='registration__link' to='/signin'>
            Вход
          </Link>
        </span>
      </div>
    </div>
  );
}
