import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteEventFAB from '../../../components/ui/DeleteEventFAB';
import { eventStartDelete } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Mocks for actions
jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn()
}));

describe('Tests in DeleteEventFAB component', () => {
  let wrapper;
  let store;
  const initialState = {}

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <DeleteEventFAB />
      </Provider>
    );
  });

  test('Should display DeleteEventFAB component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should dispatch eventStartDelete action', () => {
    wrapper.find('.btn-danger').prop('onClick')();
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
