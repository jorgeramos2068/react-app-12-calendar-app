import moment from 'moment';
import types from '../types/types';

const initialState = {
  events: [{
    id: new Date().getTime(),
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
    case types.clearActiveEvent:
      return {
        ...state,
        activeEvent: null
      };
    case types.updateEvent:
      return {
        ...state,
        events: state.events.map(event => {
          return (event.id === action.payload.id) ? action.payload : event
        })
      };
    default:
      return state;
  }
};

export default calendarReducer;
