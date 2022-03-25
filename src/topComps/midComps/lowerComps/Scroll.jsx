import { useState } from 'react'
import Timer from './Timer'
import Form from './Form'

export default function Scroll({ setMessage }) {
  const [
      [focusMins, setFocusMins],
      [shortBreakMins, setShortBreakMins],
      [longBreakMins, setLongBreakMins],
      [numSessions, setNumSessions],
      [numCycles, setNumCycles],
      [cycleRunning, setCycleRunning],
    ] = [25, 5, 15, 4, 1, false].map(v => useState(v)),
    settings = {
      focusMins,
      shortBreakMins,
      longBreakMins,
      numSessions,
      numCycles,
      cycleRunning,
    },
    setters = {
      setFocusMins,
      setShortBreakMins,
      setLongBreakMins,
      setNumSessions,
      setNumCycles,
      setMessage,
      setCycleRunning,
    }

  return (
    <div className={`scroll ${cycleRunning ? 'cycle' : 'settings'}`}>
      <Form settings={settings} setters={setters} />
      {cycleRunning && (
        <Timer settings={settings} setters={{ setMessage, setCycleRunning }} />
      )}
    </div>
  )
}
