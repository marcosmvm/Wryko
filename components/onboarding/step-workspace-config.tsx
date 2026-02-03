'use client'

import { motion } from 'framer-motion'
import {
  Database,
  Sheet,
  MessageCircle,
  FileSpreadsheet,
  Check,
  BookOpen,
  ShieldCheck,
  ListChecks,
  Users,
  FileText,
} from 'lucide-react'
import { StepHeader } from './step-header'
import { WorkflowBadge } from './workflow-badge'

export interface WorkspaceConfigData {
  workspaceSheetId: string
  telegramChatId: string
  leadsSheetId: string
}

interface StepWorkspaceConfigProps {
  data: WorkspaceConfigData
  onChange: (updates: Partial<WorkspaceConfigData>) => void
  errors: Partial<Record<keyof WorkspaceConfigData, string>>
}

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
}

const autoSetupItems = [
  { icon: BookOpen, label: 'Master Library sheet', detail: 'Central campaign asset library' },
  { icon: FileText, label: 'Staged Updates sheet', detail: 'Queued campaign optimizations' },
  { icon: ShieldCheck, label: 'DNC List', detail: 'Global do-not-contact registry' },
  { icon: ListChecks, label: 'Scraped Leads sheet', detail: 'Raw leads before validation' },
  { icon: Users, label: 'Client Leads sheet', detail: 'Verified leads ready for outreach' },
]

export function StepWorkspaceConfig({ data, onChange, errors }: StepWorkspaceConfigProps) {
  return (
    <div className="space-y-5">
      <StepHeader
        icon={Database}
        supportingIcons={[Sheet, MessageCircle]}
        title="Workspace Configuration"
        subtitle="Connect your Google Sheets and Telegram for real-time collaboration."
        stepNumber={3}
      />

      {/* Workspace Sheet ID */}
      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <label htmlFor="workspaceSheetId" className="block text-sm font-medium">
            <Sheet className="w-4 h-4 inline mr-1.5 text-primary" />
            Workspace Sheet ID
            <span className="text-muted-foreground text-xs ml-1">(optional)</span>
            <WorkflowBadge workflows={['WF2', 'WF3']} />
          </label>
          <input
            id="workspaceSheetId"
            type="text"
            value={data.workspaceSheetId}
            onChange={(e) => onChange({ workspaceSheetId: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors font-mono text-sm ${
              errors.workspaceSheetId ? 'border-destructive' : 'border-border'
            }`}
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
          />
          {errors.workspaceSheetId && (
            <p className="text-destructive text-xs">{errors.workspaceSheetId}</p>
          )}
          <p className="text-muted-foreground text-xs">
            Find this in your Google Sheet URL between <span className="font-mono bg-muted px-1 rounded">/d/</span> and <span className="font-mono bg-muted px-1 rounded">/edit</span>
          </p>
        </div>
      </motion.div>

      {/* Telegram Chat ID */}
      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <label htmlFor="telegramChatId" className="block text-sm font-medium">
            <MessageCircle className="w-4 h-4 inline mr-1.5 text-primary" />
            Telegram Chat ID
            <span className="text-muted-foreground text-xs ml-1">(optional)</span>
            <WorkflowBadge workflows={['WF1', 'WF2', 'WF3']} />
          </label>
          <input
            id="telegramChatId"
            type="text"
            value={data.telegramChatId}
            onChange={(e) => onChange({ telegramChatId: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors font-mono text-sm ${
              errors.telegramChatId ? 'border-destructive' : 'border-border'
            }`}
            placeholder="-1001234567890"
          />
          {errors.telegramChatId && (
            <p className="text-destructive text-xs">{errors.telegramChatId}</p>
          )}
          <p className="text-muted-foreground text-xs">
            Your Telegram group chat ID for real-time workflow notifications and alerts.
          </p>
        </div>
      </motion.div>

      {/* Leads Sheet ID */}
      <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
          <label htmlFor="leadsSheetId" className="block text-sm font-medium">
            <FileSpreadsheet className="w-4 h-4 inline mr-1.5 text-primary" />
            Leads Sheet ID
            <span className="text-muted-foreground text-xs ml-1">(optional)</span>
            <WorkflowBadge workflows={['WF5']} />
          </label>
          <input
            id="leadsSheetId"
            type="text"
            value={data.leadsSheetId}
            onChange={(e) => onChange({ leadsSheetId: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors font-mono text-sm ${
              errors.leadsSheetId ? 'border-destructive' : 'border-border'
            }`}
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
          />
          {errors.leadsSheetId && (
            <p className="text-destructive text-xs">{errors.leadsSheetId}</p>
          )}
          <p className="text-muted-foreground text-xs">
            The Google Sheet where your scraped leads will be stored and validated.
          </p>
        </div>
      </motion.div>

      {/* What we set up for you */}
      <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold">What we set up for you</h3>
              <p className="text-muted-foreground text-[10px]">These are created automatically during onboarding</p>
            </div>
          </div>
          <div className="space-y-2">
            {autoSetupItems.map((item) => {
              const ItemIcon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium flex items-center gap-1.5">
                      <ItemIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{item.detail}</span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
