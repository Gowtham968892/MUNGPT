import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate } = useAppContext()
  const [search, setSearch] = useState('')

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-5
      bg-gradient-to-b from-green-900/40 via-green-950/40 to-black/40
      border-r border-green-500/20 backdrop-blur-3xl
      transition-all duration-500 max-md:absolute left-0 z-10
      ${!isMenuOpen && 'max-md:-translate-x-full'}`}
    >
      <img
        src={theme === 'dark' ? assets.dark_mode : assets.light_mode}
        alt="MunGPT"
        className="w-full max-w-48"
      />

      {/* New Chat */}
      <button className="flex justify-center items-center w-full py-2 mt-10 text-white
        bg-gradient-to-r from-green-500 to-green-700
        text-sm rounded-md cursor-pointer hover:opacity-90 transition">
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-green-500/30 rounded-md">
        <img src={assets.search_icon} className="w-4 invert" alt="" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Conversations"
          className="text-xs bg-transparent placeholder:text-green-300 outline-none text-green-50"
        />
      </div>

      {chats.length > 0 && <p className="mt-4 text-sm text-green-200">Recent Chats</p>}

      {/* Chat list */}
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              onClick={() => {
                navigate('/')
                setSelectedChat(chat)
                setIsMenuOpen(false)
              }}
              key={chat._id}
              className="p-2 px-4 bg-green-900/20 border border-green-500/20
              rounded-md cursor-pointer flex justify-between group
              hover:bg-green-800/30 transition"
            >
              <div>
                <p className="truncate w-full text-green-50">
                  {chat.messages.length > 0
                    ? chat.messages[0]?.content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-green-300">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer invert"
                alt=""
              />
            </div>
          ))}
      </div>

      {/* Community */}
      <div
        onClick={() => {
          navigate('/community')
          setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-green-500/20
        rounded-md cursor-pointer hover:scale-105 transition"
      >
        <img src={assets.gallery_icon} className="w-4.5 invert" alt="" />
        <p className="text-sm text-green-50">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate('/credits')
          setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 border border-green-500/20
        rounded-md cursor-pointer hover:scale-105 transition"
      >
        <img src={assets.diamond_icon} className="w-4.5 invert" alt="" />
        <div className="flex flex-col text-sm">
          <p className="text-green-50">Credits : {user?.credits}</p>
          <p className="text-xs text-green-300">Purchase credits to use MunGPT</p>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-green-500/20 rounded-md">
        <div className="flex items-center gap-2 text-sm text-green-50">
          <img src={assets.theme_icon} className="w-4 invert" alt="" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
          />
          <div className="w-9 h-5 bg-gray-500 rounded-full peer-checked:bg-green-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-green-500/20 rounded-md cursor-pointer group">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
        <p className="flex-1 text-sm text-green-50 truncate">
          {user ? user.name : 'Login your account'}
        </p>
        {user && (
          <img
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden invert group-hover:block"
          />
        )}
      </div>

      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden invert"
        alt=""
      />
    </div>
  )
}

export default Sidebar
