import React, { useEffect, useState } from 'react';
import { lang, langData, dropList, eventList } from '../../constants';
import DropList from '../../common/DropList';
import './EventControl.scss';

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
        <label className="control__lab" htmlFor="name">{lang[langData.eventName]}</label>
        <input
          className="control__field"
          placeholder="Name"
          id="name"
          type="text"
          value={data.name || ''}
          onChange={(event) => rememberData(event.target.value, 'name')}
        />
      </div>
      <div className="control__type">
        <label className="control__lab" htmlFor="name">{lang[langData.eventType]}</label>
        <DropList
          optNames={dropList.names}
          placeHolder={lang[langData.eventType]}
          defValue={currentEvent ? dropList.names[data.type] : false}
          callback={(index) => rememberData(index, 'type')}
        />
      </div>

      <ul className="control__cont">
        {eventList[data.type]?.fields.map((field) => (
          <li className="control__item" key={field.name}>
            <label className="control__lab" htmlFor="control__lab">{field.text}</label> 
            <input
              className="control__field"
              id={field.name}
              value={data[field.name] || ''}
              type={field.type}
              onChange={(event) =>
                rememberData(event.target.value, field.name)
              }
            />
          </li>
        ))}

      </ul>
    </div>
  );
};

export default EventControl;
