"use client"

import { motion } from 'framer-motion'
import { TypewriterText } from './TypewriterText'

interface Education {
  school: string
  degree: string
  field: string
  period: string
  description?: string
}

interface CosmicEducationProps {
  education: Education[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } }
}

export function CosmicEducation({ education }: CosmicEducationProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-purple-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
          </svg>
        </span>
        Education
      </motion.h2>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 25, scale: 0.97 },
              show: {
                opacity: 1, y: 0, scale: 1,
                transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
              }
            }}
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="relative bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-colors hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {edu.school}
                </h3>
                <p className="text-purple-300 text-lg">{edu.degree}</p>
                <p className="text-blue-200">{edu.field}</p>
              </div>
              <span className="text-sm text-blue-200 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                {edu.period}
              </span>
            </div>

            {edu.description && (
              <p className="text-blue-100/80 text-sm mt-4 leading-relaxed">
                {edu.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
