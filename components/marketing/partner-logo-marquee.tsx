'use client'

import { type ComponentType } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { partnerLogos } from '@/lib/data/partner-logos'
import {
  InstantlyLogo,
  ApolloLogo,
  HubSpotLogo,
  SalesforceLogo,
  GoogleWorkspaceLogo,
  SlackLogo,
  N8nLogo,
  SupabaseLogo,
} from '@/components/marketing/logos'

const logoComponentMap: Record<string, ComponentType<{ className?: string }>> = {
  Instantly: InstantlyLogo,
  'Apollo.io': ApolloLogo,
  HubSpot: HubSpotLogo,
  Salesforce: SalesforceLogo,
  'Google Workspace': GoogleWorkspaceLogo,
  Slack: SlackLogo,
  n8n: N8nLogo,
  Supabase: SupabaseLogo,
}

interface PartnerLogoMarqueeProps {
  className?: string
}

function LogoItem({ name }: { name: string }) {
  const LogoSvg = logoComponentMap[name]

  if (LogoSvg) {
    return (
      <LogoSvg className="h-7 w-auto text-muted-foreground/40 group-hover:text-muted-foreground/90 transition-all duration-300" />
    )
  }

  return (
    <span className="font-heading font-semibold text-sm sm:text-base text-muted-foreground/40 group-hover:text-muted-foreground/90 transition-colors duration-300 whitespace-nowrap">
      {name}
    </span>
  )
}

export function PartnerLogoMarquee({ className }: PartnerLogoMarqueeProps) {
  // Duplicate logos for seamless infinite scroll
  const allLogos = [...partnerLogos, ...partnerLogos]

  return (
    <motion.div
      className={cn('border-t border-border/50 pt-8', className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6">
        Integrates with
      </p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {allLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="group flex-shrink-0 flex items-center justify-center px-8 sm:px-12"
            >
              <LogoItem name={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
