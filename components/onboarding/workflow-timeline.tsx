'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  Brain,
  Rocket,
  Ban,
  ScanSearch,
} from 'lucide-react'

const workflows = [
  {
    code: 'WF1',
    name: 'Deliverability Check',
    schedule: 'Monday 9am',
    icon: Shield,
    description: 'Monitors domain health and sender reputation',
  },
  {
    code: 'WF2',
    name: 'Campaign Optimization',
    schedule: 'Sunday 8pm',
    icon: Brain,
    description: 'AI analysis of performance, stages improvements',
  },
  {
    code: 'WF3',
    name: 'Deployment',
    schedule: 'Wednesday 9am',
    icon: Rocket,
    description: 'Deploys optimized campaigns and sequences',
  },
  {
    code: 'WF4',
    name: 'DNC Sync',
    schedule: 'Daily 6am',
    icon: Ban,
    description: 'Syncs do-not-contact lists across all campaigns',
  },
  {
    code: 'WF5',
    name: 'Lead Compliance',
    schedule: 'Every 4 hours',
    icon: ScanSearch,
    description: 'Validates and deduplicates new leads',
  },
]

export function WorkflowTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-primary/40" />

      <div className="space-y-1">
        {workflows.map((wf, i) => {
          const Icon = wf.icon
          return (
            <motion.div
              key={wf.code}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-start gap-4 relative pl-0"
            >
              {/* Node */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold">{wf.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                    {wf.schedule}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{wf.code}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
