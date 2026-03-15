import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'
import toast from 'react-hot-toast'
import "highlight.js/styles/github-dark.css";


const ChatBox = () => {

  const containerRef = useRef(null)
  const { selectedChat, user, axios, token, setUser } = useAppContext()

  const [messages, setMessages] = useState([])
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!user) return toast('Login to send message')

      setLoading(true)
      const promptcopy = prompt
      setPrompt('')

      setMessages(prev => [
        ...prev,
        { role: 'user', content: promptcopy, timestamp: Date.now(), isImage: false }
      ])

      const { data } = await axios.post(
        `/api/message/${mode}`,
        { chatId: selectedChat._id, prompt: promptcopy, isPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setMessages(prev => [...prev, data.reply])

        if (mode === 'image') {
          setUser(prev => ({ ...prev, credits: prev.credits - 2 }))
        } else {
          setUser(prev => ({ ...prev, credits: prev.credits - 1 }))
        }
      } else {
        toast.error(data.message)
        setPrompt(promptcopy)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const lastMessage = container.lastElementChild;

  if (lastMessage) {
    lastMessage.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">

      {/* Messages Container */}
      <div
        ref={containerRef}
        className="flex-1 mb-6 overflow-y-auto overflow-x-hidden text-[16.5px] leading-7 tracking-wide pr-2 custom-scrollbar"
      >

        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p className="text-4xl sm:text-6xl text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold tracking-wide">
              Ask MunGPT Anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className="animate-fadeInUp">
            <Message message={message} />
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 mt-6 pl-3 animate-fadeInUp">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-typing"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-typing [animation-delay:0.2s]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-typing [animation-delay:0.4s]"></div>
          </div>
        )}

      </div>

      {/* Image publish toggle */}
      {mode === 'image' && (
        <label className="inline-flex items-center gap-2 mb-4 text-sm mx-auto text-gray-300 tracking-wide backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <p>Publish Generated Image to Community</p>
          <input
            type="checkbox"
            className="cursor-pointer accent-cyan-500"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Input Section */}
      <form
        onSubmit={onSubmit}
        className="relative bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] w-full max-w-3xl px-5 py-3 mx-auto flex gap-4 items-end transition-all duration-300 focus-within:border-cyan-400/40 focus-within:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
      >

        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-[15px] pl-2 pr-2 outline-none bg-transparent text-gray-200 tracking-wide hover:text-white transition-all"
        >
          <option className="bg-black" value="text">Text</option>
          <option className="bg-black" value="image">Image</option>
        </select>

        {/* 🔥 FIXED MULTILINE TEXTAREA */}
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Ask MunGPT anything..."
          className="flex-1 w-full text-base outline-none bg-transparent text-white placeholder:text-gray-400 tracking-wide resize-none overflow-hidden"
          rows={1}
          required
          onInput={(e) => {
            e.target.style.height = "auto"
            e.target.style.height = e.target.scrollHeight + "px"
          }}
        />

        <button
          disabled={loading}
          className="cursor-pointer p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-4 invert"
            alt=""
          />
        </button>

      </form>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease forwards;
        }

        @keyframes smoothTyping {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-typing {
          animation: smoothTyping 1.4s infinite ease-in-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #22d3ee, #a855f7);
          border-radius: 10px;
        }
      `}</style>

    </div>
  )
}

export default ChatBox