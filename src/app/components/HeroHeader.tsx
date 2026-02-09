"use client"

import { motion } from "framer-motion"
import { useTypewriter } from "../hooks/useTypewriter"

interface HeroHeaderProps {
  name: string
  title: string
  tagline: string
  photo?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } }
}

export function HeroHeader({ name, title, tagline, photo }: HeroHeaderProps) {
  const { displayed, done } = useTypewriter(tagline, 30)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.6, rotate: -8 },
            show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 150, damping: 15 } }
          }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-6xl">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl -z-10"></div>
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-white mb-3">
            {name}
          </motion.h1>

          <motion.div variants={fadeUp} className="text-2xl md:text-3xl text-blue-200 mb-4 font-light">
            {title}
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-blue-100/80 max-w-2xl">
            {displayed}
            {!done && <span className="inline-block w-0.5 h-5 bg-blue-300/80 ml-0.5 animate-pulse align-middle" />}
          </motion.p>

        </div>
      </div>

    </motion.div>
  )
}
