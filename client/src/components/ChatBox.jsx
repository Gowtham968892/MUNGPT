import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const containerRef = useRef(null)
  const { selectedChat, theme } = useAppContext()

  const [messages, setMessages] = useState([])
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30
    max-md:mt-14 2xl:pr-40">

      {/* Messages */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-emerald-400">
            <img
              src={theme === 'dark' ? assets.dark_mode : assets.light_mode}
              alt=""
              className="w-full max-w-56 sm:max-w-68 opacity-90"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-emerald-200">
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}

        {loading && (
          <div className="loader flex items-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Image publish */}
      {mode === 'image' && (
        <label className="inline-flex items-center gap-2 mb-3 text-xs mx-auto text-emerald-300">
          <p>Publish Generated Images to Community</p>
          <input
            type="checkbox"
            className="cursor-pointer accent-emerald-500"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="
        bg-emerald-500/10
        backdrop-blur-xl
        border border-emerald-400/30
        rounded-full
        shadow-[0_0_30px_rgba(16,185,129,0.25)]
        w-full max-w-2xl
        p-3 pl-5
        mx-auto flex gap-4 items-center
        transition-all
        "
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm pl-3 pr-2 outline-none bg-transparent text-emerald-200"
        >
          <option className="bg-emerald-900" value="text">Text</option>
          <option className="bg-emerald-900" value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your prompt here..."
          className="
          flex-1 w-full text-sm outline-none bg-transparent
          text-emerald-50 placeholder:text-emerald-300/60
          "
          required
        />

        <button
          disabled={loading}
          className="
          bg-emerald-500 hover:bg-emerald-600
          p-2 rounded-full
          shadow-[0_0_15px_rgba(16,185,129,0.6)]
          transition-all
          "
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-4 invert"
            alt=""
          />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
