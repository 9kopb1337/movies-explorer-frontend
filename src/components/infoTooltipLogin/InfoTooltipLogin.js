import React from 'react';
import success from '../../images/icon_reg_success.svg';
import fail from '../../images/icon_reg_fail.svg';
import './InfoTooltipLogin.css';
import { SUCCES_LOGIN, FAIL_LOGIN } from '../../utils/constants';

export default function InfoTooltipLogin(props) {
  return (
    <div
      className={`popup popup_type_edit  popup_type_reg ${
        props.isOpen ? 'popup_opened' : ''
      }`}
      onClick={props.onClickClose}
    >
      <div className='popup__container'>
        <button
          className='popup__button popup__button_act_exit'
          type='button'
          value='close'
          onClick={props.onClickClose}
        ></button>
        <img
          className='popup__icon'
          src={props.succesLogin ? success : fail}
          alt={props.succesLogin ? 'Успех' : 'Провал'}
        ></img>
        <h2 className='popup__message'>
          {props.succesLogin ? SUCCES_LOGIN : FAIL_LOGIN}
        </h2>
      </div>
    </div>
  );
}
