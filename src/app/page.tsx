"use client"

import { ReactiveBackground } from './components/particlesbackground'
import { HeroHeader } from './components/HeroHeader'
import { GlassExperience } from './components/glassexperience'
import { SkillConstellation } from './components/skillconstelation'
import { CosmicEducation } from './components/cosmiceducation'
import { FloatingContact } from './components/floatingcontact'
import { Certifications } from './components/certifications'
import { Projects } from './components/projects'
import { FullscreenSection } from './components/FullscreenSection'
import { FinalView } from './components/finalview'
import { Footer } from './components/footer'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useState } from 'react'

export default function Page() {
  const [finalLocked, setFinalLocked] = useState(false)
  const handleLock = useCallback(() => setFinalLocked(true), [])
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const jobs = [
    {
      company: "HD Kadaň",
      position: "Support",
      period: "2023 - Present",
      description: "Providing technical support and maintaining IT infrastructure.",
      achievements: [
        "Maintained 100+ workstations and servers",
        "Windows 10/11, Linux, and network troubleshooting",
        "Implemented improved backup procedures"
      ]
    }
  ]

  const skills = [
    { name: "React", category: "Frontend" },
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "DevOps" },
    { name: "C#", category: "Backend" },
    { name: "Python", category: "Backend" },
    { name: "Linux", category: "Operating Systems" },
    { name: "Windows", category: "Operating Systems" },
    { name: "Cybersecurity", category: "Specialties" },
    { name: "Web Development", category: "Specialties" },
    { name: "R", category: "Backend" }
  ]

  const education = [
    {
      school: "University of Jan Evangelista Purkyně",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      period: "2024 - Now",
      description: "Focused on software engineering, cyber security and networking."
    },
    {
      school: "Gymnázium Kadaň",
      degree: "High School Diploma",
      field: "General Education",
      period: "2015 - 2023",
      description: "Graduated with honors, specializing in computer science and mathematics."
    }
  ]

  return (
    <>
      <ReactiveBackground />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 origin-left z-50"
      />
      
      <div className="relative z-10">
        
        {!finalLocked && (
          <>
            {/* Sekce 1: Hero */}
            <FullscreenSection index={0}>
              <HeroHeader
                name="Martin Kuchař"
                title="Cybersecurity & Development Enthusiast"
                tagline="Passionate about internet security, web development, and creating innovative solutions."
                photo="/profile.jpg"
              />
            </FullscreenSection>

            {/* Sekce 2: Experience */}
            <FullscreenSection index={1}>
              <GlassExperience jobs={jobs} />
            </FullscreenSection>

            {/* Sekce 3: Education */}
            <FullscreenSection index={2}>
              <CosmicEducation education={education} />
            </FullscreenSection>

            {/* Sekce 4: Skills */}
            <FullscreenSection index={3}>
              <SkillConstellation skills={skills} />
            </FullscreenSection>

            {/* Sekce 5: Certifications */}
            <FullscreenSection index={4}>
              <Certifications />
            </FullscreenSection>

            {/* Sekce 6: Projects */}
            <FullscreenSection index={5}>
              <Projects />
            </FullscreenSection>

            {/* Sekce 7: Contact */}
            <FullscreenSection index={6}>
              <FloatingContact />
            </FullscreenSection>
          </>
        )}

        {/* FINÁLNÍ VIEW - všechno dohromady */}
        <FinalView onLock={handleLock}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <HeroHeader
              name="Martin Kuchař"
              title="Cybersecurity & Development Enthusiast"
              tagline="Passionate about internet security, web development, and creating innovative solutions."
              photo="/profile.jpg"
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <GlassExperience jobs={jobs} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <CosmicEducation education={education} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Projects />
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Certifications />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <SkillConstellation skills={skills} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <FloatingContact />
              </motion.div>
            </div>
          </div>

          <Footer />
        </FinalView>

      </div>
    </>
  )
}