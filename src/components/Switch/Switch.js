import React from 'react';
import './Switch.css';

export default function Switch() {
  return (
    <div className='switch'>
      <input type='checkbox' id='checkbox' className='switch__checkbox' />
      <label className='switch__label'>Короткометражки</label>
    </div>
  );
}
