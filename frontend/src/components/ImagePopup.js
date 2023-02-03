import React from 'react';
function ImagePopup(props) {
  let name = ''
  let link = '';  
  
  if (props.card) {    
    name = props.card.name;
    link = props.card.link;
  }
  return (    
      <div className={`popup popup_photo ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_photo">
          <button className="popup__close-icon popup__close-icon_photo" type="button" onClick={props.onClose}></button>
          <img className="popup__img" src={link} alt={name}/>
          <h2 className="popup__photo-description">{name}</h2>
        </div>
      </div>
  )
} 
export default ImagePopup;