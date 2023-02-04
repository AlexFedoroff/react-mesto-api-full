import React from 'react';

function InfoTooltip(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div className={`popup ${props.isOpen && ' popup_opened'}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <img className="popup__auth-res-img" src={props.infoImg} alt="Изображение статуса успешности авторизации" />
        <h2 className="popup__infotext">{props.infoMsg}</h2>
        <button className="popup__close-icon" type="button" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
