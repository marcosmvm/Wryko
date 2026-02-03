'use client'

export function DashboardHomeMockup() {
  const stats = [
    { label: 'Meetings Booked', value: '47', color: '#22c55e' },
    { label: 'Open Rate', value: '52.3%', color: '#22c55e' },
    { label: 'Reply Rate', value: '8.7%', color: '#a855f7' },
    { label: 'Active Campaigns', value: '6', color: '#6366f1' },
  ]

  const activities = [
    { text: 'New meeting booked — VP Sales at Acme Corp', time: '2m ago', color: '#22c55e' },
    { text: 'Campaign "SaaS Leaders" hit 50% open rate', time: '18m ago', color: '#a855f7' },
    { text: 'Reply received from CTO at DataFlow Inc', time: '1h ago', color: '#6366f1' },
    { text: '28 new leads enriched by Engine G', time: '3h ago', color: '#22c55e' },
  ]

  const sidebarItems = [0, 1, 2, 3, 4]

  // Chart data points for the polyline (ascending trend)
  const chartPoints = [
    { x: 40, y: 130 },
    { x: 100, y: 110 },
    { x: 160, y: 118 },
    { x: 220, y: 85 },
    { x: 280, y: 90 },
    { x: 340, y: 60 },
    { x: 400, y: 65 },
    { x: 460, y: 35 },
  ]

  const polylineStr = chartPoints.map(p => `${p.x},${p.y}`).join(' ')
  const gradientPath = `M${chartPoints[0].x},${chartPoints[0].y} ${chartPoints.map(p => `L${p.x},${p.y}`).join(' ')} L${chartPoints[chartPoints.length - 1].x},145 L${chartPoints[0].x},145 Z`

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']

  return (
    <div
      className="w-full h-full flex"
      style={{
        background: '#0a0a0f',
        color: '#f0f0f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: 0,
      }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col items-center gap-3 py-4 flex-shrink-0"
        style={{ width: 48, background: '#111118', borderRight: '1px solid #1e1e2e' }}
      >
        {sidebarItems.map((item) => (
          <div
            key={item}
            className="rounded-lg flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              background: item === 0 ? '#a855f7' : '#1e1e2e',
              opacity: item === 0 ? 1 : 0.5,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                background: item === 0 ? '#fff' : '#71717a',
              }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden" style={{ minWidth: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-semibold" style={{ fontSize: 13, color: '#f0f0f5' }}>
            Dashboard
          </span>
          <div className="flex items-center gap-2">
            <div
              className="rounded-full"
              style={{ width: 6, height: 6, background: '#22c55e' }}
            />
            <span style={{ fontSize: 10, color: '#71717a' }}>All systems live</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-2 flex flex-col gap-1"
              style={{
                background: '#16161f',
                border: '1px solid #1e1e2e',
              }}
            >
              <div className="flex items-center gap-1.5">
                <div
                  className="rounded-full flex-shrink-0"
                  style={{ width: 5, height: 5, background: stat.color }}
                />
                <span style={{ fontSize: 9, color: '#71717a', lineHeight: 1.2 }}>
                  {stat.label}
                </span>
              </div>
              <span className="font-bold" style={{ fontSize: 16, color: '#f0f0f5', lineHeight: 1 }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div
          className="rounded-lg p-2 flex-1 flex flex-col"
          style={{
            background: '#16161f',
            border: '1px solid #1e1e2e',
            minHeight: 0,
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span style={{ fontSize: 10, color: '#f0f0f5', fontWeight: 600 }}>
              Meetings Booked
            </span>
            <span style={{ fontSize: 9, color: '#71717a' }}>Last 8 weeks</span>
          </div>
          <div className="flex-1" style={{ minHeight: 0 }}>
            <svg
              viewBox="0 0 500 160"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="chartGradientHome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[40, 70, 100, 130].map((y) => (
                <line
                  key={y}
                  x1="30"
                  y1={y}
                  x2="480"
                  y2={y}
                  stroke="#1e1e2e"
                  strokeWidth="0.5"
                />
              ))}
              {/* Gradient fill */}
              <path d={gradientPath} fill="url(#chartGradientHome)" />
              {/* Line */}
              <polyline
                points={polylineStr}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {chartPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#a855f7" />
              ))}
              {/* X-axis labels */}
              {weeks.map((label, i) => (
                <text
                  key={label}
                  x={chartPoints[i].x}
                  y="156"
                  textAnchor="middle"
                  fill="#71717a"
                  fontSize="7"
                >
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="rounded-lg p-2"
          style={{
            background: '#16161f',
            border: '1px solid #1e1e2e',
          }}
        >
          <span
            className="block mb-1.5"
            style={{ fontSize: 10, color: '#f0f0f5', fontWeight: 600 }}
          >
            Recent Activity
          </span>
          <div className="flex flex-col gap-1.5">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: 5, height: 5, background: activity.color }}
                  />
                  <span
                    className="truncate"
                    style={{ fontSize: 9, color: '#f0f0f5', opacity: 0.85 }}
                  >
                    {activity.text}
                  </span>
                </div>
                <span className="flex-shrink-0" style={{ fontSize: 8, color: '#71717a' }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
