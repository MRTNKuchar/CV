"use client"

import { useEffect, useRef, useState } from "react"

export function useTypewriter(text: string, speed = 40, start = true) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (!start || started.current) return
    started.current = true
    setDisplayed("")
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, start])

  return { displayed, done }
}
