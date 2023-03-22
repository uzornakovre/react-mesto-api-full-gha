import { useContext,
         useEffect }          from 'react';
import PopupWithForm          from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen,
                            onClose,
                            formData,
                            onUpdateUser,
                            isLoading,
                            onOverlayClick }) {

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name:  formData.values.name,
      about: formData.values.description
    });
  }
 
  useEffect(() => {
    formData.setValues({
      name:        currentUser.name,
      description: currentUser.about
    })
  }, [isOpen]);

  return (
    <PopupWithForm name={'edit-profile'}
                   title={'Редактировать профиль'}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isValid={formData.isValid}
                   onOverlayClick={onOverlayClick}
                   buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input type="text"
             className={`popup__form-input popup__form-input_content_name ${
               formData.errors.name && 'popup__form-input_error'
             }`}
             id="name"
             name="name"
             placeholder="Имя"
             minLength="2"
             maxLength="40"
             value={formData.values.name || ''}
             onChange={formData.handleChange}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_name">
        {formData.errors.name}
      </span>
      <input type="text"
             className={`popup__form-input popup__form-input_content_job ${
               formData.errors.description && 'popup__form-input_error'
             }`}
             id="job"
             name="description"
             placeholder="Профессия"
             minLength="2"
             maxLength="200"
             value={formData.values.description || ''}
             onChange={formData.handleChange}
             required
      />
      <span className="popup__form-input-error popup__form-input-error_content_job">
        {formData.errors.description}
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;