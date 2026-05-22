'use client'
import { useEffect, useRef } from 'react'

export default function SpaceStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // Generate stars of varying sizes and brightness
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      base: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.6 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }))

    // A few larger bright stars
    const brightStars = Array.from({ length: 12 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 1.2,
      base: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
    }))

    const frame = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Deep space base gradient
      const bg = ctx.createLinearGradient(0, 0, W, H)
      bg.addColorStop(0,   '#02020e')
      bg.addColorStop(0.4, '#060616')
      bg.addColorStop(1,   '#010108')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // Subtle nebula glow — purple/blue
      const neb1 = ctx.createRadialGradient(W * 0.75, H * 0.25, 0, W * 0.75, H * 0.25, W * 0.38)
      neb1.addColorStop(0, 'rgba(100, 30, 180, 0.10)')
      neb1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = neb1
      ctx.fillRect(0, 0, W, H)

      const neb2 = ctx.createRadialGradient(W * 0.15, H * 0.65, 0, W * 0.15, H * 0.65, W * 0.28)
      neb2.addColorStop(0, 'rgba(20, 50, 140, 0.07)')
      neb2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = neb2
      ctx.fillRect(0, 0, W, H)

      const neb3 = ctx.createRadialGradient(W * 0.5, H * 0.8, 0, W * 0.5, H * 0.8, W * 0.22)
      neb3.addColorStop(0, 'rgba(60, 0, 80, 0.06)')
      neb3.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = neb3
      ctx.fillRect(0, 0, W, H)

      const t = Date.now() / 1000

      // Regular stars (twinkling)
      stars.forEach((s) => {
        const alpha = s.base * (0.6 + 0.4 * Math.sin(t * s.speed * 3 + s.offset))
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`
        ctx.fill()
      })

      // Bright stars with small cross flare
      brightStars.forEach((s) => {
        const alpha = s.base * (0.7 + 0.3 * Math.sin(t * s.speed * 2 + s.offset))
        const x = s.x * W
        const y = s.y * H

        // Glow halo
        const halo = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4)
        halo.addColorStop(0, `rgba(200, 215, 255, ${alpha * 0.5})`)
        halo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(x, y, s.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 245, 255, ${alpha})`
        ctx.fill()

        // Cross flare
        ctx.strokeStyle = `rgba(240, 245, 255, ${alpha * 0.35})`
        ctx.lineWidth = 0.7
        ctx.beginPath()
        ctx.moveTo(x - s.r * 3, y); ctx.lineTo(x + s.r * 3, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y - s.r * 3); ctx.lineTo(x, y + s.r * 3)
        ctx.stroke()
      })

      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
