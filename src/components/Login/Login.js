import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function Login({ onAuthorization }) {
  const { enteredValues, isError, isFormValid, handleChangeInput } = useForm();

  function onSubmitLoginForm(e) {
    e.preventDefault();

    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <section className='login'>
      <div className='login__header'>
        <Link to='/'>
          <img className='login__logo' src={logo} alt='лого' />
        </Link>
        <h2 className='login__title'>Рады видеть!</h2>
      </div>
      <form className='login__form' onSubmit={onSubmitLoginForm} noValidate>
        <label className='login__label'>E-mail</label>
        <input
          className='login__input'
          name='email'
          type='email'
          required
          autoComplete='on'
          value={enteredValues.email || ''}
          onChange={handleChangeInput}
        />
        <span className='login__error'>{isError.emailErr}</span>
        <label className='login__label'>Пароль</label>
        <input
          className='login__input'
          name='password'
          type='password'
          required
          autoComplete='on'
          minLength='8'
          value={enteredValues.password || ''}
          onChange={handleChangeInput}
        />
        <span className='login__error'>{isError.passwordErr}</span>
        <button
          className={isFormValid ? 'login__button' : 'login__button_disabled'}
          type='submit'
        >
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
    </section>
  );
}
