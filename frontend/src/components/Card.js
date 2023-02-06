import { React, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  // visibility of trash btns and likes
  // eslint-disable-next-line no-underscore-dangle
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (`element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`);

  // eslint-disable-next-line no-underscore-dangle
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (`element__heart ${isLiked ? 'element__heart_enabled' : ''}`);

  return (
    <div className="element">
      <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleCardClick} />
      <button className={cardDeleteButtonClassName} type="button" title="Удалить фото" onClick={handleCardDelete} />
      <div className="element__footer">
        <h2 className="element__caption">{props.card.name}</h2>
        <div className="element__heart-container">
          <button type="button" className={cardLikeButtonClassName} title="like" onClick={handleLikeClick} />
          <span className="element__heart-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
