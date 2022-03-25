import { useRef, useEffect } from 'react'

export default function Message({ message }) {
    const messageRef = useRef(null)
    // Don't need to add the message dependency to the useEffect hook, since message
    // changes will already trigger useEffect via the MessageComms component update.
    useEffect(() => {
      const messageClassList = messageRef.current.classList
      messageClassList.add('display')
      messageClassList.remove('fade')

      setTimeout(() => {
        messageClassList.remove('display')
        messageClassList.add('fade')
      }, 3000)
    })

  return (
    <h1 ref={messageRef} id='message'>
      {message}
    </h1>
  )
}
