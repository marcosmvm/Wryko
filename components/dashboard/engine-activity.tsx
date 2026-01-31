'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, AlertCircle, Clock, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { mockEngineActivity } from '@/lib/data/dashboard'

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-success',
    bg: 'bg-success/10',
  },
  running: {
    icon: Circle,
    color: 'text-info',
    bg: 'bg-info/10',
  },
  failed: {
    icon: AlertCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  scheduled: {
    icon: Clock,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
  },
}

export function EngineActivity() {
  const recentActivity = mockEngineActivity.slice(0, 5)

  return (
    <Card variant="futuristic">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <CardTitle className="text-base font-medium">Engine Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivity.map((activity) => {
            const config = statusConfig[activity.status]
            const StatusIcon = config.icon

            return (
              <motion.div key={activity.id} whileHover={{ x: 2 }}>
                <div
                  className="flex items-start gap-3 p-3 rounded-lg glass-card hover:glow-border-hover transition-all"
                >
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", config.bg)}>
                    <StatusIcon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {activity.status === 'running' ? (
                        <span className="font-medium text-sm gradient-text">{activity.engineName}</span>
                      ) : (
                        <span className="font-medium text-sm">{activity.engineName}</span>
                      )}
                      <span className="text-xs text-muted-foreground">({activity.engineCode})</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{activity.summary}</p>
                    {activity.impact && (
                      <p className="text-xs font-medium text-primary mt-1">{activity.impact}</p>
                    )}
                  </div>
                  {activity.status === 'running' && (
                    <div className="flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-info"></span>
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
