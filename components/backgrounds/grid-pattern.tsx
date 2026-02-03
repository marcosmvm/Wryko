'use client'

interface GridPatternProps {
  spacing?: number
  opacity?: number
  type?: 'dots' | 'lines' | 'circuit'
}

export function GridPattern({ spacing = 30, opacity = 0.05, type = 'dots' }: GridPatternProps) {
  const patternId = `grid-pattern-${type}-${spacing}`

  const renderPattern = () => {
    if (type === 'dots') {
      return (
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r="1"
            fill={`hsl(var(--foreground) / ${opacity})`}
          />
        </pattern>
      )
    }

    if (type === 'lines') {
      return (
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
            fill="none"
            stroke={`hsl(var(--foreground) / ${opacity})`}
            strokeWidth="0.5"
          />
        </pattern>
      )
    }

    // Circuit pattern - tech-inspired with glowing nodes
    return (
      <pattern
        id={patternId}
        x="0"
        y="0"
        width={spacing}
        height={spacing}
        patternUnits="userSpaceOnUse"
      >
        {/* Horizontal and vertical lines */}
        <path
          d={`M 0 ${spacing / 2} L ${spacing} ${spacing / 2} M ${spacing / 2} 0 L ${spacing / 2} ${spacing}`}
          fill="none"
          stroke={`hsl(var(--primary) / ${opacity * 0.6})`}
          strokeWidth="0.5"
        />
        {/* Corner connections */}
        <path
          d={`M 0 0 L ${spacing / 4} 0 M 0 0 L 0 ${spacing / 4}`}
          fill="none"
          stroke={`hsl(var(--primary) / ${opacity * 0.4})`}
          strokeWidth="0.5"
        />
        {/* Center node with glow effect */}
        <circle
          cx={spacing / 2}
          cy={spacing / 2}
          r="2"
          fill={`hsl(var(--primary) / ${opacity * 1.5})`}
          className="animate-node-pulse"
        />
        {/* Small corner nodes */}
        <circle
          cx="0"
          cy="0"
          r="1"
          fill={`hsl(var(--primary) / ${opacity})`}
        />
      </pattern>
    )
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {renderPattern()}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
