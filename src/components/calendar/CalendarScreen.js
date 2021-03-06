import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../ui/Navbar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewFAB from '../ui/AddNewFAB';
import DeleteEventFAB from '../ui/DeleteEventFAB';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, eventStartLoadAll } from '../../actions/events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar);
  const {uid} = useSelector(state => state.auth);
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    dispatch(eventStartLoadAll());
  }, [dispatch]);

  const onDoubleClickEvent = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActive());
  };

  const onView = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid === event.user._id) ? '#367cf7' : '#465660',
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
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
      />
      <AddNewFAB />
      {activeEvent && <DeleteEventFAB />}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
