import React, { useState } from 'react';
import './Field.scss';

const Field = ({ labFor, labName, typeName, plHolder, callback }) => {
  const [val, setVal] = useState();

  const changeHandler = (event) => {
    const { value } = event.target;
    setVal(value);
    callback(value, 'name');
  };

  return (
    <div className="field">
      <label className="field__lab" htmlFor={labFor}>
        {labName}
      </label>
      <input
        className="field__inp"
        placeholder={plHolder}
        id={labFor}
        type={typeName}
        value={val || ''}
        onChange={changeHandler}
      />
    </div>
  );
};

Field.defaultProps = {
  labFor: '',
  labName: '',
  typeName: 'text',
  plHolder: '',
  callback: (f) => f,
};

export default Field;
