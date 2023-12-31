import React from 'react';
import './Registration.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function Registration({ onRegister }) {
  const { enteredValues, isError, isFormValid, handleChangeInput } = useForm();

  function onSubmitRegistrationForm(e) {
    e.preventDefault();
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    });
  }

  return (
    <section className='registration'>
      <div className='registration__header'>
        <Link to='/'>
          <img className='registration__logo' src={logo} alt='лого' />
        </Link>
        <h2 className='registration__title'>Добро пожаловать!</h2>
      </div>
      <form
        className='registration__form'
        onSubmit={onSubmitRegistrationForm}
      >
        <label className='registration__label'>Имя</label>
        <input
          className='registration__input'
          name='name'
          type='name'
          placeholder='Имя'
          required
          minLength='2'
          maxLength='30'
          value={enteredValues.name || ''}
          onChange={handleChangeInput}
        />
        <span className='registration__error'>{isError.name}</span>
        <label className='registration__label'>E-mail</label>
        <input
          className='registration__input'
          name='email'
          type='email'
          placeholder='Email'
          required         
          pattern="\w+@\w+\.\w+"
          value={enteredValues.email || ''}
          onChange={handleChangeInput}
        />
        <span className='registration__error'>{isError.email}</span>
        <label className='registration__label'>Пароль</label>
        <input
          className='registration__input'
          name='password'
          type='password'
          placeholder='Пароль'
          required
          minLength='8'
          value={enteredValues.password || ''}
          onChange={handleChangeInput}
        />
        <span className='registration__error'>{isError.password}</span>
        <button
          className={
            isFormValid
              ? 'registration__button'
              : 'registration__button_disabled'
          }
          type='submit'
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='registration__footer'>
        <span>
          Уже зарегистрированы?
          <Link className='registration__link' to='/signin'>
            Войти
          </Link>
        </span>
      </div>
    </section>
  );
}
