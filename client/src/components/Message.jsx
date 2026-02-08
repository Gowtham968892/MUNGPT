import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {

  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])

  return (
    <div>
      {/* USER MESSAGE */}
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div
            className="
            flex flex-col gap-2 p-2 px-4 max-w-2xl
            bg-emerald-500/15
            border border-emerald-400/30
            rounded-2xl
            shadow-[0_0_15px_rgba(16,185,129,0.15)]
            "
          >
            <p className="text-sm text-emerald-50 leading-relaxed">
              {message.content}
            </p>
            <span className="text-xs text-emerald-300">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img
            src={assets.user_icon}
            alt=""
            className="w-8 h-8 rounded-full ring-2 ring-emerald-400/40"
          />
        </div>
      ) : (
        /* AI MESSAGE */
        <div
          className="
          inline-flex flex-col gap-2 p-2 px-4 max-w-2xl my-4
          bg-emerald-900/20
          border border-emerald-500/20
          rounded-2xl
          shadow-[0_0_20px_rgba(16,185,129,0.12)]
          "
        >
          {message.isImage ? (
            <img
              src={message.content}
              alt=""
              className="
              w-full max-w-md mt-2 rounded-xl
              border border-emerald-400/30
              shadow-md
              "
            />
          ) : (
            <div className="text-sm text-emerald-50 reset-tw leading-relaxed">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span className="text-xs text-emerald-300">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  )
}

export default Message
