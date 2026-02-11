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
          className="absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}

      {user ? (
        <div className="min-h-screen w-screen 
        bg-gradient-to-br from-black via-purple-950 to-black 
        text-white">
          
          <div className="flex h-screen w-screen backdrop-blur-sm">
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
        <div className="h-screen w-screen flex items-center justify-center 
        bg-gradient-to-br from-black via-purple-950 to-black">
          <Login />
        </div>
      )}
    </>
  )
}

export default App
