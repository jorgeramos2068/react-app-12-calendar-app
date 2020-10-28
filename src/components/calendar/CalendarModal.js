import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicket from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { addNewEvent, clearActiveEvent, updateEvent } from '../../actions/events';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root');
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const later = now.clone().add(1, 'hours');
const initialEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: later.toDate()
}

const CalendarModal = () => {
  const dispatch = useDispatch();
  const {modalOpen} = useSelector(state => state.ui);
  const {activeEvent} = useSelector(state => state.calendar);
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(later.toDate());
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [formValues, setFormValues] = useState(initialEvent);
  const {title, notes, start, end} = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
    else {
      setFormValues(initialEvent);
    }
  }, [activeEvent, setFormValues, initialEvent]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(clearActiveEvent());
    setFormValues(initialEvent);
  }

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e
    });
  }

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      if (activeEvent) {
        dispatch(updateEvent(formValues))
      }
      else {
        const newEvent = {
          ...formValues,
          id: new Date().getTime(),
          user: {
            id: '123',
            name: 'Batman'
          }
        };
        dispatch(addNewEvent(newEvent));
      }
    }
  };

  const isValidForm = () => {
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('Error', 'End date must be greater than start date', 'error');
      return false;
    }
    if (title.trim().length < 2) {
      setIsValidTitle(false);
      return false;
    }
    setIsValidTitle(true);
    closeModal();
    return true;
  };

  return (
    <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1>
        {(activeEvent) ? 'Edit event' : 'New event'}
      </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Start date and time</label>
          <DateTimePicket
            className="form-control"
            onChange={handleStartDateChange}
            value={startDate}
          />
        </div>
        <div className="form-group">
          <label>End date and time</label>
          <DateTimePicket
            className="form-control"
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Title and notes</label>
          <input 
            type="text" 
            className={`form-control ${!isValidTitle && 'is-invalid'}`}
            placeholder="Event title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">A short description</small>
        </div>
        <div className="form-group">
          <textarea 
            type="text" 
            className="form-control"
            placeholder="Notes"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Additional information</small>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
