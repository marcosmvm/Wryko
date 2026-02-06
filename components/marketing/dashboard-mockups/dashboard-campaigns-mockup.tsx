'use client'

export function DashboardCampaignsMockup() {
  const campaigns = [
    {
      name: 'SaaS Decision Makers',
      status: 'Active',
      statusColor: '#22c55e',
      openRate: 52,
      sent: 284,
    },
    {
      name: 'VP Engineering US',
      status: 'Active',
      statusColor: '#22c55e',
      openRate: 48,
      sent: 156,
    },
    {
      name: 'Series B Founders',
      status: 'Paused',
      statusColor: '#f59e0b',
      openRate: 41,
      sent: 89,
    },
    {
      name: 'CFO Mid-Market',
      status: 'Draft',
      statusColor: '#71717a',
      openRate: null,
      sent: null,
    },
    {
      name: 'Healthcare IT Leaders',
      status: 'Active',
      statusColor: '#22c55e',
      openRate: 55,
      sent: 203,
    },
  ]

  const sidebarItems = [0, 1, 2, 3, 4]

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
              background: item === 1 ? '#a855f7' : '#1e1e2e',
              opacity: item === 1 ? 1 : 0.5,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                background: item === 1 ? '#fff' : '#71717a',
              }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col p-3 gap-3 overflow-hidden" style={{ minWidth: 0 }}>
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="font-semibold" style={{ fontSize: 13, color: '#f0f0f5' }}>
            Active Campaigns
          </span>
          <div className="flex items-center gap-2">
            <div
              className="rounded-md flex items-center gap-1 px-2 py-0.5"
              style={{ background: '#1e1e2e', border: '1px solid #2a2a3a' }}
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M1 2h6M2 4h4M3 6h2"
                  stroke="#71717a"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontSize: 9, color: '#71717a' }}>Filter</span>
            </div>
            <div
              className="rounded-md flex items-center gap-1 px-2 py-0.5"
              style={{ background: '#a855f7' }}
            >
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 500 }}>+ New</span>
            </div>
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{ width: 5, height: 5, background: '#22c55e' }}
            />
            <span style={{ fontSize: 9, color: '#71717a' }}>3 Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{ width: 5, height: 5, background: '#f59e0b' }}
            />
            <span style={{ fontSize: 9, color: '#71717a' }}>1 Paused</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="rounded-full"
              style={{ width: 5, height: 5, background: '#71717a' }}
            />
            <span style={{ fontSize: 9, color: '#71717a' }}>1 Draft</span>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-lg overflow-hidden flex-1 flex flex-col"
          style={{
            background: '#16161f',
            border: '1px solid #1e1e2e',
            minHeight: 0,
          }}
        >
          {/* Table header */}
          <div
            className="grid items-center px-3 py-1.5 flex-shrink-0"
            style={{
              gridTemplateColumns: '2fr 1fr 1.2fr 1fr',
              borderBottom: '1px solid #1e1e2e',
              background: '#111118',
            }}
          >
            <span style={{ fontSize: 8, color: '#71717a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Campaign
            </span>
            <span style={{ fontSize: 8, color: '#71717a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Status
            </span>
            <span style={{ fontSize: 8, color: '#71717a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Open Rate
            </span>
            <span style={{ fontSize: 8, color: '#71717a', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>
              Sent
            </span>
          </div>

          {/* Table rows */}
          <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
            {campaigns.map((campaign, i) => (
              <div
                key={i}
                className="grid items-center px-3 py-2"
                style={{
                  gridTemplateColumns: '2fr 1fr 1.2fr 1fr',
                  borderBottom: i < campaigns.length - 1 ? '1px solid #1e1e2e' : 'none',
                }}
              >
                {/* Name */}
                <div className="flex items-center gap-1.5 min-w-0">
                  <div
                    className="rounded flex-shrink-0"
                    style={{
                      width: 6,
                      height: 6,
                      background: campaign.statusColor,
                      opacity: 0.6,
                    }}
                  />
                  <span
                    className="truncate"
                    style={{ fontSize: 10, color: '#f0f0f5', fontWeight: 500 }}
                  >
                    {campaign.name}
                  </span>
                </div>

                {/* Status badge */}
                <div>
                  <span
                    className="inline-flex items-center rounded-full px-1.5 py-0.5"
                    style={{
                      fontSize: 8,
                      color: campaign.statusColor,
                      background: `${campaign.statusColor}15`,
                      border: `1px solid ${campaign.statusColor}30`,
                      fontWeight: 500,
                    }}
                  >
                    {campaign.status}
                  </span>
                </div>

                {/* Open Rate with progress bar */}
                <div className="flex items-center gap-1.5">
                  {campaign.openRate !== null ? (
                    <>
                      <div
                        className="flex-1 rounded-full overflow-hidden"
                        style={{ height: 4, background: '#1e1e2e' }}
                      >
                        <div
                          className="rounded-full h-full"
                          style={{
                            width: `${campaign.openRate}%`,
                            background: `linear-gradient(90deg, #6366f1, #a855f7)`,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 9, color: '#f0f0f5', fontWeight: 500 }}>
                        {campaign.openRate}%
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: 9, color: '#71717a' }}>--</span>
                  )}
                </div>

                {/* Sent count */}
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 10, color: campaign.sent ? '#f0f0f5' : '#71717a' }}>
                    {campaign.sent !== null ? campaign.sent.toLocaleString() : '--'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 8, color: '#71717a' }}>
            Total sent: 732 emails this month
          </span>
          <span style={{ fontSize: 8, color: '#71717a' }}>
            Avg. open rate: 49.0%
          </span>
        </div>
      </div>
    </div>
  )
}
