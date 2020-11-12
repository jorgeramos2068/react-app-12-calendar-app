import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import LoginScreen from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Mocks for actions
jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('Tests in LoginScreen component', () => {
  let wrapper;
  let store;
  const initialState = {};

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );
  });

  test('Should display LoginScreen component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch startLogin action', () => {
    wrapper.find('input[name="loginEmail"]').simulate('change', {
      target: {
        name: 'loginEmail',
        value: 'test@test.com'
      }
    });
    wrapper.find('input[name="loginPassword"]').simulate('change', {
      target: {
        name: 'loginPassword',
        value: 'test_pwd'
      }
    });
    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {}
    });
    expect(startLogin).toHaveBeenCalled();
  });

  test('Should not dispatch startRegister action if passwords are different', () => {
    wrapper.find('input[name="registerName"]').simulate('change', {
      target: {
        name: 'registerName',
        value: 'test_name'
      }
    });
    wrapper.find('input[name="registerEmail"]').simulate('change', {
      target: {
        name: 'registerEmail',
        value: 'test@test.com'
      }
    });
    wrapper.find('input[name="registerPassword"]').simulate('change', {
      target: {
        name: 'registerPassword',
        value: 'test_pwd1'
      }
    });
    wrapper.find('input[name="registerPassword2"]').simulate('change', {
      target: {
        name: 'registerPassword2',
        value: 'test_pwd2'
      }
    });
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {}
    });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalled();
  });

  test('Should dispatch startRegister action if data is well', () => {
    wrapper.find('input[name="registerName"]').simulate('change', {
      target: {
        name: 'registerName',
        value: 'test_name'
      }
    });
    wrapper.find('input[name="registerEmail"]').simulate('change', {
      target: {
        name: 'registerEmail',
        value: 'test@test.com'
      }
    });
    wrapper.find('input[name="registerPassword"]').simulate('change', {
      target: {
        name: 'registerPassword',
        value: 'test_pwd'
      }
    });
    wrapper.find('input[name="registerPassword2"]').simulate('change', {
      target: {
        name: 'registerPassword2',
        value: 'test_pwd'
      }
    });
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {}
    });
    expect(startRegister).toHaveBeenCalled();
  });
});