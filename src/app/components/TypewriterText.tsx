"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTypewriter } from "../hooks/useTypewriter"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypewriterText({ text, speed = 20, className }: TypewriterTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const { displayed, done } = useTypewriter(text, speed, isInView)

  return (
    <span ref={ref} className={className}>
      {displayed}
      {!done && isInView && <span className="inline-block w-0.5 h-[1em] bg-blue-300/80 ml-0.5 animate-pulse align-middle" />}
    </span>
  )
}
