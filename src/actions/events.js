import Swal from 'sweetalert2';
import types from '../types/types';
import { tokenFetch } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const {uid, name} = getState().auth;
    try {
      const endpoint = 'events'
      const resp = await tokenFetch(endpoint, event, 'POST');
      const body = await resp.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventStartLoadAll = () => {
  return async (dispatch) => {
    try {
      const endpoint = 'events';
      const resp = await tokenFetch(endpoint);
      const body = await resp.json();
      if (body.ok) {
        const events = prepareEvents(body.events);
        dispatch(eventLoadAll(events));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventLoadAll = (events) => ({
  type: types.eventLoadAll,
  payload: events
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActive = () => ({
  type: types.eventClearActive
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const endpoint = `events/${event.id}`;
      const resp = await tokenFetch(endpoint, event, 'PUT');
      const body = resp.json();
      if (body.ok) {
        dispatch(eventUpdate(event));
      }
      else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const {id} = getstate().calendar.activeEvent;
    try {
      const endpoint = `events/${id}`;
      const resp = await tokenFetch(endpoint, {}, 'DELETE');
      const body = resp.json();
      if (body.ok) {
        dispatch(eventDelete());
      }
      else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventDelete = () => ({
  type: types.eventDelete
});
