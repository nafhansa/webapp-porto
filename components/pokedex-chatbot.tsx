"use client"

import { useState } from "react"

export function PokedexChatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="pokedex-device">
      <div className="pokedex-frame">
        {/* Top part - speaker section */}
        <div className="pokedex-top">
          <div className="pokedex-blue-circle" />
          <div className="pokedex-light pokedex-light-1" />
          <div className="pokedex-light pokedex-light-2" />
          <div className="pokedex-light pokedex-light-3" />
        </div>

        {/* Main screen */}
        <button onClick={() => setIsOpen(!isOpen)} className="pokedex-screen" aria-label="Open Pokedex">
          <div className="pokedex-screen-inner">
            {isOpen ? (
              <div className="pokedex-chat-content">
                <p>Hello! I'm Nafhan's Pokedex AI.</p>
                <p>Ask me about projects!</p>
              </div>
            ) : (
              <div className="pokedex-closed">
                <span>READY</span>
              </div>
            )}
          </div>
        </button>

        {/* Buttons */}
        <div className="pokedex-button-section">
          <div className="pokedex-button pokedex-button-red" />
          <div className="pokedex-button pokedex-button-blue" />
        </div>

        {/* D-Pad and action buttons */}
        <div className="pokedex-bottom">
          <div className="pokedex-dpad" />
          <div className="pokedex-action-buttons">
            <button className="pokedex-btn pokedex-btn-circle" />
            <button className="pokedex-btn pokedex-btn-a" />
            <button className="pokedex-btn pokedex-btn-b" />
          </div>
        </div>
      </div>
    </div>
  )
}
