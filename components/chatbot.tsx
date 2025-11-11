"use client"

import type React from "react"
import { type FormEvent, useEffect, useRef, useState } from "react"

type Role = "user" | "bot"

interface ChatMessage {
  id: number
  role: Role
  text: string
  pending?: boolean
}

const getApiBase = (): string => {
  let envBase = process.env.NEXT_PUBLIC_CHATBOT_API_BASE as string | undefined

  if (envBase) {
    envBase = envBase.trim()
    if (!/^https?:\/\//i.test(envBase)) {
      envBase = `https://${envBase}`
    }
    return envBase
  }

  const host = typeof window !== "undefined" ? window.location.hostname : ""
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1"

  return isLocal ? "http://127.0.0.1:8080" : "https://webapp-porto-production.up.railway.app"
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Yo, I'm your Pokedex AI! Ask me about Nafhan's projects or skills!",
    },
  ])

  const apiBase = getApiBase()
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const nextIdRef = useRef(2)

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  const appendMessage = (msg: Omit<ChatMessage, "id"> & { id?: number }): number => {
    const id = msg.id ?? nextIdRef.current++
    setMessages((prev) => [...prev, { ...msg, id }])
    return id
  }

  const replaceMessage = (id: number, patch: Partial<ChatMessage>) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev
      if (next && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 60)
      }
      return next
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const msg = input.trim()
    if (!msg) return

    appendMessage({ role: "user", text: msg })
    setInput("")

    const typingId = appendMessage({
      role: "bot",
      text: "Analyzing...",
      pending: true,
    })

    try {
      const res = await fetch(`${apiBase}/chat`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: msg,
        redirect: "follow",
        cache: "no-store",
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`HTTP ${res.status} ${res.statusText} ${text || ""}`)
      }

      let data: any = null

      try {
        data = await res.json()
      } catch {
        const raw = await res.text()
        data = { reply: raw }
      }

      const reply: string =
        (data && (data.reply || data.message || data.answer || data.text)) || "No response from Pokedex."

      replaceMessage(typingId, { text: reply, pending: false })
    } catch (err) {
      console.error("Chatbot fetch error:", err)
      replaceMessage(typingId, {
        text: "⚠️ Pokedex connection error! Make sure the backend is running.",
        pending: false,
      })
    }
  }

  return (
    <div id="chatbot" className="chatbot">
      <button id="chatbotToggle" className="chatbot__btn" aria-expanded={open} onClick={handleToggle}>
        <img src="/assets/icons/chatbot.png" alt="Pokedex AI" />
      </button>

      <div id="chatbot-panel" className={`chatbot__panel ${open ? "chatbot--open" : ""}`}>
        <div className="chatbot__header">
          <div className="chatbot__id">
            <span className="chatbot__status-dot" />
            <span className="chatbot__label">POKEDEX AI</span>
            <span className="chatbot__sub">Nafhan's Personal Assistant</span>
          </div>
          <button className="chatbot__close" onClick={handleClose} aria-label="Close Pokedex">
            &times;
          </button>
        </div>

        <div id="chatbot-messages" className="chatbot__messages" ref={messagesRef}>
          {messages.map((m) => (
            <div key={m.id} className={`chat-msg chat-msg--${m.role}`}>
              <div className="chat-msg__bubble">{m.text}</div>
            </div>
          ))}
        </div>

        <form className="chatbot__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chatbot__input"
            type="text"
            placeholder="Ask the Pokedex..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chatbot__send">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
