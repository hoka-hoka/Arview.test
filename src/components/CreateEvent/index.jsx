import React, { useState } from 'react';
import DropList from '../../common/DropList';
import { lang, langData, dropList } from '../../constants';

const CreateEvent = ({ updateState }) => {
  const [state, setState] = useState();
  const [type, setType] = useState();

  const changeEventType = (typeIndex) => {
    // updateState({ update: true })({ type: typeIndex });
    setType(typeIndex);
  };

  return (
    <div className="event">
      <div className="event__name">
        <label htmlFor="name">{lang[langData.eventName]}</label>
        <input type="text" name="" id="name" />
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
            <div className="event__holiday">
              <label htmlFor="holiday">{lang[langData.money]}</label>
              <input type="text" name="" id="holiday" />
            </div>
          </>
        )}

        {dropList.names[type] == lang[langData.events] && (
          <>
            <div className="event__go">
              <label htmlFor="go">{lang[langData.go]}</label>
              <input type="text" name="" id="go" />
            </div>
            <div className="event__time">
              <label htmlFor="time">{lang[langData.time]}</label>
              <input type="text" name="" id="time" />
            </div>
          </>
        )}

        {dropList.names[type] == lang[langData.marks] && (
          <>
            <div className="event__marks">
              <label htmlFor="marks">{lang[langData.marks]}</label>
              <input type="text" name="" id="marks" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
