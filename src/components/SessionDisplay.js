import React from 'react';
import SessionControl from './SessionControl';

const SessionDisplay = ({
  totalSeconds,
  timerType,
  onResetSession,
  timerControl
}) => {
  let minutes = Math.floor(totalSeconds / 60);

  // checks how many seconds remaining after the minutes
  let secondsRemaining = totalSeconds % 60;

  // displays time left
  let timeRemaining = `${minutes < 10 ? '0' : ' '}${minutes}:${
    secondsRemaining < 10 ? '0' : ''
  }${secondsRemaining}`;

  return (
    <div>
      <div className='session-display'>
        <h3>{timerType}</h3>
        <div className='time-remaining-div'>
          <h1 id='time-remaining-text'>{timeRemaining}</h1>
        </div>
      </div>
      <div>
        <SessionControl
          onResetSession={onResetSession}
          timerControl={timerControl}
        />
      </div>
    </div>
  );
};

export default SessionDisplay;
