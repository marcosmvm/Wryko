'use client'

export function DashboardAnalyticsMockup() {
  const metrics = [
    { label: 'Pipeline Value', value: '$2.4M', trend: '+18%', trendUp: true },
    { label: 'Avg. Reply Rate', value: '8.2%', trend: '+1.4%', trendUp: true },
    { label: 'Meetings This Month', value: '23', trend: '+5', trendUp: true },
    { label: 'Conversion Rate', value: '12.4%', trend: '+2.1%', trendUp: true },
  ]

  const barData = [
    { label: 'Sep', value: 58 },
    { label: 'Oct', value: 72 },
    { label: 'Nov', value: 65 },
    { label: 'Dec', value: 84 },
    { label: 'Jan', value: 92 },
  ]

  const maxBar = Math.max(...barData.map(d => d.value))

  // Donut chart segments (lead sources)
  const donutSegments = [
    { label: 'Email', pct: 42, color: '#a855f7' },
    { label: 'LinkedIn', pct: 28, color: '#6366f1' },
    { label: 'Referral', pct: 18, color: '#22c55e' },
    { label: 'Organic', pct: 12, color: '#f59e0b' },
  ]

  const topCampaigns = [
    { name: 'SaaS Decision Makers', meetings: 14, pipeline: '$840K' },
    { name: 'VP Engineering US', meetings: 9, pipeline: '$520K' },
    { name: 'Healthcare IT Leaders', meetings: 7, pipeline: '$380K' },
  ]

  const sidebarItems = [0, 1, 2, 3, 4]

  // Calculate donut SVG properties
  const donutRadius = 35
  const donutCircumference = 2 * Math.PI * donutRadius
  let cumulativeOffset = 0

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
              background: item === 2 ? '#a855f7' : '#1e1e2e',
              opacity: item === 2 ? 1 : 0.5,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                background: item === 2 ? '#fff' : '#71717a',
              }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-3 gap-2.5 overflow-hidden" style={{ minWidth: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-semibold" style={{ fontSize: 13, color: '#f0f0f5' }}>
            Analytics
          </span>
          <div
            className="rounded-md px-2 py-0.5"
            style={{ background: '#1e1e2e', border: '1px solid #2a2a3a' }}
          >
            <span style={{ fontSize: 9, color: '#71717a' }}>Last 30 days</span>
          </div>
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-4 gap-2">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg p-2 flex flex-col gap-1"
              style={{
                background: '#16161f',
                border: '1px solid #1e1e2e',
              }}
            >
              <span style={{ fontSize: 8, color: '#71717a', lineHeight: 1.2 }}>
                {metric.label}
              </span>
              <div className="flex items-end gap-1">
                <span className="font-bold" style={{ fontSize: 14, color: '#f0f0f5', lineHeight: 1 }}>
                  {metric.value}
                </span>
                <span
                  className="flex items-center"
                  style={{ fontSize: 8, color: '#22c55e', lineHeight: 1, marginBottom: 1 }}
                >
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    style={{ marginRight: 1 }}
                  >
                    <path d="M3 1L5.5 4.5H0.5L3 1Z" fill="#22c55e" />
                  </svg>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-2 flex-1" style={{ minHeight: 0 }}>
          {/* Bar chart */}
          <div
            className="rounded-lg p-2 flex flex-col"
            style={{
              background: '#16161f',
              border: '1px solid #1e1e2e',
              minHeight: 0,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span style={{ fontSize: 10, color: '#f0f0f5', fontWeight: 600 }}>
                Meetings by Month
              </span>
            </div>
            <div className="flex-1" style={{ minHeight: 0 }}>
              <svg
                viewBox="0 0 220 120"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid lines */}
                {[25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="15"
                    y1={y}
                    x2="210"
                    y2={y}
                    stroke="#1e1e2e"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Bars */}
                {barData.map((d, i) => {
                  const barWidth = 24
                  const spacing = 40
                  const x = 25 + i * spacing
                  const barHeight = (d.value / maxBar) * 75
                  const y = 100 - barHeight

                  return (
                    <g key={i}>
                      <defs>
                        <linearGradient id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="3"
                        fill={`url(#barGrad${i})`}
                        opacity={0.85}
                      />
                      {/* Value on top */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 4}
                        textAnchor="middle"
                        fill="#f0f0f5"
                        fontSize="7"
                        fontWeight="500"
                      >
                        {d.value}
                      </text>
                      {/* Label */}
                      <text
                        x={x + barWidth / 2}
                        y="113"
                        textAnchor="middle"
                        fill="#71717a"
                        fontSize="7"
                      >
                        {d.label}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Donut chart */}
          <div
            className="rounded-lg p-2 flex flex-col"
            style={{
              background: '#16161f',
              border: '1px solid #1e1e2e',
              minHeight: 0,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span style={{ fontSize: 10, color: '#f0f0f5', fontWeight: 600 }}>
                Lead Sources
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-3" style={{ minHeight: 0 }}>
              {/* Donut SVG */}
              <div className="flex-shrink-0">
                <svg width="90" height="90" viewBox="0 0 100 100">
                  {donutSegments.map((segment) => {
                    const dashLength = (segment.pct / 100) * donutCircumference
                    const gapLength = donutCircumference - dashLength
                    const rotation = (cumulativeOffset / 100) * 360 - 90
                    cumulativeOffset += segment.pct

                    return (
                      <circle
                        key={segment.label}
                        cx="50"
                        cy="50"
                        r={donutRadius}
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="10"
                        strokeDasharray={`${dashLength} ${gapLength}`}
                        transform={`rotate(${rotation} 50 50)`}
                        strokeLinecap="round"
                      />
                    )
                  })}
                  {/* Center text */}
                  <text
                    x="50"
                    y="47"
                    textAnchor="middle"
                    fill="#f0f0f5"
                    fontSize="14"
                    fontWeight="700"
                  >
                    732
                  </text>
                  <text
                    x="50"
                    y="58"
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize="7"
                  >
                    Total Leads
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-1.5">
                {donutSegments.map((segment) => (
                  <div key={segment.label} className="flex items-center gap-1.5">
                    <div
                      className="rounded-sm flex-shrink-0"
                      style={{
                        width: 6,
                        height: 6,
                        background: segment.color,
                        borderRadius: 2,
                      }}
                    />
                    <span style={{ fontSize: 8, color: '#f0f0f5' }}>{segment.label}</span>
                    <span style={{ fontSize: 8, color: '#71717a' }}>{segment.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Campaigns mini table */}
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
            Top Performing Campaigns
          </span>
          <div className="flex flex-col gap-1">
            {/* Mini header */}
            <div
              className="grid items-center"
              style={{ gridTemplateColumns: '2fr 1fr 1fr' }}
            >
              <span style={{ fontSize: 7, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Campaign
              </span>
              <span style={{ fontSize: 7, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                Meetings
              </span>
              <span style={{ fontSize: 7, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
                Pipeline
              </span>
            </div>
            {topCampaigns.map((campaign, i) => (
              <div
                key={i}
                className="grid items-center py-0.5"
                style={{
                  gridTemplateColumns: '2fr 1fr 1fr',
                  borderTop: '1px solid #1e1e2e',
                }}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 12,
                      height: 12,
                      background: '#a855f720',
                      fontSize: 7,
                      color: '#a855f7',
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate" style={{ fontSize: 9, color: '#f0f0f5' }}>
                    {campaign.name}
                  </span>
                </div>
                <span style={{ fontSize: 9, color: '#f0f0f5', fontWeight: 600, textAlign: 'center' }}>
                  {campaign.meetings}
                </span>
                <span style={{ fontSize: 9, color: '#22c55e', fontWeight: 500, textAlign: 'right' }}>
                  {campaign.pipeline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
