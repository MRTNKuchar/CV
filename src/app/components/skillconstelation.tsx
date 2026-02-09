"use client"

import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillConstellationProps {
  skills: Skill[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
}

export function SkillConstellation({ skills }: SkillConstellationProps) {
  const categories = [...new Set(skills.map(s => s.category))]

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
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
        </span>
        Skills & Technologies
      </motion.h2>

      <div className="space-y-8">
        {categories.map((category) => (
          <motion.div key={category} variants={fadeUp}>
            <h3 className="text-xl font-semibold text-purple-300 mb-4">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills
                .filter(s => s.category === category)
                .map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    className="relative bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/50 transition-colors group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold">
                        {skill.name}
                      </span>
                      <span className="text-blue-300 text-sm">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/30 blur-sm"></div>
                      </motion.div>
                    </div>

                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-yellow-300 animate-pulse">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
