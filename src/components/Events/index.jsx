import React, { useState, Fragment, useMemo } from 'react';
import { lang, langData, dropList } from '../../constants';

const Events = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);

  const foundEvents = useMemo(() => {
    const history = window.history.state?.eventData || [];
    const found = history.filter((item) => {
      const isDate = item.date.getDate() == selectedDate.getDate();
      const isMonth = item.date.getMonth() == selectedDate.getMonth();
      const isYear = item.date.getFullYear() == selectedDate.getFullYear();
      if (isDate && isMonth && isYear) {
        return true;
      }
      return false;
    });
    return found || [];
  }, [selectedDate]);

  return (
    <div className="events">
      {foundEvents.map((event, index) => (
        <Fragment key={index}>
          {dropList.names[event.type] == lang[langData.holiday] && (
            <>
              <div className="events__type">{event.name}</div>
              <div className="events__type">{event.price}</div>
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Events;
