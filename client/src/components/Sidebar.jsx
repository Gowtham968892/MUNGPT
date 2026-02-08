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
      bg-gradient-to-b from-emerald-900/40 via-emerald-950/40 to-black/50
      border-r border-emerald-400/20 backdrop-blur-3xl
      transition-all duration-500 max-md:absolute left-0 z-10
      ${!isMenuOpen && 'max-md:-translate-x-full'}`}
    >
      {/* Logo */}
      <img
        src={theme === 'dark' ? assets.dark_mode : assets.light_mode}
        alt="MunGPT"
        className="w-full max-w-48 opacity-90"
      />

      {/* New Chat */}
      <button
        className="
        flex justify-center items-center w-full py-2 mt-10
        text-white text-sm rounded-xl
        bg-gradient-to-r from-emerald-500 to-emerald-700
        shadow-[0_0_18px_rgba(16,185,129,0.45)]
        hover:shadow-[0_0_28px_rgba(16,185,129,0.7)]
        transition-all
        "
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search */}
      <div
        className="
        flex items-center gap-2 p-3 mt-4
        border border-emerald-400/25 rounded-xl
        bg-emerald-900/20
        "
      >
        <img src={assets.search_icon} className="w-4 invert opacity-80" alt="" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Conversations"
          className="
          text-xs bg-transparent outline-none w-full
          placeholder:text-emerald-300/60 text-emerald-50
          "
        />
      </div>

      {chats.length > 0 && (
        <p className="mt-4 text-sm text-emerald-200/80">Recent Chats</p>
      )}

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
              key={chat._id}
              onClick={() => {
                navigate('/')
                setSelectedChat(chat)
                setIsMenuOpen(false)
              }}
              className="
              p-2 px-4 rounded-xl cursor-pointer flex justify-between group
              bg-emerald-900/15
              border border-emerald-400/15
              hover:bg-emerald-800/30
              hover:border-emerald-400/30
              transition-all
              "
            >
              <div>
                <p className="truncate w-full text-emerald-50">
                  {chat.messages.length > 0
                    ? chat.messages[0]?.content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-emerald-300/70">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer invert opacity-70"
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
        className="
        flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer
        border border-emerald-400/20
        hover:bg-emerald-800/25
        hover:scale-[1.03]
        transition-all
        "
      >
        <img src={assets.gallery_icon} className="w-4.5 invert opacity-80" alt="" />
        <p className="text-sm text-emerald-50">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate('/credits')
          setIsMenuOpen(false)
        }}
        className="
        flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer
        border border-emerald-400/20
        hover:bg-emerald-800/25
        hover:scale-[1.03]
        transition-all
        "
      >
        <img src={assets.diamond_icon} className="w-4.5 invert opacity-80" alt="" />
        <div className="flex flex-col text-sm">
          <p className="text-emerald-50">Credits : {user?.credits}</p>
          <p className="text-xs text-emerald-300/70">
            Purchase credits to use MunGPT
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <div
        className="
        flex items-center justify-between gap-2 p-3 mt-4 rounded-xl
        border border-emerald-400/20
        "
      >
        <div className="flex items-center gap-2 text-sm text-emerald-50">
          <img src={assets.theme_icon} className="w-4 invert opacity-80" alt="" />
          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
          />
          <div className="w-9 h-5 bg-gray-500 rounded-full peer-checked:bg-emerald-600 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User */}
      <div
        className="
        flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer group
        border border-emerald-400/20
        hover:bg-emerald-800/25
        transition-all
        "
      >
        <img
          src={assets.user_icon}
          className="w-7 h-7 rounded-full ring-2 ring-emerald-400/40"
          alt=""
        />
        <p className="flex-1 text-sm text-emerald-50 truncate">
          {user ? user.name : 'Login your account'}
        </p>
        {user && (
          <img
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden invert opacity-70 group-hover:block"
          />
        )}
      </div>

      {/* Close */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden invert opacity-80"
        alt=""
      />
    </div>
  )
}

export default Sidebar
