import React, { useState, Fragment, useMemo } from 'react';
import { lang, langData, dropList } from '../../constants';

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

  const handlerCLick = () => {};

  const delEvent = (index) => {
    const newEventDate = eventData.filter((_, i) => i != index);
    updateState({ update: true })({ eventData: newEventDate });
  };

  return (
    <div className="events">
      {foundEvents.map((event, index) => (
        <Fragment key={index}>
          {dropList.names[event.type] == lang[langData.holiday] && (
            <>
              <div className="events__holiday">
                <div className="events__type">{event.name}</div>
                <div className="events__type">{event.price}</div>
                <button
                  className="events__edit"
                  type="button"
                  onClick={handlerCLick}
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
              </div>
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Events;
