import React from 'react';

const SessionControl = ({ onResetSession, timerControl }) => {
  return (
    <div>
      <button onClick={timerControl}>
        <i className='huge play icon' />
        <i className='huge pause icon' />
      </button>
      <i className='huge sync alternate icon' onClick={onResetSession} />
    </div>
  );
};

export default SessionControl;
