'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Eye, EyeOff, ExternalLink, CheckSquare } from 'lucide-react'

export interface InstantlySetupData {
  hasInstantly: boolean
  instantlyApiKey: string
  campaignsConfigured: boolean
}

interface StepInstantlySetupProps {
  data: InstantlySetupData
  onChange: (data: Partial<InstantlySetupData>) => void
  errors: Partial<Record<keyof InstantlySetupData, string>>
}

export function StepInstantlySetup({ data, onChange, errors }: StepInstantlySetupProps) {
  const [showKey, setShowKey] = useState(false)

  return (
    <div className="space-y-5">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-semibold mb-1">Instantly.AI Setup</h2>
        <p className="text-muted-foreground text-sm">
          If you already use Instantly.AI, connect it to supercharge your campaigns.
        </p>
      </div>

      {/* Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Do you use Instantly.AI?</p>
            <p className="text-muted-foreground text-xs">
              You can always add this later
            </p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={data.hasInstantly}
          onClick={() => {
            onChange({
              hasInstantly: !data.hasInstantly,
              ...(!data.hasInstantly ? {} : { instantlyApiKey: '', campaignsConfigured: false }),
            })
          }}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            data.hasInstantly ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              data.hasInstantly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </motion.div>

      {/* Conditional fields */}
      <AnimatePresence mode="wait">
        {data.hasInstantly ? (
          <motion.div
            key="instantly-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-5 overflow-hidden"
          >
            {/* API Key */}
            <div>
              <label htmlFor="instantlyApiKey" className="block text-sm font-medium mb-2">
                Instantly API Key <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  id="instantlyApiKey"
                  type={showKey ? 'text' : 'password'}
                  value={data.instantlyApiKey}
                  onChange={(e) => onChange({ instantlyApiKey: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors pr-12 font-mono text-sm"
                  placeholder="Enter your API key"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.instantlyApiKey && (
                <p className="text-destructive text-xs mt-1">{errors.instantlyApiKey}</p>
              )}
              <p className="text-muted-foreground text-xs mt-1.5 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Find this in Instantly: Settings → Integrations → API Key
              </p>
            </div>

            {/* Campaigns configured */}
            <label className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-primary/30 transition-colors">
              <input
                type="checkbox"
                checked={data.campaignsConfigured}
                onChange={(e) => onChange({ campaignsConfigured: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <div>
                <p className="font-medium text-sm flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-primary" />
                  My campaigns have sequences configured
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Confirm that your Instantly campaigns have active email sequences set up.
                </p>
              </div>
            </label>
          </motion.div>
        ) : (
          <motion.div
            key="no-instantly"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 rounded-xl border border-dashed border-border text-center"
          >
            <Zap className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              No problem! Our team will help you set up Instantly.AI during onboarding.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              You can skip this step and continue.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
