import types from '../types/types';

const initialState = {
  events: [],
  activeEvent: null
};

// Event reference:
// {
//   id: new Date().getTime(),
//   title: 'My Birthday',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   notes: 'My notes',
//   user: {
//     uid: '123',
//     name: 'Clark Kent'
//   }
// }

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case types.eventLoadAll:
      return {
        ...state,
        events: [...action.payload]
      };
    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null
      };
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map(event => {
          return (event.id === action.payload.id) ? action.payload : event
        })
      };
    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter(event => {
          return (event.id !== state.activeEvent.id)
        }),
        activeEvent: null
      };
    case types.eventLogout:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default calendarReducer;
