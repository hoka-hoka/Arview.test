import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';
import Modal from './components/Modal';
import './scss/main.scss';

const App = () => {
  const [data, setData] = useState({
    id: 0,
    amountClick: 0,
  });

  const [name, setName] = useState('title');

  return (
    <>
      <div className="header">
        <div className="header-top">
          <div className="top">
            <Button amountClick={data.amountClick} setData={setData} />
          </div>
        </div>
        <div className="header-bottom">
          <div className="bottom">
            <Button />
            <Modal name={name} />
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
