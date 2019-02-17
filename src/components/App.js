import React from 'react';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import SessionDisplay from './SessionDisplay';
import './App.css';

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    totalSeconds: 1500,
    timerStatus: 'paused',
    timerType: 'Session',
    intervalID: ''
  };

  decrementSession = () => {
    if (
      this.state.timerStatus === 'paused' &&
      this.state.timerType === 'Session'
    )
      this.setState(prevState => ({
        sessionLength:
          prevState.sessionLength === 1
            ? prevState.sessionLength
            : prevState.sessionLength - 1,
        totalSeconds:
          prevState.totalSeconds === 60
            ? prevState.totalSeconds
            : prevState.sessionLength * 60 - 60
      }));
  };

  incrementSession = () => {
    if (
      this.state.timerStatus === 'paused' &&
      this.state.timerType === 'Session'
    )
      this.setState(prevState => ({
        sessionLength:
          prevState.sessionLength === 60
            ? prevState.sessionLength
            : prevState.sessionLength + 1,
        totalSeconds:
          prevState.totalSeconds === 3600
            ? prevState.totalSeconds
            : prevState.sessionLength * 60 + 60
      }));
  };

  decrementBreak = () => {
    if (this.state.timerStatus === 'paused')
      this.setState(prevState => ({
        breakLength:
          prevState.breakLength === 1
            ? prevState.breakLength
            : prevState.breakLength - 1
      }));

    if (this.state.timerType === 'Break')
      this.setState(prevState => ({
        totalSeconds:
          prevState.totalSeconds < 61
            ? prevState.totalSeconds
            : prevState.breakLength * 60
      }));
  };

  incrementBreak = () => {
    if (this.state.timerStatus === 'paused')
      this.setState(prevState => ({
        breakLength:
          prevState.breakLength === 60
            ? prevState.breakLength
            : prevState.breakLength + 1
      }));

    if (this.state.timerType === 'Break')
      this.setState(prevState => ({
        totalSeconds:
          prevState.totalSeconds > 3599
            ? prevState.totalSeconds
            : prevState.breakLength * 60
      }));
  };

  timerControl = () => {
    if (this.state.timerStatus === 'paused') {
      this.startCountdown();
      this.setState({ timerStatus: 'running' });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({ timerStatus: 'paused' });
    }
  };

  startCountdown = () => {
    this.setState({
      intervalID: setInterval(() => {
        this.setState({ totalSeconds: this.state.totalSeconds - 1 });
        this.alarmListener();
        this.activityControl();
      }, 1000)
    });
  };

  activityControl = () => {
    let totalSeconds = this.state.totalSeconds;
    if (totalSeconds === 0 && this.state.timerType === 'Session') {
      clearInterval(this.state.intervalID);
      this.setState({
        totalSeconds: this.state.breakLength * 60,
        timerType: 'Break'
      });
      this.startCountdown();
    } else if (totalSeconds === 0 && this.state.timerType === 'Break') {
      clearInterval(this.state.intervalID);
      this.setState({
        totalSeconds: this.state.sessionLength * 60,
        timerType: 'Session'
      });
      this.startCountdown();
    }
  };

  alarmListener = () => {
    if (this.state.totalSeconds === 0 && this.state.timerType === 'Session') {
      this.audio.play();
    }
  };

  resetSession = () => {
    if (this.state.timerStatus === 'paused') {
      clearInterval(this.state.intervalID);
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        totalSeconds: 1500,
        timerStatus: 'paused',
        timerType: 'Session',
        intervalID: ''
      });
    }
  };

  render() {
    return (
      <div id='container'>
        <h1 id='title'>Pomodoro Clock</h1>
        <BreakLength
          amount={this.state.breakLength}
          decrementBreak={this.decrementBreak}
          incrementBreak={this.incrementBreak}
        />
        <SessionLength
          amount={this.state.sessionLength}
          decrementSession={this.decrementSession}
          incrementSession={this.incrementSession}
        />
        <div>
          <SessionDisplay
            totalSeconds={this.state.totalSeconds}
            timerType={this.state.timerType}
            onResetSession={this.resetSession}
            timerControl={this.timerControl}
          />
        </div>
        <audio
          src='https://goo.gl/65cBl1'
          preload='auto'
          ref={audio => {
            this.audio = audio;
          }}
        />
        <footer>
          <a href='https://www.tsmarques.com'>By TSMarques</a>
        </footer>
      </div>
    );
  }
}

export default App;
