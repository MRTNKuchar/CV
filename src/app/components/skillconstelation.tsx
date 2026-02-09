"use client"

import { motion } from 'framer-motion'

interface Skill {
  name: string
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
            <div className="flex flex-wrap gap-3">
              {skills
                .filter(s => s.category === category)
                .map((skill, index) => (
                  <motion.span
                    key={index}
                    variants={scaleIn}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white font-medium"
                  >
                    {skill.name}
                  </motion.span>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
