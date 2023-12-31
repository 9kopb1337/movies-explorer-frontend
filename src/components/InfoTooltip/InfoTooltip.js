import React from 'react';
import success from '../../images/icon_reg_success.svg';
import fail from '../../images/icon_reg_fail.svg';
import './InfoTooltip.css';
import { SUCCES_REG, FAIL_REG } from '../../utils/constants';

export default function InfoTooltip(props) {
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
          src={props.succesReg ? success : fail}
          alt={props.succesReg ? 'Успех' : 'Провал'}
        ></img>
        <h2 className='popup__message'>
          {props.succesReg ? SUCCES_REG : FAIL_REG}
        </h2>
      </div>
    </div>
  );
}
