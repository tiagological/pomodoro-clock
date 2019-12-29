import React from 'react';
import './LengthItem.css';

const BreakLength = ({ amount, decrementBreak, incrementBreak }) => {
  return (
    <div className='length-item' id='break-length-item'>
      <h2>Break Length</h2>
      <i className='big arrow down icon' onClick={decrementBreak} />
      <h3 data-testid='break-amount'>{amount}</h3>
      <i className='arrow-up big arrow up icon' onClick={incrementBreak} />
    </div>
  );
};

export default BreakLength;
