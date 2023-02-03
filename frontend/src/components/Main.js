//asf
import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
    <section className="profile">
        <button className="profile__avatar-btn">
        <div className="profile__avatar-edit-img">
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар автора фоторабот" onClick={props.onEditAvatarClick}/>
        </div>
    </button>
    <div className="profile__info">
        <h1 className="profile__info-name">{currentUser.name}</h1>
        <button name="edit" className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
        <p className="profile__info-description">{currentUser.about}</p>
    </div>
    <button name="add" type="button" className="profile__add-button" onClick={props.onAddPlaceClick}></button>
    </section>
    <section className="elements">      
      {props.cards.map((card) => (
        <Card           
          card={card} 
          key={card._id}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />
      ))}
    </section>
    </main>
    )
};

export default Main;