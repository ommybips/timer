import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const audio = useRef(null);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerDisplay, setTimerDisplay] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [displayText, setDisplayText] = useState("Session");
  const [pauseAtZero, setPauseAtZero] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const decrementBreakLength = () => {
    if (breakLength === 1) return;
    if (!isRunning) setBreakLength((prev) => prev - 1);
  };

  const incrementBreakLength = () => {
    if (breakLength === 60) return;
    if (!isRunning) setBreakLength((prev) => prev + 1);
  };

  const decrementSessionLength = () => {
    if (sessionLength === 1) return;
    if (!isRunning) {
      setSessionLength((prev) => prev - 1);
      setTimerDisplay((prev) => prev - 60);
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength === 60) return;
    if (!isRunning) {
      setSessionLength((prev) => prev + 1);
      setTimerDisplay((prev) => prev + 60);
    }
  };

  const start = () => {
    setIsRunning((prev) => !prev);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerDisplay(25 * 60);
    setDisplayText("Session");
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  useEffect(() => {
    let interval;
    if (isRunning && timerDisplay > 0) {
      interval = setInterval(() => {
        setTimerDisplay((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timerDisplay === 0 && !pauseAtZero) {
      setPauseAtZero(true);
      if (audio.current) {
        audio.current.play().catch((err) => {
          console.error("Audio play failed:", err);
        });
      }
    }

    if (pauseAtZero) {
      interval = setTimeout(() => {
        setPauseAtZero(false);
        if (displayText === "Session") {
          setDisplayText("Break");
          setTimerDisplay(breakLength * 60);
        } else if (displayText === "Break") {
          setDisplayText("Session");
          setTimerDisplay(sessionLength * 60);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    isRunning,
    timerDisplay,
    breakLength,
    sessionLength,
    displayText,
    pauseAtZero,
  ]);

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
        <h2 id="timer-label">{displayText}</h2>
        <h2 id="time-left">{formatTime(timerDisplay)}</h2>
      </div>
      <div className="controller">
        <i className="fa fa-play fa-2x" id="start_stop" onClick={start}></i>
        <i className="fa fa-pause fa-2x" id="pause" onClick={stop}></i>
        <i className="fa fa-refresh fa-2x" id="reset" onClick={reset}></i>
      </div>
      <p>coded and designed by ommybips</p>
      <audio
        id="beep"
        preload="auto"
        ref={audio}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </>
  );
}

export default App;
