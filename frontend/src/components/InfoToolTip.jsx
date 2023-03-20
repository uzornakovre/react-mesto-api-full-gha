import infoToolTipError    from '../images/popup__tip-error.svg';
import infoToolTipConfirm  from '../images/popup__tip-complete.svg';

function InfoToolTip ({ isOpen,
                        type,
                        message,
                        onClose,
                        onOverlayClick }) {
  return (
    <div className={`popup popup_type_${type} ${isOpen && 'popup_opened'}`}
         onMouseDown={onOverlayClick}
    >
      <div className={`popup__container popup__container_type_${type}`}>
        <button className="popup__close"
                id={`close-${type}`}
                type="button"
                onMouseDown={onClose}
        >
        </button>
        <div className="popup__message">
          {type === 'error' && 
          <img className="popup__message-icon" src={infoToolTipError} alt="Иконка ошибки" />
          }
          {type === 'confirm' && 
          <img className="popup__message-icon" src={infoToolTipConfirm} alt="Иконка подтверждения" />
          }
          <p className="popup__form-title 
                        popup__form-title_place_info-tool-tip">{message}</p>
        </div>
      </div>
    </div>  
  )
}

export default InfoToolTip;