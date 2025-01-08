import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerDisplay, setTimerDisplay] = useState(sessionLength);
  const [isRunning, setIsRunning] = useState(false);

  const decrementBreakLength = () => {
    if (breakLength === 1) return;
    setBreakLength((prev) => prev - 1);
  };

  const incrementBreakLength = () => {
    if (breakLength === 60) return;
    setBreakLength((prev) => prev + 1);
  };

  const decrementSessionLength = () => {
    if (sessionLength === 1) return;
    setSessionLength((prev) => prev - 1);
    setTimerDisplay(sessionLength - 1);
  };

  const incrementSessionLength = () => {
    if (sessionLength === 60) return;
    setSessionLength((prev) => prev + 1);
    setTimerDisplay(sessionLength + 1);
  };

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  return (
    <>
      <h1>25 + 5 Clock</h1>
      <div className="break-container">
        <h2 id="break-label">Break Length</h2>
        <i
          className="fa fa-arrow-down fa-2x"
          id="break-decrement"
          onClick={decrementBreakLength}
        ></i>
        <h2 id="break-length">{breakLength}</h2>
        <i
          className="fa fa-arrow-up fa-2x"
          id="break-increment"
          onClick={incrementBreakLength}
        ></i>
      </div>
      <div className="session-container">
        <h2 id="session-label">Session Length</h2>
        <i
          className="fa fa-arrow-down fa-2x"
          id="session-decrement"
          onClick={decrementSessionLength}
        ></i>
        <h2 id="session-length">{sessionLength}</h2>
        <i
          className="fa fa-arrow-up fa-2x"
          id="session-increment"
          onClick={incrementSessionLength}
        ></i>
      </div>
      <div className="timer-container">
        <h2 id="timer-label">Session</h2>
        <h2 id="time-left">{timerDisplay} : 00</h2>
      </div>
      <div className="controller">
        <i className="fa fa-play fa-2x" id="start_stop" onClick={start}></i>
        <i className="fa fa-pause fa-2x" id="pause" onClick={stop}></i>
        <i className="fa fa-refresh fa-2x" id="reset"></i>
      </div>
    </>
  );
}

export default App;
