import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from '@testing-library/react';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { uiOpenModal } from '../../../actions/ui';
import { eventSetActive } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Mocks for actions
jest.mock('../../../actions/ui', () => ({
  uiOpenModal: jest.fn()
}));
jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoadAll: jest.fn()
}));
Storage.prototype.setItem = jest.fn();

describe('Tests in CalendarScreen component', () => {
  let wrapper;
  let store;
  const initialState = {
    auth: {
      uid: 'test_uid',
      name: 'test_name',
      checking: false
    },
    calendar: {
      events: [],
      activeEvent: null
    },
    ui: {
      modalOpen: false
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <CalendarScreen />
      </Provider>
    );
  });

  test('Should display CalendarScreen component correctly', () => {
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });

  test('Should check that calendar messages are not empty', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).not.toEqual([]);
  });

  test('Should call the calendar double click action', () => {
    const calendar = wrapper.find('Calendar');
    calendar.prop('onDoubleClickEvent')();
    expect(uiOpenModal).toHaveBeenCalled();
  });

  test('Should call the calendar select event action', () => {
    const calendar = wrapper.find('Calendar');
    calendar.prop('onSelectEvent')({
      start: 'test_start'
    });
    expect(eventSetActive).toHaveBeenCalled();
  });

  test('Should call the calendar on view action', () => {
    const calendar = wrapper.find('Calendar');
    act(() => {
      calendar.prop('onView')('week');
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});
