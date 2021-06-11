import React, { useEffect, useState } from 'react';
import DropList from '../../common/DropList';
import { lang, langData, dropList } from '../../constants';

const CreateEvent = ({ selectedDate, currentEvent, callback }) => {
  const [type, setType] = useState();
  const [data, setData] = useState({});

  const changeEventType = (typeIndex) => {
    setType(typeIndex);
    setData({ name: data.name, type: typeIndex, date: selectedDate });
  };

  const rememberData = (val, name) => {
    setData({
      ...data,
      date: selectedDate,
      type: type,
      [name]: val,
    });
  };

  useEffect(() => {
    callback(data);
  }, [data, type]);

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
    <div className="event">
      <div className="event__name">
        <label htmlFor="name">{lang[langData.eventName]}</label>
        <input
          onChange={(event) => rememberData(event.target.value, 'name')}
          type="text"
          name=""
          id="name"
          value={data.name || ''}
        />
      </div>
      <div className="event__type">
        <DropList
          optNames={dropList.names}
          placeHolder={lang[langData.eventType]}
          callback={(typeIndex) => changeEventType(typeIndex)}
        />
      </div>
      <div className="event__cont">
        {dropList.names[type] == lang[langData.holiday] && (
          <>
            <div className="event__price">
              <label htmlFor="price">{lang[langData.money]}</label>
              <input
                id="price"
                value={data.price || ''}
                type="number"
                onChange={(event) => rememberData(event.target.value, 'price')}
              />
            </div>
          </>
        )}

        {dropList.names[type] == lang[langData.events] && (
          <>
            <div className="event__go">
              <label htmlFor="go">{lang[langData.go]}</label>
              <input
                id="go"
                value={data.address || ''}
                type="text"
                onChange={(event) =>
                  rememberData(event.target.value, 'address')
                }
              />
            </div>
            <div className="event__time">
              <label htmlFor="time">{lang[langData.time]}</label>
              <input
                id="time"
                value={data.time || ''}
                type="text"
                name=""
                onChange={(event) => rememberData(event.target.value, 'time')}
              />
            </div>
          </>
        )}

        {dropList.names[type] == lang[langData.marks] && (
          <>
            <div className="event__marks">
              <label htmlFor="marks">{lang[langData.marks]}</label>
              <input
                onChange={(event) => rememberData(event.target.value, 'marks')}
                type="text"
                name=""
                id="marks"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
