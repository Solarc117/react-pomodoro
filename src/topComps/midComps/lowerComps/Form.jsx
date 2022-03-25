import Section from './Section'

export default function Form({
  settings: {
    focusMins,
    shortBreakMins,
    longBreakMins,
    numSessions,
    numCycles,
  },
  setters: {
    setFocusMins,
    setShortBreakMins,
    setLongBreakMins,
    setNumSessions,
    setNumCycles,
    setMessage,
    setCycleRunning,
  },
}) {
  const sections = [
    {
      id: 'focus',
      name: 'Focus session',
      value: focusMins,
      setter: setFocusMins,
    },
    {
      id: 'shortBreak',
      name: 'Short break',
      value: shortBreakMins,
      setter: setShortBreakMins,
    },
    {
      id: 'longBreak',
      name: 'Long break',
      value: longBreakMins,
      setter: setLongBreakMins,
    },
    {
      id: 'sessions',
      name: 'Sessions per cycle',
      value: numSessions,
      max: 10,
      unit: 'sessions',
      setter: setNumSessions,
    },
    {
      id: 'cycles',
      name: 'Cycles',
      value: numCycles,
      max: 10,
      unit: 'cycles',
      setter: setNumCycles,
    },
  ]

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Starting... ✌⏳')
    setCycleRunning(true)
  }

  return (
    <form id='main' onSubmit={handleSubmit}>
      <div className='sections'>
        {sections.map((section, i) => (
          <Section key={i} settings={section} />
        ))}
      </div>
      <button className='pomodoroStart' type='submit'>
        Start
      </button>
    </form>
  )
}
