import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
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

  const initialRegisterForm = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
  };
  const [registerFormValues, handleRegisterInputChange] = useForm(initialRegisterForm);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2
  } = registerFormValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      dispatch(startLogin(loginEmail, loginPassword));
    }
    else {
      Swal.fire('Error', 'All fields are mandatory to login', 'error');
    }
  };

  const validateLoginForm = () => {
    if (loginEmail.trim() === '' || loginPassword.trim() === '') {
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      dispatch(startRegister(registerEmail, registerPassword, registerName));
    }
    else {
      Swal.fire('Error', 'All fields are mandatory to register and passwords must match', 'error');
    }
  };

  const validateRegisterForm = () => {
    if (registerName.trim() === '' || registerEmail.trim() === '' || registerPassword.trim() === '') {
      return false;
    }
    else if (registerPassword.trim() !== registerPassword2.trim()) {
      return false;
    }
    return true;
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
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
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Retype your password" 
                name="registerPassword2"
                value={registerPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="submit" 
                className="btnSubmit" 
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
