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
    <div className='bg-gradient-to-b from-[#531B81] to-[#29184B] flex items-center justify-center h-screen w-screen text-white'>
      {/* Inline style use panni animation force panrom */}
      <div style={{
        width: '48px',
        height: '48px',
        border: '5px solid rgba(255,255,255,0.2)',
        borderTop: '5px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>

      {/* CSS Keyframes directly in the component */}
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