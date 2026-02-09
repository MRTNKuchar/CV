"use client"

import { motion } from 'framer-motion'

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const slideIn = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } }
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

      <div className="relative space-y-8">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/60 via-blue-500/40 to-transparent" />

        {jobs.map((job, index) => (
          <motion.div
            key={index}
            variants={slideIn}
            className="relative pl-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] ring-4 ring-purple-500/20" />

            <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors duration-500 relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {job.position}
                  </h3>
                  <p className="text-blue-300 text-lg">{job.company}</p>
                </div>
                <span className="text-sm text-purple-200 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full">
                  {job.period}
                </span>
              </div>

              <p className="text-blue-100/70 mb-4 leading-relaxed">
                {job.description}
              </p>

              {job.achievements.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-purple-300 font-semibold">Key Achievements:</p>
                  <ul className="space-y-1.5">
                    {job.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -15 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }
                        }}
                        className="text-blue-100/70 text-sm flex items-start gap-2"
                      >
                        <span className="text-purple-400 mt-0.5">&#9670;</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
