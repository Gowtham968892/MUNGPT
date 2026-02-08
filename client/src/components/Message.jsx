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
          <div className="flex flex-col gap-2 p-2 px-4
            bg-green-800/30 border border-green-500/30
            rounded-md max-w-2xl">
            <p className="text-sm text-green-50">
              {message.content}
            </p>
            <span className="text-xs text-green-300">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img
            src={assets.user_icon}
            alt=""
            className="w-8 rounded-full"
          />
        </div>
      ) : (
        /* AI MESSAGE */
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl
          bg-green-900/25 border border-green-500/25
          rounded-md my-4">

          {message.isImage ? (
            <img
              src={message.content}
              alt=""
              className="w-full max-w-md mt-2 rounded-md border border-green-500/30"
            />
          ) : (
            <div className="text-sm text-green-50 reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          <span className="text-xs text-green-300">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  )
}

export default Message
