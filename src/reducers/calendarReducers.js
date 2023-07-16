import moment from 'moment';
import types from '../types/types';

const initialState = {
  events: [{
    title: 'My Birthday',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    user: {
      uid: '123',
      name: 'Clark Kent'
    }
  }],
  activeEvent: null
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setActiveEvent:
      return {
        ...state,
        activeEvent: action.payload
      };
    case types.addNewEvent:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    default:
      return state;
  }
};

export default calendarReducer;
