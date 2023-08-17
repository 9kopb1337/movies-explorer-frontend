import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='login'>
      <div className='login__header'>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='лого' />
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
      </div>
      <form className='login__form'>
        <label className='login__label'>E-mail</label>
        <input
          className='login__input'
          name='email'
          type='email'
          required
          autoComplete='on'
        />
        <span className='login__error'>Что-то пошло не так...</span>
        <label className='login__label'>Пароль</label>
        <input
          className='login__input'
          name='password'
          type='password'
          required
          autoComplete='on'
        />
        <span className='login__error'>Что-то пошло не так...</span>
        <button className='login__button' type='submit'>
          Войти
        </button>
      </form>
      <div className='login__footer'>
        <span>
          Еще не зарегистрированы?
          <Link className='login__link' to='/signup'>
            Регистрация
          </Link>
        </span>
      </div>
    </div>
  );
}
