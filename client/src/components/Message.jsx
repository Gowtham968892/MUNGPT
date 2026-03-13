import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import "highlight.js/styles/github-dark.css";

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"

const Message = ({ message }) => {

  useEffect(() => {
    Prism.highlightAll()
  }, [message.content])

  return (
    <div>
      {/* USER MESSAGE */}
      {message.role === "user" ? (
        <div className="flex items-end justify-end my-6 gap-3 animate-user">
          <div
            className="
            flex flex-col gap-2 px-5 py-3 max-w-2xl
            bg-gradient-to-br from-blue-600 to-cyan-500
            rounded-2xl rounded-br-md
            shadow-[0_0_30px_rgba(0,240,255,0.35)]
            transition-all duration-300 hover:scale-[1.02]
            "
          >
            <p className="text-[15.5px] text-white leading-7 tracking-wide whitespace-pre-wrap">
              {message.content}
            </p>
            <span className="text-[11px] text-white/70 tracking-wide">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <img
            src={assets.user_icon}
            alt=""
            className="w-8 h-8 rounded-full ring-2 ring-cyan-400/40 transition-all duration-300 hover:scale-110"
          />
        </div>
      ) : (
        /* AI MESSAGE */
        <div className="flex justify-start my-6 animate-ai">
          <div
            className="
            flex flex-col gap-3 px-5 py-4 max-w-2xl
            bg-[#0f172a]/80
            backdrop-blur-xl
            border border-white/5
            rounded-2xl rounded-bl-md
            shadow-[0_0_40px_rgba(0,240,255,0.08)]
            ai-glow
            transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,240,255,0.18)]
            "
          >
            {message.isImage ? (
              <img
                src={message.content}
                alt=""
                className="
                w-full max-w-md rounded-xl
                border border-white/10
                shadow-[0_0_20px_rgba(0,240,255,0.15)]
                transition-transform duration-300 hover:scale-[1.02]
                "
              />
            ) : (
              <div className="text-[15.5px] text-white reset-tw leading-8 tracking-wide">
                <Markdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "")
                      return !inline && match ? (
                        <pre className="rounded-xl overflow-auto text-sm my-3">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-slate-800 px-1 py-0.5 rounded text-cyan-400">
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {message.content}
                </Markdown>
              </div>
            )}

            <span className="text-[11px] text-slate-400 tracking-wide">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message