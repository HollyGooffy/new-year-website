import { useEffect, useRef } from 'react'

type Flake = {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  phase: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

const createFlake = (width: number, height: number, initial = false): Flake => ({
  x: Math.random() * width,
  y: initial ? Math.random() * height : -20,
  radius: 1.5 + Math.random() * 3.5,
  speed: 0.45 + Math.random() * 1.25,
  drift: 0.25 + Math.random() * 1.2,
  phase: Math.random() * Math.PI * 2,
  opacity: 0.28 + Math.random() * 0.5,
  rotation: Math.random() * Math.PI,
  rotationSpeed: (Math.random() - 0.5) * 0.025,
})

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let width = window.innerWidth
    let height = window.innerHeight
    let frame = 0
    let lastTime = 0
    let flakes: Flake[] = []
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      flakes = Array.from({ length: Math.min(115, Math.max(45, Math.floor(width / 9))) }, () =>
        createFlake(width, height, true),
      )
    }
    const draw = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67 || 1, 2)
      lastTime = time
      context.clearRect(0, 0, width, height)
      flakes.forEach((flake) => {
        flake.y += flake.speed * delta
        flake.x += Math.sin(time * 0.001 * flake.drift + flake.phase) * 0.45 * delta
        flake.rotation += flake.rotationSpeed * delta
        if (flake.y > height + 15) Object.assign(flake, createFlake(width, height))
        if (flake.x < -15) flake.x = width + 15
        if (flake.x > width + 15) flake.x = -15
        context.save()
        context.translate(flake.x, flake.y)
        context.rotate(flake.rotation)
        context.strokeStyle = `rgba(255, 255, 255, ${flake.opacity})`
        context.lineWidth = Math.max(0.7, flake.radius / 2.4)
        context.beginPath()
        for (let arm = 0; arm < 6; arm += 1) {
          const angle = (Math.PI * arm) / 3
          context.moveTo(0, 0)
          context.lineTo(Math.cos(angle) * flake.radius, Math.sin(angle) * flake.radius)
        }
        context.stroke()
        context.restore()
      })
      frame = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} aria-hidden="true" className="snowfall" />
}
