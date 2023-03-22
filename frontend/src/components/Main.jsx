import { useContext }         from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card                   from './Card';

function Main({ onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
                onDeleteClick,
                onCardLike,
                cards }) {

  const currentUser  = useContext(CurrentUserContext);
  const cardElements = cards.map(card => (
    <li key={card._id}>
      <Card card={card}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteClick}
            onCardLike={onCardLike}
      />
    </li>
  ))

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container"
             onClick={onEditAvatar}
        >
          <img className="profile__avatar"
               src={currentUser.avatar}
               alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__button-edit" 
                  type="button"
                  onClick={onEditProfile}
          >
          </button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" 
                type="button"
                onClick={onAddPlace}
        >
        </button>
      </section>
      <section className="elements" aria-label="Блок с карточками">
        <ul className="elements__list">
          {cardElements}
        </ul>
      </section>
    </main>
  )
}

export default Main;