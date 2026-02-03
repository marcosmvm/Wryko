export interface PartnerLogo {
  name: string
  /** Path to SVG/PNG in public/images/logos/. When provided, renders an image. */
  imageSrc?: string
  /** External URL to the partner's website */
  url: string
}

export const partnerLogos: PartnerLogo[] = [
  {
    name: 'Instantly',
    imageSrc: '/images/logos/instantly.svg',
    url: 'https://instantly.ai',
  },
  {
    name: 'Apollo.io',
    imageSrc: '/images/logos/apollo.svg',
    url: 'https://apollo.io',
  },
  {
    name: 'HubSpot',
    imageSrc: '/images/logos/hubspot.svg',
    url: 'https://hubspot.com',
  },
  {
    name: 'Salesforce',
    imageSrc: '/images/logos/salesforce.svg',
    url: 'https://salesforce.com',
  },
  {
    name: 'Google Workspace',
    imageSrc: '/images/logos/google-workspace.svg',
    url: 'https://workspace.google.com',
  },
  {
    name: 'Slack',
    imageSrc: '/images/logos/slack.svg',
    url: 'https://slack.com',
  },
  {
    name: 'n8n',
    imageSrc: '/images/logos/n8n.svg',
    url: 'https://n8n.io',
  },
  {
    name: 'Supabase',
    imageSrc: '/images/logos/supabase.svg',
    url: 'https://supabase.com',
  },
]
