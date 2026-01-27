'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockWeeklyTrends } from '@/lib/data/dashboard'

interface TrendChartProps {
  title?: string
  showMeetings?: boolean
  showReplyRate?: boolean
  showOpenRate?: boolean
}

export function TrendChart({
  title = '12-Week Performance',
  showMeetings = true,
  showReplyRate = true,
  showOpenRate = false
}: TrendChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockWeeklyTrends}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReplyRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOpenRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="weekLabel"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 'auto']}
              />
              {(showReplyRate || showOpenRate) && (
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 50]}
                  tickFormatter={(value) => `${value}%`}
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
              />
              {showMeetings && (
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="meetingsBooked"
                  name="Meetings"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorMeetings)"
                />
              )}
              {showReplyRate && (
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="replyRate"
                  name="Reply Rate %"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorReplyRate)"
                />
              )}
              {showOpenRate && (
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="openRate"
                  name="Open Rate %"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#colorOpenRate)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
