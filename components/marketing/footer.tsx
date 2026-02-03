import { type ComponentType } from 'react'
import Link from 'next/link'
import { LinkedinLogo, XLogo, Envelope } from '@phosphor-icons/react'
import { Logo } from '@/components/ui/logo'
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

const footerLogoMap: Record<string, ComponentType<{ className?: string }>> = {
  Instantly: InstantlyLogo,
  'Apollo.io': ApolloLogo,
  HubSpot: HubSpotLogo,
  Salesforce: SalesforceLogo,
  'Google Workspace': GoogleWorkspaceLogo,
  Slack: SlackLogo,
  n8n: N8nLogo,
  Supabase: SupabaseLogo,
}

const footerLinks = {
  platform: [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/resources', label: 'Resources' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="relative py-12 bg-background">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo variant="lockup" size="sm" />
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              11 AI Engines. Qualified Meetings. On Autopilot.
            </p>

            {/* Contact */}
            <a
              href="mailto:hello@wryko.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <Envelope className="w-3.5 h-3.5" weight="duotone" />
              hello@wryko.com
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://linkedin.com/company/wryko"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="LinkedIn"
              >
                <LinkedinLogo className="w-4 h-4" weight="fill" />
              </a>
              <a
                href="https://x.com/wryko"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                aria-label="X (Twitter)"
              >
                <XLogo className="w-4 h-4" weight="fill" />
              </a>
            </div>

            {/* Mini CTA */}
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Get Started &rarr;
            </Link>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner Logos Row */}
        <div className="relative mt-8 pt-8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground/60 text-center mb-4">
            Integrations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {partnerLogos.map((logo) => {
              const LogoSvg = footerLogoMap[logo.name]
              return LogoSvg ? (
                <LogoSvg
                  key={logo.name}
                  className="h-5 w-auto text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-200"
                />
              ) : (
                <span
                  key={logo.name}
                  className="text-xs font-medium text-muted-foreground/40"
                >
                  {logo.name}
                </span>
              )
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="relative mt-8 pt-8 text-center text-sm text-muted-foreground">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p>
            &copy; {new Date().getFullYear()} Wryko. All rights reserved.
            <span className="mx-2">&middot;</span>
            Built with AI in Los Angeles
          </p>
        </div>
      </div>
    </footer>
  )
}
