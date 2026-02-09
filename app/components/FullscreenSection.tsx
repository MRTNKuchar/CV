"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FullscreenSectionProps {
  children: ReactNode
  index: number
}

export function FullscreenSection({ children }: FullscreenSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-7xl">
        {children}
      </div>
    </motion.div>
  )
}
