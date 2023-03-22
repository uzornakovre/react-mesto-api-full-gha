import InfoToolTip from './InfoToolTip';

function AuthForm({ handleSubmit, 
                    formData, 
                    headingText,
                    submitText,
                    children }) {

  return (
    <>
      <form className="auth"
            onSubmit={handleSubmit}
            noValidate
      >
        <div className="auth__top">
          <h2 className="auth__title">{headingText}</h2>
          <input type="email"
                 name="email"
                 className={`auth__input auth__input_type_email ${
                   formData.errors.email && 'auth__input_error'   
                 }`}
                 placeholder="Email"
                 onChange={formData.handleChange}
                 value={formData.values.email || ''}
                 required
          />
          <span className="auth__input-error">
            {formData.errors.email}
          </span>
          <input type="password"
                 name="password"
                 className={`auth__input auth__input_type_password ${
                   formData.errors.password && 'auth__input_error'   
                 }`}
                 placeholder="Пароль"
                 minLength="4"
                 maxLength="12"
                 onChange={formData.handleChange}
                 value={formData.values.password || ''}
                 required
          />
          <span className="auth__input-error">
            {formData.errors.password}
          </span>
          {children && children[1]}
        </div>
        <div className="auth__bottom">
          <button type="submit" 
                  className={`auth__submit ${!formData.isValid && 'auth__submit_disabled'}`}
                  disabled={!formData.isValid}>
            {submitText}
          </button>
          {children && (children[0] || children)}
        </div>
      </form>
      <InfoToolTip />
    </>
  )
}

export default AuthForm;