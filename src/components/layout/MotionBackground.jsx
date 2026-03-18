import { useEffect, useRef } from 'react'

const MOBILE_BREAKPOINT = 768

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createNode(baseX, baseY) {
  return {
    x: baseX,
    y: baseY,
    baseX,
    baseY,
    radius: randomBetween(1.6, 3.4),
    pulse: Math.random() * Math.PI * 2,
    energy: Math.random(),
    drift: randomBetween(8, 24),
  }
}

function createFieldNodes(width, height, count) {
  const columns = width < MOBILE_BREAKPOINT
    ? [0.12, 0.34, 0.58, 0.82, 0.94]
    : [0.06, 0.18, 0.34, 0.5, 0.66, 0.82, 0.94]
  const clusterNodes = []
  const scatterNodes = []

  columns.forEach((ratio, columnIndex) => {
    const anchorCount = width < MOBILE_BREAKPOINT ? 3 : 4

    for (let anchorIndex = 0; anchorIndex < anchorCount; anchorIndex += 1) {
      const t = (anchorIndex + 0.5) / anchorCount
      const wave = Math.sin(t * Math.PI * randomBetween(1.6, 3.2) + columnIndex * 0.8)
      const anchorX = width * ratio + wave * width * randomBetween(0.03, 0.07) + randomBetween(-20, 20)
      const anchorY = t * height + randomBetween(-42, 42)
      const localCount = width < MOBILE_BREAKPOINT ? 4 : 6

      for (let localIndex = 0; localIndex < localCount; localIndex += 1) {
        const angle = (Math.PI * 2 * localIndex) / localCount + randomBetween(-0.5, 0.5)
        const radius = randomBetween(14, width < MOBILE_BREAKPOINT ? 46 : 58)
        const nodeX = anchorX + Math.cos(angle) * radius
        const nodeY = anchorY + Math.sin(angle) * radius
        clusterNodes.push(createNode(nodeX, nodeY))
      }

      clusterNodes.push(createNode(anchorX, anchorY))
    }
  })

  const backgroundNodes = Array.from({ length: count }, () => (
    createNode(
      randomBetween(width * 0.04, width * 0.96),
      randomBetween(height * 0.02, height * 0.98)
    )
  ))

  for (let index = 0; index < Math.floor(count * 0.8); index += 1) {
    scatterNodes.push(createNode(
      randomBetween(width * 0.04, width * 0.96),
      randomBetween(height * 0.02, height * 0.98)
    ))
  }

  return [...clusterNodes, ...scatterNodes, ...backgroundNodes]
}

function createDust(width, height, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomBetween(1, 2.6),
    alpha: randomBetween(0.08, 0.24),
    vx: randomBetween(-0.08, 0.08),
    vy: randomBetween(-0.08, 0.08),
  }))
}

function createGlowAnchors(width, height) {
  return [
    { x: width * 0.08, y: height * 0.16, radius: Math.min(width, height) * 0.28, color: '56, 147, 255', phase: 0.2 },
    { x: width * 0.3, y: height * 0.78, radius: Math.min(width, height) * 0.25, color: '247, 147, 26', phase: 0.9 },
    { x: width * 0.54, y: height * 0.44, radius: Math.min(width, height) * 0.3, color: '34, 255, 129', phase: 1.6 },
    { x: width * 0.78, y: height * 0.22, radius: Math.min(width, height) * 0.27, color: '74, 152, 255', phase: 2.4 },
    { x: width * 0.92, y: height * 0.7, radius: Math.min(width, height) * 0.29, color: '34, 255, 129', phase: 3.1 },
  ]
}

