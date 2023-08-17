import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({ isOpen, onClose }) {
  const page = useLocation();

  return (
    <div className={`menu ${isOpen ? 'menu_visible' : ''}`}>
      <div className='menu__popup'>
        <div className='menu__container'>
          <button className='menu__close' onClick={onClose} />
          <div className='menu__open'>
            <Link
              className={
                page.pathname === '/' ? 'menu-link_active' : 'menu-link'
              }
              to='/'
            >
              Главная
            </Link>
            <Link
              className={
                page.pathname === '/' ? 'menu-link_active' : 'menu-link'
              }
              to='/movies'
            >
              Фильмы
            </Link>
            <Link
              className={
                page.pathname === '/' ? 'menu-link_active' : 'menu-link'
              }
              to='/saved-movies'
            >
              Сохраненные фильмы
            </Link>
          </div>
          <Link className='menu__account' to='/profile'>
            Аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}
