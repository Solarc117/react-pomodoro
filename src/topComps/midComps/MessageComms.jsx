import { useState } from 'react'
import { greetings } from '../../quotesGreetings.json'
import Message from './lowerComps/Message'
import Scroll from './lowerComps/Scroll'

export default function MessageComms() {
  const [message, setMessage] = useState(
    greetings[Math.floor(Math.random() * greetings.length)]
  );

  return (
    <>
      <Message message={message} />
      <Scroll setMessage={setMessage} />
    </>
  )
}
