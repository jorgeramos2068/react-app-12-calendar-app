import Swal from 'sweetalert2';
import { noTokenFetch, tokenFetch } from "../helpers/fetch";
import types from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const endpoint = 'auth';
    const data = {
      email,
      password
    };
    const resp = await noTokenFetch(endpoint, data, 'POST');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      const user = {
        uid: body.uid,
        name: body.name
      }
      dispatch(login(user));
    }
    else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const login = (user) => ({
  type: types.authLogin,
  payload: user
});

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const endpoint = 'auth/new';
    const data = {
      email,
      password,
      name
    };
    const resp = await noTokenFetch(endpoint, data, 'POST');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      const user = {
        uid: body.uid,
        name: body.name
      }
      dispatch(login(user));
    }
    else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const endpoint = 'auth/renew';
    const resp = await tokenFetch(endpoint, {}, 'GET');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      const user = {
        uid: body.uid,
        name: body.name
      }
      dispatch(login(user));
    }
    else {
      dispatch(finishChecking());
    }
  };
};

export const finishChecking = () => ({
  type: types.authChecking
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout
});
