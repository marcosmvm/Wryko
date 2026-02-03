'use client'

const workflowDescriptions: Record<string, string> = {
  WF1: 'Deliverability Check — Monday 9am',
  WF2: 'Campaign Optimization — Sunday 8pm',
  WF3: 'Deployment — Wednesday 9am',
  WF4: 'DNC Sync — Daily 6am',
  WF5: 'Lead Compliance — Every 4 hours',
}

interface WorkflowBadgeProps {
  workflows: string[]
}

export function WorkflowBadge({ workflows }: WorkflowBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 ml-2">
      {workflows.map((wf) => (
        <span
          key={wf}
          title={workflowDescriptions[wf] || wf}
          className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary/10 text-secondary border border-secondary/20 cursor-help"
        >
          {wf}
        </span>
      ))}
    </span>
  )
}
