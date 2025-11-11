"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  id: number
  text: string
  sender: "user" | "pikachu"
  timestamp: Date
}

const API_BASE = process.env.NEXT_PUBLIC_CHATBOT_API_BASE || "https://webapp-porto-production.up.railway.app"

export function PikachuChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Pika pika! Hai! Apa kabar kawan trainer? 💛",
      sender: "pikachu",
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Silakan bertanya tentang trainerku Nafhan!",
      sender: "pikachu",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const nextIdRef = useRef(3)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: nextIdRef.current++,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call AI backend
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const reply = data.reply || "Maaf, aku tidak bisa menjawab sekarang 😅"

      // Add AI response
      const aiMessage: Message = {
        id: nextIdRef.current++,
        text: reply,
        sender: "pikachu",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)

      // Fallback response
      const fallbackMessage: Message = {
        id: nextIdRef.current++,
        text: "⚠️ Maaf, Pikachu gak bisa konek ke backend sekarang 😅",
        sender: "pikachu",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pikachu-chatbot-container">
      <button
        className={`pikachu-chatbot-button ${isOpen ? "pikachu-chatbot-button--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Pikachu chatbot"
      >
        <img src="./assets/pikachu.png" alt="Pikachu" className="pikachu-icon" />
      </button>

      {isOpen && (
        <div className="pikachu-chatbot-panel">
          <div className="pikachu-chatbot-header">
            <h3>PIKACHU CHAT</h3>
            <button className="pikachu-chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              ✕
            </button>
          </div>
          <div className="pikachu-chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`pikachu-message ${msg.sender === "user" ? "pikachu-message-user" : "pikachu-message-ai"}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="pikachu-message pikachu-message-ai">
                <p className="pikachu-loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="pikachu-chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Ask Pikachu..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              ⚡
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
