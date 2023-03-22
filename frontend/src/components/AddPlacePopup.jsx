import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen,
                         formData,
                         onClose,
                         onAddPlace,
                         isLoading,
                         onOverlayClick }) {

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({ 
      placeName: formData.values.placeName,
      placeLink: formData.values.imageUrl
    });

    formData.resetFormValues();
  }

  return (
    <PopupWithForm name={'new-place'}
                   title={'Новое место'}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isValid={formData.isValid}
                   onOverlayClick={onOverlayClick}
                   buttonText={isLoading ? 'Создание карточки...' : 'Создать'}
    >
      <input type="text"
             className={`popup__form-input popup__form-input_content_place ${
               formData.errors.placeName && 'popup__form-input_error'
             }`}
             id="place"
             name="placeName"
             placeholder="Название"
             minLength="2"
             maxLength="30"
             value={formData.values.placeName || ''}
             onChange={formData.handleChange}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_place">
        {formData.errors.placeName}
      </span>
      <input type="url" 
             className={`popup__form-input popup__form-input_content_avatar ${
               formData.errors.imageUrl && 'popup__form-input_error'
             }`}
             id="url"
             name="imageUrl"
             placeholder="Ссылка на картинку"
             value={formData.values.imageUrl || ''}
             onChange={formData.handleChange}
             required />
      <span className="popup__form-input-error popup__form-input-error_content_url">
        {formData.errors.imageUrl}
      </span>
    </PopupWithForm>  
  )
}

export default AddPlacePopup;