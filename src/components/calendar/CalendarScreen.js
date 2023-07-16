import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewFAB from '../ui/AddNewFAB';
import { uiOpenModal } from '../../actions/ui';
import { setActiveEvent } from '../../actions/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const events = [{
  title: 'My Birthday',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  user: {
    uid: '123',
    name: 'Clark Kent'
  }
}];

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const[lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClickEvent = (e) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (e) => {
    dispatch(setActiveEvent(e));
    dispatch(uiOpenModal());
  }

  const onView = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0',
      opacity: 0.8,
      display: 'block',
      color: '#fff'
    };
    return {style};
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onView}
        view={lastView}
      />
      <AddNewFAB />
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
