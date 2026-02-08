import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 8000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <div className="flex items-center justify-center h-screen w-screen text-white
      bg-gradient-to-b from-[#020b06] via-[#04150b] to-[#020b06]">

      {/* Loader */}
      <div
        style={{
          width: '52px',
          height: '52px',
          border: '4px solid rgba(16,185,129,0.25)',   // emerald glass
          borderTop: '4px solid #34d399',              // emerald glow
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
          boxShadow: '0 0 20px rgba(52,211,153,0.45)'
        }}
      />

      {/* Keyframes (unchanged logic) */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Loading
