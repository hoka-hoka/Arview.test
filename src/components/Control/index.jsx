import React, { useEffect, useState } from 'react';
import { lang, langData, dropList, eventList } from '../../constants';
import DropList from '../../common/DropList';
import Field from '../Field';
import './Control.scss';

const Control = ({ selectedDate, currentEvent, callback }) => {
  const [data, setData] = useState({ type: undefined });

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
        <Field
          labFor="name"
          labName={lang[langData.eventName]}
          plHolder="Name"
          callback={(val) => rememberData(val, 'name')}
        />
      </div>
      <div className="control__type">
        <label className="control__lab" htmlFor="type">
          {lang[langData.eventType]}
        </label>
        <DropList
          labFor="type"
          optNames={dropList.names}
          placeHolder={lang[langData.eventType]}
          defValue={currentEvent ? dropList.names[data.type] : false}
          callback={(_, index) => rememberData(index, 'type')}
        />
      </div>

      <ul className="control__cont">
        {eventList[data.type]?.fields.map((field) => (
          <li className="control__item" key={field.name}>
            <Field
              labFor={field.name}
              labName={field.text}
              typeName={field.type}
              plHolder={`${field.name[0].toUpperCase()}${field.name.substring(
                1,
              )}`}
              callback={(val) => rememberData(val, field.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Control;
