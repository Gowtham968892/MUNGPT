import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Loading = () => {
  const navigate = useNavigate()
  const { fetchUser } = useAppContext()

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUser()
      navigate('/')
    }, 8000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="relative flex items-center justify-center h-screen w-screen text-white overflow-hidden
    bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.2),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(139,92,246,0.2),transparent_45%),linear-gradient(to_bottom_right,#000000,#0a0f1f,#000000)]">

      {/* Moving Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse pointer-events-none"></div>

      {/* Cinematic Content */}
      <div className="relative flex flex-col items-center">

        {/* Expanding Glow Circle */}
        <div className="absolute w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-ping"></div>

        {/* Logo Text Reveal */}
        <h1 className="text-4xl font-semibold tracking-widest bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-fadeIn">
          MunGPT
        </h1>

        {/* Sub Text */}
        <p className="mt-3 text-zinc-400 text-sm tracking-wider animate-fadeIn delay-200">
          Initializing Intelligence...
        </p>

        {/* Premium Spinner */}
        <div
          style={{
            marginTop: '40px',
            width: '60px',
            height: '60px',
            border: '3px solid rgba(255,255,255,0.08)',
            borderTop: '3px solid #22d3ee',
            borderRight: '3px solid #a855f7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            boxShadow: '0 0 40px rgba(34,211,238,0.3)'
          }}
        />

      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}

export default Loading