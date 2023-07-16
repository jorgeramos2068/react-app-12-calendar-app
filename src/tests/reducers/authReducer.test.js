import authReducer from '../../reducers/authReducer';
import types from '../../types/types';

describe('Tests in authReducer', () => {
  const initialState = {
    checking: true
  };

  test('Should return default state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('Should update status through authLogin action', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'test_uid',
        name: 'test_name'
      }
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ...action.payload,
      checking: false
    });
  });

  test('Should update status through authChecking action', () => {
    const action = {
      type: types.authChecking
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      checking: false
    });
  });

  test('Should update status through authLogout action', () => {
    const action = {
      type: types.authLogout
    }
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false
    });
  });
});
