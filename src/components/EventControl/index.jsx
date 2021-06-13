import React, { useEffect, useState } from 'react';
import DropList from '../../common/DropList';
import { lang, langData, dropList, events } from '../../constants';

const EventControl = ({ selectedDate, currentEvent, callback }) => {
  const [data, setData] = useState({type: undefined});

  const rememberData = (val, name) => {
    setData({
      ...data,
      date: selectedDate,
      [name]: val,
    });
  };

  useEffect(() => {
    callback(data);
  }, [data]);

  useEffect(() => {
    if (!currentEvent?.obj) {
      return;
    }
    const { obj } = currentEvent;
    setData({
      ...obj,
    });
  }, [currentEvent]);

  return (
    <div className="control">
      <div className="control__name">
        <label htmlFor="name">{lang[langData.eventName]}</label>
        <input
          className="control__field"
          id="name"
          type="text"
          value={data.name || ''}
          onChange={(event) => rememberData(event.target.value, 'name')}
        />
      </div>
      <div className="control__type">
        <DropList
          optNames={dropList.names}
          placeHolder={lang[langData.eventType]}
          defValue={currentEvent ? dropList.names[data.type] : false}
          callback={(index) => rememberData(index, 'type')}
        />
      </div>

      <div className="control__cont">
        {events[data.type]?.fields.map((field) => (
          <div className="control__field" key={field.name}>
            <label htmlFor="control__lab">{field.text}</label> 
            <input
              id={field.name}
              value={data[field.name] || ''}
              type={field.type}
              onChange={(event) =>
                rememberData(event.target.value, field.name)
              }
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default EventControl;
