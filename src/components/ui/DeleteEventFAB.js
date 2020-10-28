import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../actions/events';

const DeleteEventFAB = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteEvent());
  }

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
    >
      <i className="fas fa-trash"></i>
      <span> Delete event</span>
    </button>
  );
};

export default DeleteEventFAB;
