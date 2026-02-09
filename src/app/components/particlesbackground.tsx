"use client"

import { useEffect, useRef } from 'react'

export function ReactiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight
    let animationId: number

    // Mouse position
    const mouse = {
      x: width / 2,
      y: height / 2,
      radius: 180
    }

    // Particle class
    class Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      size: number
      color: string
      pulse: number
      pulseSpeed: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.baseX = this.x
        this.baseY = this.y
        this.vx = 0
        this.vy = 0
        this.size = Math.random() * 2.5 + 0.5
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.01 + Math.random() * 0.02

        const colors = ['139,92,246', '99,102,241', '59,130,246', '147,51,234']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.pulse += this.pulseSpeed

        // Smooth orbit around base position
        this.x = this.baseX + Math.sin(this.pulse * 0.5) * 12
        this.y = this.baseY + Math.cos(this.pulse * 0.3) * 10

        // Push away from mouse
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouse.radius - distance) / mouse.radius
          this.x -= Math.cos(angle) * force * 30
          this.y -= Math.sin(angle) * force * 30
        }
      }

      draw() {
        if (!ctx) return

        const pulseSize = this.size * (1 + Math.sin(this.pulse) * 0.3)

        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseSize * 5
        )
        gradient.addColorStop(0, `rgba(${this.color}, 0.6)`)
        gradient.addColorStop(0.4, `rgba(${this.color}, 0.15)`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize * 5, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `rgba(${this.color}, 0.9)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles — scale count to screen size
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor((width * height) / 12000), 150)

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Connect particles with lines
    function connectParticles() {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Ambient nebula blobs
    let time = 0

    function drawNebula() {
      if (!ctx) return
      time += 0.002

      const blobs = [
        { x: width * 0.2, y: height * 0.3, r: 300, color: '139,92,246' },
        { x: width * 0.8, y: height * 0.6, r: 250, color: '59,130,246' },
        { x: width * 0.5, y: height * 0.8, r: 350, color: '147,51,234' },
      ]

      for (const blob of blobs) {
        const offsetX = Math.sin(time + blob.x * 0.001) * 40
        const offsetY = Math.cos(time * 0.7 + blob.y * 0.001) * 30
        const gradient = ctx.createRadialGradient(
          blob.x + offsetX, blob.y + offsetY, 0,
          blob.x + offsetX, blob.y + offsetY, blob.r
        )
        gradient.addColorStop(0, `rgba(${blob.color}, 0.04)`)
        gradient.addColorStop(0.5, `rgba(${blob.color}, 0.015)`)
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x + offsetX, blob.y + offsetY, blob.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Animation loop
    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      // Draw ambient nebula
      drawNebula()

      // Update and draw particles
      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      // Connect particles
      connectParticles()

      // Mouse cursor glow
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouse.radius
      )
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.08)')
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-[#050510]"
      style={{ zIndex: -10 }}
    />
  )
}
