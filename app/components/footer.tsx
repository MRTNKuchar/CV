"use client"

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-t border-white/10 py-8 mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-blue-300/60 text-sm">
          &copy; {new Date().getFullYear()} Martin Kuchař
        </p>
        <p className="text-blue-300/40 text-xs">
          Built with Next.js & Framer Motion
        </p>
      </div>
    </motion.footer>
  )
}
