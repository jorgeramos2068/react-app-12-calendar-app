import types from '../types/types';

export const addNewEvent = (event) => ({
  type: types.addNewEvent,
  payload: event
});

export const setActiveEvent = (event) => ({
  type: types.setActiveEvent,
  payload: event
});
