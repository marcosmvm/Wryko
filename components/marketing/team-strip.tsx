'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { GeometricAvatar } from '@/components/marketing/geometric-avatar'

interface TeamMember {
  name: string
  role: string
  imageSrc?: string
  initials: string
  avatarRole?: 'cs' | 'os' | 'ai'
}

const team: TeamMember[] = [
  {
    name: 'Marcos Matthews',
    role: 'Founder & CEO',
    imageSrc: '/images/marcos-matthews-headshot.jpg',
    initials: 'MM',
  },
  {
    name: 'Your Dedicated CSM',
    role: 'Client Success',
    initials: 'CS',
    avatarRole: 'cs',
  },
  {
    name: 'Campaign Strategist',
    role: 'Outbound Strategy',
    initials: 'OS',
    avatarRole: 'os',
  },
  {
    name: 'AI Engine Lead',
    role: 'Automation & Optimization',
    initials: 'AI',
    avatarRole: 'ai',
  },
]

function Avatar({
  member,
  size = 'md',
}: {
  member: TeamMember
  size?: 'sm' | 'md'
}) {
  const sizeClasses = size === 'md' ? 'w-14 h-14' : 'w-10 h-10'

  if (member.imageSrc) {
    return (
      <div className={cn(sizeClasses, 'relative rounded-full overflow-hidden ring-2 ring-primary/20')}>
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  if (member.avatarRole) {
    return (
      <div className="ring-2 ring-primary/20 rounded-full">
        <GeometricAvatar
          initials={member.initials}
          role={member.avatarRole}
          size={size}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        sizeClasses,
        'rounded-full flex items-center justify-center',
        'bg-gradient-to-br from-primary/20 to-secondary/20',
        'ring-2 ring-primary/20',
        size === 'md' ? 'text-sm' : 'text-xs',
        'font-heading font-semibold text-primary/70'
      )}
    >
      {member.initials}
    </div>
  )
}

interface TeamStripProps {
  className?: string
}

export function TeamStrip({ className }: TeamStripProps) {
  return (
    <section className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-card p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Team avatars */}
          <div className="flex items-center -space-x-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="relative"
                style={{ zIndex: team.length - index }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Avatar member={member} />
              </motion.div>
            ))}
          </div>

          {/* Copy */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-semibold text-lg mb-1">
              Led by humans. Powered by AI.
            </h3>
            <p className="text-sm text-muted-foreground">
              Every pilot is supported by a dedicated team — your CSM, campaign strategist,
              and AI engineers working alongside 11 autonomous engines.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/about"
            className="flex-shrink-0 inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm"
          >
            Meet the Team
            <ArrowRight className="w-4 h-4" weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
