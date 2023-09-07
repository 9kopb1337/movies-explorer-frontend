import React from 'react';
import success from '../../images/icon_reg_success.svg';
import fail from '../../images/icon_reg_fail.svg';
import './InfoTooltipEdit.css';
import { SUCCES_EDIT } from '../../utils/constants';

export default function InfoTooltipEdit(props) {
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
          src={props.succesEdit ? success : fail}
          alt={props.succesEdit ? 'Успех' : 'Провал'}
        ></img>
        <h2 className='popup__message'>
          {props.succesEdit ? SUCCES_EDIT : ''}
        </h2>
      </div>
    </div>
  );
}
