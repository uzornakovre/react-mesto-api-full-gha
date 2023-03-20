import { useContext }         from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card,
                onCardClick,
                onDeleteClick,
                onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn       = card.owner._id === currentUser._id;
  const isLiked     = card.likes.some(like => like._id === currentUser._id);
  
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <div className="elements__list-item">
      <article className="element">
        <img className="element__image" 
             src={card.link}
             alt={`Изображение ${card.name}`}
             onClick={handleClick}
        />
        <div className="element__caption">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like">
            <button className={`element__button-like ${isLiked && 'element__button-like_active'}`}
                    type="button"
                    onClick={handleLikeClick}
            ></button>
            <p className = "element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </article>
      {isOwn && <button className="elements__button-remove elements__button-remove_active"
                        type="button"
                        onClick={handleDeleteClick}></button>}
    </div>
  )
}

export default Card;