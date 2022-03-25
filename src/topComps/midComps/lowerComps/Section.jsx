export default function Section({
  settings: { id, name, value, max = 300, unit = 'minutes', setter },
}) {
  return (
    <div className='section' id={id}>
      <p className='settingTitle'>{name}</p>
      <div className='settingContainer'>
        <input
          onChange={({ target }) => setter(+target.value)}
          required
          className='setting'
          type='number'
          value={value}
          min='1'
          max={max}
          step='1'
          data-setting='sessions'
        />
        <p className='unit'>{unit}</p>
      </div>
    </div>
  )
}
