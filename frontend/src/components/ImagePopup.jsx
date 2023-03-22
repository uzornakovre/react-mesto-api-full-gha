function ImagePopup({ card, onClose, onOverlayClick }) {

  return (
    <div className={`popup popup_type_image ${
          card.name && card.link ? "popup_opened" : ""
         }`}
         onMouseDown={onOverlayClick}
    >
      <div className="popup__container popup__container_type_image">
        <button className="popup__close"
                id="close-image" 
                type="button"
                onMouseDown={onClose}
        ></button>
        <figure className="popup__image-wrapper">
          <img className="popup__image" 
               src={card.link}
               alt={`Изображение ${card.name}`} />
          <figcaption className="popup__image-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;