"use client"

import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

interface FinalViewProps {
  children: ReactNode
  onLock?: () => void
}

export function FinalView({ children, onLock }: FinalViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (isInView && !locked) {
      setLocked(true)
      onLock?.()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [isInView, locked, onLock])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={locked ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className={locked ? "min-h-screen py-12 px-4" : "min-h-screen py-12 px-4"}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {children}
      </div>
    </motion.div>
  )
}
