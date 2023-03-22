function PopupWithForm({ name,
                         title,
                         isOpen,
                         onClose,
                         onSubmit,
                         isValid,
                         buttonText,
                         onOverlayClick,
                         children }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
         onMouseDown={onOverlayClick}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close"
                id={`close-${name}`}
                type="button"
                onMouseDown={onClose}
        >
        </button>
        <form className="popup__form"
              name={name}
              id={name}
              onSubmit={onSubmit}
              noValidate
        >
          <h2 className={`popup__form-title popup__form-title_place_${name}`}>{title}</h2>
            {children}
          <button type="submit"
                  className={`popup__form-submit ${!isValid && 'popup__form-submit_disabled'}`}
                  disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>  
  )
}

export default PopupWithForm;