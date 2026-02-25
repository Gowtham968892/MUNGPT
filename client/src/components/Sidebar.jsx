import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUserChats, setToken, token } = useAppContext()
  const [search, setSearch] = useState('')

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Logged out successfully')
  }

  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()
      const confirm = window.confirm('Are you sure you want to delete this chat?')
      if(!confirm) return
      const { data } = await axios.post('/api/chat/delete', {chatId}, {headers: { Authorization: `Bearer ${token}`}})
      if(data.success){
        setChats(prev => prev.filter(chat => chat._id !== chatId))
        await fetchUserChats()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`relative flex flex-col h-screen min-w-72 p-6
      bg-white/[0.04]
      backdrop-blur-3xl
      border-r border-white/10
      shadow-[0_8px_40px_rgba(0,0,0,0.6)]
      before:absolute before:inset-0
      before:bg-gradient-to-b before:from-cyan-500/5 before:via-transparent before:to-purple-500/5
      before:pointer-events-none
      transition-all duration-500 max-md:absolute left-0 z-20
      text-[15px] leading-6 tracking-wide
      ${!isMenuOpen && 'max-md:-translate-x-full'}`}
    >

      {/* Edge Glow */}
      <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-cyan-400/40 via-transparent to-purple-500/40"></div>

      {/* LOGO */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400
                        flex items-center justify-center
                        shadow-[0_0_25px_rgba(0,240,255,0.6)]">
          <span className="text-white font-bold text-xl">M</span>
        </div>

        <div className="flex flex-col leading-tight">
          <h1 className="text-xl font-bold tracking-wide
                         bg-gradient-to-r from-blue-400 to-cyan-400
                         text-transparent bg-clip-text">
            MunGPT
          </h1>
          <p className="text-xs text-slate-400">
            Premium AI Assistant
          </p>
        </div>
      </div>

      {/* New Chat */}
      <button
        onClick={createNewChat}
        className="flex justify-center items-center w-full py-2.5 mt-6
        text-white text-base font-medium rounded-xl tracking-wide
        bg-gradient-to-r from-blue-600 to-cyan-500
        shadow-[0_0_25px_rgba(0,240,255,0.5)]
        hover:shadow-[0_0_40px_rgba(0,240,255,0.8)]
        hover:scale-[1.03]
        active:scale-95
        transition-all duration-300"
      >
        <span className="mr-2 text-xl">+</span> New Chat
      </button>

      {/* Search */}
      <div
        className="flex items-center gap-2 p-3 mt-5
        bg-white/[0.04]
        border border-white/10 rounded-xl
        focus-within:border-cyan-400/40
        focus-within:shadow-[0_0_20px_rgba(34,211,238,0.2)]
        transition-all duration-300"
      >
        <img src={assets.search_icon} className="w-4 invert opacity-60" alt="" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Conversations"
          className="text-sm bg-transparent outline-none w-full
          placeholder:text-slate-400 text-white tracking-wide"
        />
      </div>

      {chats.length > 0 && (
        <p className="mt-5 text-base text-slate-400 tracking-wide">Recent Chats</p>
      )}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-3 pr-1">
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
              className="p-3 rounded-xl cursor-pointer flex justify-between group
              bg-white/[0.03]
              border border-white/10
              hover:bg-white/[0.07]
              hover:border-cyan-400/40
              hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
              transition-all duration-300"
            >
              <div>
                <p className="truncate w-full text-white tracking-wide">
                  {chat.messages.length > 0
                    ? chat.messages[0]?.content.slice(0, 32)
                    : chat.name}
                </p>
                <p className="text-xs text-slate-400 tracking-wide">
                  {moment(chat.updatedAt).fromNow()}
                </p>
              </div>

              <img 
                src={assets.bin_icon}
                className="hidden group-hover:block w-4 cursor-pointer invert opacity-60"
                alt=""
                onClick={e=> toast.promise(deleteChat(e, chat._id), {loading:'Deleting...'})}
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
        className="flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer
        border border-white/10
        bg-white/[0.04]
        hover:bg-white/[0.08]
        hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
        transition-all duration-300"
      >
        <img src={assets.gallery_icon} className="w-4.5 invert opacity-70" alt="" />
        <p className="text-base text-white tracking-wide">Community Images</p>
      </div>

      {/* Credits */}
      <div
        onClick={() => {
          navigate('/credits')
          setIsMenuOpen(false)
        }}
        className="flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer
        border border-white/10
        bg-white/[0.04]
        hover:bg-white/[0.08]
        hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
        transition-all duration-300"
      >
        <img src={assets.diamond_icon} className="w-4.5 invert opacity-70" alt="" />
        <div className="flex flex-col text-base tracking-wide">
          <p className="text-white">Credits : {user?.credits}</p>
          <p className="text-xs text-slate-400 tracking-wide">
            Purchase credits to use MunGPT
          </p>
        </div>
      </div>

      {/* Theme Toggle */}
      <div
        className="flex items-center justify-between gap-2 p-3 mt-4 rounded-xl
        border border-white/10
        bg-white/[0.04]"
      >
        <div className="flex items-center gap-2 text-base text-white tracking-wide">
          <img src={assets.theme_icon} className="w-4 invert opacity-70" alt="" />
          <p>Dark Mode</p>
        </div>

        <label className="relative inline-flex cursor-pointer">
          <input
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
          />
          <div className="w-9 h-5 bg-slate-600 rounded-full peer-checked:bg-cyan-500 transition-all"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
        </label>
      </div>

      {/* User */}
      <div
        className="flex items-center gap-2 p-3 mt-4 rounded-xl cursor-pointer group
        border border-white/10
        bg-white/[0.04]
        hover:bg-white/[0.08]
        transition-all"
      >
        <img
          src={assets.user_icon}
          className="w-7 h-7 rounded-full ring-2 ring-cyan-400/40"
          alt=""
        />
        <p className="flex-1 text-base text-white truncate tracking-wide">
          {user ? user.name : 'Login your account'}
        </p>
        {user && (
          <img
            onClick={logout}
            src={assets.logout_icon}
            className="h-5 cursor-pointer hidden invert opacity-60 group-hover:block"
          />
        )}
      </div>

      {/* Close */}
      <img
        onClick={() => setIsMenuOpen(false)}
        src={assets.close_icon}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden invert opacity-70"
        alt=""
      />
    </div>
  )
}

export default Sidebar