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

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Mouse position
    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 150
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

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.vx = 0
        this.vy = 0
        this.size = Math.random() * 3 + 1
        
        const colors = ['139,92,246', '59,130,246', '236,72,153', '34,197,94']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        // Calculate distance to mouse
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Push away from mouse
        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouse.radius - distance) / mouse.radius
          this.vx -= Math.cos(angle) * force * 3
          this.vy -= Math.sin(angle) * force * 3
        }

        // Return to base position
        this.vx += (this.baseX - this.x) * 0.02
        this.vy += (this.baseY - this.y) * 0.02

        // Apply friction
        this.vx *= 0.95
        this.vy *= 0.95

        // Update position
        this.x += this.vx
        this.y += this.vy
      }

      draw() {
        if (!ctx) return

        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 4
        )
        gradient.addColorStop(0, `rgba(${this.color}, 0.8)`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `rgba(${this.color}, 1)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 100

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

          if (distance < 100) {
            const opacity = 1 - distance / 100
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Connect particles
      connectParticles()

      // Draw mouse cursor effect
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouse.radius
      )
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)')
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
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