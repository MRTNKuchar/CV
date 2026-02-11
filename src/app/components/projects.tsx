"use client"

import { motion } from 'framer-motion'
import { projects } from '@/app/data/projects'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
}

export function Projects() {
  return (
    <motion.div
      id="projects"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-purple-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
        </span>
        Projects
      </motion.h2>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <Link key={index} href={`/projects/${project.slug}`}>
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer mb-5"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    project.status === "active"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  }`}>
                    {project.status === "active" ? "In Progress" : "Completed"}
                  </span>
                </div>
              </div>

              <p className="text-blue-100/80 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View details
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
