import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return (
    !props.loggedIn ? <Navigate to="/sign-in" replace /> : <Component {...props} /> 
  )
}

export default ProtectedRouteElement;