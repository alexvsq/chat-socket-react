import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io("/")

export default function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      from: 'Me',
      body: message
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', reciveMessage)
    return () => {
      socket.off('message', reciveMessage)
    }
  }, [])

  const reciveMessage = (message) => {
    setMessages((state) => [...state, message])
  }

  return (
    <div>
      <p>Chat</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Escribe un mensaje'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send</button>
      </form>

      <ul>
        {
          messages.map((message, index) => (
            <li key={index}>
              {message.from}:{message.body}</li>
          ))
        }
      </ul>
    </div>
  )
}
