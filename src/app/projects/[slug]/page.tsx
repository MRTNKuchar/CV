"use client"

import { useParams } from 'next/navigation'
import { projects } from '@/app/data/projects'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
}

export default function ProjectPage() {
  const params = useParams()
  const project = projects.find(p => p.slug === params.slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project not found</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        {/* Back link */}
        <motion.div variants={fadeUp} className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium group"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            <span className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 ${
              project.status === "active"
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}>
              {project.status === "active" ? "In Progress" : "Completed"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </span>
            About this project
          </h2>
          <div className="text-blue-100/80 leading-relaxed space-y-4">
            {project.longDescription.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-purple-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </span>
            Key Highlights
          </h2>
          <div className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-blue-100/80 text-sm leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div variants={fadeUp} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-purple-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" />
              </svg>
            </span>
            Tools & Technologies
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-white/5 text-white text-sm font-medium border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
