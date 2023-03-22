import { useNavigate, Link } from 'react-router-dom';
import { auth }              from '../utils/auth';
import AuthForm              from './AuthForm';

function Login ({ handleLogin, openInfoToolTip, formData }) {

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    auth.login(formData.values.email, formData.values.password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        formData.setValues({
          email:    '',
          password: ''
        })
        handleLogin();
        navigate('/', {replace: true});
      })
      .catch((error) =>{
        openInfoToolTip('error', 'Неверный логин или пароль.');
        console.log(error);
      })
  }

  return (
    <AuthForm handleSubmit={handleSubmit}
              formData={formData}
              headingText={'Вход'}
              submitText={'Войти'}
    >
      <p className="auth__tip">
        Нет учетной записи? {<Link to="/sign-up" className="auth__link">
                                Зарегистрироваться
                             </Link>}
      </p>
    </AuthForm>
  );
}

export default Login;