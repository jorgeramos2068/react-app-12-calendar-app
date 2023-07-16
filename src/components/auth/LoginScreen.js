import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import useForm from '../../hooks/useForm';
import './login.css';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const initialLoginForm = {
    loginEmail: '',
    loginPassword: ''
  };
  const [loginFormValues, handleLoginInputChange] = useForm(initialLoginForm);
  const {loginEmail, loginPassword} = loginFormValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      dispatch(startLogin(loginEmail, loginPassword));
    }
  };

  const validateLoginForm = () => {
    if (loginEmail.trim() === '' || loginPassword === '') {
      return false;
    }
    return true;
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="submit"
                className="btnSubmit"
                value="Login" 
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña" 
              />
            </div>
            <div className="form-group">
              <input 
                type="submit" 
                className="btnSubmit" 
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
