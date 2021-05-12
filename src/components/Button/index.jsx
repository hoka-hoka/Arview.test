import React from 'react';
import './button.scss';

const Button = ({ amountClick, setData }) => {
  const handlerClick = () => {
    setData(({ amountClick: amount }) => ({
      amountClick: (amount += 1),
    }));
  };
  return (
    <div>
      <button styleName="button" type="button" onClick={handlerClick}>
        Click
      </button>
      <span>{amountClick}</span>
    </div>
  );
};

export default Button;
