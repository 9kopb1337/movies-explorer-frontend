import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

export default function Header({ isLoggedIn }) {
  //стейт для меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //управление стейтом открытого меню
  const menuHandler = () => setIsMenuOpen(!isMenuOpen);


  return (
    <header className='header'>
      <div className='header__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='лого' />
        </Link>
        {isLoggedIn ? (
          <div className='header__links'>
            <Link className='header__link' to='/movies'>
              Фильмы
            </Link>
            <Link className='header__link' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
          </div>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <Link className='header__info' to='/profile'>
            <button
              className='header__button-account'
              type='button'
            >
              Аккаунт
            </button>
          </Link>
        ) : (
          <>
            <div className='header__links'>
              <Link className='header__link header__link_reg' to='/signup'>
                Регистрация
              </Link>
              <Link className='header__link header__link_log' to='/signin'>
                <button className='header__button'>Войти</button>
              </Link>
            </div>
          </>
        )}
        {isLoggedIn && (
          <button
            className='header__button-menu'
            onClick={menuHandler}
          ></button>
        )}
      </div>

      <Navigation isOpen={isMenuOpen} onClose={menuHandler} />
    </header>
  );
}
