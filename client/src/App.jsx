import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import Loading from './pages/Loading'
import { assets } from './assets/assets'
import './assets/prism.css'
import { useAppContext } from './context/AppContext.jsx'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const { user, loadingUser } = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  if (pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
      <Toaster />

      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden invert z-50"
          onClick={() => setIsMenuOpen(true)}
          alt="menu"
        />
      )}

      {user ? (
        <div className="relative min-h-screen w-screen text-white overflow-hidden 
        bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(139,92,246,0.15),transparent_40%),linear-gradient(to_bottom_right,#000000,#0a0f1f,#000000)]">

          {/* Subtle Animated Glow Layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse pointer-events-none"></div>

          {/* Soft Blur Overlay for Premium Feel */}
          <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"></div>

          <div className="flex h-screen w-screen relative z-10">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </div>

        </div>
      ) : (
        <div className="relative h-screen w-screen flex items-center justify-center text-white overflow-hidden
        bg-[radial-gradient(circle_at_50%_35%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(139,92,246,0.15),transparent_40%),linear-gradient(to_bottom_right,#000000,#0a0f1f,#000000)]">

          {/* Glow Layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse pointer-events-none"></div>

          <Login />
        </div>
      )}
    </>
  )
}

export default App