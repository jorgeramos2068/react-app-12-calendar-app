import types from '../types/types';

const initialState = {
  checking: true,
  // uid: null,
  // name: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false
      }
    case types.authChecking:
      return {
        ...state,
        checking: false
      }
    case types.authLogout:
      console.log('Logout');
      return {
        checking: false
      }
    default:
      return state;
  }
};

export default authReducer;
