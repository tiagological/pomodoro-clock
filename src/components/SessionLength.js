import React from 'react';
import './LengthItem.css';

const SessionLength = ({ amount, decrementSession, incrementSession }) => {
  return (
    <div className='length-item' id='session-length-item'>
      <h2>Session Length</h2>
      <i className='big arrow down icon' onClick={decrementSession} />
      <h3>{amount}</h3>
      <i className='arrow-up big arrow up icon' onClick={incrementSession} />
    </div>
  );
};

export default SessionLength;
