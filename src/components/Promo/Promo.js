import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

export default function Promo() {
  return (
    <div className='promo'>
      <h1 className='promo-text'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </div>
  );
}
