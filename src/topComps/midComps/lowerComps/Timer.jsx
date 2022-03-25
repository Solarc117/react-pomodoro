import { useState, useEffect, useRef } from 'react'

export default function Timer({
  settings: {
    focusMins,
    shortBreakMins,
    longBreakMins,
    numSessions,
    numCycles,
  },
  setters: { setMessage, setCycleRunning },
}) {
  const [
    [currentActivity, setCurrentActivity],
    [secondsLeft, setSecondsLeft],
    [sessionsLeft, setSessionsLeft],
    [cyclesLeft, setCyclesLeft],
  ] = ['', 0, numSessions, numCycles].map(v => useState(v))

  useEffect(async () => {
    let sessionsRemaining = sessionsLeft,
      cyclesRemaining = cyclesLeft,
      sessionTypes = {
        focus: 'Focus session',
        shortBreak: 'Short break',
        longBreak: 'Long break',
      }
    async function timer(sessionType, mins, endMessage = '') {
      let seconds = mins * 60
      try {
        setSecondsLeft(seconds)
        setCurrentActivity(sessionType)
        const countdown = await new Promise((resolve, reject) => {
          const count = setInterval(() => {
            try {
              // secondsLeft is not updated within the useEffect function (not sure why), so this is why we also need to mutate the seconds argument passed on top of decrementing secondsLeft by 1 - the former is to know when to stop the timer, the latter is to render the correct value in the UI.

              seconds--
              setSecondsLeft(s => s - 1)
              if (seconds <= 0) {
                new Audio('../../../../audio/notification.mp3').play()
                setMessage(endMessage)
                resolve(`${sessionType} finished.`)
                clearInterval(count)
              }
            } catch (err) {
              reject(err)
              clearInterval(count)
            }
          }, 50)
        })
        return countdown
      } catch (err) {
        console.error(err)
        setMessage('Something went wrong 😣 - please refresh and try again')
      }
    }
    async function runCycle() {
      while (sessionsRemaining > 0) {
        await timer(sessionTypes.focus, focusMins, 'Focus session finished 👌')
        sessionsRemaining--
        setSessionsLeft(s => s - 1)
        if (sessionsRemaining > 0)
          await timer(
            sessionTypes.shortBreak,
            shortBreakMins,
            'Back to work 🤓'
          )
      }
      cyclesRemaining--
      setCyclesLeft(c => c - 1)
    }

    while (cyclesRemaining > 0) {
      await runCycle()
      if (cyclesRemaining > 0) {
        // Reset number of focus sessions for next cycle and await a long break.
        sessionsRemaining = numSessions
        setSessionsLeft(numSessions)
        await timer(
          sessionTypes.longBreak,
          longBreakMins,
          'New cycle starting 😎'
        )
      }
    }

    setMessage('All cycles complete ✨✨👏')
    setCycleRunning(false)
  }, [])

  function formatSecs(int) {
    if (!Number.isInteger(int)) throw 'Invalid secondsToMinutes() param: ' + int
    const seconds = int % 60,
      minutes = int >= 60 ? (int - seconds) / 60 : 0
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`
  }

  return (
    <div className='timer'>
      <p className='currentTime'>{formatSecs(secondsLeft)}</p>
      <p className='currentActivity'>{currentActivity}</p>
      <p className='currentSession'>
        Session {numSessions - sessionsLeft + 1} of {numSessions}
      </p>
      <p className='currentCycle'>
        Cycle {numCycles - cyclesLeft + 1} of {numCycles}
      </p>
    </div>
  )
}