export default function MotionBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, active: false }

    let animationFrame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let time = 0
    let nodes = []
    let dust = []
    let glows = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodes = createFieldNodes(width, height, width < MOBILE_BREAKPOINT ? 30 : 42)
      dust = createDust(width, height, width < MOBILE_BREAKPOINT ? 26 : 52)
      glows = createGlowAnchors(width, height)
    }

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const drawBackdrop = () => {
      context.clearRect(0, 0, width, height)

      for (const glow of glows) {
        const offsetX = Math.sin(time * 0.3 + glow.phase) * 18
        const offsetY = Math.cos(time * 0.24 + glow.phase) * 22
        const ambient = context.createRadialGradient(
          glow.x + offsetX,
          glow.y + offsetY,
          0,
          glow.x + offsetX,
          glow.y + offsetY,
          glow.radius
        )
        ambient.addColorStop(0, `rgba(${glow.color}, 0.1)`)
        ambient.addColorStop(0.32, `rgba(${glow.color}, 0.06)`)
        ambient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        context.fillStyle = ambient
        context.fillRect(0, 0, width, height)
      }

      const readabilityVeil = context.createRadialGradient(
        width * 0.5,
        height * 0.52,
        Math.min(width, height) * 0.08,
        width * 0.5,
        height * 0.52,
        Math.min(width, height) * 0.46
      )
      readabilityVeil.addColorStop(0, 'rgba(0, 0, 0, 0.72)')
      readabilityVeil.addColorStop(0.55, 'rgba(0, 0, 0, 0.42)')
      readabilityVeil.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = readabilityVeil
      context.fillRect(0, 0, width, height)

      if (pointer.active) {
        const cursorGlow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180)
        cursorGlow.addColorStop(0, 'rgba(120, 255, 132, 0.16)')
        cursorGlow.addColorStop(0.28, 'rgba(82, 164, 255, 0.1)')
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        context.fillStyle = cursorGlow
        context.fillRect(0, 0, width, height)
      }
    }

    const updateDust = () => {
      for (const mote of dust) {
        if (!prefersReducedMotion) {
          mote.x += mote.vx
          mote.y += mote.vy

          if (mote.x < -10) mote.x = width + 10
          if (mote.x > width + 10) mote.x = -10
          if (mote.y < -10) mote.y = height + 10
          if (mote.y > height + 10) mote.y = -10
        }

        context.beginPath()
        context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(40, 154, 255, ${mote.alpha})`
        context.fill()
      }
    }

    const updateNodes = () => {
      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.pulse += 0.018 + node.energy * 0.012

          node.x = node.baseX + Math.sin(time * 0.55 + node.pulse) * node.drift + Math.cos(time * 0.18 + node.energy * 10) * 4
          node.y = node.baseY + Math.cos(time * 0.42 + node.pulse) * (node.drift * 0.6)

          if (pointer.active) {
            const dx = pointer.x - node.x
            const dy = pointer.y - node.y
            const distance = Math.hypot(dx, dy)

            if (distance < 150) {
              const force = (150 - distance) / 150
              node.x -= (dx / Math.max(distance, 1)) * force * 10
              node.y -= (dy / Math.max(distance, 1)) * force * 10
            }
          }
        }
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]

        for (let j = i + 1; j < nodes.length; j += 1) {
          const neighbor = nodes[j]
          const dx = neighbor.x - node.x
          const dy = neighbor.y - node.y
          const distance = Math.hypot(dx, dy)
          const maxDistance = width < MOBILE_BREAKPOINT ? 118 : 138

          if (distance < maxDistance) {
            const midpointX = (node.x + neighbor.x) / 2
            const midpointY = (node.y + neighbor.y) / 2
            const alpha = (1 - distance / maxDistance) * 0.18
            const cursorBoost = pointer.active
              ? Math.max(0, 1 - Math.hypot(pointer.x - midpointX, pointer.y - midpointY) / 220) * 0.14
              : 0

            const gradient = context.createLinearGradient(node.x, node.y, neighbor.x, neighbor.y)
            gradient.addColorStop(0, `rgba(237, 240, 224, ${alpha * 0.62 + cursorBoost})`)
            gradient.addColorStop(0.5, `rgba(180, 255, 114, ${alpha * 0.72 + cursorBoost})`)
            gradient.addColorStop(1, `rgba(137, 188, 255, ${alpha * 0.58 + cursorBoost})`)

            context.beginPath()
            context.moveTo(node.x, node.y)
            context.lineTo(neighbor.x, neighbor.y)
            context.strokeStyle = gradient
            context.lineWidth = distance < maxDistance * 0.45 ? 0.8 : 0.45
            context.stroke()
          }
        }
      }
    }

    const drawNodes = () => {
      for (const node of nodes) {
        const pulse = (Math.sin(node.pulse) + 1) / 2
        const hot = pulse > 0.82
        const outerRadius = node.radius * (hot ? 6.2 : 3.4)

        const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, outerRadius)
        glow.addColorStop(0, hot ? 'rgba(164, 255, 104, 0.72)' : node.energy > 0.55 ? 'rgba(0, 255, 102, 0.5)' : 'rgba(64, 172, 255, 0.44)')
        glow.addColorStop(0.22, hot ? 'rgba(255, 241, 184, 0.5)' : 'rgba(240, 243, 255, 0.24)')
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)')

        context.beginPath()
        context.arc(node.x, node.y, outerRadius, 0, Math.PI * 2)
        context.fillStyle = glow
        context.fill()

        context.beginPath()
        context.arc(node.x, node.y, node.radius + pulse * 0.65, 0, Math.PI * 2)
        context.fillStyle = hot ? 'rgba(255, 251, 226, 0.82)' : 'rgba(235, 241, 255, 0.58)'
        context.fill()
      }
    }

    const draw = () => {
      time += 0.01
      drawBackdrop()
      updateDust()
      updateNodes()
      drawConnections()
      drawNodes()
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div className="motion-background" aria-hidden="true">
      <canvas ref={canvasRef} className="motion-background__canvas" />
      <div className="motion-background__veil" />
    </div>
  )
}
