'use client'

import { cn } from '@/lib/utils'

interface GeometricAvatarProps {
  initials: string
  role: 'cs' | 'os' | 'ai'
  size?: 'sm' | 'md'
  className?: string
}

const sizeMap = {
  sm: { px: 40, fontSize: 13, fontY: 21, dotR: 1.2 },
  md: { px: 56, fontSize: 18, fontY: 29.5, dotR: 1.6 },
}

function CSOverlay({ s }: { s: number }) {
  // Two overlapping speech-bubble rounded rectangles at slight angles
  const scale = s / 56
  return (
    <g opacity="0.15" transform={`scale(${scale})`}>
      {/* First speech bubble — tilted slightly left */}
      <g transform="translate(28, 28) rotate(-8) translate(-28, -28)">
        <rect x="12" y="16" width="26" height="18" rx="6" ry="6" fill="white" />
        <polygon points="20,34 24,34 18,40" fill="white" />
      </g>
      {/* Second speech bubble — tilted slightly right, offset */}
      <g transform="translate(28, 28) rotate(6) translate(-28, -28)">
        <rect x="20" y="12" width="26" height="18" rx="6" ry="6" fill="white" />
        <polygon points="38,30 34,30 40,36" fill="white" />
      </g>
    </g>
  )
}

function OSOverlay({ s }: { s: number }) {
  // 3 concentric circles (target) offset slightly to upper-right
  const scale = s / 56
  const cx = 32
  const cy = 24
  return (
    <g opacity="0.10" transform={`scale(${scale})`}>
      <circle cx={cx} cy={cy} r="18" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="12" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="6" fill="none" stroke="white" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="2" fill="white" />
    </g>
  )
}

function AIOverlay({ s }: { s: number }) {
  // 3x3 dot grid with connecting lines — circuit / neural network motif
  const scale = s / 56
  const gap = 10
  const offsetX = 17
  const offsetY = 17
  const dots: [number, number][] = []

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      dots.push([offsetX + col * gap, offsetY + row * gap])
    }
  }

  // Connections between specific dots to form a circuit-like pattern
  // Indices: 0-1-2 / 3-4-5 / 6-7-8
  const connections: [number, number][] = [
    [0, 1], [1, 2],   // top row horizontal
    [3, 4],            // middle row partial
    [6, 7], [7, 8],   // bottom row horizontal
    [0, 3], [2, 5],   // verticals on edges
    [4, 7],            // center vertical
    [1, 4], [4, 5],   // inner cross connections
    [3, 6], [5, 8],   // outer verticals bottom
  ]

  return (
    <g opacity="0.12" transform={`scale(${scale})`}>
      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          x1={dots[a][0]}
          y1={dots[a][1]}
          x2={dots[b][0]}
          y2={dots[b][1]}
          stroke="white"
          strokeWidth="1"
        />
      ))}
      {/* Dots */}
      {dots.map(([x, y], i) => (
        <circle key={`dot-${i}`} cx={x} cy={y} r={scale > 0.8 ? 1.6 : 1.2} fill="white" />
      ))}
    </g>
  )
}

const gradientConfigs = {
  cs: { from: '#a855f7', to: '#6366f1' },
  os: { from: '#6366f1', to: '#3b82f6' },
  ai: { from: '#a855f7', to: '#ec4899' },
}

export function GeometricAvatar({
  initials,
  role,
  size = 'md',
  className,
}: GeometricAvatarProps) {
  const { px, fontSize, fontY } = sizeMap[size]
  const gradient = gradientConfigs[role]
  const gradientId = `geo-grad-${role}`
  const clipId = `geo-clip-${role}-${size}`
  const half = px / 2

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        size === 'md' ? 'w-14 h-14' : 'w-10 h-10',
        className
      )}
      role="img"
      aria-label={`${initials} avatar`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
        <clipPath id={clipId}>
          <circle cx={half} cy={half} r={half} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Gradient background */}
        <circle cx={half} cy={half} r={half} fill={`url(#${gradientId})`} />

        {/* Role-specific overlay pattern */}
        {role === 'cs' && <CSOverlay s={px} />}
        {role === 'os' && <OSOverlay s={px} />}
        {role === 'ai' && <AIOverlay s={px} />}

        {/* Centered initials */}
        <text
          x={half}
          y={fontY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontFamily="'Sora', system-ui, sans-serif"
          fontWeight="700"
          fontSize={fontSize}
          letterSpacing="0.5"
        >
          {initials}
        </text>
      </g>
    </svg>
  )
}
