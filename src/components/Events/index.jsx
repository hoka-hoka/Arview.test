import React, { useState, Fragment, useMemo } from 'react';
import { lang, langData, dropList, viewMode } from '../../constants';

const Events = ({ selectedDate, eventData, updateState }) => {
  const [events, setEvents] = useState([]);

  const foundEvents = useMemo(() => {
    const found = eventData.filter((item) => {
      const isDate = item.date.getDate() == selectedDate.getDate();
      const isMonth = item.date.getMonth() == selectedDate.getMonth();
      const isYear = item.date.getFullYear() == selectedDate.getFullYear();
      if (isDate && isMonth && isYear) {
        return true;
      }
      return false;
    });
    return found || [];
  }, [selectedDate, eventData]);

  const addEvent = (index) => {
    updateState({ update: true })({
      view: viewMode.add,
      currentEvent: { index: index, obj: eventData[index] },
    });
  };

  const delEvent = (index) => {
    const newEventDate = eventData.filter((_, i) => i != index);
    updateState({ update: true })({ eventData: newEventDate });
  };

  const buttons = (index) => (
    <>
      <button
        className="events__edit"
        type="button"
        onClick={() => addEvent(index)}
      >
        Edit
      </button>
      <button
        className="events__del"
        type="button"
        onClick={() => delEvent(index)}
      >
        Del
      </button>
    </>
  );

  return (
    <div className="events">
      {foundEvents.map((event, index) => (
        <Fragment key={index}>
          {dropList.names[event.type] == lang[langData.holiday] && (
            <>
              <div className="events__cont">
                <div className="events__name">{event.name}</div>
                <div className="events__price">Бюджет: {event.price}</div>
              </div>
              {buttons(index)}
            </>
          )}

          {dropList.names[event.type] == lang[langData.events] && (
            <div className="events__cont">
              <div className="events__name">{event.name}</div>
              <div className="events__type">Адрес: {event.address}</div>
              <div className="events__type">Время: {event.time}</div>
              {buttons(index)}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Events;
