import React, { useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicket from 'react-datetime-picker';

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

const CalendarModal = () => {
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(later.toDate());

  const closeModal = () => {
    //setIsOpen(false);
  }

  const handleStartDateChange = (e) => {
    setStartDate(e);
  }

  const handleEndDateChange = (e) => {
    setEndDate(e);
  }

  return (
    <Modal
      isOpen={true}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
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
            className="form-control"
            placeholder="Event title"
            name="title"
            autoComplete="off"
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
