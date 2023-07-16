import moment from 'moment';

const prepareEvents = (events = []) => {
  return events.map(event => ({
    ...event,
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
  }));
};

export { prepareEvents };
