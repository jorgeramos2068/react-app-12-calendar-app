import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import CalendarModal from '../../../components/calendar/CalendarModal';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// Mocks for actions
jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventStartAddNew: jest.fn(),
  eventClearActive: jest.fn()
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Tests in CalendarModal component', () => {
  let wrapper;
  let store;
  const now = moment().minutes(0).seconds(0).add(1, 'hours');
  const later = now.clone().add(1, 'hours');
  const initialEvent = {
    title: 'Test title',
    notes: 'Test notes',
    start: now.toDate(),
    end: later.toDate()
  }
  const initialState = {
    auth: {
      uid: 'test_uid',
      name: 'test_name',
      checking: false
    },
    calendar: {
      events: [],
      activeEvent: initialEvent
    },
    ui: {
      modalOpen: true
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );
  });

  test('Should display CalendarModal component correctly', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('Should call the actions to close and update modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    expect(eventStartUpdate).toHaveBeenCalledWith(initialState.calendar.activeEvent);
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('Should show error if there is no title', () => {
    // This first submit clears the form
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    // On this submit, the form is empty
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
  });

  test('Should create a new event through the modal', () => {
    // Local wrapper
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
        modalOpen: true
      }
    };
    const store = mockStore(initialState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Test title'
      }
    });
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    expect(eventStartAddNew).toHaveBeenCalledWith({
      title: 'Test title',
      notes: '',
      start: expect.anything(),
      end: expect.anything()
    });
    expect(eventClearActive).toHaveBeenCalled();
  });

  test('Should validate dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Test title'
      }
    });
    const today = new Date();
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
    });
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });
    expect(Swal.fire).toHaveBeenCalled();
  });
});
