import { noTokenFetch } from "../helpers/fetch";
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
  };
};

export const login = (user) => ({
  type: types.authLogin,
  payload: user
});
