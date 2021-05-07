import React from 'react';

const Button = ({ amountClick, setData }) => {
  const handlerClick = () => {
    setData((prevState) => ({
      ...prevState,
      amountClick: (prevState.amountClick += 1),
    }));
  };
  return (
    <div>
      <button className="button" type="button" onClick={handlerClick}>
        Click
      </button>
      <span>{amountClick}</span>
    </div>
  );
};

export default Button;
