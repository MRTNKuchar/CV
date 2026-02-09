"use client"

import { motion } from 'framer-motion'
import { TypewriterText } from './TypewriterText'

interface Job {
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
}

interface GlassExperienceProps {
  jobs: Job[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const slideIn = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
}

export function GlassExperience({ jobs }: GlassExperienceProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <motion.h2 variants={slideIn} className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-purple-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </span>
        Work Experience
      </motion.h2>

      <div className="space-y-6">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            variants={slideIn}
            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {job.position}
                </h3>
                <p className="text-blue-300 text-lg">{job.company}</p>
              </div>
              <span className="text-sm text-blue-200 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                {job.period}
              </span>
            </div>

            <p className="text-blue-100/80 mb-4 leading-relaxed">
            {job.description}
            </p>

            {job.achievements.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-blue-300 font-semibold">Key Achievements:</p>
                <ul className="space-y-1">
                  {job.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -15 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }
                      }}
                      className="text-blue-100/80 text-sm flex items-start gap-2"
                    >
                      <span className="text-purple-400 mt-1">▸</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
