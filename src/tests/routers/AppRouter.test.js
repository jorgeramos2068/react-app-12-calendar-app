import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AppRouter from '../../routers/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests in AppRouter router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should show loading message', () => {
    const initialState = {
      auth: {
        checking: true,
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('Should show public route when the user is not logged', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: null
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('Should show private route when the user is logged', () => {
    const initialState = {
      auth: {
        checking: false,
        uid: 'test_uid',
        name: 'test_name'
      },
      calendar: {
        events: [],
        activeEvent: null
      },
      ui: {
        modalOpen: false
      }
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <div id="root">
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      </div>
    );
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
