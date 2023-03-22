import { Link, useNavigate } from 'react-router-dom';
import AuthForm              from './AuthForm';
import { auth }              from '../utils/auth';

function Register({ openInfoToolTip, formData }) {

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    if (formData.values.password === formData.values.passwordConfirm) {
      auth.register(formData.values.email, formData.values.password)
        .then((res) => {
          if (!res.error && !res.message) {
            openInfoToolTip('confirm', 'Вы успешно зарегистрировались');
            navigate('/sign-in', {replace: true});
          } else if (!res.error) {
            openInfoToolTip('error', 'Вы ввели некорректный email. Попробуйте еще раз');
          } else {
            openInfoToolTip('error', res.error);
          }
        })
    } else openInfoToolTip('error', 'Пароли не совпадают. Попробуйте еще раз')
  }

  return (
    <AuthForm handleSubmit={handleSubmit}
              headingText={'Регистрация'}
              submitText={'Зарегистрироваться'}
              formData={formData}
    > 
      <p className="auth__tip">
        Уже зарегистрированы? {<Link to="/sign-in" className="auth__link">
                                Войти
                              </Link>}
      </p>
      <div>  
        <input type="password"
               name="passwordConfirm"
               className={`auth__input auth__input_type_password ${
                 formData.errors.password && 'auth__input_error'   
               }`}
               placeholder="Повторите пароль"
               minLength="4"
               maxLength="12"
               onChange={formData.handleChange}
               value={formData.values.passwordConfirm || ''}
               required
        />
        <span className="auth__input-error">
          {formData.errors.passwordConfirm}
        </span>
      </div>
    </AuthForm>
  );
}

export default Register;