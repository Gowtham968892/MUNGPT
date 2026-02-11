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
      bg-gradient-to-b from-[#0b0614] via-[#120a22] to-[#05020a]">

      {/* Loader */}
      <div
        style={{
          width: '52px',
          height: '52px',
          border: '4px solid rgba(168,85,247,0.25)',   // purple glass
          borderTop: '4px solid #c084fc',              // purple glow
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
          boxShadow: '0 0 25px rgba(192,132,252,0.55)'
        }}
      />

      {/* Keyframes (logic untouched) */}
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
