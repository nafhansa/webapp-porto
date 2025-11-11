import type React from "react"
import type { Metadata, Viewport } from "next"
import { Press_Start_2P, Fredoka, Rubik_Mono_One } from "next/font/google"
import "./globals.css"

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-fredoka",
})

const rubikMono = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-mono",
})

export const metadata: Metadata = {
  title: "About Nafhan",
  description:
    "Join the adventure! Catch vulnerabilities, explore projects, and become a cybersecurity master like no one ever was!",
  keywords: ["cybersecurity", "ethical hacker", "portfolio", "pokemon"],
  authors: [{ name: "Nafhan Shafy" }],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${fredoka.variable} ${rubikMono.variable}`}
      style={
        {
          "--font-press-start": pressStart.style.fontFamily,
          "--font-fredoka": fredoka.style.fontFamily,
          "--font-rubik-mono": rubikMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <body>{children}</body>
    </html>
  )
}
