import React, { useState, useEffect, useRef } from 'react'
import { FaPlus, FaMinus, FaPlay, FaPause, FaSync } from 'react-icons/fa';


export const ClockApp = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const beep = useRef(null);

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
    clearInterval(timer);
    beep.current.pause();
    beep.current.currentTime = 0;
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(prevBreakLength => prevBreakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(prevBreakLength => prevBreakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      const newSessionLength = sessionLength - 1;
      setSessionLength(newSessionLength);
      if (!isRunning && !isBreak) {
        setTimeLeft(newSessionLength * 60);
      }
    }
  };
  
  const incrementSession = () => {
    if (sessionLength < 60) {
      const newSessionLength = sessionLength + 1;
      setSessionLength(newSessionLength);
      if (!isRunning && !isBreak) {
        setTimeLeft(newSessionLength * 60);
      }
    }
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timer);
    } else {
      const newTimer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
      setTimer(newTimer);
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timer);
      setIsRunning(false);
      if (isBreak) {
        setTimeLeft(sessionLength * 60);
      } else {
        setTimeLeft(breakLength * 60);
      }
      setIsBreak(!isBreak);
      beep.current.play();
    }
  }, [timeLeft, timer, isBreak, breakLength, sessionLength]);

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <div id="break-label">Break Length</div>
      <button id="break-decrement" onClick={decrementBreak}><FaMinus /></button>
      <div id="break-length">{breakLength}</div>
      <button id="break-increment" onClick={incrementBreak}><FaPlus /></button>

      <audio id="beep" ref={beep} src="https://www.soundjay.com/misc/sounds/censor-beep-01.mp3" />

      <div id="session-label">Session Length</div>
      <button id="session-decrement" onClick={decrementSession}><FaMinus /></button>
      <div id="session-length">{sessionLength}</div>
      <button id="session-increment" onClick={incrementSession}><FaPlus /></button>

      <div id="timer-label">{isBreak ? 'Break' : 'Session'}</div>
      <div id="time-left">{formatTimeLeft()}</div>

      <button id="start_stop" onClick={toggleTimer}><FaPause />  <FaPlay /></button>
      <button id="reset" onClick={reset}><FaSync /></button>
    </div>
  )
}