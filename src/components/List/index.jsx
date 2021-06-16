import React, { Fragment, useMemo } from 'react';
import { viewMode, eventList } from '../../constants';

import './List.scss';

const List = ({ selectedDate, eventData, updateState }) => {
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
    <div className="events__btns">
      <button
        className="events__edit"
        type="button"
        onClick={() => addEvent(index)}
      >
        <svg viewBox="0 0 512 512">
          <use xlinkHref="#pencil" />
        </svg>
      </button>
      <button
        className="events__del"
        type="button"
        onClick={() => delEvent(index)}
      >
        <svg viewBox="0 0 512 512">
          <use xlinkHref="#basket" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="events">
      <ul className="events__cont">
        {foundEvents.map((event, index) => (
          <li className="events__item" key={index}>
            <div className="events__name">{event.name}</div>
            {buttons(index)}
            {eventList[event.type].fields.map((field) => (
              <Fragment key={field.name}>
                {field.about && (
                  <div className="events__field">
                    {`${field.about}: ${event[field.name]}`}
                  </div>
                )}
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
