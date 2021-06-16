import React, { useState } from 'react';
import './Field.scss';

const Field = ({
  labFor,
  labName,
  typeName,
  defVal,
  plHolder,
  isError,
  errorText,
  callback,
}) => {
  const [val, setVal] = useState(defVal || '');

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
      {isError ? <div className="field__error">{errorText}</div> : false}
      <input
        className={`field__inp${isError ? ' field__inp_error' : ''}`}
        placeholder={plHolder}
        id={labFor}
        type={typeName}
        value={val}
        onChange={changeHandler}
      />
    </div>
  );
};

Field.defaultProps = {
  labFor: '',
  labName: '',
  typeName: 'text',
  defVal: '',
  plHolder: '',
  isError: false,
  errorText: 'error',
  callback: (f) => f,
};

export default Field;
