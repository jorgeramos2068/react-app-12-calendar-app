import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import types from '../../types/types';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('Tests in auth action', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('Should show an error when a wrong login is performed with startLogin action', async () => {
    const email = 'test@test.com';
    const password = '12345';
    await store.dispatch(startLogin(email, password));
    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalled();
  });

  test('Should register a user using startRegister action', async () => {
    const email = 'test@test.com';
    const password = 'test_password';
    const name = 'test_name';
    fetchModule.noTokenFetch = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 'test_uid',
          name,
          token: 'test_token'
        };
      }
    }));
    await store.dispatch(startRegister(email, password, name));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      }
    });
  });
});

test('Should perform a correct call of startChecking action', async () => {
  fetchModule.tokenFetch = jest.fn(() => ({
    json() {
      return {
        ok: true,
        uid: 'test_uid',
        name,
        token: 'test_token'
      };
    }
  }));
  await store.dispatch(startChecking());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      }
  });
});
